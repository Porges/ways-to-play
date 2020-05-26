import * as React from 'react';

import { ArticleImage, Cite, Section, Footnote } from 'ui';
import { WCF } from 'References/bibliography.json';

import imgCamelotBox from './camelot.jpg';
import imgCamelotBoard from './camelot_board.jpg';
import imgCamelotPatent from './Camelot_Patent.png';

import imgCamette from './camette.svg';
import imgCam from './cam.svg';
import imgCamelot from './camelot.svg';
import imgChivalry from './chivalry.svg';
import imgFourHandedChivalry from './four-handed-chivalry.svg';
import imgGrandCam from './grand-cam.svg';
import imgGrandCamelot from './grand-camelot.svg';

const Camelot: React.FC = () => (
  <>
    <ArticleImage
      position="aside"
      src={imgCamelotBox}
      alt="A board game box with a picture of two knights on the front."
      source={{
        author: { family: "Thompson", given: "Mike" },
        originalUrl: "https://tomsk3000.com/product/1930-camelot-board-game-by-parker-brothers/",
        copyrightYear: 2020,
        license: "with-permission",
      }}>
      A 1930s Camelot box.
    </ArticleImage>
    <section itemProp="description">
      <p><span className="game-title">Chivalry</span>, <span className="game-title">Camelot</span>, <span className="game-title">Cam</span>, and <span className="game-title">Camette</span> are members of a series of related 2-player games originally developed by George Parker (of Parker Brothers fame).</p>
      <p>Also in the family are the 4-player games of <span className="game-title">Four-Handed Chivalry</span>, <span className="game-title">Grand Camelot</span>, and <span className="game-title">Grand Cam</span>.</p>
      <p>While <span className="game-title">Camelot</span> was popular for a long time (<a href="http://worldcamelotfederation.com/President.htm">US President John F. Kennedy grew up playing it</a>), it is little-known today.</p>
    </section>
    <Section title="History">
      <p>George Parker developed Chivalry over a number of years starting in 1882. It was eventually published by George S. Parker &amp; Co. in 1887, and then again by the newly-formed Parker Brothers in 1888.</p>
      <ArticleImage
        position="left"
        src={imgCamelotPatent}
        alt="A black and white drawing of a game board"
        source={{
          organization: { orgName: "Google Patents" },
          originalUrl: "https://patents.google.com/patent/US1780038A",
          license: "cc0"
        }}>
        A diagram of the board from George Parker’s 1930 patent.
      </ArticleImage>
      <p>In 1930 he simplified the game of Chivalry to produce Camelot, and received a patent <a href="https://patents.google.com/patent/US1780038">US1780038</a> for the game. Camelot remained popular until the 1960s, but was eventually discontinued in 1968. In 1985 the game was re-introduced as <span className="game-title">“Inside Moves”</span> but production stopped a year later.</p>
      <p>Parker called Chivalry “the best game in 2000 years”, and he was clearly enamoured with it. After his death in 1952, his wife commissioned stained-glass windows for the First Church in Salem in his memory,<Footnote>Images of the windows can be seen <a href="http://www.worldcamelotfederation.com/Art.htm">on the WCF website</a>.</Footnote> and they include the knight featured on the Camelot box front (also included is another game called <a
        href="https://boardgamegeek.com/boardgame/186268/knights-journey">The Knight’s Journey</a>{/* https://mysteriouswritings.com/my-1928-knights-in-shining-armor/*/}).</p>
      <p>In 1999 the World Camelot Foundation (WCF) was formed by Michael Nolan to popularize the game on the internet.<Cite r={WCF} /> The rules descriptions below are based on his website (they differ slightly from the original rules supplied by Parker Brothers).</p>
    </Section>
    <Section title="Basic Rules">
      <p>Across all the variations of Camelot, there are only two different pieces—the foot-soldier and the knight—and these pieces have the same powers of movement and capture in each game.</p>
      <p>In each game, White moves first and the players take turns moving a single piece.</p>
      <ArticleImage
        src={imgCamelotBoard}
        alt="A chequered board with an unusual shape, missing the corner squares."
        source={{
          author: { family: "Thompson", given: "Mike" },
          originalUrl: "https://tomsk3000.com/product/1930-camelot-board-game-by-parker-brothers/",
          copyrightYear: 2020,
          license: "with-permission",
        }}>
        A 1930s Camelot board.
      </ArticleImage>
      <Section title="Moves">
        <p><strong>Plain move</strong>: Any piece may move a single square in any direction (including diagonally).</p>
        <p><strong>Canter</strong>: Any piece may move any number of squares by performing a series of ‘short leaps’ over the player’s own pieces. A piece cannot end its canter on its starting square (or this would enable players to essentially pass their turn).</p>
        <p><strong>Jump</strong>: Any piece may capture any number of enemy pieces by performing a series of ‘short leaps’ over them.</p>
        <p><strong>Knight’s Charge</strong>: In addition to the moves above, the knight may perform a ‘charge’ consisting of a canter followed by a jump, in that order only.</p>
        <Section title="Restrictions on movement">
          <p>On a player’s turn, if there are any captures that can be made by jumping, then the player must make at least one capture. This obligation may be satisfied by capturing with a knight’s charge instead of jumping. If the only possible capture is via a knight’s charge, then a capture is not obligated, since the jump is only performed after the canter.</p>
          <p>A piece cannot move into a player’s own castle, even if it “passes through”, unless it is jumping an enemy piece adjacent to the castle, and it may only end its turn there if there is no immediate jump out of the castle. If the piece ends its jump on the castle, then it must be moved out of the castle on the player’s next turn (and must capture with a jump if it can do so).</p>
        </Section>
      </Section>
      <Section title="Winning">
        <p>To win, a player must get their pieces into the opponent’s castle, or capture all the enemy pieces. The exact details of these goals are different for each variant.</p>
      </Section>
    </Section>
    <Section title="Two-player games">
      <p>In the diagrams below, the foot-soldiers are represented by the chess pawns ♟︎{/*<!--override Edge defaulting to emoji presentation-->*/}/♙ and the knights are represented by the chess knights ♞/♘.</p>
      <p>The target castle squares for each player are represented by a star in their own colour.</p>
      <Section title="Camette">
        <p>Camette is the smallest of the Camelot variants, and is ideal for learning the game. It was invented by Michael Wortley Nolan in 2002.</p>
        <ArticleImage
          alt="TODO"
          src={imgCamette}>
          The initial setup for Camette.
        </ArticleImage>
        <p>Each player has 3 foot soldiers and 1 knight. The goal of the game is to get a single piece into the opponent’s castle, or to capture all of the opponent’s pieces.</p>
        <p>There are no draws or stalemates in Camette.</p>
      </Section>
      <Section title="Cam">
        <p>Cam is a downsized version of Camelot released by Parker Brothers in 1949.</p>
        <ArticleImage
          alt="TODO"
          src={imgCam}>
          The initial setup for Cam.
        </ArticleImage>
        <p>Each player has 5 foot soldiers and 2 knights. The goal of the game is to get a single piece into the opponent’s castle, or to capture all of the opponent’s pieces.</p>
        <p>There are no draws or stalemates in Cam.</p>
      </Section>
      <Section title="Camelot">
        <ArticleImage alt="TODO" src={imgCamelot}>
          The initial setup for Camelot.
        </ArticleImage>
        <p>Each player has 10 foot soldiers and 4 knights.</p>
        <p>Unlike the smaller versions, the goal of the game is to get <em>two</em> pieces into the opponent’s castle, or to capture all of the opponent’s pieces while still retaining <em>two</em> pieces on the board (having fewer than this counts as a draw instead of a win).</p>
        <p>The game is also won if the opponent is not able to make any valid move while retaining <em>two</em> pieces on the board (‘stalemate’). Again, having fewer pieces than this counts as a draw.</p>
        <p>There are a few additional rules given the two-piece requirement to win by entering a castle:</p>
        <ul>
          <li>Once a piece has entered an opponent’s castle it may not leave, including if it enters the castle during a canter or jump. The turn must stop at that point.</li>
          <li>A piece that has entered an opponent’s castle may move from one castle square to the other. This move may only be used <em>twice</em> per player each game.</li>
        </ul>
      </Section>
      <Section title="Chivalry">
        <ArticleImage alt="TODO" src={imgChivalry}>
          The initial setup for Chivalry.
        </ArticleImage>
        <p>Each player has 12 foot soldiers and 8 knights.</p>
        <p>The remainder of the rules are the same as in Camelot.</p>
      </Section>
    </Section>
    <Section title="Four-player games">
      <p>In four player games, pieces may canter over all pieces on their own team, and may jump and capture pieces from either opponent.</p>
      <Section title="Grand Cam">
        <p>Grand Cam was designed by Paul Bramwell Smith in 2005.</p>
        <ArticleImage alt="TODO" src={imgGrandCam}>
          The initial setup for Grand Cam.
        </ArticleImage>
        <p>Each player has 5 foot soldiers and 2 knights.</p>
        <p>The game is played in partnership by two teams of two. One team is Green &amp; Yellow and the other is Red &amp; Blue. The turn order runs Red, Green, Blue, Yellow, repeatedly.</p>
        <p>The goal of the game is for one player on a team to move a single piece into their opposite castle square, or to capture all of the pieces of <em>both</em> opponents.</p>
        <p>Just like a player’s own castle, they cannot move a piece into the non-target castles on their left and right sides.</p>
      </Section>
      <Section title="Grand Camelot">
        <p>Grand Camelot was released by Parker Brothers in 1932.</p>
        <ArticleImage alt="TODO" src={imgGrandCamelot}>
          The initial setup for Grand Camelot.
        </ArticleImage>
        <p>Each player has 8 foot soldiers and 4 knights. (The setup depicted above is that recommended by the WCF, the original layout by Parker Brothers has all 4 knights on the back row.)</p>
        <p>The teams and turn order are the same as in Grand Cam.</p>
        <p>The goal of the game is for a team to get two pieces into their opposing castles, either two pieces from one player, or one piece each. They can also win by eliminating all their opposing pieces, while retaining <em>two</em> pieces on the board, or if their opposing teams have no valid moves and they retain <em>two</em> pieces on the board.</p>
        <p>As in Camelot, pieces that have entered a target castle may not leave it, and each player may make two castle-moves per game.</p>
      </Section>
      <Section title="Four-Handed Chivalry">
        <ArticleImage alt="TODO" src={imgFourHandedChivalry}>
          The initial setup for Four-Handed Chivalry.
        </ArticleImage>
        <p>Four-Handed Chivalry is different to all the other variants: each player has only 8 knights. The board is the same as for two-player Chivalry.</p>
        <p>It can be played by two teams of two, or by four players playing for themselves. In a partnership game, players sit opposite their partners and turn order proceeds clockwise.</p>
        <p>The sole goal of the game is to be the last player (or team) with pieces on the board. Castle squares are not special in any way.</p>
      </Section>
    </Section>
  </>);

export default Camelot;