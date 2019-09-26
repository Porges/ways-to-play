import * as React from 'react';

import Table from 'react-bootstrap/Table';

import { GameRef } from '../Game';

import { ArticleImage, ArticleContentProps } from 'ui';
import { Murray2 } from 'References/bibliography.json';

import imgLeapFrogVariation from './leap-frog-variation.svg';

const LeapFrog: React.FC<ArticleContentProps> = ({cite}) => (
    <>
    <p><span id="index-leap-frog" className="game-title">Leap-Frog</span> is a game for two or more players in which the object is to capture the most pieces from a board containing identical pieces.</p>
    <section id="equipment">
    <h3>Equipment</h3>
    <p>To play you will need a gridded board (Murray{cite(Murray2, [93])} suggests 15×15 to 18×18 squares), and enough pieces to fill all the spaces on it. All the pieces are the same.</p>
    </section>
    <section id="setup">
    <h3>Setup</h3>
    <p>Place one piece on each square of the board.</p>
    </section>
    <section id="play">
    <h3>Play</h3>
    <p>To start, the first player removes one piece and places it in front of themselves. After this, the players take turns by jumping a piece (not diagonally) over another into an empty space, and capturing the piece that was jumped. Multiple pieces may be jumped in a turn, even changing direction, and the player must capture as many as possible with the piece that was moved.</p>
    <p>The game ends when no more captures can be made, and the player who captured the most pieces is the winner.</p>
    </section>
    <section id="variants">
    <h2>Variants</h2>
    <ArticleImage
        position="right"
        alt="A square game board randomly filled with white, red, yellow, and green pieces."
        src={imgLeapFrogVariation}>
        A sample initial configuration for Murray’s variation.
    </ArticleImage>
    <p>Murray{cite(Murray2, [93, 94])} invented a variant in 1898. The undifferentiated pieces are replaced by pieces coloured white, yellow, red, and green, in the ratios 4:3:2:1. The pieces now count points according to these ratios (i.e. green is worth 4 points while white is worth 1). To set up the board, the pieces are arranged randomly on the squares, and the first player must remove a white piece to begin. The player with the highest point value of pieces taken at the end wins.</p>
    <Table size="sm">
        <caption>Example piece counts for different board sizes</caption>
        <thead>
          <tr>
            <th>Board size</th>
            <th className="numeric">Green</th>
            <th className="numeric">Red</th>
            <th className="numeric">Yellow</th>
            <th className="numeric">White</th>
            <th className="numeric">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>8×8 (64)</td>
            <td className="numeric">6</td>
            <td className="numeric">13</td>
            <td className="numeric">19</td>
            <td className="numeric">26</td>
            <td className="numeric">127</td>
          </tr>
          <tr>
            <td>9×9 (81)</td>
            <td className="numeric">8</td>
            <td className="numeric">16</td>
            <td className="numeric">24</td>
            <td className="numeric">33</td>
            <td className="numeric">161</td>
          </tr>
          <tr>
            <td>10×10 (100)</td>
            <td className="numeric">10</td>
            <td className="numeric">20</td>
            <td className="numeric">30</td>
            <td className="numeric">40</td>
            <td className="numeric">200</td>
          </tr>
          <tr>
            <td>11×11 (121)</td>
            <td className="numeric">12</td>
            <td className="numeric">24</td>
            <td className="numeric">36</td>
            <td className="numeric">49</td>
            <td className="numeric">241</td>
          </tr>
          <tr>
            <td>12×12 (144)</td>
            <td className="numeric">14</td>
            <td className="numeric">29</td>
            <td className="numeric">43</td>
            <td className="numeric">58</td>
            <td className="numeric">287</td>
          </tr>
          <tr>
            <td>13×13 (169)</td>
            <td className="numeric">17</td>
            <td className="numeric">34</td>
            <td className="numeric">51</td>
            <td className="numeric">67</td>
            <td className="numeric">339</td>
          </tr>
          <tr>
            <td>14×14 (196)</td>
            <td className="numeric">20</td>
            <td className="numeric">39</td>
            <td className="numeric">59</td>
            <td className="numeric">78</td>
            <td className="numeric">393</td>
          </tr>
          <tr>
            <td>15×15 (225)</td>
            <td className="numeric">23</td>
            <td className="numeric">45</td>
            <td className="numeric">68</td>
            <td className="numeric">89</td>
            <td className="numeric">452</td>
          </tr>
          <tr>
            <td>16×16 (256)</td>
            <td className="numeric">26</td>
            <td className="numeric">51</td>
            <td className="numeric">77</td>
            <td className="numeric">102</td>
            <td className="numeric">513</td>
          </tr>
          <tr>
            <td>17×17 (289)</td>
            <td className="numeric">29</td>
            <td className="numeric">58</td>
            <td className="numeric">87</td>
            <td className="numeric">115</td>
            <td className="numeric">579</td>
          </tr>
          <tr>
            <td>18×18 (324)</td>
            <td className="numeric">32</td>
            <td className="numeric">65</td>
            <td className="numeric">97</td>
            <td className="numeric">130</td>
            <td className="numeric">647</td>
          </tr>
          <tr>
            <td>19×19 (361)</td>
            <td className="numeric">36</td>
            <td className="numeric">72</td>
            <td className="numeric">108</td>
            <td className="numeric">145</td>
            <td className="numeric">721</td>
          </tr>
          <tr>
            <td>20×20 (400)</td>
            <td className="numeric">40</td>
            <td className="numeric">80</td>
            <td className="numeric">120</td>
            <td className="numeric">160</td>
            <td className="numeric">800</td>
          </tr>
        </tbody>
      </Table>
    <p>Another way to vary the game would be to play on a non-square or non-uniform board.</p>
    </section>
    <section id="see-also">
    <h2>See also</h2>
    <p><GameRef id="take-it-away"/> is a similar game by Sid Sackson.</p>
    </section>
    </>
);

export default LeapFrog;