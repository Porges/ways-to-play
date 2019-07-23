import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const About: React.FC = () => (
    <Row>
        <Helmet>
            <title>About</title>
            <body itemScope itemType="http://schema.org/AboutPage" />
        </Helmet>
        <Col />
        <Col lg="6">
            <article>
            <h1>About</h1>
            <p className="lead text-center">This is a site about games<br/>and how to play them.</p>
            <h2 id="why">Why?</h2>
            <p>As Alan Ferg says in <cite>Playing Cards of the Apaches</cite> (p. 35):</p>
            <blockquote>
            <p>In the introductory remarks to her encyclopedic <em>All Cards on the Table</em>, renowned card historian Sylvia Mann talked about researching playing cards as “a limitless source of instruction and pleasure,” her “way into history.” She remarked (1990:Vol. I:9, 10), “Personally, I have acquired, through application and countless reference works and the talents of other collectors, some knowledge about a lot of subjects hitherto outside my interests…” This was equally true for the Waylands for four decades, and then for me, too. We pursued with enthusiasm a host of “peripheral” topics to ensure a complete understanding of the context of card playing in the New World: Copey trees, paper-making in Mexico, laws prohibiting gambling, how to prepare rawhide, the New World origin of Monte, how to date beads and buttons, the history of clothing in northern Mexico, Native American painting techniques and preparation of pigments, World’s Fairs, Papago place names, scanning electron microscope examinations of stubs of hairs on cards, archaeological excavations in New Mexico, Araucanian painted guanaco-hide cloaks from Chile, Santa Anita Race Track, John Wayne movies, and thumbnail sketches of a seemingly endless list of museum curators and U.S. Army personnel.</p>
            </blockquote>
            <p>… have you read W. G. Sebald’s <cite>Rings of Saturn</cite>? Games are a foothold into other cultures and other times.</p>
            <h2 id="a-note-on-languages">A note on languages</h2>
            <p>Where possible I have tried to supply terms in their original languages, in preference to the romanized forms found in most books. The main reason for doing this is that it’s possible to search using the original terms and find references from the people who are actually playing these games.</p>
            <p>However, since I am not fluent in any language other than English, this has been difficult. If you have any corrections to supply then I am happy to update them.</p>
            <p>Another reason is that romanization schemes change over time, so as time passes it is increasingly hard to recover the original form. Using the original terms where possible helps with this problem.</p>
            <h2 id="copyright">Copyright</h2>
            <p>Unless otherwise noted, all content on this site, including all images, is under my copyright (George Pollard). This content is licensed under the Creative Commons <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Attribution-NonCommercial-ShareAlike 4.0 International</a> license (CC BY-NC-SA). This means that you may reuse the content, but you must credit me as the author, you may not charge money for your derivative work, and your work must be released under the same license.</p>
            <p>Any content that is not created by me has its copyright status or license noted on it (and in metadata on the page). Please check these licenses before reusing any of this material, to confirm that you are complying with their terms.</p>
            <p>Images from Instagram are <a href="https://www.instagram.com/developer/embedding/">embedded</a> in a way that comports with the <a href="https://help.instagram.com/581066165581870">Instagram terms of use</a>.</p>
            <p>The favicon is by <a href="https://www.freepik.com/"
            title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"
            title="Flaticon">www.flaticon.com</a>, and is licensed under <a
            href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY
            3.0">CC 3.0 BY</a>.</p>
            <p><a href="https://wakufactory.jp/densho/font/hentai/">UniHentaiKana</a> is used as a fallback font for <span lang="ja-Latn">hentaigana</span> characters. It is licensed under the <a href="https://opensource.org/licenses/IPA">IPA Font License</a>.</p>
            <p>A modified version of the <a href="https://cc-icons.github.io/">Creative Commons Web Font</a> (1.2.0) by Ricardo Barros is used to indicate licensing information. Both the font and my modifications are licensed under the <a href="https://creativecommons.org/licenses/by/4.0/">CC 4.0 BY</a> license.</p>
            <h2 id="colophon">Colophon</h2>
            <p>The site is generated with React, using react-snap to output HTML pages. The fonts are generally from <a href="https://www.typography.com/">Hoefler &amp; Co.</a> (Mercury, Gotham, Archer, Deuce).</p>
            </article>
        </Col>
        <Col/>
    </Row>
);