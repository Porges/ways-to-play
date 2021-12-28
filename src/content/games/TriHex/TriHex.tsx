import * as React from 'react';
import { ArticleImage, Cite, Description, Section } from 'ui';
import { GameRef } from '../Game';

import imgTriHex from "./tri-hex.svg";

const TriHex: React.FC = () => <>
    <Description>Tri-Hex is a <a href="/articles/mill-games">mill game</a> that was invented by T. H. O’Beirne in 1962. It was first described in an article in <cite>New Scientist</cite> magazine, and was derived by exploring alternate board configurations for <GameRef id="tic-tac-toe" />.<Cite r="TriHex" /></Description>
    <Section title="Rules">
        <ArticleImage
            src={imgTriHex}
            alt="">
            The Tri-Hex board.
        </ArticleImage>
        <p>Each player has four pieces, which are first (the placement phase) placed one at a time on the board. Once all the pieces are on the board, players take turns moving a single piece along a line to the (single) vacant location. The first player to form a row of three along a line wins the game (this can be during either of the placement or movement phases).</p>
        <p>O’Beirne provides analysis of the play in the original article (below in References).</p>
    </Section>
</>;

export default TriHex;
