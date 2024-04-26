<cite>Ways to Play</cite> is a site about games, viewable at [games.porg.es](https://games.porg.es).

### Tips

Backing up everything on Internet Archive from the bibliography:

```bash
wget https://raw.githubusercontent.com/Porges/ways-to-play/main/bibliography.yaml -O - | grep -Poh '(?<=https://archive.org/details/)[^/]+' | sort -u > itemlist.txt
```

Then (from [here](https://blog.archive.org/2012/04/26/downloading-in-bulk-using-wget/)):

```bash
wget -r -H -nc -np -nH --cut-dirs=1 -A .pdf -e robots=off -l1 -i ./itemlist.txt -B 'http://archive.org/download/'
```
