#!/bin/env pwsh

Set-StrictMode -Version 3.0
$ErrorActionPreference = 'Stop'

# Features included by default by pyftsubset are:
# ['BUZZ', 'Buzz', 'HARF', 'Harf', 'abvf', 'abvm',
#  'abvs', 'akhn', 'blwf', 'blwm', 'blws', 'calt',
#  'ccmp', 'cfar', 'chws', 'cjct', 'clig', 'cswh',
#  'curs', 'dist', 'dnom', 'fin2', 'fin3', 'fina',
#  'frac', 'half', 'haln', 'halt', 'init', 'isol',
#  'jalt', 'kern', 'liga', 'ljmo', 'locl', 'ltra',
#  'ltrm', 'mark', 'med2', 'medi', 'mkmk', 'mset',
#  'nukt', 'numr', 'pref', 'pres', 'pstf', 'psts',
#  'rand', 'rclt', 'rkrf', 'rlig', 'rphf', 'rtla',
#  'rtlm', 'rvrn', 'stch', 'tjmo', 'valt', 'vatu',
#  'vchw', 'vert', 'vhal', 'vjmo', 'vkrn', 'vpal',
#  'vrt2']

$fonts = [ordered]@{
    'charis'       = @{
        'Dir'     = 'Charis_SIL'
        'Family'  = 'Charis SIL'
        'Subsets' = [ordered]@{
            # This operates as a fallback for missing characters in SS4.
            # e.g. COMBINING VERTICAL LINE ABOVE
            # both the base character and the combining one are required
            'LatinFallback' = @{
                'Blocks' = @('BasicLatin', 'CombiningDiacriticalMarks')
            }
            # Mediaeval & Egyptological
            'Historical'    = @{
                'Blocks' = @('LatinExtendedD')
            }
        }
    }
    'sourceserif4' = @{
        'Family'  = 'Source Serif 4'
        'Dir'     = 'SourceSerif4'
        'Subsets' = [ordered]@{
            'Latin'           = @{
                'Features' = 'ordn,smcp,c2sc,subs,sups,case,kern,onum,tnum'
                # diacritical marks must be included here or they won't combine
                'Blocks'   = @('BasicLatin', 'GeneralPunctuation', 'Latin1Supplement', 'CombiningDiacriticalMarks')
            }
            # Don't need smcp/c2sc for these
            'LatinExt'        = @{
                'Blocks' = @('LatinExtendedA', 'SpacingModifierLetters', 'IpaExtensions')
            }
            # Chinese (Pinyin & Jyutping) transliteration
            'ChineseTranslit' = @{
                'Blocks' = @( 'LatinExtendedB', 'SuperscriptsandSubscripts')
            }
            # Vietnamese and Indic transliteration
            'VietIndic'       = @{
                'Blocks' = @('LatinExtendedAdditional')
            }
            'Cyrillic'        = @{
                'Blocks' = @('Cyrillic')
            }
            'Greek'           = @{
                'Blocks' = @('GreekandCoptic')
            }
        }
    }
}

foreach ($font in $fonts.GetEnumerator()) {
    $fontName = $font.Key
    $dir = $font.Value.Dir
    $fontFamily = $font.Value.Family
    $subsets = $font.Value.Subsets

    Push-Location "input-fonts/$dir"
    mkdir -p "../../fonts/$fontName"

    $css = "../../fonts/$fontName.css"
    Write-Output '' > $css # blank it

    function whitelistFromBlock([string]$block) {
        $range = [System.Text.Unicode.UnicodeRanges]::$block
        if ($null -eq $range) {
            throw "no such block $block"
        }

        return "U+$($range.FirstCodePoint.ToString('x4'))-$(($range.FirstCodePoint + $range.Length - 1).ToString('x4'))"
    }

    foreach ($subset in $subsets.GetEnumerator()) {
        $name = $subset.Key
        Write-Output "$name - $($subset.Value.Blocks)"
        $whitelist = ($subset.Value.Blocks | ForEach-Object { whitelistFromBlock($_) }) -join ','
        if ($subset.Value.ContainsKey('Additional')) {
            $whitelist += ",$($subset.Value.Additional)"
        }

        $features = @()
        if ($subset.Value.ContainsKey('Features')) {
            $features = @("--layout-features+=$($subset.Value.Features)")
            Write-Output $features
        }

        foreach ($file in Get-ChildItem -Filter '*.woff2' -File) {
            $targetFile = Join-Path "../../fonts/$fontName" ($file.Name -replace '-', "-$name-")
            pyftsubset $file --unicodes=$whitelist --flavor=woff2 --harfbuzz-repacker --output-file=$targetFile `
                @features `
                --drop-tables+=Silt # --drop-tables+=name --drop-tables+=post

            Write-Output "/* $name ($($subset.Value.Blocks -join ', ')) */" >> $css
            Write-Output '@font-face {' >> $css
            Write-Output "    font-family: '$fontFamily';" >> $css
            Write-Output "    src: url('/fonts/$fontName/$(Split-Path -Leaf $targetFile)') format('woff2');" >> $css
            if ($subset.Value.ContainsKey('Display')) {
                Write-Output "    font-display: $($subset.Value.Display);" >> $css
            }
            else {
                Write-Output '    font-display: swap;' >> $css
            }
            if ($file.Name -like '*Italic*') {
                Write-Output '    font-style: italic;' >> $css
            }
            if ($file.Name -like '*Bold*') {
                Write-Output '    font-weight: bold;' >> $css
            }
            Write-Output "    unicode-range: $whitelist;" >> $css
            Write-Output '}' >> $css
        }
    }

    Pop-Location
}
