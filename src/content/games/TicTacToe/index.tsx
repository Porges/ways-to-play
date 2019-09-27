import * as React from 'react';

import { GameRef } from '../Game';

import { ArticleImage, ArticleContentProps, Footnote, Pronunciation } from 'ui';
import { BirdBrainManual, TheMouseWhoReinforced, CrossOutALandmark, TheChickenVanishes, ChinatownFairIsBack, RelayMoe, MathematicalWorkOfBabbage, TheGameOfJAM, Gardner1, Wordsworth, GamesOfTheGods, WinningWaysV3, Fiske, GamesBookForBoysAndGirls, MagazineOfArt, NurseryWitch, SuffolkWords, SourcesInRecreationalMathematics, ICommencedAnExamination, Teesdale, NotesAndQueriesS8V12 } from 'References/bibliography.json';

import img7429 from './7429845046_ddc7a1464a_o.jpg';
import imageBab1 from './large_BAB_S20_0002.jpg';
import imageBab2 from './large_BAB_S20_0003.jpg';
import imgTickTack from './tick-tack-toe.png'
import img5072 from './5072574617_9afa5ee9ae_o.jpg';
import img8576 from './8576897675_c7c5785b4a_o.jpg'

import pronTrippTrapp from './pronunciation_sv_tripp,_trapp,_trull.mp3';

const TicTacToe: React.FC<ArticleContentProps> = ({cite}) => {
    return (<section>
      {/*<p>(Some general references for the game are @OxfordBG [112–113], @Bell [p. 91], and
      @Murray2 [§3.2.1, p. 40].)</p>*/}
      <p>Tic-Tac-Toe is a simple game for two players that is well-known as being a draw if played ‘rationally’.
      Unlike most board games, pieces cannot be moved or removed once placed, making it an ideal game to play with
      pen & paper.</p>
      <ArticleImage
        src={img7429}
        alt="Several games of tic-tac-toe scrawled on a concrete wall."
        source={{
          author: 'gerogeri',
          copyrightYear: 2012,
          originalUrl: 'https://www.flickr.com/photos/65029995@N05/7429845046',
          license: 'cc-by-nc-nd',
          licenseVersion: '2.0'
        }}>
        Some tic-tac-toe games
      </ArticleImage>
      <h2>History</h2>
      <p>The origins of tic-tac-toe are unclear. Many sources claim that it dates from antiquity, but to me it seems
      like a more recent invention—adegenerate version of [Three Men’s Morris]. Mentions of it only appear in the
      19th century, and the game is strongly suited to be played with chalk on slates—such as were used by children
      in schools during this period.</p>
      <p>The earliest known written references to the game occur in Charles Babbage’s unpublished manuscript ‘Essays
      on the Philosophy of Analysis’ (1812–1820, now held in the British Library as Add. MS&nbsp;37202), although the
      game is never mentioned by name.{cite(SourcesInRecreationalMathematics)} In 1842, ‘tit-tat-to’ again occurs in
      his notebooks, when he conceptualizes an automaton that would play the game against a
      human.{cite(SourcesInRecreationalMathematics)}{cite(ICommencedAnExamination)}</p>
      <ArticleImage
        position='wide'
        src={[
          [imageBab1, "Sketches of various games of tic-tac-toe in a notebook."],
          [imageBab2, "Sketches of various games of tic-tac-toe in a notebook."]]}
        source={{
          organization: {
            orgName: 'Science Museum Group'
          },
          originalUrl: 'https://collection.sciencemuseum.org.uk/documents/aa110069631',
          license: 'cc-by-sa',
          licenseVersion: '4.0'
        }}
        >
        Some of Babbage’s notes on “Tit-Tat-To”, dated 15th September 1860
      </ArticleImage>
      <h2>Terminology</h2>
      <p>In English, tic-tac-toe has gone by many names. It has been variously called ‘tit-tat-to(e)’,
      ‘tick-tack-toe’, ‘(n)oughts &amp; crosses’, ‘tip-tap-toe’,{cite(Teesdale, [136])}{cite(NotesAndQueriesS8V12,
      [333])} ‘Exeter’s Nose’ (a pun on ‘<i>X</i>s and <i>O</i>s’),{cite(SourcesInRecreationalMathematics)} or
      ‘kit-cat-cannio’.{cite(SuffolkWords, [200])}</p>
      <p>These names mostly derive from an old counting-out rhyme (think ‘eeny meeny miny mo’):</p>
      <Footnote>Some sources (e.g. {cite(NurseryWitch, [374], {inline: true})}) give this last line as “… in the old
      man’s (burial-)ground!”; I have no idea what this means.</Footnote>
      <blockquote>
      Tit, tat, toe,<br/>
      My first go,<br/>
      Three jolly butcher boys<br/>
      All in a row;<br/>
      Stick one up,<br/>
      Stick one down,<br/>
      Stick one in the old man’s crown!
      </blockquote>
      <ArticleImage
        position="right"
        src={imgTickTack}
        alt="A drawing of children playing ‘tick-tack-toe’ on a circular board drawn on the sidewalk."
        source={{license: 'cc0'}}>
        Children playing a <em>different</em> game of ‘tick-tack-toe’ (by F. J. Shields, as reproduced in {cite(MagazineOfArt, [136], {inline: true})}).
      </ArticleImage>
      <p>The same rhyme and name were also used for an unrelated game, using a circular board, in which a player
      would attempt to locate high-scoring sections of a circle while blindfolded.{cite(GamesBookForBoysAndGirls,
      [55])}</p>
      <p>There seems to be a distinction we can draw between languages that have folkish names and those that have
      more functional names derived from the outward appearance or goal of the game.</p>
      <p>In the former group we have: Dutch ‘<span lang="nl">tik tak tol</span>’,{cite(Fiske, [122])} or ‘<span
      lang="nl">boter-kaas-en-eieren</span>’ (‘butter cheese and eggs’); and in Swedish ‘<Pronunciation
      src={pronTrippTrapp} lang="sv">tripp, trapp, trull</Pronunciation>’.{cite(Fiske, [137])}</p>
      <p>Like the English names, one Dutch name (<span lang="nl">boter, melk, kaas</span>) is derived from a rhyme:{cite(WinningWaysV3, [732])}</p>
      <div className="multi text-center">
        <p lang="nl">Boter, melk, kaas,<br/>ik ben de baas.</p>
        <p>Butter, milk, cheese,<br/>I am the boss.</p>
      </div>
      <p>Sweden had a similar rhyme:{cite(GamesOfTheGods, [163])}</p>
      <div className="multi text-center"> <p lang="sv">Tripp, trapp, trull,<br/>min kvarn är full.</p> <p>Tripp, trapp, trull,<br/>my mill is full.</p>
      </div>
      <p>In the ‘functional’ group of names are those like the Arabic <span lang="ar">لعبة إكس-أو</span> ‘the <i>X</i>–<i>O</i> game’; or the Chinese <span lang="zh">圈圈叉叉</span> ‘circles &amp; crosses’, or <span lang="zh">井字棋</span> ‘<code>井</code> character game’.</p>
      <p>The languages with ‘folkish’ names also tend to have ‘functional’ names as well; an alternate Swedish name
      is ‘<span lang="sv">tre-i-rad</span>’ (‘three in a row’), and Dutch has ‘<span lang="nl">kruisje rondje</span>’
      (‘cross circle’).</p>
      <p>On the other hand, the English poet Wordsworth didn’t think it was worthy of a name at all. In <cite>The Prelude</cite>, he describes playing the game as a child:{cite(Wordsworth, [[538,544]], {page:"lines"})}</p>
      <blockquote>
        Eager and never weary we pursued  <br/>
        Our home-amusements by the warm peat-fire  <br/>
        At evening, when with pencil and smooth slate,  <br/>
        In square divisions parcelled out, and all  <br/>
        With crosses and with cyphers [i.e. zeroes] scribbled o’er  <br/>
        We schemed and puzzled, head opposed to head  <br/>
        In strife too humble to be named in verse
      </blockquote>
      <ArticleImage
        position="wide"
        src={img5072}
        alt="A wall with a completed tic-tac-toe game drawn on it in chalk." 
        source={{
          author: { family: 'Nova', given: 'Nicolas' },
          license: 'cc-by-nc',
          licenseVersion: '2.0',
          originalUrl: 'https://www.flickr.com/photos/nnova/5072574617/' 
        }}
        >
        A tic-tac-toe game on a wall in Marseille, France 
      </ArticleImage>
      <h2>Play</h2>
      <p>You know this, right?</p>
      <h2>Strategy</h2>
      <p>See, e.g. {cite(Gardner1, [[37,46]], {inline: true})}.</p>
      {/*<!-- It is claimed that “yih” 弈 is an old name for the game. No, this is go, or maybe
      something older. -->*/}
      <h2>Variants</h2>
      <h3>The 15 Game</h3>
      <p>This game is also known as “Number Scrabble”{cite(TheGameOfJAM)} or “Pick15”.</p>
      <p>
        To play: Write down the numbers from 1–9 on a piece of paper. Each turn,
        a player claims a number for themselves by marking it, and a number can only be
        claimed by one player. The 
first player to claim 3 numbers that add to 15 is the winner.
      </p>
      <p>
        This game is isomorphic to the game of tic-tac-toe. Astonishingly, this form was
        invented by Babbage in his initial analysis of the game.{cite(MathematicalWorkOfBabbage, [127])}
      </p>
      <p>To show the equivalence, write down the numbers in the form of the (unique) 3&times;3 magic square:</p>
      <table className="numeric rule-between-cells">
        <tbody>
          <tr><td>4</td><td>9</td><td>2</td></tr>
          <tr><td>3</td><td>5</td><td>7</td></tr>
          <tr><td>8</td><td>1</td><td>6</td></tr>
        </tbody>
      </table>
<p>
      From this it can be seen that the game is the same as tic-tac-toe. Each row,
      column, and long diagonal sums to 15.
</p>
      <h3>JAM</h3>
<p>
      This is another isomorphic variant invented by John Michon.{cite(TheGameOfJAM)}
</p>
      <h3>Spit</h3>
<p>
      Yet another isomorphic variant is played as follows:{cite(WinningWaysV3, [732])}
</p>
<p>
      Write down the nine words ‘Spit’, ‘Not’, ‘So’, ‘Fat’, ‘Fop’, ‘As’, ‘If’, ‘In’,
      and ‘Pan’ on separate pieces of paper. The players take turns taking a single
      card. A player wins if they collect all the cards with a given letter (e.g.
      ‘In’, ‘If’, and ‘Spit’ would win since these are all the words containing ‘i’).
</p>
<p>      
      This can be shown to be the same game in the following way (note that the number of
      letters in each word is the same as the number of lines that can be formed
      through that square):
</p>
      <table className="text-center rule-first-row rule-first-col rule-last-col rule-last-row">
        <tbody>
          <tr>
            <td><strong >P</strong></td>
            <td><strong >N</strong></td>
            <td><strong >S</strong></td>
            <td><strong >F</strong></td>
            <td><strong >T</strong></td>
          </tr>
          <tr>
            <td><strong >A</strong></td>
            <td><span>P</span><span >A</span><span >N</span></td>
            <td><span>A</span><span >S</span></td><td><span >F</span><span >A</span><span >T</span></td>
            <td><strong >A</strong></td>
          </tr>
          <tr>
            <td><strong >I</strong></td>
            <td><span >I</span><span >N</span></td>
            <td><span >S</span><span >P</span><span >I</span><span >T</span></td>
            <td><span >I</span><span >F</span></td>
            <td><strong >I</strong></td>
          </tr>
          <tr>
            <td><strong >O</strong></td>
            <td><span >N</span><span >O</span><span >T</span></td>
            <td><span >S</span><span >O</span></td>
            <td><span >F</span><span >O</span><span >P</span> </td>
            <td><strong >O</strong></td>
          </tr>
          <tr>
            <td><strong >T</strong></td>
            <td><strong >N</strong></td>
            <td><strong >S</strong></td>
            <td><strong >F</strong></td>
            <td><strong >P</strong></td>
          </tr>
        </tbody>
      </table>
      <ArticleImage
        position="wide"
        src={img8576}
        alt="A wall with completed tic-tac-toe games drawn on it in blue pen."
        source={{
          author: 'henrykkcheung',
          originalUrl: 'https://www.flickr.com/photos/henrykkcheung/8576897675/in/photostream/',
          license: 'cc-by-nc-nd',
          licenseVersion: '2.0',
        }}
        >
        Tic-tac-toe games on a wall in the Medina of Fez (<span lang="ar">فاس البالي</span>), Morocco
      </ArticleImage>
      <h2>Computer Implementations</h2>
      <p>Being a simple game, Tic-Tac-Toe is easily implemented on a computer, and so was one of the first
      computerized games. Some early versions include:</p>
      <ul>
        <li><a href="https://en.wikipedia.org/wiki/Bertie_the_Brain"><cite>Bertie the Brain</cite></a> (analog, 1950)</li>
        <li><a href="https://en.wikipedia.org/wiki/OXO"><cite>OXO</cite></a> (for the EDSAC, 1952)</li>
        <li><cite>Relay Moe</cite>{cite(RelayMoe)} (relay-based, 1956), the first to be programmed with a variable
        strategy and with a chance of making a mistake</li>
      </ul>
      <p>Chickens have also been trained to ‘play’ the
      game.{cite(CrossOutALandmark)}{cite(TheChickenVanishes)}{cite(ChinatownFairIsBack)} The first of these games,
      “Bird Brain”, was developed in the late 1970s by Animal Behavior Enterprises, a company founded by
      Marian &amp; Keller Breland, who were students of B. F. Skinner, the behavioural
      psychologist.{cite(TheMouseWhoReinforced, [73])} In reality, the game is rigged—the chicken only ever pushes a single button, and the move to be played is chosen by a computer.{cite(BirdBrainManual)}</p>
      <h2>Audio Credits</h2>
      <p>All audio is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC-BY-NC-SA 3.0</a>. Pronunciations are by:</p>
      <ul>
        <li><span lang="sv">tripp, trapp, trull</span> &copy; <a href="https://forvo.com/user/tigris/">tigris</a>.</li>
      </ul>
      </section>);
};

export default TicTacToe;