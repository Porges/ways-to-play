$selectedStyle = "fill=#084594 stroke=#9ecae1 stroke-width=0.6" -split ' '
$secondaryStyle = "fill=#c6dbef stroke=white stroke-width=0.5" -split ' '
$unselectedStyle = "fill=lightgrey stroke=white stroke-width=0.5" -split ' '

$outFolder = "src/maps/"

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

    & mapshaper "..\Downloads\ne_10m_admin_1_states_provinces_lakes\ne_10m_admin_1_states_provinces_lakes.shp" `
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

    & mapshaper "..\Downloads\ne_10m_admin_1_states_provinces_lakes\ne_10m_admin_1_states_provinces_lakes.shp" `
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
GenerateCountryMap "Morabaraba" @("ZA", "LS", "BW", "MZ") -ratio 0.75 -offset 1500
GenerateCountryMap "CrownAndAnchor" @("IN", "NP", "CN", "AU", "GB", "VN", "TH", "LA", "ID", "MM", "MY", "BN", "JM", "BM", "NZ", "CA", "KH", "MG", "BT", "BD") 

GenerateProvinceMap "PigeonTickets" @("CN-GD", "NZ-WGN", "NZ-AUK", "NZ-OTA", "AU-VIC", "US-CA", "US-HI", "CA-BC", "US-NY", "US-WA", "US-OR", "US-NV", "CN-MO", "CN-HK", "MY-10") -rotate 180 -offset 1500
