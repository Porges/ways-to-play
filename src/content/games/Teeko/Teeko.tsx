import { ArticleImage, Cite, Description, Section } from "ui";

import imgTeeko from './teeko.svg';
import imgTeekoHorizLine from './teeko-line.svg';
import imgTeekoVertLine from './teeko-vertline.svg';
import imgTeekoDiagLine from './teeko-diag.svg';
import imgTeekoSquare from './teeko-square.svg';
import imgTeekoSquare2 from './teeko-square-2.svg';
import imgTeekoSquare3 from './teeko-square-3.svg';
import imgTeekoSquare4 from './teeko-square-4.svg';

const Teeko: React.FC = () => <>
    <Description>Teeko is a game for two players by John Scarne.</Description>
    <Section title="History">
        <p>Teeko was developed over a period of 15 years by John Scarne.<Cite r="Teeko" /> With the usual Scarne bombast and confidence, he believed that it was a game to rival chess and checkers, and that it would eventually rank alongside (or above) them. Nowadays it is barely known.</p>
        <p>The game was first published by Scarne in 1955 in the book <Cite r="Teeko" inline />. This is possibly the only game rulebook ever produced that has had <a href="https://www.quinapalus.com/musical.html">an opera written about it</a>!</p>
        <p>His (future) wife Steffi Storm is described in the book as a “top-ranking Teeko player”, although she would later state that “if I win, it’s by dumb luck.”<Cite r="AWorldOfGames" /> Scarne thought so much of Teeko that he would later name their son (John Teeko Scarne) after it.<Cite r="AWorldOfGames"/></p>
    </Section>
    <Section title="Equipment">
        <p>Teeko is played with four pieces per player (usually in red and black), and a special board (although it can also be played on a standard chess/checkers board):</p>
        <ArticleImage
            src={imgTeeko}
            alt="">
            Teeko is played on the points of a 5×5 grid.
        </ArticleImage>
    </Section>
    <Section title="Play">
        <p>The aim of the game is to create a straight line of four pieces, along the horizontal, vertical, or diagonal lines on the board, or alternately, to form all four pieces into a square. There are 44 distinct winning positions.</p>
        <ArticleImage
            size="wide"
            src={[
                [imgTeekoHorizLine, ""],
                [imgTeekoVertLine, ""],
                [imgTeekoDiagLine, ""],
                [imgTeekoSquare, ""],
            ]}>
            Examples of winning positions in Teeko.
        </ArticleImage>
        <p>In the placement phase of the game, players take turns putting one piece at a time onto any empty space on the board. If a player can make a line or square with all four pieces, then they win, otherwise the movement phase begins. During the movement phase, players take turns moving any of their pieces along a line to another empty space. Whoever can first form a line or square wins.</p>
    </Section>
    <Section title="Variations">
        <Section title="Advanced Teeko">
            <p>In Advanced Teeko, squares can also be made in “extended” form, with gaps between the pieces:</p>
            <ArticleImage
                src={[
                    [imgTeekoSquare2, ""],
                    [imgTeekoSquare3, ""],
                    [imgTeekoSquare4, ""],
                ]}>
                Examples of extended squares in Advanced Teeko.
            </ArticleImage>
            <p>In Advanced Teeko there are 58 distinct winning positions.</p>
        </Section>
        <Section title="Alternate Teeko">
            <p>In Alternate Teeko, during the placement phase, each player’s pieces are placed <em>by their opponent</em>, instead of by the player that owns the pieces. The opponent may also ‘pass’ to allow the owning player to place the piece where they wish.</p>
        </Section>
    </Section>
    <Section title="Analysis">
        <p>Solving Teeko was suggested as Item 90 in the “HAKMEM” memo.<Cite r="HAKMEM" /> Guy Steele proved that the basic game is a draw if played perfectly, and that the advanced game is a first-player win.<Cite r="SteeleTeeko" /></p>
    </Section>
</>;

export default Teeko;
