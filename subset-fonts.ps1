#!/bin/env pwsh

Set-StrictMode -Version 3.0
$ErrorActionPreference = "Stop"

pushd input-fonts/Charis_SIL

$fontFamily = "Charis SIL";

$subsets = [ordered]@{
    "Latin" = @{
        "Features" = "c2sc,smcp,subs,sups"
        "Blocks" = @("BasicLatin", "GeneralPunctuation", "Latin1Supplement")
    }
    # Don't need smcp/c2sc for these
    "LatinExt" = @{
        "Blocks" = @("LatinExtendedA", "CombiningDiacriticalMarks")
    }
    # Chinese (Pinyin & Jyutping) transliteration
    "ChineseTranslit" = @{
        "Blocks" = @( "LatinExtendedB", "SuperscriptsandSubscripts")
    }
    # Vietnamese and Indic transliteration
    "VietIndic" = @{
        "Blocks" = @("LatinExtendedAdditional")
    }
    # Mediaeval & Egyptological
    "Historical" = @{
        "Blocks" = @("LatinExtendedD")
    }
    # Greek not included as the Charis Greek doesn't cover enough of the block
}

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
    echo "$name - $($subset.Value.Blocks)"
    $whitelist = ($subset.Value.Blocks | %{ whitelistFromBlock($_) }) -join ','
    
    $features = @()
    if ($subset.Value.ContainsKey('Features')) {
        $features = @("--layout-features+=$($subset.Value.Features)")
        echo $features
    }
    
    foreach ($file in Get-ChildItem -Filter '*.woff2' -File) {
        $targetFile = Join-Path "../../fonts/charis" ($file.Name -replace "-", "-$name-" -replace ".ttf", ".woff2")
        pyftsubset $file --unicodes=$whitelist --flavor=woff2 --harfbuzz-repacker --output-file=$targetFile `
            @features `
            --drop-tables+=Silt # --drop-tables+=name --drop-tables+=post
       
        echo "/* $name ($($subset.Value.Blocks -join ', ')) */" >> $css
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
