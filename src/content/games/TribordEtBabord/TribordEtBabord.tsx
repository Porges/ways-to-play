import * as React from 'react';

import { ArticleImage, Description, Noun, Section, Cite } from 'ui';
import { GameRef } from '../Game';

const Content: React.FC = () => <>
  <Description>
    <p>The French game of <Noun lang="fr">Triboard et Bâbord</Noun> (‘Starboard and Port’) is a 19th-century dice gambling game for two players.</p>
  </Description>
  <Section title="Equipment">
    <p>The game is played using a board and a single die, and six tokens to mark the spaces on the board. The board contains six symbols, which are also printed on the die. These are similar to those used in the game of <GameRef id="crown-and-anchor"/>.</p>
    <ArticleImage
      mainImage
      src={require('./TribordBoard.png')}
      alt="A board with three symbols on each side: on the top, labelled “port” in French, a club, an anchor, and a spade; on the bottom, labelled “starboard” in French, a diamond, a sun, and a heart."
      source={{license: "cc0"}}
    >
      The board for  <Noun lang="fr">Tribord et Bâbord</Noun>
    </ArticleImage>
    <p>The game was published by the <Noun lang="fr">L. Saussine</Noun> company of Paris in 1880 (printed by <Noun lang="fr">Roche</Noun> and illustrated by a <Noun lang="fr">B. Coudert</Noun>).<Cite r="BibliographieDeLaFrance69" page={227} /></p>
  </Section>
  <Section title="Play">
    <p>The following rules are derived from <Cite inline r="TableauxEtCartons" />.</p>
    <p>Before play begins, the players decide on the amount of money that each stake is worth (or the game can be played for points), and also who is to play as <span lang="fr">Tribord</span> (‘starboard’) and who is to be <span lang="fr">Bâbord</span> (‘port’).</p>
    <p>On a player’s turn, they have three attempts at rolling the die.</p>
    <p>Each time they roll one of their own symbols, they mark it with a token. A symbol can only be marked off once.</p>
    <p>The first time a player marks off one of their symbols, their opponent pays them 1× the stake, the second time (called <span lang="fr">radoub</span>, ‘refitting’ the ship), they are paid 2×, and the third time (called the <span lang="fr">prise</span>, ‘capture’), they win 4× the stake.</p>
    <p>If they roll a symbol that is already marked off, they are paid 1× the stake.</p>
    <p>Each time they roll one of their opponent’s symbols, they pay them 1× the stake (this is called the <span lang="fr">écueil</span>, ‘reef’).</p>
    <p>If a player doesn’t manage to roll a single one of their own symbols in their three attempts, this is called <span lang="fr">naufrage</span> (‘shipwreck’), and they must pay their opponent 3× the stake in addition to any payments already made.</p>
    <p>The rules supplied above do not state when the game ends, but a straightforward method would be to end it as soon as one player has completed the <span lang="fr">prise</span> by marking off all the symbols on their side.</p>
  </Section>
  <Section title="See also">
    <p><GameRef id="crown-and-anchor"/> uses a similar board, and was perhaps the inspiration for this game.</p>
  </Section>
</>;

export default Content;
