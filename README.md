<cite>Ways to Play</cite> is a site about games, viewable at [games.porg.es](https://games.porg.es).

The colour palette lives in `site_root/css/main.css`. The text column and header
use near-white paper against warmer off-white page margins; on wider screens the
column’s edges fade into the margins, and narrow screens use the near-white
paper throughout. Each image is mounted individually: bordered photographs sit
directly on the page, borderless images sit on a white plate, and both have
small album-style corner tucks. Images keep their original colours without
blending or masking. Wide plates have a double rule above and below instead of
tucks, and extra-wide figures sit in a full-bleed white band instead of plates.
Full-width tables sit in a near-white band with a double rule above and below.
A small right-aligned credit line sits directly under each image, above the
caption: the attribution, then licence icons or terms, which wrap beneath when
they don't fit. Its text is smaller, lighter and in the secondary colour.
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
