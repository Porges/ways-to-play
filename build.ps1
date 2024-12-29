#!/bin/env pwsh

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
        $files = git ls-tree HEAD . -r '--format=%(path):%(objectname)' | Select-String '\.jpe?g:'
        Write-Host "Found $($files.Count) images to convert"
        $env:MAGICK_THREAD_LIMIT = 1
        
        $files | ForEach-Object -ThrottleLimit ([System.Environment]::ProcessorCount) -Parallel {
            $path, $hash = $_ -split ':'
            $origPath = Join-Path $using:target_dir "$hash.jpg"
            if (Test-Path $origPath) {
                Write-Host "Skipping $path"
            }
            else {
                Write-Host "Converting $path"
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
                Copy-Item $path $origPath -Force
            }
        }
        
        $file_lookup = @{}
        $files | ForEach-Object {
            $path, $hash = $_ -split ':'
            $file_lookup[$path] = $hash
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
