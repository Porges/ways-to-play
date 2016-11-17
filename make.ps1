
function EnumerateFiles ($dir) {
    pushd $dir

    foreach ($file in (ls | sort)) {
        if ($file -is [System.IO.DirectoryInfo]) {
            EnumerateFiles $file
        } else {
            echo $file.FullName
        }
    }

    popd
}

$files = EnumerateFiles '.\sources\' | ? { [IO.Path]::GetExtension($_) -eq '.md' }

$opts = '--filter pandoc-citeproc -f markdown+ascii_identifiers+bracketed_spans'.Split()

pandoc -o game_book.epub @opts metadata.yaml $files --css book.css --epub-embed-font=c:/windows/fonts/NotoSansEgyptianHieroglyphs-Regular.ttf --epub-embed-font=c:/windows/fonts/hintedSymbola.ttf
pandoc -o game_book.html @opts metadata.yaml $files --css book.css -t html5 --css html.css --self-contained


#$files | % { 
#    $dirPart = Join-Path "docs" (Split-Path (Resolve-Path -Relative $_))
#    mkdir $dirPart -ErrorAction Ignore | Out-Null
#    $filePath = Join-Path $dirPart "$([IO.Path]::GetFileNameWithoutExtension($_)).html"
#    pandoc $opts $_ -o $filePath -t html5 --css book.css --css html.css --self-contained 
#}

