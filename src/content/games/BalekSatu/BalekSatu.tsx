import * as React from 'react';
import { Link } from 'react-router-dom';

import { Cite, Noun, Cards, Footnote, ArticleImage, Section } from 'ui';
import { ChikiCards } from "References/bibliography.json";
import { Table } from 'react-bootstrap';

const Content: React.FC = () => <>
  <p><Noun lang="ms">Balek Satu</Noun> (‘return one’) is a game played with <Link to="/articles/cards/ceki/">Ceki cards</Link>.<Cite r={ChikiCards} page={122} /> It is similar to Mahjong, the goal being to form five sets of three cards.</p>
  <p>It can be played by almost any number of people as long as you have enough cards (recall that a Ceki deck contains 60 cards, two of each type, so a ½ deck has 30 cards, one of each type):</p>
  <Table className="numeric">
    <thead>
      <th>Players</th>
      <th>Decks required</th>
      <th>Cards</th>
    </thead>
    <tbody>
      <tr><td>2</td><td>2½</td><td>150</td></tr>
      <tr><td>3 or 4</td><td>3</td><td>180</td></tr>
      <tr><td>4 or 5</td><td>3½</td><td>210</td></tr>
      <tr><td>6 or 7</td><td>4</td><td>240</td></tr>
      <tr><td>8 or 9</td><td>4½</td><td>270</td></tr>
      <tr><td>11 or 12</td><td>5</td><td>300</td></tr>
      <tr><td>13 or 14</td><td>5½</td><td>330</td></tr>
    </tbody>
  </Table>
  <Section title="Play">
    <p>Deal 7 cards to each player, and 8 to the first player, and then a second round of 7 cards to each player. Set the remainder of the cards in the middle of the table face-down, to form the stock.</p>
    <p>The first player starts the game by discarding one card face-up to the middle. Play in an anti-clockwise direction; the next player is the person to their right.</p>
    <p>On a player’s turn they can either take the last discard or the next face-down card, and must discard a card to complete their turn. The goal is to form your hand into five sets of three: a set can be three of the same rank (i.e. with the same indices) or three of the exact same card, which is called a <span lang="ms">mata</span> (‘eye’). A player must have at least one <span lang="ms">mata</span> to win, and the winning card that completes the hand (making 15 cards) must be drawn from the stock, not from a discard.</p>
    <p><strong>Calling</strong>: once a player has formed four sets in their hand and only needs one card to win, they can “call” on their next discard. To do this, they discard and then flick their discarded card with their finger. If they have formed at least one <span lang="ms">mata</span> already, they call ‘<span lang="ms">tan</span>’, or else (if they are trying to form a <span lang="ms">mata</span> for their last set) they call ‘<span lang="ms">ceki</span>’.</p>
    <p>Once a player has called, when a player draws from the face-down stock, they must reveal the card before adding it to their hand. If it is the winning card for a player who has called, the calling player takes it and wins the round.</p>
    <p>A player who has called can still change their hand if they think they can improve it, by turning an existing mixed set into a <span lang="ms">mata</span>. If they do this and have already called ‘<span lang="ms">ceki</span>’ they can change their call to ‘<span lang="ms">tan</span>’.</p>
  </Section>
  <Section title="Scoring">
    <p>The winner draws an additional card from the deck (hence the name of the game), and this determines the value of their hand. Unmarked cards are worth their rank value, with red-stamped cards scoring extra: TODO</p>
    <p>⇒ If the drawn card is a rank-1 <span lang="ms">yeo</span> card, then they player does not score and the round is a wash.</p>
    <p>To this value the winner adds one point for each unmarked <span lang="ms">mata</span>, and two points for each <span lang="ms">mata</span> of red-stamped cards.</p>
    <p>If the player called ‘<span lang="ms">ceki</span>’ and won on a revealed card, then they earn additional points:</p>
    <ul>
      <li>if someone else drew the winning card from the stock (called <span lang="ms">ayam</span>, ‘chicken’), the winner earns an additional 11 points</li>
      <li>if the winner self-drew the winning card (called <span lang="ms">kandang</span> ‘pen/stable’), they earn an additional 21 points</li>
    </ul>
    <p>(These bonuses do not apply if the player initially called ‘<span lang="ms">ceki</span>’ and later changed their call to ‘<span lang="ms">tan</span>’.)</p>
    <p>The player is paid their total value by <em>each</em> player. In Singapore this is done by paying 10¢ per point.</p>
    <p>In the case that a player is initially dealt a winning hand, they win instantly and double the normal scoring (no calling bonuses will apply).</p>
  </Section>
</>;

export default Content;
