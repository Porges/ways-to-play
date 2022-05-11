---
title: Cetro
draft: true
players: 2
---

<style>
.blue { color: #5DACAB; }
.green { color: #76994C; }
.red { color: #C13E34; }
</style>

{% image 
    position="aside"
    src="J.W.Spear.jpg"
    alt=""
    license="cc0"
    %}
A man and woman playing Cetro on the cover of J. W. Spear & Söhne’s catalogue.
{% imageEnd %}

<p class="lead">
Cetro is a <a href="/articles/traversal-games/">traversal game</a> for two players that was 
published at the start of the 20th century in Germany by J. W. Spear & Son.
</p>

<!-- excerpt -->

Cetro is played on a 9×9 grid, with some rows marked out with different colours.
The top- and bottom-most rows (those nearest the two players) are coloured blue,
the second-most green, the third-most red, and the inner three rows are black:

<p class="chessboard trim" role="img">
<span class="blue">?????</span>
<span class="green">????</span>
<span class="red">?????</span>



<span class="red">?????</span>
<span class="green">????</span>
<span class="blue">?????</span>
</p>

Each player has 14 pieces in the three colors: 5 each of blue and red, and 4
green. (In the published game, one player’s pieces are marked with &#x2654; and
the other with &#x265D;, but here I am using &#x2654; for both, due to font
constraints.)

<p class="chessboard" role="img"><span class="blue">9</span><span class="green">9</span><span class="red">9</span>
<span class="blue">)</span><span class="green">)</span><span class="red">)</span></p>

### Play

The initial setup of the board places the pieces on squares of matching colour:

<p class="chessboard trim" role="img">
<span class="blue">9@9@9@9@9@</span>
<span class="green">9@9@9@9@</span>
<span class="red">9@9@9@9@9@</span>



<span class="red">)@)@)@)@)@</span>
<span class="green">)@)@)@)@</span>
<span class="blue">)@)@)@)@)@</span>
</p>

The goal of the game is for a player to move their pieces across the board and
have them end up in the matching-coloured spaces on their opponent’s side of the
board. Thus, the blue pieces must traverse the entire board to end up in the
opponent’s back row, but the red pieces only need to move four rows forward.

On a player’s turn they may move one piece. A piece may make one of two moves:

1. it may jump over a **single** piece (of either side) in a forward diagonal
   direction (this does not capture the jumped piece), or
2. retreat a single square back in either diagonal direction.

This means that the white squares are unused, as in {% gameref draughts %}. Note
that a piece may **not** move one square forward in a diagonal direction like in
draughts.

A player can also **demand** that their opponent make a jump instead of a
withdrawal, if any is possible, but may not specify which of several available
jumps must be made.

A player who has no possible moves skips their turn. If both players have no
possible moves, whoever made the last move wins the game.

## See also

{% gameref halma %} is a similar game.
