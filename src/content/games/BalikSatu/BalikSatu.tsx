import * as React from 'react';
import { Link } from 'react-router-dom';

import { Cite, Noun, Cards, Footnote, ArticleImage, Section, Description } from 'ui';
import { ChikiCards, TheBabas, GatewayToOldSchoolGames } from "References/bibliography.json";
import { Table } from 'react-bootstrap';

import imgCOT from 'content/articles/cards/ceki/COT.jpg';
import imgCWF from 'content/articles/cards/ceki/CWF.jpg';
import imgCRF from 'content/articles/cards/ceki/CRF.jpg';
import imgCC1 from 'content/articles/cards/ceki/CC1.jpg';
import imgCC2 from 'content/articles/cards/ceki/CC2.jpg';
import imgCC3 from 'content/articles/cards/ceki/CC3.jpg';
import imgCC4 from 'content/articles/cards/ceki/CC4.jpg';
import imgCC5 from 'content/articles/cards/ceki/CC5.jpg';
import imgCC6 from 'content/articles/cards/ceki/CC6.jpg';
import imgCC7 from 'content/articles/cards/ceki/CC7.jpg';
import imgCC8 from 'content/articles/cards/ceki/CC8.jpg';
import imgCC9 from 'content/articles/cards/ceki/CC9.jpg';
import imgCS1 from 'content/articles/cards/ceki/CS1.jpg';
import imgCS2 from 'content/articles/cards/ceki/CS2.jpg';
import imgCS3 from 'content/articles/cards/ceki/CS3.jpg';
import imgCS4 from 'content/articles/cards/ceki/CS4.jpg';
import imgCS5 from 'content/articles/cards/ceki/CS5.jpg';
import imgCS6 from 'content/articles/cards/ceki/CS6.jpg';
import imgCS7 from 'content/articles/cards/ceki/CS7.jpg';
import imgCS8 from 'content/articles/cards/ceki/CS8.jpg';
import imgCS9 from 'content/articles/cards/ceki/CS9.jpg';
import imgCM1 from 'content/articles/cards/ceki/CM1.jpg';
import imgCM2 from 'content/articles/cards/ceki/CM2.jpg';
import imgCM3 from 'content/articles/cards/ceki/CM3.jpg';
import imgCM4 from 'content/articles/cards/ceki/CM4.jpg';
import imgCM5 from 'content/articles/cards/ceki/CM5.jpg';
import imgCM6 from 'content/articles/cards/ceki/CM6.jpg';
import imgCM7 from 'content/articles/cards/ceki/CM7.jpg';
import imgCM8 from 'content/articles/cards/ceki/CM8.jpg';
import imgCM9 from 'content/articles/cards/ceki/CM9.jpg';

const Content: React.FC = () => <>
  <Description><Noun lang="ms">Balik Satu</Noun> (‘turn one’) is a Peranakan game played with <a href="/articles/cards/ceki/">Ceki cards</a>. The method of play is similar to Mahjong, with the goal being to collect five sets of three cards.</Description>
  <p>Most of the description below is drawn from <Cite r={ChikiCards} inline page={122} />, with additions from <Cite r={TheBabas} page={155} inline />.</p>
  <Section title="Equipment">
    <p><Noun lang="ms">Balik Satu</Noun> can be played by almost any number of people as long as you have enough cards. My two sources give differing amounts of cards per player. (I am inclined to prefer the rightmost column as it starts with the simple example of two decks for two people, even though the book suggests that up to 20 people can play with a total of 1&#x202f;200 cards!) Recall that a Ceki deck contains 60 cards, two of each type, so a ½ deck has 30 cards, one of each type.</p>
    <Table className="numeric" variant="sm">
      <thead>
        <tr>
          <th>Players</th>
          <th>Decks<Cite r={ChikiCards} /><br />(Cards)</th>
          <th>Decks<Cite r={TheBabas} page={154} /><br />(Cards)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>2</td><td>2½ (150)</td><td>2 (120)</td></tr>
        <tr><td>3</td><td rowSpan={2}>3 (180)</td><td>2½ (150)</td></tr>
        <tr><td>4</td><td>3 (180)</td></tr>
        <tr><td>5</td><td rowSpan={2}>3½ (210)</td><td>3½ (210)</td></tr>
        <tr><td>6</td><td>4 (240)</td></tr>
        <tr><td>7</td><td rowSpan={2}>4 (240)</td><td>4½ (270)</td></tr>
        <tr><td>8</td><td>5 (300)</td></tr>
        <tr><td>9</td><td rowSpan={2}>4½ (270)</td><td>5½ (330)</td></tr>
        <tr><td>10</td><td>6 (360)</td></tr>
        <tr><td>11</td><td rowSpan={2}>5 (300)</td><td>6½ (390)</td></tr>
        <tr><td>12</td><td>7 (420)</td></tr>
        <tr><td>13</td><td rowSpan={2}>5½ (330)</td><td>7½ (450)</td></tr>
        <tr><td>14</td><td>8 (480)</td></tr>
      </tbody>
    </Table>
  </Section>
  <Section title="Play">
    <p>Deal 7 cards to each player, an additional card to the first player, and then a second round of 7 cards to each player. Set the remainder of the cards in the middle of the table face-down, to form the stock. <strong>Alternately</strong>, with a large number of people it is faster to wash-shuffle the cards in the centre of the table and then for each person to draw 14 cards (15 for the starting player).</p>
    <p>The first player starts the game by discarding one card face-up to the middle. Play in an anti-clockwise direction; the next player is the person to their right.</p>
    <p>On a player’s turn they can either take the last discard or the next face-down card, and must discard a card to complete their turn. The goal is to form your hand into five sets of three: a set can be three of the same rank (i.e. with the same indices) or three of the exact same card, which is called a <span lang="ms">mata</span> (‘eye’), or a ‘passport’ in Melaka. A player <strong>must</strong> have at least one <span lang="ms">mata</span> to win, and the winning card that completes the hand (making 15 cards) must be drawn from the stock, not from a discard.</p>
    <p><strong>Calling</strong>: once a player has formed four sets in their hand and only needs one card to win, they can “call” on their next discard. To do this, they discard and then flick their discarded card with their finger. If they have formed at least one <span lang="ms">mata</span> already, they call ‘<span lang="ms">tan</span>’,<Footnote>This comes from Hokkien <span lang="nan">等</span> <span lang="nan-Latn">tán</span> ‘wait’.</Footnote> or else (if they are trying to form a <span lang="ms">mata</span> for their last set) they call ‘<span lang="ms">ceki</span>’.</p>
    <ArticleImage
      cram
      noborder
      size="wide"
      src={[
        [imgCS2, ""],
        [imgCM2, ""],
        [imgCM2, ""],

        [imgCC3, ""],
        [imgCS3, ""],
        [imgCM3, ""],

        [imgCC6, ""],
        [imgCS6, ""],
        [imgCM6, ""],

        [imgCS7, ""],
        [imgCS7, ""],
        [imgCM7, ""],

        [imgCM8, ""],
        [imgCM8, ""],
      ]}>
      A hand with four complete sets that can be called as ‘<span lang="ms">ceki</span>’, hoping to turn the pair of identical <Cards>8</Cards>s into a <span lang="ms">mata</span>.
    </ArticleImage>
    <p>Once any player has called, whenever a player draws from the face-down stock, they must reveal the card before adding it to their hand. If it is the winning card for a player who has called, the calling player takes it and wins the round. When a player claims or draws a winning card they call ‘<span lang="ms">sampei!</span>’ (‘arrived!’).</p>
    <p>A player who has called can still change their hand if they think they can improve it, by turning an existing mixed set into a <span lang="ms">mata</span>. If they do this and have already called ‘<span lang="ms">ceki</span>’ they can change their call to ‘<span lang="ms">tan</span>’.</p>
  </Section>
  <Section title="Scoring">
    <p>The winner draws an additional card from the deck (hence the name of the game), and this determines the value of their hand. Unmarked cards are worth their rank value (1–9 points), and the red-stamped cards are worth more:</p>
    <div className="multi">
      <ArticleImage
        size="small"
        noborder
        alt=""
        src={imgCS9}>
        Red Nine scores 10 points.
      </ArticleImage>
      <ArticleImage
        size="small"
        noborder
        alt=""
        src={imgCRF}>
        Nyonya scores 11 points.
      </ArticleImage>
      <ArticleImage
        size="small"
        noborder
        alt=""
        src={imgCOT}>
        Lau Chian scores 12 points.
      </ArticleImage>
    </div>
    <p>A common rule is that if the drawn card is a rank-1 <span lang="ms">yeo</span> card, then the winning player does not score and the round is played again.</p>
    <p>To the value of the drawn card, the winner adds one point for each unmarked <span lang="ms">mata</span>, and two points for each <span lang="ms">mata</span> of red-stamped cards.</p>
    <p>Finally, if the player won by completing a <span lang="ms">mata</span> (i.e. they called ‘<span lang="ms">ceki</span>’),<Footnote>If the winner initially called ‘<span lang="ms">ceki</span>’ and later changed their call to ‘<span lang="ms">tan</span>’, it does not count as calling <span lang="ms">ceki</span>. The rules given in <Cite r={ChikiCards} inline /> also award 1 point for winning after calling <span lang="ms">tan</span>, but this seems superfluous as the winner will always win at least 1 point for their <span lang="ms">mata</span>.</Footnote> then:</p>
    <ul>
      <li>if someone else drew the winning card from the stock (called <span lang="ms">ayam</span>, ‘chicken’), they earn an additional 1,<Cite r={GatewayToOldSchoolGames} page={71} /> 5,<Cite r={TheBabas} page={162} /> or 10<Cite r={ChikiCards} /> points, or</li>
      <li>if they self-drew the winning card (called <span lang="ms">kandang</span> ‘cage’), they earn an additional 2,<Cite r={GatewayToOldSchoolGames} page={71} /> 10,<Cite r={TheBabas} page={162} /> or 20<Cite r={ChikiCards} /> points.</li>
    </ul>
    <p>The player is then paid their total score by <em>each</em> player. In Singapore<Cite r={ChikiCards} /> this is done by paying 10¢ per point.<Footnote>This was 5¢ a point in the 1970s<Cite r={TheBabas} page={162} />.</Footnote></p>
    <p>In the case that a player is initially dealt a winning hand (<span lang="ms">kandang tangan</span> ‘cage in hand’), they win instantly and double the normal scoring (no calling bonuses will apply).</p>
  </Section>
  <Section title="Variations">
    <p><Noun lang="ms">Balik Lima Belas</Noun> (‘draw fifteen’) is a version of <Noun lang="ms">Balik Satu</Noun> where the winner draws fifteen cards from the stock instead of one. They must use these cards to try to improve their sets into <span lang="ms">mata</span> by swapping cards of equivalent rank. Scoring is calculated as one point for winning plus one point for each <span lang="ms">mata</span> (so, always at least two points). In this form the red-stamped cards do not score extra, but the calling bonuses for <span lang="ms">ayam</span> and <span lang="ms">kandang</span> still apply.</p>
  </Section>
</>;

export default Content;
