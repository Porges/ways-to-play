import * as React from 'react';

import { ArticleImage, Cite, Footnote, Pronounce, Section } from 'ui';

import img7429 from './7429845046_ddc7a1464a_o.jpg';
import imageBab1 from './large_BAB_S20_0002.jpg';
import imageBab2 from './large_BAB_S20_0003.jpg';
import imgTickTack from './tick-tack-toe.png'
import img5072 from './5072574617_9afa5ee9ae_o.jpg';
import img8576 from './8576897675_c7c5785b4a_o.jpg'
import imgBirdBrain from './bird_brain.jpg';

import pronTrippTrapp from './pronunciation_sv_tripp,_trapp,_trull.mp3';

const TicTacToe: React.FC = () => <>
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
  <Section title="History">
    <p>The origins of tic-tac-toe are unclear. Many sources claim that it dates from antiquity, but to me it seems like a more recent invention—a degenerate version of [Three Men’s Morris]. Mentions of it only appear in the 19th century, and the game is very well suited to being played with chalk on slates—such as were used by children in schools during this period. Indeed, <Cite r="BerkshirePhrases" page={164} inline  /> describes the game as “the first game taught to children when they can use a slate pencil”.</p>
    <p>Some of the earliest known written references to the game occur in Charles Babbage’s unpublished manuscript ‘Essays
    on the Philosophy of Analysis’ (1812–1820, now held in the British Library as Add. MS&nbsp;37202), although the
      game is never mentioned by name.<Cite r="SourcesInRecreationalMathematics"/> In 1842, ‘tit-tat-to’ again occurs in
      his notebooks, when he conceptualizes an automaton that would play the game against a
      human.<Cite r="SourcesInRecreationalMathematics"/><Cite r="ICommencedAnExamination"/></p>
    <p>It also appears in 1818 in an article on the <a href="https://en.wikipedia.org/wiki/Monitorial_System">Lancasterian system</a>:<Cite r="LancasterianSystem"  /></p>
    <blockquote>
      One boy who is acquainted with the popular game of <i>checkers</i>, <i>fox and geese</i>, <i>tit-tat-to</i>, <i>hop skip and jump</i>, and a thousand other childish amusements,  will communicate all he knows to his school companions with surprising facility.
      </blockquote>
    <p>In 1830, Robert Taylor (an anti-clerical Radical, nicknamed “the Devil’s chaplain”) used tic-tac-toe as an example of a children’s game in his sermon “The Star of Bethlehem”:</p>
    <blockquote>
      Just as a fool, who has but seen the diagrams and delineations in the elements of Euclid, will make himself dead sure that all the mathematics in the world could have consisted in nothing more than in making hobscotches [hop-scotch], and catgallowses [a high-jump], and scratchcradles [cat’s cradle], to play at tit-tat-toe with.
      </blockquote>
    <ArticleImage
      size='wide'
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
      Some of Babbage’s notes on “Tit-Tat-To”, dated 15th–16th September 1860
      </ArticleImage>
  </Section>
  <Section title="Terminology">
    <p>In English, tic-tac-toe has gone by many names. It has been variously called ‘tit-tat-to(e)’,
      ‘tic(k)-tac(k)-to(e)’, ‘(n)oughts &amp; crosses’, ‘crisscross’, ‘tip-tap-toe’,<Cite r="Teesdale" page={136} /><Cite r="NotesAndQueriesS8V12"
      page={333} /> ‘Exeter’s Nose’ (a pun on ‘<i>X</i>s and <i>O</i>s’),<Cite r="SourcesInRecreationalMathematics"/> or
      ‘kit-cat-cannio’.<Cite r="SuffolkWords" page={200} /></p>
    <p>These names mostly derive from several old counting-out rhymes — think ‘eeny meeny miny mo’ — that begin with ‘tit, tat, toe’. These rhymes date from at least the early 18th century: in 1725, <Cite r="ANewCantingDictionary" inline /> described ‘Tit-Tat’ as “the aiming of Children to go at first”.</p>
    <p>The fullest expression of this rhyme is along the lines of:</p>
    <blockquote>
      Tit, tat, toe,<br />
      My first go,<br />
      Three jolly butcher boys<br />
      All in a row;<br />
      Stick one up,<br />
      Stick one down,<br />
      Stick one in the old man’s crown!<Footnote>Some sources (e.g. <Cite r="NurseryWitch" page={374} inline/>) give this last line as “… in the old man’s (burial-)ground!”; I have no idea what this means.</Footnote>
      </blockquote>
    <p>In the later 19th century, this children’s rhyme became the basis of songs in several musicals:</p>
    <blockquote>
      Insert one here!
      </blockquote>
    <p>Aside from its use as a counting-out rhyme, ‘tit-tat-to’ was used to refer to any set of lined-up objects. (Examples: Bluebeard’s wives, the windows on a building.) This usage is still current with the Swedish equivalent of <Pronounce file={pronTrippTrapp} lang="sv" pronouncer="tigris" word="tripp, trapp, trull" /> (see below).</p>
    <ArticleImage
      position="right"
      src={imgTickTack}
      alt="A drawing of children playing ‘tick-tack-toe’ on a circular board drawn on the sidewalk."
      source={{ license: 'cc0' }}>
      Children playing a <em>different</em> game of ‘tick-tack-toe’ (by F. J. Shields, as reproduced in <Cite r="MagazineOfArt" page={136} inline/>).
      </ArticleImage>
    <p>The same rhyme and name were also used for an unrelated game, using a circular board, in which a player
      would attempt to locate high-scoring sections of a circle while blindfolded.<Cite r="GamesBookForBoysAndGirls"
      page={55}/></p>
    <p>There seems to be a distinction we can draw between languages that have folkish names and those that have more functional names derived from the outward appearance or goal of the game.</p>
    <Footnote standalone>
      <Cite r="SkeatTitTatTo" inline  /> also gives the Frisian name “<span lang="ofs">Tik-Tak-Tuk</span>” as a possible source for the English phrase, but after examining his source,<Cite r="Koolman" page={410} /> it is the name of a different game similar to <span lang="de">Rösselsprungrätsel</span>. However, it does come with its own rhyming phrase: <span lang="nl">„tik-tak-tuk, hê sitt in ’t huk”</span>. Interestingly, “Tik-Tak-Tuk” is also the name of the game in Indonesian.
    </Footnote>
    <p>In the ‘folkish’ group we have examples like the Dutch ‘<span lang="nl">tik tak tol</span>’,<Cite r="Fiske" page={122} /> or ‘<span
      lang="nl">boter-kaas-en-eieren</span>’ (‘butter cheese and eggs’); and the Swedish ‘<Pronounce
        file={pronTrippTrapp} lang="sv" word="tripp, trapp, trull" pronouncer="tigris" />’.<Cite r="Fiske" page={137} /></p>
    <p>Like the English names, one Dutch name (<span lang="nl">boter, melk, kaas</span>) is derived from a rhyme:<Cite r="WinningWaysV3" page={732} /></p>
    <div className="multi text-center">
      <p lang="nl">Boter, melk, kaas,<br />ik ben de baas.</p>
      <p>Butter, milk, cheese,<br />I am the boss.</p>
    </div>
    <p>Sweden had a similar rhyme:<Cite r="GamesOfTheGods" page={163} /></p>
    <div className="multi text-center"> <p lang="sv">Tripp, trapp, trull,<br />min kvarn är full.</p> <p>Tripp, trapp, trull,<br />my mill is full.</p>
    </div>
    <p>In the ‘functional’ group of names are those like the Arabic <span lang="ar">لعبة إكس-أو</span> ‘the <i>X</i>–<i>O</i> game’; or the Chinese <span lang="zh">圈圈叉叉</span> ‘circles &amp; crosses’, or <span lang="zh">井字棋</span> ‘<code>井</code> character game’.</p>
    <p>The languages with ‘folkish’ names also tend to have ‘functional’ names as well; an alternate Swedish name
      is ‘<span lang="sv">tre-i-rad</span>’ (‘three in a row’), and Dutch has the straightforward ‘<span lang="nl">kruisje rondje</span>’
      (‘cross circle’).</p>
    <p>On the other hand, the English poet Wordsworth didn’t think the game was worthy of a name at all. In <cite>The Prelude</cite>, he describes playing the game as a child:<Cite r="Wordsworth" page={[[538, 544]]} pageType="lines"   /></p>
    <blockquote>
      Eager and never weary we pursued  <br />
      Our home-amusements by the warm peat-fire  <br />
      At evening, when with pencil and smooth slate,  <br />
      In square divisions parcelled out, and all  <br />
      With crosses and with cyphers<Footnote>“cyphers” here means “zeroes”</Footnote> scribbled o’er  <br />
      We schemed and puzzled, head opposed to head  <br />
      In strife too humble to be named in verse
      </blockquote>
    <ArticleImage
      size="wide"
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
  </Section>
  <Section title="Play">
    <p>You know this, right?</p>
  </Section>
  <Section title="Strategy">
    <p>See, e.g. <Cite r="Gardner1" page={[[37, 46]]} inline  />.</p>
    {/*<!-- It is claimed that “yih” 弈 is an old name for the game. No, this is go, or maybe
      something older. -->*/}
  </Section>
  <Section title="Variants">
    <Section title="The 15 Game">
      <p>This game is also known as “Number Scrabble”<Cite r="TheGameOfJAM"  /> or “Pick15”.</p>
      <p>
        To play: Write down the numbers from 1–9 on a piece of paper. Each turn,
        a player claims a number for themselves by marking it, and a number can only be
        claimed by one player. The first player to claim 3 numbers that add to 15 is the winner.
      </p>
      <p>
        This game is isomorphic to the game of tic-tac-toe. Astonishingly, this form was
        invented by Babbage in his initial analysis of the game.<Cite r="MathematicalWorkOfBabbage" page={127} />
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
    </Section>
    <Section title="JAM">
      <p>
        This is another isomorphic variant invented by John Michon.<Cite r="TheGameOfJAM" /> It is the <a href="https://en.wikipedia.org/wiki/Dual_graph">graph theory dual</a> of the standard game, where each cell is replaced by a line and each winning line by a cell, in such a way that each cell-line intersects the appropriate winning-line cells.
      </p>
    </Section>
    <Section title="Spit">
      <p>
        Yet another isomorphic variant is played as follows:<Cite r="WinningWaysV3" page={732} />
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
    </Section>
    <ArticleImage
      size="wide"
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
  </Section>
  <Section title="Computer Implementations">
    <p>Being a simple game, Tic-Tac-Toe is easily implemented on a computer, and so was one of the first
      computerized games. Some early versions include:</p>
    <ul>
      <li><a href="https://en.wikipedia.org/wiki/Bertie_the_Brain"><cite>Bertie the Brain</cite></a> (analog, 1950)</li>
      <li><a href="https://en.wikipedia.org/wiki/OXO"><cite>OXO</cite></a> (for the EDSAC, 1952)</li>
      <li><cite>Relay Moe</cite><Cite r="RelayMoe"  /> (relay-based, 1956), the first to be programmed with a variable
        strategy and with a chance of making a mistake</li>
    </ul>
    <p>Chickens have also been trained to ‘play’ the
      game.<Cite r="CrossOutALandmark"  /><Cite r="TheChickenVanishes"  /><Cite r="ChinatownFairIsBack"  /> The first of these games, “Bird Brain”, was developed in the late 1970s by Animal Behavior Enterprises, a company founded by Marian &amp; Keller Breland, who were students of B. F. Skinner, the behavioural psychologist.<Cite r="TheMouseWhoReinforced" page={73} /> In reality, the game is rigged—the chicken only ever pushes a single button, and the move to be played is chosen by a computer.<Cite r="BirdBrainManual"  /></p>
    <ArticleImage src={imgBirdBrain}
      alt=""
      source={{
        originalUrl: "http://n2t.net/ark:/65665/ng49ca746ab-6f36-704b-e053-15f76fa0b4fa",
        copyrightYear: 2004,
        organization: {
          orgName: "Smithsonian"
        },
        license: "us-fair-use"
      }}>
      A surviving copy of Animal Behaviour Enterprises’ Bird Brain game.
    </ArticleImage>
  </Section>
</>;

export default TicTacToe;
