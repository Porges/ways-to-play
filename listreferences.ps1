$rootDir = "C:\Users\porges\game_book\articles"
pushd $rootDir

$map = [System.Collections.Generic.Dictionary[string, System.Collections.Generic.SortedSet[string]]]::new()

ls -r *.md | % {
    $text = cat $_
    $relPath = (Resolve-Path $_ -Relative).Substring(1).Replace('\', '/').Replace(".md", ".html")
    
    [System.Text.RegularExpressions.Regex]::Matches($text, "(?<!\\)@(?<id>\w+)") | % {
        $matchID = "ref-" + $_.Groups['id'].Value

        $set = $null
        if (-not $map.TryGetValue($matchId, [ref] $set)) {
            $map[$matchId] = $set = [System.Collections.Generic.SortedSet[string]]::new()
        }

        $set.Add($relPath) | out-null
    }
}

#$map.GetEnumerator() | Sort-Object { $_.Value.Count } -Descending | % {
#    echo "$($_.Key): $($_.Value -join ", ")"
#}

popd
pushd "C:\Users\porges\game_book\docs"

[xml]$bib = cat 'bibliography.html' -Encoding UTF8
$refs = $bib.SelectSingleNode('//*[@id="refs"]')

$nodes = @($refs.ChildNodes | sort -Descending { $map[$_.GetAttribute('id')].Count })

foreach ($node in $nodes) {
    $append = "<ul class='linear'>"

    $i = 0
    foreach ($reference in $map[$node.GetAttribute('id')]) {
        ++$i
        $append += "<li><a href='$reference'>$i</a></li>"
    }

    $append += "</ul>"

    $node.InnerXml += $append
}

foreach ($node in $nodes) { $refs.RemoveChild($node) | Out-Null }
foreach ($node in $nodes) { $refs.AppendChild($node) | Out-Null }

$bib.Save((Resolve-Path 'bibliography.html'))

popd