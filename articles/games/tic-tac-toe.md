---
title: Tic-Tac-Toe
tags: players/2, perfect-information
players: 2
published: 2018-04-15
---

[Tic-Tac-Toe]{.game-title id="index-tic-tac-toe"} is a simple game for two
players that is well-known as being a draw if played ‘rationally’. Unlike most
board games, pieces cannot be moved or removed once placed, making it an ideal
game to play with pen & paper.

## History

<figure itemprop="image" itemscope="itemscope" itemtype="http://schema.org/ImageObject"
class="side-image-r"><img itemprop="contentUrl"
src="/images/170341558_785e3e7d31_o.jpg" alt="Several completed games of
tic-tac-toe chalked onto the ground." /><figcaption>Chalked tic-tac-toe
boards<br/>
(©[2006]{itemprop="copyrightYear"}&nbsp;[[[taquai]{itemprop="name"}]{itemprop="copyrightHolder"
itemtype="http://schema.org/Person"
itemscope="itemscope"}](https://www.flickr.com/photos/taquai/170341558/){itemprop="sameAs
url"}, [![Creative
Commons](/images/cc.svg)![Attribution](/images/by.svg)](https://creativecommons.org/licenses/by/2.0/){itemprop="license"},
cropped) </figcaption></figure>


The origins of tic-tac-toe are unclear. Many sources claim that it dates from
antiquity, but to me it seems like a more recent invention—a degenerate version
of [Three Men’s Morris](/games/three-mens-morris.html){.game-title}. Mentions of
it only appear in the 19th century, and the game is strongly suited to be played
with chalk on slates—such as were used by children in schools during this
period.

The earliest known references to the game occur in Charles Babbage’s unpublished
manuscript ‘Essays on the Philosophy of Analysis’ (composed 1812–1820, held in
the British Library as Add. MS&nbsp;37202), although the game is never mentioned
by name [@SourcesInRecreationalMathematics]. Later in 1842, ‘tit-tat-to’ occurs
in his notebooks, where he conceptualizes an automaton that would play
tic-tac-toe against a human [@ICommencedAnExamination;
@SourcesInRecreationalMathematics].

TODO: Mentioned in Notes & Queries.

<figure itemprop="image" itemscope="itemscope" itemtype="http://schema.org/ImageObject"
class="wide"><div class="multi"><img itemprop="contentUrl"
src="/images/large_BAB_S20_0002-1600.jpg" alt="Sketches of various games of
tic-tac-toe in a notebook." /><img itemprop="contentUrl"
src="/images/large_BAB_S20_0003-1600.jpg" alt="Sketches of various games of
tic-tac-toe in a notebook." /></div><figcaption><span itemprop="caption">Some of
Babbage’s notes on “Tit-Tat-To”, dated 15th September 1860</span>
(©&nbsp;[[[Science Museum Group]{itemprop="name"}]{itemprop="copyrightHolder"
itemtype="http://schema.org/Organization"
itemscope="itemscope"}](https://collection.sciencemuseum.org.uk/documents/aa110069631){itemprop="sameAs
url"}, [![Creative Commons](/images/cc.svg)![Attribution](/images/by.svg)![No
commercial](/images/nc.svg)![Share
alike](/images/sa.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/){itemprop="license"})
</figcaption></figure>

## Terminology

In English, tic-tac-toe has gone by many names. It has been variously called
‘tit-tat-to(e)’, ‘tick-tack-toe’, ‘(n)oughts & crosses’, ‘tip-tap-toe’
[@Teesdale, p. 136; @NotesAndQueriesS8V12, p. 333], ‘Exeter’s Nose’ (a pun on
‘<i>X</i>s and <i>O</i>s’) [@SourcesInRecreationalMathematics], or
‘kit-cat-cannio’ [@SuffolkWords, p. 200].

These names mostly derive from an old counting-out rhyme (think ‘eeny meeny miny
mo’):

> Tit, tat, toe,  
> My first go,  
> Three jolly butcher boys  
> All in a row;  
> Stick one up,  
> Stick one down,  
> Stick one in the old man’s crown! ^[Some sources (e.g. @NurseryWitch [p. 374])
> give this last line as “… in the old man’s (burial-)ground!” I have no idea
> what this means.]

<figure itemprop="image" itemscope="itemscope" itemtype="http://schema.org/ImageObject"
class="side-image-r"><img itemprop="contentUrl url"
src="/images/tick-tack-toe.png" alt="A drawing of children playing
‘tick-tack-toe’ on a circular board drawn on the sidewalk." /><figcaption><span
itemprop="caption">Children playing a <em>different</em> game of
‘tick-tack-toe’</span> (by F. J. Shields, as reproduced in @MagazineOfArt [p.
136], [![Public
Domain](/images/publicdomain.svg)](https://creativecommons.org/publicdomain/mark/1.0/){itemprop="license"}).</figcaption></figure>

The same rhyme and name were also used for an unrelated game, using a circular
board, in which a player would attempt to locate high-scoring sections of
a circle while blindfolded [@GamesBookForBoysAndGirls, p. 55].

There seems to be a distinction we can draw between languages that have folkish
names and those that have more functional names derived from the outward
appearance or goal of the game.

In the former group we have: Dutch ‘[tik tak tol]{lang="nl"}’ [@Fiske, p. 122],
or ‘[boter-kaas-en-eieren]{lang="nl"}’ (‘butter cheese and eggs’); and in
Swedish  ‘[tripp, trapp, trull]{lang="sv"}’ [@Fiske, p. 137].

Like the English names, one Dutch name ([boter, melk, kaas]{lang="nl"}) is
derived from the rhyme:

<div class="multi"><p lang="nl">Boter, melk, kaas,<br/>ik ben de
baas.</p><p>Butter, milk, cheese,<br/>I am the boss.</p></div>

Sweden had a similar rhyme [@GamesOfTheGods, p. 163]:

<div class="multi"><p lang="sv">Tripp, trapp, trull,<br/>min kvarn är
full.</p><p>Tripp, trapp, trull,<br/>my mill is full.</p></div>


In the ‘functional’ group of names are those like the Arabic [لعبة
إكس-أو]{lang="ar"} ‘the <i>X</i>–<i>O</i> game’; or the Chinese
[圈圈叉叉]{lang="zh"} ‘circles & crosses’, or [井字棋]{lang="zh"} ‘`井`
character game’.

The languages with ‘folkish’ names also tend to have ‘functional’ names as well;
an alternate Swedish name is ‘[tre-i-rad]{lang="sv"}’ (‘three in a row’), and
Dutch also has ‘[kruisje rondje]{lang="nl"}’ (‘cross circle’).

On the other hand, @Wordsworth [lines 538–544] didn’t think it was worthy of
a name at all. In <cite>The Prelude</cite>, he describes playing the game as
a child:

> Eager and never weary we pursued  
> Our home-amusements by the warm peat-fire  
> At evening, when with pencil and smooth slate,  
> In square divisions parcelled out, and all  
> With crosses and with cyphers^[i.e. zeroes] scribbled o’er  
> We schemed and puzzled, head opposed to head  
> In strife too humble to be named in verse

<figure itemprop="image" itemscope="itemscope" itemtype="http://schema.org/ImageObject"
class="wide"><img itemprop="contentUrl"
src="/images/5072574617_9afa5ee9ae_o-1600.jpg" alt="A wall with a completed
tic-tac-toe game drawn on it in chalk." /> <figcaption>A tic-tac-toe game on
a wall in Marseille, France (©&nbsp;[[[[Nicolas]{itemprop="givenName"}
[Nova]{itemprop="familyName"}]{itemprop="name"}]{itemprop="copyrightHolder"
itemtype="http://schema.org/Person"
itemscope="itemscope"}](https://www.flickr.com/photos/nnova/5072574617/){itemprop="sameAs
url"}, [![Creative Commons](/images/cc.svg)![Attribution](/images/by.svg)![No
commercial](/images/nc.svg)](https://creativecommons.org/licenses/by-nc/2.0/){itemprop="license"})
</figcaption></figure>

## Play

## Variants

### The 15 Game

This game is also known as “Number Scrabble” [@TheGameOfJAM] or “Pick15” (TODO:
cite).

To play: Write down the numbers from 1–9 on a piece of paper. Each turn,
a player claims a number for themselves by marking it, and a number can only be
claimed by one player. The first player to claim 3 numbers that add to 15 is the
winner.

This game is isomorphic to the game of tic-tac-toe. Astonishingly, this form was
invented by Babbage in his initial analysis of the game
[@MathematicalWorkOfBabbage, p. 127].

To show the equivalence, write down the numbers in the form of the (unique)
3&times;3 magic square:

<table class="numeric
rule-between-cells"><tbody><tr><td>4</td><td>9</td><td>2</td></tr><tr><td>3</td><td>5</td><td>7</td></tr><tr><td>8</td><td>1</td><td>6</td></tr></tbody></table>

From this it can be seen that the game is the same as tic-tac-toe. Each row,
column, and long diagonal sums to 15.

### JAM

This is another isomorphic variant invented by John Michon [@TheGameOfJAM].

### Spit

Yet another isomorphic variant is [@WinningWaysV3, p. 732]:

Write down the nine words ‘Spit’, ‘Not’, ‘So’, ‘Fat’, ‘Fop’, ‘As’, ‘If’, ‘In’,
and ‘Pan’ on separate pieces of paper. The players take turns taking a single
card. A player wins if they collect all the cards with a given letter (e.g.
‘In’, ‘If’, and ‘Spit’ would win since these are all the words containing ‘i’).

This can be shown to be the same game as follows:

<table class="centred rule-first-row rule-first-col
rule-last-col"><tbody><tr><td><strong
class="color-8-1">P</strong></td><td><strong
class="color-8-2">N</strong></td><td><strong
class="color-8-3">S</strong></td><td><strong
class="color-8-4">F</strong></td><td><strong
class="color-8-5">T</strong></td></tr> <tr><td><strong
class="color-8-6">A</strong></td><td><span class="color-8-1">P</span><span
class="color-8-6">A</span><span class="color-8-2">N</span></td><td><span
class="color-8-6">A</span><span class="color-8-3">S</span></td><td><span
class="color-8-4">F</span><span class="color-8-6">A</span><span
class="color-8-5">T</span></td><td/></tr><tr><td><strong
class="color-8-7">I</strong></td><td><span class="color-8-7">I</span><span
class="color-8-2">N</span></td><td><span class="color-8-3">S</span><span
class="color-8-1">P</span><span class="color-8-7">I</span><span
class="color-8-5">T</span></td><td><span class="color-8-7">I</span><span
class="color-8-4">F</span></td><td/></tr><tr><td><strong
class="color-8-8">O</strong></td><td><span class="color-8-2">N</span><span
class="color-8-8">O</span><span class="color-8-5">T</span></td><td><span
class="color-8-3">S</span><span class="color-8-8">O</span></td><td><span
class="color-8-4">F</span><span class="color-8-8">O</span><span
class="color-8-1">P</span></td><td/></tr> </tbody></table>

## TODO


@Gardner1 [p. 37–46]

<!-- Claimed that “yih” 弈 is an old name for the game. No, this is go, or maybe
something older. -->

### Computer implementations

* <https://en.wikipedia.org/wiki/Bertie_the_Brain>
* <https://en.wikipedia.org/wiki/OXO>

<figure itemprop="image" itemscope="itemscope" itemtype="http://schema.org/ImageObject"
class="wide"><img itemprop="contentUrl"
src="/images/8576897675_c7c5785b4a_o-1600.jpg" alt="A wall with completed
tic-tac-toe games drawn on it in blue pen." /><figcaption><span
itemprop="caption">Tic-tac-toe games on a wall in the Medina of Fez ([فاس
البالي]{lang="ar"}), Morocco</span>
<br/>(©&nbsp;[[[henrykkcheung]{itemprop="name"}]{itemprop="copyrightHolder"
itemtype="http://schema.org/Person"
itemscope="itemscope"}](https://www.flickr.com/photos/henrykkcheung/8576897675/in/photostream/){itemprop="sameAs
url"}, [![Creative Commons](/images/cc.svg)![Attribution](/images/by.svg)![No
commercial](/images/nc.svg)![No
derivatives](/images/nd.svg)](https://creativecommons.org/licenses/by-nc-nd/2.0/){itemprop="license"})
</figcaption></figure>

## References

Some general references for the game are @OxfordBG [112–113], @Bell [p. 91], and
@Murray2 [§3.2.1, p. 40].

<hr/>
