<cite>Ways to Play</cite> is a site about games, viewable at [games.porg.es](https://games.porg.es).

The colour palette lives in `site_root/css/main.css`. The text column and header
use near-white paper against warmer off-white page margins; on wider screens the
column’s edges fade into the margins, and narrow screens use the near-white
paper throughout. Figures and
their captions use separate white plates. Image groups
share a plate; images retain their original colours without blending or masking.
Small corner tucks sit just outside the border, like an old photograph album.
Licence icons or terms occupy the left of a bottom metadata strip, with credits
on the right, separated from the caption by a fine rule.
The strip uses the reading background and smaller, lighter secondary-colour text.
The surfaces have dark-mode counterparts, and printed pages use white paper.

### Tips

Backing up everything on Internet Archive from the bibliography:

```bash
wget https://raw.githubusercontent.com/Porges/ways-to-play/main/bibliography.yaml -O - | grep -Poh '(?<=https://archive.org/details/)[^/]+' | sort -u > itemlist.txt
```

Then (from [here](https://blog.archive.org/2012/04/26/downloading-in-bulk-using-wget/)):

```bash
wget -r -H -nc -np -nH --cut-dirs=1 -A .pdf -e robots=off -l1 -i ./itemlist.txt -B 'http://archive.org/download/'
```
