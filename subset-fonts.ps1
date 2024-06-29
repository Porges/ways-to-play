#!/bin/env pwsh

Set-StrictMode -Version 3.0
$ErrorActionPreference = "Stop"

pushd input-fonts/Charis_SIL

$fontFamily = "Charis SIL";

$subsets = @{
    "Latin" = @(
        "U+0020-007F", # Basic Latin
        "U+00A0-00FF", # Latin-1 Supplement
        "U+2000-206F") # General Punctuation
    "Greek" = @(
        "U+0370-03FF") # Greek and Coptic
}

echo $subsets

$css = "../../fonts/charis.css"
echo "" > $css # blank it

foreach ($subset in $subsets.GetEnumerator()) {
    $name = $subset.Key 
    $whitelist = $subset.Value -join ','
    
    foreach ($file in Get-ChildItem -Filter '*.ttf' -File) {
        $targetFile = Join-Path "../../fonts/charis" ($file.Name -replace "-", "-$name-" -replace ".ttf", ".woff2")
        pyftsubset $file --unicodes=$whitelist --flavor=woff2 --harfbuzz-repacker --output-file=$targetFile
        
        echo "/* $name */" >> $css
        echo "@font-face {" >> $css
        echo "    font-family: '$fontFamily';" >> $css
        echo "    src: local('$fontFamily'), url('/fonts/charis/$(Split-Path -Leaf $targetFile)') format('woff2');" >> $css
        if ($file.Name -contains "Italic") {
            echo "    font-style: italic;" >> $css
        }
        if ($file.Name -contains "Bold") {
            echo "    font-weight: bold;" >> $css
        }
        echo "    unicode-range: $whitelist;" >> $css
        echo "}" >> $css
    }
}

popd
