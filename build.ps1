#!/bin/env pwsh
param(
    [switch]$watch = $false,
    [switch]$drafts = $false,
    [switch]$skip-build = $false
)

$ErrorActionPreference = 'Stop'

$env:LC_ALL = "C.UTF-8"
$env:MAGICK_THREAD_LIMIT = 1

[System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = $PSScriptRoot
$public = Join-Path $root "public"
$src = Join-Path $root "src"
$image_manifest = Join-Path $PSScriptRoot "images.json"

New-Item -ItemType Directory -Path $public -ErrorAction SilentlyContinue > $null

function Copy-StaticContent {
    Copy-Item -Path (Join-Path $root "site_root/*") -Recurse -Destination $public -Force
    $static_content = @("audio", "fonts", "small-images")
    foreach ($dir in $static_content) {
        Copy-Item -Path (Join-Path $root $dir) -Recurse -Destination $public -Force
    }
}

function Resize-Images {
    $target_dir = Join-Path $public "img"
    New-Item -Path $target_dir -ItemType Directory -ErrorAction SilentlyContinue > $null
    
    $target_sizes = @(300, 600, 800, 1200, 4000)
    Push-Location $src
    try {
        $files = (git ls-tree HEAD . -r -z).Split("`0") | Select-String '\.(jpe?g|svg|png)$' | ForEach-Object {
            $mode, $type, $hash, $path = $_ -split '\s+'
            @{
                mode = $mode
                type = $type
                hash = $hash
                path = $path
            }
        }

        Write-Host "Found $($files.Count) images to convert"
       
        $file_lookup = @{}
        $files | ForEach-Object {
            $file_lookup[[uri]::EscapeUriString($_.path)] = @{
                hash = $_.hash
            }
        }
        
        # get sizes of raster formats, quickly
        $sizes = exiftool -json -ImageHeight -ImageWidth -r -q -ext jpg -ext jpeg -ext png . 2>$null | ConvertFrom-Json
        foreach ($size in $sizes) {
            # Starts with "./"
            $path = $size.SourceFile.Substring(2)
            $target = $file_lookup[[uri]::EscapeUriString($path)]
            $target.width = $size.ImageWidth
            $target.height = $size.ImageHeight
        }
         
        # produce other sizes of JPEGs
        $files  | ForEach-Object -ThrottleLimit ([System.Environment]::ProcessorCount) -Parallel {
            $hash = $_.hash
            $path = $_.path
            
            $absPath = Join-Path $using:src $path
            
            $ext = Split-Path $path -Extension
            $origPath = Join-Path $using:target_dir "$hash$ext"

            if ((Split-Path $path -Extension) -match ".jpe?g") {
                $rel_path = (Resolve-Path -Relative $path -RelativeBasePath $using:src).Substring(2).Replace('\', '/')
                $meta = ($using:file_lookup)[[uri]::EscapeUriString($rel_path)]
                $applicable_sizes = $using:target_sizes | Where-Object { $_ -lt $meta.width }
                $meta_sizes = @{}
                foreach ($size in $applicable_sizes) {
                    $meta_sizes["$size"] = "/img/$hash-$size.jpg"
                }
                $meta.sizes = $meta_sizes
                
                if (Test-Path $origPath) {
                    Write-Debug "Skipping $path"
                }
                else {
                    Write-Host "Converting $path"
                    $magick_args = $applicable_sizes | ForEach-Object { 
                        @(
                            '('
                            'mpr:x'
                            '-resize'
                            "$($_)x$($_)>"
                            '-colorspace'
                            'sRGB'
                            '-quality'
                            '80'
                            '-write'
                            (Join-Path $using:target_dir "$hash-$_.jpg")
                            ')'
                        )
                    }

                    magick $path -colorspace RGB -write mpr:x +delete @magick_args null:
                    New-Item -ItemType SymbolicLink -Path $origPath -Value $absPath -ErrorAction SilentlyContinue > $null
                }
            }
            else {
                Write-Host "Linking $path"
                New-Item -ItemType SymbolicLink -Path $origPath -Value $absPath -ErrorAction SilentlyContinue > $null
            }
        }

        # get sizes of SVGs
        $files | ForEach-Object {
            if ((Split-Path -Extension $_.path) -eq ".svg") {
                $size = yq '{"width": .svg.+@width | sub("px", "") | from_yaml, "height": .svg.+@height | sub("px", "") | from_yaml }' -px -oj $_.path | ConvertFrom-Json
                $target = $file_lookup[[uri]::EscapeUriString($_.path)]
                $target.width = $size.width
                $target.height = $size.height
            }
        }
        
        foreach ($x in $file_lookup.GetEnumerator()) {
            $val = $x.Value
            $val.url = "/img/$($val.hash)$(Split-Path $x.Key -Extension)"
        }
        
        Set-Content -Path $image_manifest -Value ($file_lookup | ConvertTo-Json -Depth 100)
    }
    finally {
        Pop-Location
    }
}
function Build-Builder {
    Push-Location (Join-Path $root "build")
    try {
        cargo build --release 
    }
    finally {
        Pop-Location
    }
}

$builder = Join-Path $root "build/target/release/wtp-build"

[array]$draft_arg = if ($drafts) { "--draft" } else { @() }

function Build-HTML {
    $env:RUST_LOG = 'info'
    & $builder --input $src --output $public --image-manifest $image_manifest @draft_arg
    Remove-Item env:RUST_LOG
}

Copy-StaticContent
Resize-Images

if (-not $skip_build) {
    Build-Builder
}

if ($watch) {
    $bg = Start-Job { miniserve $using:public --index index.html }
    try {
        $env:RUST_LOG = 'info'
        & $builder --input $src --output $public --image-manifest $image_manifest @draft_arg --watch
        Remove-Item env:RUST_LOG
    }
    finally {
        $bg.StopJob()
    }
}
else {
    Build-HTML
}
