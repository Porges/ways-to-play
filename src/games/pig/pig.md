---
title: Pig
equipment: Dice game
players:
    min: 2
subgames:
- title: Big Pig
- title: Pig Dice
- title: Piglet
  equipment: Coin
- title: Skunk
- title: Fast Pig or Hog
aliases: [Pig]
linter-yaml-title-alias: Pig
date created: 2024-12-18
date modified: 2025-02-16
---
# Pig
<span class="aka">Pig</span> is a simple push-your-luck dice game for any number of players. There are many variations of this game.

> [!todo]
>
> also a card game: https://archive.org/details/hoylesrulesofgam00more/page/170/mode/2up?q=pig+dice+game

## Pig

The earliest reference to this game I have found is from John Scarne, who wrote about the game in 1945.[@ScarneOnDice 357] It is also sometimes called <span class="aka">Greedy Pig</span>[@NZMathsPig] or <span class="aka">Pig-Out</span>.

The simplest form of the game is as follows: on each player’s turn, they roll one dice and count the number of points shown as their score (e.g. a roll of <Dice>6</Dice> counts as 6 points). They may keep rolling and adding points to their total for that turn as long as they want, but if the die ever shows a <Dice>1</Dice>, they lose all accumulated points for that turn and pass the die to the next player. Otherwise, if they stop their turn before rolling a <Dice>1</Dice>, then they add their points for that turn to their total points.

The first player to exceed 100 total points is the winner. To make the game fair, a full final round should be completed (e.g. if the second player gets 100 points, then the third, fourth, … player should still take their turn afterward), so that every player has the same number of turns overall. If multiple players achieve 100 points, then the highest score wins.

## <span class="aka">Big Pig</span>

This version is also called <span class="aka">Two-Dice Pig</span>. Many books give this as the only version of the game: it is played the same as the basic game but with two dice. If _either_ die shows a <Dice>1</Dice>, that ends a player’s turn.

When playing with two dice it is a common rule that **doubles** are special and their total value is doubled, so that <Dice>22</Dice> counts as 8, <Dice>33</Dice> 12, <Dice>44</Dice> 16, <Dice>55</Dice> 20, and <Dice>66</Dice> 24 points. In this case, it is also played that <Dice>11</Dice> does not end a player’s turn and instead counts for 25 points.[@DiceGamesFrey p. 20]

### Variations

- Reiner Knizia gives the optional rule that a <Dice>11</Dice> _resets_ a player’s score for the turn to 25 points, regardless of how many points they had already accumulated.[@KniziaDice p. 131]

- Alternately, it may be played that <Dice>11</Dice> resets a player’s _total_ score to zero in addition to ending their turn.[@PigtailAddendum 446]

- Another variant is that <Dice>1</Dice> do not end a player’s turn, but that any roll totalling 7 does.[@KniziaDice 131] (See also Pig Dice, which follows.)

- In the version “<span class="aka">Piggy</span>”, it is doubles that end a turn instead of <Dice>1</Dice>.[@MathTrek 64]

## <span class="aka">Fast Pig</span> or <span class="aka">Hog</span>

In this variant, players must choose the number of times they will roll the dice before they take their turn. (Equivalently, they choose the number of dice that they will roll simultaneously.)[@InteractiveMathematicsProgram p. 186][@MeasuringUp p. 141]

## <span class="aka">Skunk</span>

Skunk[@ChoiceAndChance] is a variation where all players share the same roll, and there are exactly five rounds played. To begin, each player prepares a score sheet by writing the letters `SKUNK` across the top. They will record their score for the first round beneath the `S`, the second beneath the `N`, and so on.

All players start each round by standing, while one of them rolls two dice. If the roll has a  <Dice>1</Dice>, any standing players have _skunked_ and score 0 for the round (cross off their score). Otherwise, the points are added to each standing player’s total for that round (write them in a column beneath the letter for the round). The players may sit down after any die roll, and the rolls continue for the round until all players have sat down or skunked.

The player with the highest total after all five rounds have been played is the winner.

## <span class="aka">Pig Dice</span>

This is a commercial variant [released by Parker Brothers in 1942](https://boardgamegeek.com/boardgame/11022/pig-dice), using special dice where one die has the <Dice>1</Dice> replaced by a pig face, and the other has the <Dice>6</Dice> replaced by a pig tail. The head and tail modify the game in the following way:

- a head and a tail doubles the current score for the turn
- a head and anything else scores double the value of the other die
- a tail and anything else subtracts the value of the other die

A total of 7 zeroes the player’s score for the turn, and there are no special rules for doubles. After a player reaches 100, all other players get to have one more roll of the dice.

## <span class="aka">Piglet</span>

This version of the game is played with a coin instead of a die.[@OptimalPig 28] Each turn, a player flips a coin until they decide to stop, in which case they score the number of ‘heads’ that they have flipped, or until they flip a ‘tail’, in which case they score zero. The winner is the first to reach a chosen target number.

## Strategy

🚧 I have yet to complete this section; in the mean-time, the [Wikipedia article](https://en.wikipedia.org/wiki/Pig_(dice_game)) is a useful reference. 🚧

> [!todo]
>
> - 2000 https://ieeexplore.ieee.org/abstract/document/8158672/
> - 2004 @OptimalPig
> - 2006 http://cs.gettysburg.edu/~tneller/papers/ccscne06.pdf
> - 2008 https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9639.2007.00307.x
>   - 2008 https://eric.ed.gov/?id=EJ781827
> - 2010 @PracticalPig
> - 2016 https://www.cambridge.org/core/journals/journal-of-applied-probability/article/abs/finite-exact-algorithm-to-solve-a-dice-game/3A6CD41EA9254E8DAB9BF9292A687123
> - 2017 https://www.cs.huji.ac.il/w~ai/projects/2017/minmax/PIG/files/report.pdf
> - 2022 https://www.mdpi.com/2571-905X/5/3/47
> - 2023 https://www.nature.com/articles/s41598-023-35237-x
