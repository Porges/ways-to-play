$rootDir = "C:\Users\porges\game_book\articles"
pushd $rootDir

$map = [System.Collections.Generic.Dictionary[string, System.Collections.Generic.SortedSet[string]]]::new()

ls -r *.md | % {
    $text = cat $_
    $relPath = (Resolve-Path $_ -Relative).Substring(1).Replace('\', '/').Replace(".md", ".html")
    
    [System.Text.RegularExpressions.Regex]::Matches($text, "(?<!\\)@(?<id>\w+)") | % {
        $matchID = $_.Groups['id'].Value

        $set = $null
        if (-not $map.TryGetValue($matchId, [ref] $set)) {
            $map[$matchId] = $set = [System.Collections.Generic.SortedSet[string]]::new()
        }

        $set.Add($relPath) | out-null
    }
}

$map.GetEnumerator() | Sort-Object { $_.Value.Count } -Descending | % {
    echo "$($_.Key): $($_.Value -join ", ")"
}