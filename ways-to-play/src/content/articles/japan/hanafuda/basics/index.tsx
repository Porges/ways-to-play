import * as React from 'react';

import { Noun, Footnote, Pronunciation, ArticleImage, ArticleContentProps } from 'ui';

import img5Brights from '../5_brights.jpg';
import img5BrightsKr from '../5_brights_kr.jpg';
import imgAutumnMaples from '../Autumn_Maples_with_Poem_Slips.jpg';

import pronHikari from '../pronunciation_ja_光.mp3';
import pronTane from '../pronunciation_ja_種.mp3';
import pronKasu from '../pronunciation_ja_滓.mp3';
import pronTanzaku from '../pronunciation_ja_短冊.mp3';

import { ModernKoreanCards } from 'References/bibliography.json';

const Basics: React.FC<ArticleContentProps> = ({cite}) => {
    return (<>
        <section id="composition-of-the-deck">
            <h3>Composition of the deck</h3>
            <p><Noun lang="ja-Latn">Hanafuda</Noun> decks comprise 12 ‘suits’ of 4 cards each, giving 48 cards total. Each suit corresponds to a month, and is represented on the cards by a plant related to that month.</p>
            <p>In Korean and some Hawaiian decks, the months of November &amp; December are switched. This rarely makes a difference except when the cards are being used as stand-ins for numeric cards (in gambling games).</p>
            <section id="types-of-card">
                <h4>Types of card</h4>
                <p>The deck is divided into four categories of card. In descending order of value, there are:</p>
                <ArticleImage
                    position="small"
                    src={img5Brights}
                    alt="TODO">
                    The five bright cards, from a standard <Noun lang="ja-Latn">Nintendo</Noun> deck.
                </ArticleImage>
                <ul>
                    <li>
                        <Footnote>
                            <p><span className="footnote-marker">‡</span> <Noun lang="ja-Latn">Maeda Masafumi</Noun> (<span lang="ja">前田雅文</span>, <abbr title="died">d.</abbr> 1998) of the manufacturer <Noun lang="ja-Latn">Ōishi Tengudō</Noun> has stated that this was actually a trademark-like feature that they used, which was picked up by the Korean manufacturers as a standardized marking.{cite(ModernKoreanCards)}</p>
                        </Footnote>
                        5 ‘bright’ (<span lang="ja">光</span> <Pronunciation src={pronHikari} lang="ja-Latn">hikari</Pronunciation>) cards. In some decks, especially Korean ones, these are marked with the 光 character for ease of identification.<span className="footnote-marker">‡</span>  The five bright cards are:
    <ul>
                            <li>the crane with pine (January)</li>
                            <li>the cherry blossom curtain (March)</li>
                            <li>the full moon (August)</li>
                            <li>the rain man (November)</li>
                            <li>the phoenix (December)</li>
                        </ul>
                    </li>
                </ul>
                <ArticleImage position="small" src={img5BrightsKr} alt="TODO">
                    The five bright cards, from a Korean Clown brand deck.
                </ArticleImage>
                <ul>
                    <li>9 ‘species’ (<span lang="ja">種</span> <Pronunciation src={pronTane} lang="ja-Latn">tane</Pronunciation>) cards. These feature animals, but also a sake cup, and the ‘eight-planked bridge’.</li>
                    <li>10 ‘scroll’ (<span lang="ja">短冊</span> <Pronunciation src={pronTanzaku} lang="ja-Latn">tanzaku</Pronunciation> cards. These are the cards with the coloured ‘scrolls’ on them. Small pieces of paper were used to write poems on at poetry competitions (see the image below). For some games these are further subdivided into three sub-groups: scrolls with writing, plain red scrolls, and plain blue/purple scrolls.</li>
                    <li>24 ‘dregs’ (<span lang="ja">滓</span> <Pronunciation src={pronKasu} lang="ja-Latn">kasu</Pronunciation>) or ‘junk’ cards. This is everything that isn’t in one of the previous categories.</li>
                </ul>
                <p>In many games these cards will carry point values of 20, 10, 5, and 1, but this can vary. In some modern decks these values are printed on the cards.</p>
                <p>Korean decks often contain extra (up to 6) joker cards.</p>
                <ArticleImage
                    alt="A screen with a painting of a maple tree in autumn colours, with many tanzaku hanging from its branches."
                    position="wide"
                    src={imgAutumnMaples}
                    source={{
                        originalUrl: "https://www.artic.edu/artworks/127644/autumn-maples-with-poem-slips",
                        license: 'cc0',
                        organization: { orgName: 'The Art Institute of Chicago' }
                    }}>
                    <cite>Autumn Maples with Poem Slips</cite> (c. 1675)<br /><cite lang="ja">櫻楓短冊圖</cite><br />A six-panel screen (one of a pair) by <Noun lang="ja-Latn">Tosa Mitsuoki</Noun> (<span lang="ja">土佐 光起</span>, 1617–1691)
                </ArticleImage>
            </section>
        </section>
        <section id="audio-credits">
            <h2>Audio Credits</h2>
            <p>All audio is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC-BY-NC-SA 3.0</a>. Pronunciations are by:</p>
            <ul>
                <li><span lang="ja">短冊</span> © <a href="https://forvo.com/user/skent/">skent</a>.</li>
                <li><span lang="ja">光</span> © <a href="https://forvo.com/user/strawberrybrown/">strawberrybrown</a>.</li>
                <li><span lang="ja">種</span> © <a href="https://forvo.com/user/yasuo/">yasuo</a>.</li>
                <li><span lang="ja">滓</span> © <a href="https://forvo.com/user/poyotan/">poyotan</a>.</li>
            </ul>
        </section>
    </>);
}

export default Basics;