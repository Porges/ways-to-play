
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Cite, Noun, Cards, Footnote, ArticleImage, Section, Description } from 'ui';
import { GameRef } from '../Game';

import imgCS9 from 'content/articles/cards/ceki/CS9.jpg';
import imgCRF from 'content/articles/cards/ceki/CRF.jpg';
import imgCOT from 'content/articles/cards/ceki/COT.jpg';

const Content: React.FC = () => <>
  <Description><Noun lang="ms">Cholek Tiga</Noun> (‘draw three’) is a Peranakan fishing game for two or three players, played with <a href="/articles/cards/ceki/">Cherki cards</a>.</Description>
  <p>The description below is based on <Cite r="ChikiCards" inline page={[[125, 127]]} /></p>
  <Section title="Equipment">
    <p><Noun lang="ms">Cholek Tiga</Noun> is played with two decks of <Noun lang="ms">Cherki</Noun> cards (120 cards total). There will be four copies of each card in the game.</p>
  </Section>
  <Section title="Play">
    <p>Shuffle the cards and place them face-down in the middle of the table. (They are usually placed in a skewed pile, since they will not stand up in a straight pile like normal playing cards.) Each player draws three cards (hence the name of the game).</p>
    <p>On a player’s turn they first <strong>discard</strong> a card face-up to a ‘pool’ in the centre of the table, and then <strong>turn up</strong> a card from the stock into the same pool of cards. Each of these cards can capture, if the card matches <strong>two other</strong> cards of the same rank (the face of the card does not matter). If a card successfully matches, the player takes all three cards and piles them (by rank) in front of themselves. A player can potentially capture six cards (two sets of three) on their turn, if both the card from their hand and the turned-up card match two other cards. Capturing is not mandatory, if the player does not think it is advantageous.</p>
    <p>Once everyone has played three turns (so has used the three cards in their hand), all players once again draw three cards, and play continues. Once the stock and the player’s hands are completely played out, each player scores their captured cards.</p>
    <Section title="Scoring">
      <ArticleImage
        size="small"
        noborder
        alt=""
        src={[
          [imgCS9, ""],
          [imgCRF, ""],
          [imgCOT, ""],
        ]}>
        There are three types of red-stamped cards in the deck (twelve cards total).
        </ArticleImage>
      <p>A player scores:</p>
      <ul>
        <li>For normal cards (without a red stamp): 3 points for each set of <strong>three identical</strong> cards (these can be won on different turns, which is why captured cards are simply piled by rank), or 8 points for a set of all <strong>four identical</strong> cards.</li>
        <li>For red-stamped cards: 1 point for each card, 4 points for an identical pair, 3 points (only, but see the bonuses) for an identical triplet, or 8 points for all four identical red-stamped cards.</li>
      </ul>
      <p>The player with the most points wins the difference in points between their score and the other players’ scores. This is settled between the players at a rate of 10¢ per point.</p>
      <p>For each identical red-stamped triplet (called an <span lang="ms">ang pow</span><Footnote>This comes from Hokkien <span lang="nan">紅包</span> <span lang="nan-Latn">âng pau</span>.</Footnote> ‘red packet’) or quadruplet (called an <span lang="ms">ang pow besar</span> ‘big red packet’), the player wins a bonus of $1, or $2, respectively, from <strong>each</strong> other player.</p>
      <p>The player who scored the least points goes first in the next game.</p>
    </Section>
    <Section title="In-play bonuses">
      <p>If a player captures a set of three <strong>identical</strong> cards on their turn, they win a bonus from <strong>each</strong> other player, which is paid instantly:</p>
      <ul>
        <li>If the capture was made with a card from their hand, it is called an <span lang="ms">ayam</span> (‘chicken’), and wins 50¢.</li>
        <li>If the capture was made with a card from the stock, it is called a <span lang="ms">kandang</span> (‘cage’), and wins $1.</li>
      </ul>
    </Section>
  </Section>
  <Section title="See Also">
    <p><GameRef id='balik-satu' /> is another <Noun lang="ms-Latn">Cherki</Noun> game.</p>
  </Section>
</>;

export default Content;
