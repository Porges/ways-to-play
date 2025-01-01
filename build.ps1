#!/bin/env pwsh

$ErrorActionPreference = 'Stop'

$env:LC_ALL = "C.UTF-8"
$env:MAGICK_THREAD_LIMIT = 1

[System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = $PSScriptRoot
$public = Join-Path $root "public"
$src = Join-Path $root "src"
$image_manifest = Join-Path $PSScriptRoot "images.json"

function Copy-StaticContent {
    Copy-Item -Path (Join-Path $root "site_root") -Recurse -Destination $public -Force
    $static_content = @("audio", "fonts", "small-images")
    foreach ($dir in $static_content) {
        Copy-Item -Path (Join-Path $root $dir) -Recurse -Destination $public -Force
    }
}

function Resize-Images {
    $target_dir = Join-Path $public "img"
    New-Item -Path $target_dir -ItemType Directory -ErrorAction SilentlyContinue
    
    $sizes = (300, 600, 800, 1200, 4000)
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
        
        $files  | ForEach-Object -ThrottleLimit ([System.Environment]::ProcessorCount) -Parallel {
            $hash = $_.hash
            $path = $_.path
            
            $ext = Split-Path $path -Extension
            $origPath = Join-Path $using:target_dir "$hash$ext"

            if (Test-Path $origPath) {
                Write-Debug "Skipping $path"
            }
            else {
                Write-Host "Converting $path"
                
                if ((Split-Path $path -Extension) -match ".jpe?g") {
                    $magick_args = $using:sizes | ForEach-Object { 
                        @(
                            '('
                            'mpr:x'
                            '-resize'
                            "$($_)x$($_)>"
                            '-quality'
                            '80'
                            '-write'
                            (Join-Path $using:target_dir "$hash-$_.jpg")
                            ')'
                        )
                    }

                    magick $path -write mpr:x +delete @magick_args null:
                }

                Copy-Item $path $origPath -Force
            }
        }
        
        $file_lookup = @{}
        $files | ForEach-Object {
            $file_lookup[[uri]::EscapeUriString($_.path)] = @{
                hash = $_.hash
            }
        }
        
        # get sizes of raster formats, quickly
        $sizes = exiftool -json -ImageHeight -ImageWidth -r -q -ext jpg -ext jpeg -ext png . | ConvertFrom-Json
        foreach ($size in $sizes) {
            # Starts with "./"
            $path = $size.SourceFile.Substring(2)
            $target = $file_lookup[[uri]::EscapeUriString($path)]
            $target.width = $size.ImageWidth
            $target.height = $size.ImageHeight
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

function Build-HTML {
    $builder = Join-Path $root "build/target/release/wtp-build"
    & $builder --input $src --output $public --image-manifest $image_manifest
}

Copy-StaticContent
Resize-Images
Build-Builder
Build-HTML 
