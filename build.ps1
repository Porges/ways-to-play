#!/bin/env pwsh

$root = $PSScriptRoot
$public = Join-Path $root "public"
$src = Join-Path $root "src"

if (Test-Path $public) {
    Write-Error "public dir already exists"
    Exit 1
}

function Copy-StaticContent {
    Copy-Item -Path (Join-Path $root "site_root") -Recurse -Destination $public
    $static_content = @("audio", "fonts", "small-images")
    foreach ($dir in $static_content) {
        Copy-Item -Path (Join-Path $root $dir) -Recurse -Destination $public
    }
}

function Resize-Images {
    $target_dir = Join-Path $public "img"
    New-Item -Path $target_dir -ItemType Directory

    Get-ChildItem -Path $src -Recurse -Include '*.jpg', '*.jpeg' | ForEach-Object -ThrottleLimit 10 -Parallel {
        $file = $_
        $src_modified = $file.LastWriteTime
        $target_dir = $using:target_dir
        $test_file = Join-Path $target_dir $("." + $file.Name)
        if (Test-Path $test_file -NewerThan $src_modified) {
            Write-Host "Skipping $file"
        }
        else {
            Write-Host "Converting $file"
            magick $file -set filename:pre '%t_%#' -set filename:post '.%e' -write mpr:x +delete `
                '(' mpr:x -resize '4000x4000>' -quality 80 -write "$target_dir/%[filename:pre]4000%[filename:post]" ')' `
                '(' mpr:x -resize '1200x1200>' -quality 80 -write "$target_dir/%[filename:pre]1200%[filename:post]" ')' `
                '(' mpr:x -resize '800x800>' -quality 80 -write "$target_dir/%[filename:pre]800%[filename:post]" ')' `
                '(' mpr:x -resize '600x600>' -quality 80 -write "$target_dir/%[filename:pre]600%[filename:post]" ')' `
                '(' mpr:x -resize '300x300>' -quality 80 -write "$target_dir/%[filename:pre]300%[filename:post]" ')' `
                null:

            New-Item -Path $test_file -ItemType File -Force | Out-Null
        }
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
    & $builder --input $src --output $public
}

Copy-StaticContent
# Resize-Images
Build-Builder
Build-HTML
