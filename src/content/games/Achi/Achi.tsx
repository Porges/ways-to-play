import * as React from 'react';
import { ArticleImage, Cite, Description, Footnote, Noun, Section } from 'ui';

import imgMediumMerels from 'content/articles/mill-games/medium_merels.svg';
import imgExamples from './achi_examples.svg';
import { GameRef } from '../Game';

const Achi: React.FC = () => (<>
    <Description><Noun lang="ee">Achi</Noun> is a <a href="/articles/mill-games/">mill game</a> from West Africa, reportedly (in the 1920s) played in Ghana and by Yoruba people in Nigeria, where it is known as <Noun lang="yo">Akidada</Noun>.<Cite r="Murray2" page={43} /></Description>
    <p>The game is very similar to Five Men’s Morris, but an additional form of mill is permitted, compared to the standard game. The game as reported below was recorded by <a href="https://en.wikipedia.org/wiki/Kenneth_Murray_(archaeologist)">Kenneth Murray</a>, son of <a href="/articles/people/hjr-murray/">H. J. R. Murray</a> and Nigeria’s first surveyor of antiquities.</p>
    <p>It is possible that the name should really be transcribed <span lang="ee">adji</span>, the name of a plant (<a href="https://en.wikipedia.org/wiki/Guilandina_bonduc"><cite>Caesalpinia bonduc</cite></a>) that has large grey seeds suitable for use as gaming pieces.<Cite r="LocalPlantNames" /> The same name is also used for a mancala game, so the name could be generic for all games played with these seeds.<Footnote>See also <Cite r="AdjiBoto" inline />.</Footnote></p>
    <Section title="Play">
        <ArticleImage
            size="small"
            src={imgMediumMerels}
            alt="">
            <Noun lang="ee">Achi</Noun> is played on the medium-sized mill board.
        </ArticleImage>
        <p>Each player has six pieces. To begin the game, players take turns placing a single piece on any of the free points. If at any stage a player completes a mill, they can remove and capture any one of their opponent’s pieces.</p>
        <p>A valid mill, like in other mill games, consists of three pieces in a straight line. However, in <Noun lang="ee">Achi</Noun>, a mill may also be formed by <em>two</em> pieces on the central lines on either side.</p>
        <ArticleImage
            size="small"
            src={imgExamples}
            alt="">
            Two examples of valid mills; the two-piece mill is unique to <Noun lang="ee">Achi</Noun>.
        </ArticleImage>
        <p>Once a player has placed all their pieces, they then move one piece at a time from a point to any free point, along a line, attempting to form a mill. A player that is reduced to two pieces loses.</p>
    </Section>
    <Section title="See Also">
        <p><Noun lang="ee">Achi</Noun> is sometimes misreported as a <GameRef id="three-mens-morris" /> game.</p>
    </Section>
</>);

export default Achi;
