---
title: Passage
equipment: Dice
players: 2
---

<p class="lead">
<span class="aka">Passage</a> is an old dice gambling game for two players.[@CompleatGamester p. 167] In French it was called <span lang="fr" class="aka">passe-dix</span> ‘pass-ten’, and in German <span lang="de" class="aka">Paschen</span>.
</p>

The game is mentioned in chapter 32 of [<cite>The Three Musketeers</cite>](https://en.wikipedia.org/wiki/The_Three_Musketeers) (1844), where Porthos plays it with some clerks.  The game also appears in later editions of {% a rabelais,Rabelais’ <cite>Gargantua</cite> %}, at least from 1884.

In England, the game was specifically outlawed by [the <cite>Gaming Act 1739</cite>](http://www.nzlii.org/nz/legis/imp_act_1881/ga173913gic19108/) (previously known as <cite>13 Geo. 2. c. 19</cite>), which was a new addition since the <cite>Gaming Act 1738</cite> (<cite>12 Geo. 2. c. 28</cite>) of the previous year:

> And whereas a good and wholesome law was made in the  twelfth year of the reign of His present Majesty King George the Second, intituled “An Act for the more effectual Preventing of excessive and deceitful Gaming;” but, contrary to the true intent and meaning thereof, some fraudulent and deceitful games have been invented, and a certain game called “passage” is now daily practised and carried on, to the Ruin and impoverishment of many of His Majesty’s subjects : 
>
> The said game of passage, and all and every other game and games invented or to be invented with one or more die or dice, or with any other instrument, engine, or device in the nature of dice, having one or more figures or numbers thereon (back-gammon and the other games now played with the backgammon tables only excepted), are and shall be deemed to be games or lotteries by dice, within the intent and meaning of the said in part recited Act : […]

## Play

{%aside%}Cotton’s description makes it sound like the calculated sum is only for the double, but the game does not function properly if played in that way; the chance of winning would only be ⅙. Comparison with descriptions in other languages makes the actual game clear.{%endaside%}

{% image position="aside" src="314D003a.jpg" alt="A drawing of a man bending over a table and rolling three dice by candlelight. He looks ecstatic." 
    originalUrl="http://www.zeno.org/nid/20003938557" 
    orgName="Zeno.org"
    license="cc0" %}
<span lang="fr">Le Passe Dix</span> ({%c%} 1797) by Daniel Nikolaus Chodowiecki (here signed ‘Huquier’, the publishing address is also false). The player is probably the button-maker Nicolas Fonvielle.[@AntiquariaatArineVanDerSteur44 p. 38]
{%imageEnd%}

On a player’s turn they place a bet and roll three dice until they roll a double. If the sum of the dice is _above_ ten, then they **pass** and win, otherwise they are **out** and lose. 

The odds of rolling a double on three dice are 96⁄216; of those 96 valid rolls, 48 total above ten, thus the game is fair (48⁄96 = 1⁄2). Winning stakes are paid out 1:1 and so the house has no advantage.

The inclusion of the double requirement only serves to heighten the tension of the game, as the results are the same without it (the odds of rolling above ten on three dice are 108⁄216 = 1⁄2).

@GeneralizingGalileo gives a generalization of this game to any number of dice, by calculating the “pass points” for each number. Note that this calculation ignores the doubles-requirement, which may alter the game for numbers of dice other than three.

<table class="table table-sm" style="clear:none">
<thead>
<tr>
<th>Dice</th>
<th>Pass point</th>
</tr>
</thead>
<tbody class="table-group-divider numeric">
<tr><td>1</td><td>2</td></tr>
<tr><td>2</td><td>7</td></tr>
<tr><td>3</td><td>10</td></tr>
<tr><td>4</td><td>14</td></tr>
<tr><td>5</td><td>17</td></tr>
<tr><td>6</td><td>21</td></tr>
<tr><td>7</td><td>24</td></tr>
<tr><td>8</td><td>28</td></tr>
<tr><td><i>n</i> odd</td><td>(7<i>n</i>&minus;1)/2</td></tr>
<tr><td><i>n</i> even</td><td>(7<i>n</i>)/2</td></tr>
</tbody>
</table>
