---
title: Pei
titleLang: ms
draft: true
players: 3
equipment: Playing cards (Ceki)
---

<p class="lead">
Pei is a fishing game for three players from Java, which uses {% a ceki %}. The goal of the game is to capture specific scoring combinations.
</p>

## Play

### Scoring Combinations

There are five possible scoring combinations.

#### Black Thirteen (<span lang="jav-Latn">bunci ireng</span>)

{% image
    noborder=true
    size="small"
    position="right"
    justify="centered"
    src="../../articles/cards/ceki/CC1.jpg;../../articles/cards/ceki/CC2.jpg;../../articles/cards/ceki/CC3.jpg"
    alt=";;" %}
The first three cards of the coin suit must be obtained in order to score <span lang="jav-Latn">bunci ireng</span>.  {%imageEnd%}

This combination consists of the first three cards of the coin suit, in order.  The combination may be extended by capturing more of the coin cards in _unbroken_ sequence. This gives 13 points per card in the sequence, so three cards scores 39, four cards scores 42, etc.

#### Red Thirteen (<span lang="jav-Latn">bunci abang</span>)

{% image
    noborder=true
    justify="centered"
    position="right"
    size="small"
    src="../../articles/cards/ceki/COT.jpg;../../articles/cards/ceki/CRF.jpg;../../articles/cards/ceki/CS9.jpg"
    alt=";;" %}
The red-stamped cards.
{%imageEnd%}

This combination is formed from one of each of the three red-stamped cards. It is worth 13 points per card, so at least 39 points. Any additional cards of the same type add 13 points each.

#### <span lang="jav-Latn">Kéyang</span> Branch (<span lang="jav-Latn">pang kéyang</span>)

{% image
    noborder=true
    justify="centered"
    position="right"
    size="small"
    src="../../articles/cards/ceki/CWF.jpg;../../articles/cards/ceki/CS8.jpg;../../articles/cards/ceki/CM9.jpg"
    alt=";;" %}
The cards for <span lang="jav-Latn">Kéyang</span>.
{%imageEnd%}

This combination is formed from one of each of White Flower, 8 of strings, and 9 of myriads. It scores 12 points per card (base 36 points), and 12 for each additional card.

#### Coin Branch (<span lang="jav-Latn">pang picis</span>) 

{% image
    noborder=true
    justify="centered"
    position="right"
    size="small"
    src="../../articles/cards/ceki/CC8.jpg;../../articles/cards/ceki/CS2.jpg;../../articles/cards/ceki/CM2.jpg"
    alt=";;" %}
The cards for <span lang="jav-Latn">Pang</span>.
{%imageEnd%}

This combination is formed from one of each of the 8 of coins, 2 of strings, and 2 of myriads. It scores 11 points per card (33 points), and 11 for each additional card.

#### Tiger (<span lang="jav-Latn">macan</span>)

{% image
    noborder=true
    justify="centered"
    position="right"
    size="small"
    src="../../articles/cards/ceki/CC9.jpg;../../articles/cards/ceki/CS1.jpg;../../articles/cards/ceki/CM1.jpg"
    alt=";;" %}
The cards for <span lang="jav-Latn">Macan</span>.
{%imageEnd%}

This combination is formed from one of each of the 1 of coins, 9 of strings, and 1 of myriads. It scores 10 points per card (30 points), and 10 for each additional card.

### Scoring

Each player scores the combinations they have achieved. Any cards not part of a combination score their face value (rank).

## The Chinese game

The Chinese version of this game is described under the (French) name of <span lang="fr">la pêche</span> (‘fishing’) by [Tcheng Ki-tong.](https://en.wikipedia.org/wiki/Chen_Jitong)[@PlaisirsEnChine p. 270]{%fn%}See also the English translation of this work, @BitsOfChina [p. 205].{%endfn%} Presumably the Chinese name is <span lang="zh-Hant">釣魚</span> (Hokkien: <span lang="nan-Latn">tiò-hû</span>), which is also shared by a domino game which uses the fishing mechanic.[@ChineseGames p. 511]

The game is for three players, and uses two decks (120 cards). To deal, the deck is divided into 8 packs of 14 cards, with 8 cards left over. Dice are used to select three packs which will be used as a stock (of 42 cards). Another two packs are selected and combined with the 8 extra cards — these cards will form the central pool of 36 cards. Lastly the three remaining packs are allocated to the players. The last player spreads the pool cards out face up, and also is allowed to look at the last card in the stock to compensate for playing last.  Since they are the last player they will receive this card at the very end of the round, so they can know what to expect.

Each player then takes turns as usual, playing a card from the hand and one from the (bottom of) the stock. Captures are made by matching rank only.

The combinations used are identical and score the same, but there are no bonuses for obtaining extra cards above the ones included in the combination. Any extra cards score their face value.

## Derivation of the Combinations

In @JavaanseKaartspelen [p. 58] it is suggested that the name of the game comes from the Chinese game {% gameref fishing-for-hairtails %}, but that is played with (two-colour) chess playing cards, and doesn’t have any sequence collection.

In fact, the game is closely related to the Chinese game of {% gameref kanhu %}, and so I believe the name probably comes from the Chinese word for playing cards, <span lang="zh-Hant">牌</span> (Hokkien: {% pronounce lang="nan-Latn" word="pâi" pronouncer="690518207" file="pronunciation_nan_牌.mp3" %}).

The combinations in particular are copied directly from the {% gameref kanhu %} scoring combinations called ‘eyes’ (<span lang="zh">眼</span>). The odd combinations of cards are explained by the historical ordering of the deck (see its article for more on this), in short, the suit of coins used to rank in reverse. White Flower derives from the half-coin card and Red Flower from the zero-coin card, so they rank above all other coins.

Given this information, we can arrange the deck as follows, and we can easily see how the combinations were arrived at:

<div class="table-responsive">
<table class="table table-sm" style="table-layout:fixed; width: 100%">
<caption>A Ceki deck presented in “historical order” to show how the combinations were derived.</caption>
<thead>
<tr class="text-center">
<th></th>
<th>low</th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th>high</th>
</tr>
</thead>
<tbody class="table-group-divider">
<tr>
<th scope="row" class="sideways centered">Myriads</th>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CM1.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CM2.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CM3.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CM4.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CM5.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CM6.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CM7.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CM8.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CM9.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/COT.jpg" alt="" %}{% imageEnd %}</td>
<td></td>
</tr>
<tr>
<th scope="row" class="sideways centered">Strings</th>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CS1.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CS2.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CS3.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CS4.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CS5.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CS6.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CS7.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CS8.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CS9.jpg" alt="" %}{% imageEnd %}</td>
<td></td>
<td></td>
</tr>
<tr>
<th scope="row" class="sideways centered">Coins</th>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CC9.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CC8.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CC7.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CC6.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CC5.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CC4.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CC3.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CC2.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CC1.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CWF.jpg" alt="" %}{% imageEnd %}</td>
<td>{% image noborder=true cram=true src="../../articles/cards/ceki/CRF.jpg" alt="" %}{% imageEnd %}</td>
</tr>
</tbody>
</table>
</div>

The scoring combinations of <span lang="jav-Latn">Pei</span> are then explained in this way, with their matching {% gameref kanhu %} combinations (I do not have names for all of them):

* <span lang="zh">駕</span> ‘carriage’: <span lang="jav-Latn">bunci abang</span>, the highest (red-stamped) cards in each suit
* <span lang="jav-Latn">pang kéyang</span> is made up of the second highest cards in each suit
* <span lang="zh">窮</span> ‘poverty’: <span lang="jav-Latn">pang picis</span>, the second-lowest cards in each suit
* <span lang="zh">虎</span> ‘tiger’: <span lang="jav-Latn">macan</span>, the lowest cards in each suit
* <span lang="jav-Latn">bunci ireng</span> is made up of the highest cards in the coins suit (1, 2, 3), which is also an ‘eye’

It is also possible that <span lang="jav-Latn">pang</span> ‘branch’ is a derivation of the Chinese <span lang="zh">碰</span> (Hokkien: <span lang="nan-Latn">pōng</span>), which describes a set of three tiles in Mahjong.
