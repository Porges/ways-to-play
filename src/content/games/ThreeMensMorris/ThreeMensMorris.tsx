import * as React from 'react';
import { Cite, Description, Footnote, Section } from 'ui';
import { GameRef } from '../Game';

const ThreeMensMorris: React.FC = () => (<>
    <Description>Three Men’s Morris is an ancient <a href="/articles/mill-games/">mill game</a> game for 2 players.</Description>
    <Section title="Play">
        <p>There are two ways to begin the game: either players take turns placing a piece on one of the empty points, or the pieces are lined up on two opposite sides of the board.</p>
        <p>Starting the game by playing to the centre of the board is a forced win for the first player, so usually this move is banned.<Cite r="WinningWaysV3" page={737} /> </p>
        <p>After placing all their pieces, the players then take turns moving a piece from one point to another. The first player to get three pieces in a line (aside from on their starting locations, if using the lined-up opening) wins.</p>
    </Section>
    <Section title="History and Nomenclature">
        <p>As evidenced by the many boards carved into stone walls and seats in cathedrals and monasteries, the game was played in England over a long period – Murray<Cite r="Murray2" page={41} /> dates it from after the Norman conquest in the 11th century, and states that it was “well established by 1300.” However, the game seems to have declined until in the 19th century it was not well known in England; English visitors to Ireland describe it as an Irish game.</p>
        <p>In 19th century Ireland, it was described as ‘universally’ played by the peasantry and named <span lang="ga">caisleáin gearr</span><Footnote>Hyde<Cite r="Hyde" page={211} /> wrote this as “cashlan gherra”.</Footnote> ‘short castle’,<Cite r="CrokerCrofton" page={171} /> or ‘top castle’.<Cite r="GentlemansMagazineLibrary" page={257} /> Other old names in the United Kingdom come from areas such as Galloway (‘corsi-crown’)<Cite r="Gallovidian" page={142} /> and Cumberland (‘copped-crown’).<Cite r="Hyde" page={211} /></p>
        <p>The name Three Men’s Morris seems to be a modern invention, based on the name <GameRef id="nine-mens-morris" />. In the past it was known by other names in England, such as “knockings in and out”.<Cite r="NotesOnTheAbbey" page={20} /><Cite r="OnTheIndoorGamesOfSchoolBoys" page={321} /> It has also been called “Ovid’s Game”, based on its similarity to a game that is vaguely described in Ovid’s <a href="https://en.wikipedia.org/wiki/Ars_Amatoria"><cite lang="la">Ars Amatoria</cite></a>.<Cite r="WinningWaysV3" page={736} /></p>
        <p>Murray<Cite r="Murray2" /> claims that a distinct game called ‘Nine Holes’ existed, but I don’t believe that it was a separate game to Three Men’s Morris, as all the references seem to track back to a single entry in Robert Nares’ <cite>Glossary</cite>.<Cite r="NaresGlossary" page={345} /></p>
        <p>Writing in 1694,<Cite r="Hyde" page={211} /> Hyde said it (or the variant where 3 pieces line up on each side to begin with) was called “Che-Lo” in Chinese (i.e.  <span lang="zh-Hant">直六</span> <span lang="cmn-Latn">zhí liù</span> ‘straight six’), “Hugjurè” in Persian (probably <span lang="fa">هجوره</span> (“his majesty”?), but he also said that each player has 6 pieces).</p>
        <p>In other parts of the world, it is known as Tapatan in the Philippines, or <span lang="yue-Hans-HK">六卒棋</span> (<span lang="yue-Latn">luk<sup>6</sup> zeot<sup>1</sup> kei<sup>4</sup></span> ‘six man game’) in southern China.<Cite r="CulinPhilippine" page={648} /><Footnote>Note that <Cite r="Bell" inline /> confuses its sources here and claims that Hyde states that “Luk Tsut K’i” was played in the time of Confucius.</Footnote></p>
        <p>In Bengal the game has been called <span lang="bn">তাঁত ফাঁত</span> <span lang="bn-Latn">Tant Fant</span> (possibly meaning something like ‘<a href="https://en.wikipedia.org/wiki/Shm-reduplication">Loom-Schmoom</a>’) or <span lang="bn">তিন গুটি পাইত পাইত</span> (<span lang="bn-Latn">tin-guṭi pait pait</span>, ‘getting(?) three pieces’). It is played with diagonals and lined-up setup.</p>
        <p>To write up: Tapatan, Picaria.</p>
        <p>See also: Picaria in <Cite inline r="Zaslavsky" />, <Cite inline r="TicTacToe" />.</p>
        <p>Also called (with diagonals) Hopscotch, in <Cite r="MathematicalRecreationsMaurice" page={267} inline />, but I think that name is better reserved for Picaria.</p>
    </Section>
    <Section title="To Check">
        * Terni Lapilli
        * Three Men’s Marriage
    </Section>
    <Section title="Variants">
        <Section title="Circular Three Men’s Morris">
            <p>In this version the game is played on a circular board with ‘spokes’, meaning that mills can only be made across the center point. <Cite r="Zaslavsky" page={[[4, 5]]} inline /> calls it Shisima, and says it is played in Kenya.<Footnote>The original reference for this seems to be <cite>African Games of Strategy: A teaching manual</cite> by Louise Crane, but I haven’t been able to view this work.</Footnote> It has also been published as ‘Tri-Pin’ by Louis Marx & Co., Swansea, UK.</p>
            <p>See <Cite r="HeimannLoop" inline /> for analysis of the game.</p>
        </Section>
        <Section title="X-ceter-O">
            <p><a href="https://boardgamegeek.com/boardgame/21951/x-ceter-o">X-ceter-O</a> (or <span lang="de">X-für-O</span> in Germany) has 6 pieces numbered #1–#6, alternating between sides. The pieces must be placed or moved in order (and can leap to any unoccupied square), looping back to #1 after #6 has been moved.</p>
        </Section>
        <Section title="King">
            <p><a href="https://boardgamegeek.com/boardgame/22452/king">King</a> (Jim Wilkinson, 1985, Paradigm Games). A commercial implementation. No first play to centre, and pieces may move on the long diagonals.</p>
        </Section>
        <Section title="Chung Toi">
            <p><a href="https://boardgamegeek.com/boardgame/11557/chung-toi">Chung Toi</a> (Reginald Chung, 1994, multiple publishers).  Each player’s pieces are octagonal, and have a cross incised upon the top. After the placement phase, a piece can move one or two squares (jumping is allowed) in any of the four directions that the cross is pointing, and may also rotate.</p>
            <p>A piece may also rotate without moving instead, as long as it changes orientation (i.e. passing without changing the board is not permitted).</p>
        </Section>
    </Section>
    <Section title="Other References">
        <p>General references are: <Cite inline r="OxfordBG" page={116} />, <Cite inline r="Bell" page={91} />, and <Cite r="Murray2" inline page={41} /></p>
    </Section>
    <Section title="See Also">
        <p><GameRef id="achi" /> is often mis-described as a three-men’s-morris game (e.g. in <Cite r="TicTacToe" inline />), based on a misreading of the description in <Cite r="Murray2" inline />.</p>
    </Section>
</>);

export default ThreeMensMorris;
