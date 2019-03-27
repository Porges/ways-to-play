$rootPath = 'C:\Users\porges\game_book\docs\games'

pushd $rootPath

$dict = [System.Collections.Generic.SortedDictionary[string, string]]::new()

ls -r *.html | % {

    [xml]$doc = cat $_ -Encoding UTF8

    $relPath =  (Resolve-Path $_ -Relative).Substring(1).Replace('\', '/')

    $doc.SelectNodes('//*[starts-with(@id, "index-")]') | % {
        $node = $_
        #echo $node.InnerText
        $dict[$node.InnerText] = "<li><a href='/games$relPath#$($node.id)'>$($node.InnerText)</a></li>"
    }
}

$result = "<ul class='linear'>"

$startsWith = $null
$dict.Keys | % {
    $first = $_[0]
    if ($startsWith -ne $first) {
        $startsWith = $first
        $result += "<li><a href='#part-$first'>$first</a></li>"
    }
}
$startsWith = $null
$dict.GetEnumerator() | % {
    $first = $_.Key[0]
    if ($startsWith -ne $first) {
        $startsWith = $first
        $result += "</ul><h3 id='part-$first'>$first</h3><ul>"
    }
    $result += $_.Value
}

$result += "</ul>"

popd
pushd 'C:\users\porges\game_book\docs'

[xml]$index = cat 'archive.html' -Encoding UTF8
$node = $index.SelectSingleNode('//*[@id="replace-index"]')
$node.InnerXml = $result
$index.Save((Resolve-Path 'archive.html'))

popd
