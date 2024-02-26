#!/bin/env pwsh

Set-StrictMode -Version 3.0
$ErrorActionPreference = "Stop"

$selectedStyle = "fill=#084594 stroke=#9ecae1 stroke-width=0.6" -split ' '
$secondaryStyle = "fill=#c6dbef stroke=white stroke-width=0.5" -split ' '
$unselectedStyle = "fill=lightgrey stroke=white stroke-width=0.5" -split ' '

$outFolder = "src/maps/"

$mapData = 'ne_10m_admin_1_states_provinces_lakes'
if (-not (Test-Path $mapData)) {
    New-Item $mapData -ItemType Directory
    $uri = 'https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_1_states_provinces_lakes.zip'
    Invoke-WebRequest $uri -OutFile "mapData.zip"
    Expand-Archive "mapData.zip" -DestinationPath $mapData
    Remove-Item "mapData.zip"
}

function GenerateProvinceMap {
    [CmdletBinding()]
    param (
        [ValidateNotNullOrEmpty()]
        [string] $name,
        [ValidateNotNullOrEmpty()]
        [string[]] $provinces,
        [bool] $crop = $true,
        [double] $simplify = 3,
        [bool] $secondary = $true,
        [double] $ratio = .75,
        [double] $offset = 2000,
        [double] $rotate = 0
    )

    $provinces = @($provinces | sort)

    $filter = ($provinces | % { echo "iso_3166_2 == '$_'" })  -join ' || '
    $name = "$($outFolder)$($name).svg"
    $secondaryFilter = ($provinces | % { echo "iso_a2 == '$(($_ -split '-')[0])'" }) -join ' || '

    & mapshaper "$mapData/$mapData.shp" `
        -rotate $rotate `
        -proj robin `
        -filter $secondaryFilter + name=secondary `
        -filter $filter + name=selected `
        -dissolve iso_a2 target=1 `
        -dissolve iso_a2 target=secondary `
        -style @secondaryStyle target=secondary `
        -style @selectedStyle target=selected `
        -style @unselectedStyle target=1 `
        -rectangle source=secondary aspect-ratio=$ratio offset=$($offset)km name=clipper `
        -clip clipper target=1 -drop target=clipper `
        -simplify "$($simplify)%" `
        -clean `
        -o $name 'target=*'
}

function GenerateCountryMap {
    [CmdletBinding()]
    param (
        [ValidateNotNullOrEmpty()]
        [string] $name,
        [ValidateNotNullOrEmpty()]
        [string[]] $countries,
        [bool] $crop = $true,
        [double] $simplify = 3,
        [double] $ratio = .75,
        [double] $offset = 2000,
        [double] $rotate = 0
    )

    $countries = @($countries | sort)

    $filter = ($countries | % { echo "iso_a2 == '$_'" })  -join ' || '
    $name = "$($outFolder)$($name).svg"

    & mapshaper "$mapData/$mapData.shp" `
        -rotate $rotate `
        -proj robin `
        -filter $filter + name=selected `
        -dissolve iso_a2 target=1 `
        -dissolve iso_a2 target=selected `
        -style @selectedStyle target=selected `
        -style @unselectedStyle target=1 `
        -rectangle source=selected aspect-ratio=$ratio offset=$($offset)km name=clipper `
        -clip clipper target=1 -drop target=clipper `
        -simplify "$($simplify)%" `
        -clean `
        -o $name 'target=*'
}


# GenerateProvinceMap @("CN-GD") -simplify 2
# GenerateCountryMap @("MY", "ID", "SG")
# GenerateCountryMap @("SG")
# GenerateCountryMap @("NZ")

# GenerateProvinceMap "Pong" @("MY-03", "TH") -offset 1000
# GenerateCountryMap "Morabaraba" @("ZA", "LS", "BW", "MZ", "SZ", "ZW") -ratio 0.75 -offset 1500
# GenerateCountryMap "CrownAndAnchor" @("IN", "NP", "CN", "AU", "GB", "VN", "TH", "LA", "ID", "MM", "MY", "BN", "JM", "BM", "NZ", "CA", "KH", "MG", "BT", "BD") 
# GenerateProvinceMap "PigeonTickets" @("CN-GD", "NZ-WGN", "NZ-AUK", "NZ-OTA", "AU-VIC", "US-CA", "US-HI", "CA-BC", "US-NY", "US-WA", "US-OR", "US-NV", "CN-MO", "CN-HK", "MY-10", "ZA", "GB-LND") -rotate 180 -offset 1500
# GenerateCountryMap "Ceki" @("ID", "MY", "SG", "BN")
# GenerateCountryMap "Sheded" @("ET", "ER")

# GenerateCountryMap "OichoKabu" @("JP", "AU", "PG", "SB")
# GenerateCountryMap "Fantan" @("CN", "US", "NZ", "AU", "GB", "ZA", "CU", "PE", "TH", "CA", "PH", "MY", "VN", "MO", "KH", "LA") -rotate 210 -offset 1500
# GenerateCountryMap "Euchre" @("AU", "NZ", "CK", "FJ", "TO", "US", "CA", "GB") -rotate 210

# provinces speaking Telugu, Kannada, Tamil
# GenerateProvinceMap "LambsAndTigers" @("IN-AP", "IN-TG", "IN-KA", "IN-TN") -offset 200

# GenerateCountryMap "Horseshoe" @("MY", "MN", "CN", "KR", "TH", "IN", "KH")
