import * as React from 'react';

// import { GameRef } from 'content/games/Game';
import { ArticleImage, Cite, Section, Noun, Description, Pronounce } from 'ui';

import pronShax from './pronunciation_so_shax.mp3';
import imgBoard from '../../articles/mill-games/large_merels.svg';
/*
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a
href="https://twitter.com/hashtag/Shax?src=hash&amp;ref_src=twsrc%5Etfw">#Shax</a>
Somali traditional Board game on <a
href="https://twitter.com/hashtag/HIBF2017?src=hash&amp;ref_src=twsrc%5Etfw">#HIBF2017</a>
<a href="https://t.co/Zcf3S04xY2">pic.twitter.com/Zcf3S04xY2</a></p>&mdash;
🐪Tirsit Yetbarek (\@tirsity) <a
href="https://twitter.com/tirsity/status/890503033280507904?ref_src=twsrc%5Etfw">July
27, 2017</a></blockquote>
*/

const Shax: React.FC = () => {
    return <>
        <Description>
            <Pronounce word="Shax" file={pronShax} lang="so" noun pronouncer="ahmed_aw_abdi" /> is a <a href="/articles/mill-games">mill game</a> from Somalia. In central and southern regions of Somalia it is called <span lang="so">jare</span> (‘cut’).<Cite r="IntroductionToShax" page={1} /> Unlike most mill games, captures cannot be made during the placement phase.
        </Description>
        <Section title="History">
            <blockquote>Sometimes [the Bedouin] play at Shahh, Shantarah, and other games, of which they are passionately fond: with a board formed of lines traced in the sand, and bits of dry wood or camel’s earth acting pieces, they spend hour after hour, every looker-on vociferating his opinion, and catching at the men, till apparently the two players are those least interested in the game.<Cite r="FirstFootsteps" page={[[179, 180]]} /></blockquote>
            <p>The game is mentioned in many stories of Somali poets and leaders (and poet-leaders), such as <Noun lang="so">Garaad Xirsi Garaad Faarax</Noun> (commonly known as “<Noun lang="so">Wiil Waal</Noun>”, ‘crazy boy’), the early 19th century ruler of <a href="https://en.wikipedia.org/wiki/Jijiga"><Noun lang="so">Jigjiga</Noun></a> (now part of Ethiopia); <a href="https://en.wikipedia.org/wiki/Yusuf_Ali_Kenadid"><Noun lang="so">Yuusuf Cali Keenadiid</Noun></a> (1837–1911), <a href="https://en.wikipedia.org/wiki/Sultanate_of_Hobyo">Sultan of Hobyo</a>; and <a href="https://en.wikipedia.org/wiki/Mohammed_Abdullah_Hassan"><Noun lang="so">Sayid Maxamed Cabdulle Xasan</Noun></a> (1856–1920), leader of the <a href="https://en.wikipedia.org/wiki/Dervish_movement_(Somali)">Dervish movement</a>.<Cite r="IntroductionToShax" page={2} /></p>
        </Section>
        <Section title="Play">
            <Section title="Placement phase">
                <ArticleImage
                    position="right"
                    src={imgBoard}
                    alt="">
                    <Noun lang="so">Shax</Noun> is played on the large mill board, without diagonals.
                </ArticleImage>
                <p>Players take turns playing one of their pieces on a vacant point of the board.  Unlike Twelve Men’s Morris, completing a mill during this phase does not allow you to remove an opponent’s piece.</p>
                <p>Once all the pieces are on the board (and all 24 points are full), the player who first completed a mill removes one of their opponent’s pieces. If neither player completed a mill, the second player removes a piece.</p>
            </Section>
            <Section title="Movement phase">
                <p>Starting with the player who first completed a mill, players take turns moving one of their pieces along a line to a vacant space.</p>
                <p>Each time a player forms a mill, they may remove an opponent’s piece, and reducing the opponent to two pieces wins the game.</p>
                <p>If a player is completely blocked, the other player must make a move that allows them to move. If the ‘freeing’ move forms a mill, it may not capture. In this situation, traditionally the blocked player says <span lang="so">jid i sii aan jar aheyn</span> ‘give me a way without cutting’.</p>
                <p>There is no ‘flying’ rule.</p>
            </Section>
            <Section title="Scoring">
                <p>Scores are kept by tracking one player’s consecutive wins with stones that match their pieces, placed in the centre of the board. As soon as a winning player loses a game, any score they have accumulated is removed from the middle. A player that wins four games in a row wins a ‘pool’; five in a row is a ‘girl’. In the past a prospective husband would “win” his wife from her consenting father in this manner.<Cite r="SomaliGames" page={[[503,505]]} /></p>
            </Section>
        </Section>
        <Section title="General references">
            <p>Other general references include <Cite r="OxfordBG" inline/>, <Cite r="Zaslavsky" page={9} inline />, <Cite r="Murray2" page={48} inline />, <Cite r="BritishSomaliland" inline page={[[129, 133]]} />.</p>
        </Section>
    </>;
};

export default Shax;
