#!/bin/env pwsh

Set-StrictMode -Version 3.0
$ErrorActionPreference = "Stop"

pushd input-fonts/Charis_SIL

$fontFamily = "Charis SIL";

$subsets = [ordered]@{
    "Latin" = @(
        "BasicLatin",
        "Latin1Supplement",
        "LatinExtendedA",
        "CombiningDiacriticalMarks",
        "GeneralPunctuation")
    "ChineseTranslit" = @( # Chinese (Pinyin & Jyutping) transliteration
        "LatinExtendedB",
        "SuperscriptsandSubscripts")
    "VietIndic" = @( # Vietnamese and Indic transliteration
        "LatinExtendedAdditional")
    "Historical" = @( # Medieval & Egyptological
        "LatinExtendedD")
    # Greek not included as the Charis Greek doesn't cover enough of the block
}

echo $subsets

$css = "../../fonts/charis.css"
echo "" > $css # blank it

function whitelistFromBlock([string]$block) {
    $range = [System.Text.Unicode.UnicodeRanges]::$block
    if ($range -eq $null) {
        throw "no such block $block"
    }
    
    return "U+$($range.FirstCodePoint.ToString("x4"))-$(($range.FirstCodePoint + $range.Length - 1).ToString("x4"))"
}

foreach ($subset in $subsets.GetEnumerator()) {
    $name = $subset.Key 
    $whitelist = ($subset.Value | %{ whitelistFromBlock($_) }) -join ','
    
    foreach ($file in Get-ChildItem -Filter '*.ttf' -File) {
        $targetFile = Join-Path "../../fonts/charis" ($file.Name -replace "-", "-$name-" -replace ".ttf", ".woff2")
        pyftsubset $file --unicodes=$whitelist --flavor=woff2 --harfbuzz-repacker --output-file=$targetFile '--layout-features=*'
        
        echo "/* $name ($($subset.Value -join ', ')) */" >> $css
        echo "@font-face {" >> $css
        echo "    font-family: '$fontFamily';" >> $css
        echo "    src: local('$fontFamily'), url('/fonts/charis/$(Split-Path -Leaf $targetFile)') format('woff2');" >> $css
        if ($file.Name -like "*Italic*") {
            echo "    font-style: italic;" >> $css
        }
        if ($file.Name -like "*Bold*") {
            echo "    font-weight: bold;" >> $css
        }
        echo "    unicode-range: $whitelist;" >> $css
        echo "}" >> $css
    }
}

popd
