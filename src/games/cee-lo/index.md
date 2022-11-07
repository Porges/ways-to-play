---
title: Cee-Lo
players:
  min: 2
  max: 100
subgames:
- title: Chinchirorin
  titleLang: ja-Latn
  originalTitle: <span lang="ja">チンチロリン</span>
- title: Underground Chinchirorin
equipment: Dice
---

Cee-Lo is a gambling game played with three dice. The English name is apparently
derived from the Chinese phrase <span lang="zh">四五六</span> (‘four five six’;
Mandarin: {%pronounce lang="zh-Latn-pinyin" word="sì wǔ liù" pronouncer="MarvinMeow"
file="pronunciation_zh_四五六.mp3" %}, Cantonese: {% pronounce lang="yue-Latn-jyutping"
word="si3 ng5 luk6" pronouncer="CantoneseSpokenHK" file="pronunciation_yue_四五六.mp3" %},
Hokkien: <span lang="nan-Latn">sì gō͘ la̍k</span>), which is the highest roll in the
game. Some books refer to it as “Strung Flowers”, another Chinese name for the highest roll.[@Bell p. 145]

In @GamblingGamesOfMalaya [p. 96] the name is given as <span lang="zh">六骰
 </span> (literally ‘six dice’), but with the odd pronunciation “Luk Kow” (the
 correct Hokkien pronunciation is <span lang="nan-Latn">la̍k tâu</span>). It is
possible that the name should be <span lang="zh">六九</span> (Hokkien:
{%pronounce lang="nan-Latn" word="la̍k káu" pronouncer="690518207"
file="pronunciation_nan_69.mp3" %}, ‘six nine’); indeed, the game is referred to
under the name “Luk Kow 69” in Brunei gambling law.[@LawsOfBrunei p. 21] I don’t
know to what part of the game “69” could refer, but one idea could be the roll
{% cdice 6 %}–{% cdice 54 %} read as six–nine.

In Japan the game is called <span lang="ja">チンチロ(リン)</span> {%pronounce
lang="ja-Latn" word="chin&shy;chi&shy;ro&shy;(rin)" pronouncer="skent"
file="pronunciation_ja_チンチロリン.mp3" %}, an onomatopœia based on the noise
of dice being dropped into a bowl.{%fn%}It is also the noise made by the pine
cricket (<span lang="ja">松虫</span> <span
lang="ja-Latn">matsu&shy;mushi</span>).{%endfn%} It is also played with
differing payoffs for each dice outcome (see {%gameref chinchirorin %} below).

As of 2022, the game remains explicitly illegal — under the name “Luk Kow” — in
Malaysia[@MalaysiaCommonGamingHousesAct p. 29] and Brunei,[@LawsOfBrunei p. 21]
and as “See Goh Lak” in Singapore.[@SingaporeGamesOfChanceAndSkill] 

## Play

Three dice are required to play. Each time a roll is made, all three dice are
rolled. In Chinese and Japanese play, it is usual for the dice to be tossed into
a bowl. In the USA they are normally cast against a wall or other vertical
surface.

A **point** is a result of a pair along with any other non-matching number, the
non-pair number being the value of the point. For example, the roll {%cdice
225%} would establish a point of {%cdice 5%}.

### The Banking Game

The traditional method of play is as follows.

One player at a time acts as the banker (<span lang="zh">莊</span>, Cantonese:
{% pronounce lang="yue-Latn-jyutping" word="zong1" pronouncer="robertlam88"
file="pronunciation_yue_莊.mp3" %}, Hokkien: {% pronounce lang="nan-Latn"
word="chong" file="pronunciation_nan_莊.mp3" pronouncer="FlyingBlank" %},
Mandarin: {% pronounce  lang="cmn-Latn" word="zhuāng" pronouncer="Eflong"
file="pronunciation_zh_莊.mp3" %}). 

The banker first puts up their stake. Each player in turn then has a chance to
_cover_ or _fade_ the banker’s bet, by placing a stake equivalent to some
portion of the banker’s bet. The stake that each player places is how much they
stand to win or lose on this round. Once the banker’s bet is matched, or each
player has had a turn to place a stake, the banker takes back any remaining
uncovered bet, and begins the round. Players who did not place any stake will
not play in this round.

The banker starts the round by rolling the dice: if they roll the special
combination {%cdice 456%}, any triple, or a point of {%cdice 6%}, they win
the round instantly, and collect their bet and all other player’s stakes.

If the banker rolls the special combination {%cdice 123%} or a point of {%cdice
1%}, they lose instantly, and each other player collects their stake and the
equivalent amount from the banker’s bet.

If they roll any point other than {%cdice 1%} or {%cdice 6%}, that establishes
the point value for the round that the other players must roll to beat.

Any other roll that is not one of the rolls mentioned above does not count and
must be rerolled until one of the given rolls is made.

The following table summarizes the results for the banker:

<table class="table">
<thead>
<tr><th>Name</th><th>

Chinese Name[@ChineseGames p. 493]

</th><th>Name in New York</th><th>Roll</th><th>Outcome</th></tr>
</thead>
<tbody class="table-group-divider">
<tr><th scope="row">4–5–6</th><td><span lang="zh">四五六</span> ‘456’<br/>Cantonese: <span lang="yue-Latn-jyutping">si3 ng5 luk6</span><br/><br/><span lang="zh">串花</span> ‘strung flowers’<br/>Cantonese: <span lang="yue-Latn-jyutping">cyun3 faa1</span></td><td>Head Crack</td><td>{%cdice 456%}</td><td class="bg-success text-white">Win</td></tr>
<tr><th scope="row">Triple</th><td><span lang="zh">圍</span> ‘enclosed’<br/>Cantonese: {% pronounce  lang="yue-Latn-jyutping" word="wai4" pronouncer="cuichungman" file="pronunciation_yue_圍.mp3" %}</td><td>Trips</td><td>{%cdice '==='%}</td><td class="bg-success text-white">Win</td></tr>
<tr><th scope="row">6 Point</th><td><span lang="zh"></span></td><td></td><td>{%cdice '==6'%}</td><td class="bg-success text-white">Win</td></tr>
<tr><th scope="row">5 Point</th><td><span lang="zh"></span></td><td></td><td>{%cdice '==5'%}</td><td>Point of 5</td></tr>
<tr><th scope="row">4 Point</th><td><span lang="zh"></span></td><td></td><td>{%cdice '==4'%}</td><td>Point of 4</td></tr>
<tr><th scope="row">3 Point</th><td><span lang="zh"></span></td><td></td><td>{%cdice '==3'%}</td><td>Point of 3</td></tr>
<tr><th scope="row">2 Point</th><td><span lang="zh"></span></td><td></td><td>{%cdice '==2'%}</td><td>Point of 2</td></tr>
<tr><th scope="row">1 Point</th><td><span lang="zh">一弗</span> ‘bad one’<br/>Cantonese: <span lang="yue-Latn-jyutping">jat1 fat1</span></td><td>Ace Out</td><td>{%cdice '==1'%}</td><td class="bg-danger text-white">Loss</td></tr>
<tr><th scope="row">1–2–3</th><td><span lang="zh">舞龍</span> ‘dragon dance’<br/>Cantonese: {% pronounce lang="yue-Latn-jyutping" word="mou5 lung4" pronouncer="CantoneseSpokenHK" file="pronunciation_yue_舞龍.mp3" %}<br/><br/><span lang="zh">蛇仔</span> ‘small snake’<br/>Cantonese: {%pronounce lang="yue-Latn-jyutping" word="se4 zai2" pronouncer="CantoneseSpokenHK" file="pronunciation_yue_蛇仔.mp3" %}</td><td></td><td>{%cdice 123%}</td><td class="bg-danger text-white">Loss</td></tr>
<tr><th scope="row">Nothing</th><td></td><td></td><td></td><td>Re-roll</td></tr>
</tbody>
</table>

If the banker establishes a point of 2–5, each other player in turn rolls the dice
until they roll a result that counts. If it is higher than the banker’s point,
they win and take back their stake and a matching amount from the banker’s bet;
if lower, they lose their stake. If they equal the banker’s point it is a _push_
and the player takes back only their stake.

There are various methods for rotating the banker:

- If any player beats the banker with a triple or {%cdice 456%} then they will
become the banker for the next round.
- If _any_ player beats the banker, then the bankership rotates for the next
  round.[@GamblingGamesOfMalaya p. 96]
- If _all_ players beat the banker, then the bankership rotates.

## In Hip-Hop

<blockquote class="blockquote epigraph">
<p>4, 5, 6 is in the mix, I’m hittin’ them with trips<br/>
Headcrack, time to get the bread, black!</p>
<footer class="blockquote-footer">Kool G Rap, “4,5,6”</footer>
</blockquote>

Cee-Lo has been a part of hip-hop culture since the late 1980s. It is particularly
associated with New York & East Coast hip-hop.{%fn%}West Coast hip-hop often
references craps instead.{%endfn%} A selection of tracks that reference the game follows:

* Rob Base & DJ Ez Rock (1988). “[Joy and
  Pain](https://open.spotify.com/track/1THzmE6HVt5SgUh5tvlGeC)” from <cite>It
  Takes Two</cite>: Profile Records.
* Apache (1991). “[Make
  Money](https://open.spotify.com/track/6N4WkKbitYxSkWKA2ZIiMr)” from
  <cite>Apache Ain’t Shit</cite>: Tommy Boy/Warner Bros. Records.
* A Tribe Called Quest (1991). “[Vibes and
  Stuff](https://open.spotify.com/track/4MdEYuoGhG2RTG3erOiu2H)” from <cite>The
  Low End Theory</cite>: Jive Records.
* Showbiz & A.G. (1992). “[More Than One Way Out of the
  Ghetto](https://open.spotify.com/track/1w0bXHqVaZIxi6iyncM9Pu)” from
  <cite>Runaway Slave</cite>: Payday/London Records.
* Nas (1994). “[N.Y. State of
  Mind](https://open.spotify.com/track/0trHOzAhNpGCsGBEu7dOJo)” from
  <cite>Illmatic</cite>: Columbia Records.
* The Notorious B.I.G. (1994). “[Me and My
  Bitch](https://open.spotify.com/track/0C5IKY0sXz4sg0hpx7HOz0)” from
  <cite>Ready to Die</cite>: Bad Boy Records and Arista Records.
* Kurious (1994). “[Uptown
  Shit](https://open.spotify.com/track/72FbvPuwBVtqmCXWshmGPT)” from <cite>A
  Constipated Monkey</cite>: Hoppoh Recordings/Columbia Records/Sony Music
  Entertainment.
* Naughty by Nature (1995). “[City of
  Ci-Lo](https://open.spotify.com/track/42gxRC71q28ZLVmGv1LcOy)” from
  <cite>Poverty’s Paradise</cite>: Tommy Boy Records.
* Kool G Rap (1995).
  “[4,5,6](https://open.spotify.com/track/6mUUbBjQC5DDqjSllXQ0NC)” from
  <cite>4,5,6</cite>: Cold Chillin’ Records.
* Jay-Z (1997). “[Where I’m
  From](https://open.spotify.com/track/0R0zZnqPg7yOWb4PRmW8nC)” from <cite>In My
  Lifetime, Vol.1</cite>: Roc-A-Fella & Def Jam.
* La the Darkman (1998).
  “[Lucci](https://open.spotify.com/track/2I1OVEbJsdP1W6EDexlGbk)” from
  <cite>Heist of the Century</cite>: Supreme Team.
* Keith Murray (1999).
  “[Danger](https://open.spotify.com/track/1U3WZM25XS6hgAobzl5myg)” from
  <cite>The Most Beautifullest Thing in This World</cite>: Jive Records.
* Lost Boyz (1999).
  “[Cheese](https://open.spotify.com/track/0THz1laE2dtp3CfqhdAlo3)” from
  <cite>LB IV Life</cite>: Uptown Records.
* Rakim (1999). “[Flow
  Forever](https://open.spotify.com/track/6Q3Fb6Co1NgIQ9njENgYSK)” from
  <cite>The Master</cite>: Universal Records.
* Trina (2000). “[Ain’t
  Shit](https://open.spotify.com/track/6QGkV8NWwZQyPosuJR8iCv)” from <cite>Da
  Baddest Bitch</cite>: Atlantic/Slip-N-Slide Records.
* Big L (2000). “[Casualties of a Dice
  Game](https://open.spotify.com/track/52H9sFOSpSaSOgqjrWJ1wq)” from <cite>The
  Big Picture</cite>: Rawkus Records.
* Ghostface Killah (2001). “[The
  Juks](https://open.spotify.com/track/6pcI66Aj1eeGyzG2WZzHJ1)” from
  <cite>Bulletproof Wallets</cite>: Epic Records & SME Records.
* Bobby Digital, U-God, Inspectah Deck, & Suga Bang Bang (2002). “[Killa
  Beez](https://open.spotify.com/track/2VO1ptfs7NJA8by8XXG6Aj)” from <cite>The
  Sting</cite>: Koch Records.
* Ludacris & DMX (2004). “[Put Your
  Money](https://open.spotify.com/track/61lmMMa7bBeAm6xwJSyW0r)” from <cite>The
  Red Light District</cite>: Disturbing tha Peace & Def Jam.
* Jay-Z (2009). “[Empire State of
  Mind](https://open.spotify.com/track/2igwFfvr1OAGX9SKDCPBwO)” from <cite>The
  Blueprint 3</cite>: Roc Nation.
* Blacastan (2010). “[The Dice
  Life](https://open.spotify.com/track/4HsE6jQ3t7Qm3Hj0oertNK)” from <cite>Blac
  Sabbath</cite>: Brick Records.
* Azealia Banks (2012).
  “[Nathan](https://open.spotify.com/track/40TPj0lvziEFA7Zg2a8z5z)” from
  <cite>Fantasea</cite>: self-released.
* Casper TNG (2015). "[Dope
  Boy](https://open.spotify.com/track/1OftWp56UDl51tPHcf0aEp)” (single).
* TallupTwinz (2017).
  “[456](https://open.spotify.com/track/1gMC4TRYwuxBLdPMaueYkd)” (single).
* Young M.A. (2019). “[Da Come
  Up](https://open.spotify.com/track/75MmKQ71V9zFAfK2aA8Wgl)” from
  <cite>Herstory in the Making</cite>: M.A Music/3D.

<!--
* Rome Streetz & Futurewave (2019). “[Headcrack](https://open.spotify.com/track/0lsfoAHlOUFXbdnE68MJtN)” from <cite>Headcrack</cite>: FXCK RXP RXCXRDS.
-->

<iframe class="spotify playlist" src="https://open.spotify.com/embed/playlist/70hrMIVqVhi3OO16vLtMpj?utm_source=generator&theme=0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>

## Variants

### <span lang="ja-Latn">Chinchirorin</span> (<span lang="ja">チンチロリン</span>)

The Japanese version of the game is played with a banker, but the payoff depends
on the roll; players can win or lose up to 3× the amount they staked. The
ranking of some rolls also differs from Cee-Lo (e.g. {%jdice 111%} loses).

Each player has three attempts to “make” their roll by achieving one of the
specified outcomes. If they fail then they **bust** and lose their stake. A
player also busts instantly if any of their dice escape the bowl — this is
called ‘pissing’ (<span lang="ja">小便</span> {% pronounce lang="ja-Latn"
word="shōben" pronouncer="smine" file="pronunciation_ja_小便.mp3" %}, also used
to describe the breaking of a contract).

An triplet is called a ‘storm’ (<span lang="ja">嵐</span> {% pronounce
lang="ja-Latn" word="arashi" file="pronunciation_ja_嵐.mp3"
pronouncer="straycat88" %}).{%fn%}Apparently this term comes from the game
{%gameref oicho-kabu%}.{%endfn%}

<table class="table">
<caption>Table of roll payoffs for <span lang="ja-Latn">Chinchirorin</span>.</caption>
<thead>
<tr><th>Roll</th><th>Name</th><th>Outcome</th></tr>
</thead>
<tbody class="table-group-divider">
<tr><th scope="row">Triple 2–6 {%jdice '==='%}</th><td><span lang="ja">アラシ</span> <span lang="ja-Latn">arashi</span> ‘storm’</td><td class="bg-success text-white">win 3×</td></tr>
<tr><th scope="row">4–5–6 {%jdice 456%}</th><td><span lang="ja">シゴロ</span> <span lang="ja-Latn">shigoro</span> ‘four five six’</td><td class="bg-success text-white">win 2×</td></tr>
<tr><th scope="row">Point 6 {%jdice '==6'%}</th><td><span lang="ja">六の目</span> <span lang="ja-Latn">roppou no me</span> ‘eye of 6’</td><td class="bg-success text-white">win 1×</td></tr>
<tr><th scope="row">Points 2–5</th><td><span lang="ja">目</span> <span lang="ja-Latn">me</span> ‘eye’</td><td>1×</td></tr>
<tr><th scope="row">Point 1 {%jdice '==1'%}</th><td><span lang="ja">一の目</span> <span lang="ja-Latn">pin no me</span> ‘eye of 1’</td><td class="bg-danger text-white">lose 1×</td></tr>
<tr><th scope="row">Bust</th><td><span lang="ja">目なし</span> <span lang="ja-Latn">me no nai</span> ‘no eye’</td><td class="bg-danger text-white">lose 1×</td></tr>
<tr><th scope="row">1–2–3 {%jdice 123%}</th><td><span lang="ja">ヒフミ</span> <span lang="ja-Latn">hifumi</span> ‘one two three’</td><td class="bg-danger text-white">lose 2×</td></tr>
<tr><th scope="row">Triple 1 {%jdice 111%}</th><td><span lang="ja">ピンゾロ</span> <span lang="ja-Latn">pinzoro</span> ‘triple ace’</td><td class="bg-danger text-white">lose 3×</td></tr>
</tbody>
</table>

The game is featured in many titles of the
[<cite>Suikoden</cite>](https://en.wikipedia.org/wiki/Suikoden) series.

#### Underground <span lang="ja-Latn">Chinchirorin</span>

This version of the game is played in [<cite>Kaiji: Against All
Rules</cite>](https://en.wikipedia.org/wiki/Kaiji:_Against_All_Rules) (2011).
The payoffs are again different, with {%jdice 111%} becoming the highest roll.

There are also variations to the main rules:

- The banker has no automatic wins; the players always have a chance to equal or
  beat their roll. Whoever has the higher roll wins the amount according to
  their ‘outcome’ in the table below.
- Each player is banker for two rounds. If on their first round the banker rolls
  a {%jdice 111%}, busts, or rolls a {%jdice 123%} then they pass on the
  bankership after the first round. A player can also pass on the bankership
  instead of taking it.

<table class="table">
<caption>Table of roll payoffs for Underground <span lang="ja-Latn">Chinchirorin</span>.</caption>
<thead>
<tr><th>Roll</th><th>Outcome</th></tr>
</thead>
<tbody class="table-group-divider">
<tr><th scope="row">Triple 1 {%jdice 111%}</th><td class="bg-success text-white">win 5×</td></tr>
<tr><th scope="row">Triple 2–6 {%jdice '==='%}</th><td class="bg-success text-white">win 3×</td></tr>
<tr><th scope="row">4–5–6 {%jdice 456%}</th><td class="bg-success text-white">win 2×</td></tr>
<tr><th scope="row">Points 1–6</th><td>1×</td></tr>
<tr><th scope="row">Bust</th><td class="bg-danger text-white">lose 1×</td></tr>
<tr><th scope="row">1–2–3 {%jdice 123%}</th><td class="bg-danger text-white">lose 2×</td></tr>
</tbody>
</table>
