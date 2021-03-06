import * as React from 'react';
import { GameRef } from '../Game';

import { ArticleImage, Cite, Section } from 'ui';

import imgTakeItAway from './take-it-away.svg';

const TakeItAway: React.FC = () => <>
    <p><span id="index-take-it-away" className="game-title">Take It Away</span> is a game for 2–4 players invented by <a href="/people/sid-sackson.html">Sid Sackson</a>,<Cite r="Gamut" page={[[142, 143]]} /> in which players try to achieve the highest score by capturing from a shared set of pieces on the board.</p>
    <Section title="Equipment">
        <p>To play you will need an 8×8 chess or checkerboard, and 64 coloured pieces (Sackson suggests poker chips): 34 white, 20 red, and 10 blue.</p>
    </Section>
    <Section title="Setup">
        <p>Arrange the pieces randomly, one on each square of the board.</p>
        <ArticleImage
            src={imgTakeItAway}
            alt="A board randomly filled with white, red, and blue pieces.">
            A sample initial configuration.
        </ArticleImage>
    </Section>
    <Section title="Play">
        <p>The first player starts the game by removing any white chip from the board and placing it in front of themselves. This counts as one of their captured pieces. A captured piece counts as points at the end of the game: 3 points for a blue piece, 2 points for a red piece, and 1 point for white.</p>
        <p>After this, the players take turns jumping a piece over another (including diagonally) and capturing the jumped piece. Multiple jumps may be made, and direction can change during the jump sequence. If a jump can be continued then it must be.</p>
        <Section title="“Take It Away”">
            <p>A player can drop out of the game at the start of their turn by declaring “take it away”.</p>
            <p>The last player left in the game continues taking turns by themselves until they cannot make any more captures. The remaining pieces on the board count against their points at 2× (variation: 4×) their normal value.</p>
        </Section>
    </Section>
    <Section title="Variations">
        <Section title="Open game">
            <p>For the first 8 turns players simply remove a single white piece from the board. Play continues after this as usual.</p>
        </Section>
        <Section title="No dropping out">
            <p>A player cannot declare “take it away”, and no player is penalized for pieces remaining on the board.</p>
        </Section>
    </Section>
    <Section title="See also">
        <p><GameRef id="leap-frog" /> is a similar game.</p>
    </Section>
</>;

export default TakeItAway;
