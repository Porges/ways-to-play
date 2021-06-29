import * as React from 'react';

import { Noun, Footnote, ArticleImage, Section, Pronounce, Cite, SourceInfo } from 'ui';

import img5Brights from '../5_brights.jpg';
import img5BrightsKr from '../5_brights_kr.jpg';
import imgAutumnMaples from '../Autumn_Maples_with_Poem_Slips.jpg';
import img1620 from '../16201732242_8d1d3ed19d_o.jpg'

import pronHikari from '../pronunciation_ja_光.mp3';
import pronTane from '../pronunciation_ja_種.mp3';
import pronKasu from '../pronunciation_ja_滓.mp3';
import pronTanzaku from '../pronunciation_ja_短冊.mp3';
import pronHanafuda from '../pronunciation_ja_花札.mp3';
import pronHwatu from '../pronunciation_ko_화투.mp3';

import imgHanafuda1_3 from '../Hanafuda_1-3.svg';
import imgHanafuda2_3 from '../Hanafuda_2-3.svg';
import imgHanafuda3_3 from '../Hanafuda_3-3.svg';
import imgHanafuda4_3 from '../Hanafuda_4-3.svg';
import imgHanafuda5_3 from '../Hanafuda_5-3.svg';
import imgHanafuda6_3 from '../Hanafuda_6-3.svg';
import imgHanafuda7_3 from '../Hanafuda_7-3.svg';
import imgHanafuda9_3 from '../Hanafuda_9-3.svg';
import imgHanafuda10_3 from '../Hanafuda_10-3.svg';
import imgHanafuda11_2 from '../Hanafuda_11-2.svg';

import imgHanafuda1_4 from '../Hanafuda_1-4.svg';
import imgHanafuda3_4 from '../Hanafuda_3-4.svg';
import imgHanafuda8_4 from '../Hanafuda_8-4.svg';
import imgHanafuda11_4 from '../Hanafuda_11-4.svg';
import imgHanafuda12_4 from '../Hanafuda_12-4.svg';

import imgHanafuda2_4 from '../Hanafuda_2-4.svg';
import imgHanafuda4_4 from '../Hanafuda_4-4.svg';
import imgHanafuda5_4 from '../Hanafuda_5-4.svg';
import imgHanafuda6_4 from '../Hanafuda_6-4.svg';
import imgHanafuda7_4 from '../Hanafuda_7-4.svg';
import imgHanafuda8_3 from '../Hanafuda_8-3.svg';
import imgHanafuda9_4 from '../Hanafuda_9-4.svg';
import imgHanafuda10_4 from '../Hanafuda_10-4.svg';
import imgHanafuda11_3 from '../Hanafuda_11-3.svg';

import imgHanafuda1_2 from '../Hanafuda_1-2.svg';
import imgHanafuda1_1 from '../Hanafuda_1-1.svg';
import imgHanafuda2_2 from '../Hanafuda_2-2.svg';
import imgHanafuda2_1 from '../Hanafuda_2-1.svg';
import imgHanafuda3_2 from '../Hanafuda_3-2.svg';
import imgHanafuda3_1 from '../Hanafuda_3-1.svg';
import imgHanafuda4_2 from '../Hanafuda_4-2.svg';
import imgHanafuda4_1 from '../Hanafuda_4-1.svg';
import imgHanafuda5_2 from '../Hanafuda_5-2.svg';
import imgHanafuda5_1 from '../Hanafuda_5-1.svg';
import imgHanafuda6_2 from '../Hanafuda_6-2.svg';
import imgHanafuda6_1 from '../Hanafuda_6-1.svg';
import imgHanafuda7_2 from '../Hanafuda_7-2.svg';
import imgHanafuda7_1 from '../Hanafuda_7-1.svg';
import imgHanafuda8_2 from '../Hanafuda_8-2.svg';
import imgHanafuda8_1 from '../Hanafuda_8-1.svg';
import imgHanafuda9_2 from '../Hanafuda_9-2.svg';
import imgHanafuda9_1 from '../Hanafuda_9-1.svg';
import imgHanafuda10_2 from '../Hanafuda_10-2.svg';
import imgHanafuda10_1 from '../Hanafuda_10-1.svg';
import imgHanafuda11_1 from '../Hanafuda_11-1.svg';
import imgHanafuda12_3 from '../Hanafuda_12-3.svg';
import imgHanafuda12_2 from '../Hanafuda_12-2.svg';
import imgHanafuda12_1 from '../Hanafuda_12-1.svg';

import pronMatsu from '../pronunciation_ja_松.mp3';
import pronFuji from '../pronunciation_ja_藤.mp3';
import pronUme from '../pronunciation_ja_梅.mp3';
import pronSakura from '../pronunciation_ja_桜.mp3';
import pronAyame from '../pronunciation_ja_菖蒲.mp3';
import pronBotan from '../pronunciation_ja_牡丹.mp3';
import pronHagi from '../pronunciation_ja_萩.mp3';
import pronYanagi from '../pronunciation_ja_柳.mp3';
import pronKiri from '../pronunciation_ja_桐.mp3';
import pronSusuki from '../pronunciation_ja_スズキ.mp3';
import pronKiku from '../pronunciation_ja_菊.mp3';
import pronKoyo from '../pronunciation_ja_紅葉.mp3';

import imgHwatooJokers from './hwatoo_jokers.jpg';
import imgFlowerJokers from '../Flower_jokers.jpg';
import imgRainbowJokers from '../Rainbow_jokers.jpg';
import imgKoiKoiSetup from './Hanafuda_Koi-Koi_Setup.jpg';

const louieSource: SourceInfo = {
  author: {
    family: "Mantia",
    given: "Louie",
  },
  copyrightYear: 2021,
  license: "cc-by-sa",
  licenseVersion: "4.0",
};

const Basics: React.FC = () => {
  return (<>
    <p><Pronounce pronouncer="biscuit" word="Hanafuda" lang="ja-Latn" file={pronHanafuda} noun /> (<span lang="ja">花札</span>, ‘flower cards’) are a type of playing card originating in Japan. They are also used in Korea, where they are known as <Pronounce pronouncer="ssoonkimi" word="hwatu" lang="ko-Latn" file={pronHwatu} /> (<span lang="ko">화투</span>, ‘flower fight’, originally <span lang="ko-Hani">花鬪</span>), and in Hawaiʻi, where there is a large Japanese population. They are mostly used to play matching or set-collecting games, but they can also be used for complex gambling games.</p>
    <ArticleImage
      size="wide"
      src={img1620}
      alt="A pile of hanafuda cards."
      source={{
        author: "Japanexpertna.se",
        copyrightYear: 2015,
        license: 'cc-by-sa',
        licenseVersion: '2.0',
        originalUrl: "https://www.flickr.com/photos/68532869@N08/16201732242"
      }}>
      Cards from a modern <span lang="ja-Latn">hanafuda</span> deck printed by Nintendo
        </ArticleImage>
    <Section title="Composition of the deck">
      <p>Unlike Western playing cards which have 4 suits of 13 cards each, <Noun lang="ja-Latn">Hanafuda</Noun> decks comprise 12 ‘suits’ of 4 cards each, giving 48 cards total. Each suit corresponds to a month, and is represented on the cards by a plant related to that month.</p>
      <p>The months and their associated plants are:</p>
      <ol>
        <li>January: pine (<span lang="ja">松</span> <Pronounce pronouncer="_ai_" word="matsu" lang="ja-Latn" file={pronMatsu} />)</li>
        <li>February: plum (<span lang="ja">梅</span> <Pronounce pronouncer="akitomo" word="ume" lang="ja-Latn" file={pronUme} />)</li>
        <li>March: cherry (<span lang="ja">桜</span> <Pronounce pronouncer="strawberrybrown" word="sakura" lang="ja-Latn" file={pronSakura} />)</li>
        <li>April: wisteria (<span lang="ja">藤</span> <Pronounce pronouncer="kaoring" word="fuji" lang="ja-Latn" file={pronFuji} />)</li>
        <li>May: iris (<span lang="ja">菖蒲</span> <Pronounce pronouncer="akitomo" word="ayame" lang="ja-Latn" file={pronAyame} />)</li>
        <li>June: peony (<span lang="ja">牡丹</span> <Pronounce pronouncer="ryomasakamoto" word="botan" lang="ja-Latn" file={pronBotan} />)</li>
        <li>July: bush clover (<span lang="ja">萩</span> <Pronounce pronouncer="strawberrybrown" word="hagi" lang="ja-Latn" file={pronHagi} />)</li>
        <li>August: silvergrass (<span lang="ja">芒/薄</span> <Pronounce pronouncer="kaoring" word="susuki" lang="ja-Latn" file={pronSusuki} />)</li>
        <li>September: chrysanthemum (<span lang="ja">菊</span> <Pronounce pronouncer="akitomo" word="kiku" lang="ja-Latn" file={pronKiku} />)</li>
        <li>October: maple (<span lang="ja">紅葉</span> <Pronounce pronouncer="El55" word="kōyō" lang="ja-Latn" file={pronKoyo} />)</li>
        <li>November: willow (<span lang="ja">柳</span> <Pronounce pronouncer="akitomo" word="yanagi" lang="ja-Latn" file={pronYanagi} />)</li>
        <li>December: paulownia (<span lang="ja">桐</span> <Pronounce pronouncer="kaoring" word="kiri" lang="ja-Latn" file={pronKiri} />)</li>
      </ol>
      <p>In Korean and some Hawaiian decks, the months of November &amp; December are switched. This rarely makes a difference except when the cards are being used as stand-ins for numeric cards (in gambling games).</p>
      <Section title="Types of card">
        <p>The deck is divided into four categories of card. In descending order of value, these are:</p>
        <Section title="Bright cards">
          <p>There are 5 ‘bright’ (<span lang="ja">光</span> <Pronounce pronouncer="strawberrybrown" word="hikari" lang="ja-Latn" file={pronHikari} />) cards. In most games, these are worth 20 points. The five bright cards are:</p>
          <ul>
            <li>the crane with pine (January), <span lang="ja">松に鶴</span> <span lang="ja-Latn">matsu ni tsuru</span></li>
            <li>the cherry blossom curtain (March), <span lang="ja">桜に幕</span> <span lang="ja-Latn">sakura ni maku</span></li>
            <li>the full moon (August), <span lang="ja">芒に月</span> <span lang="ja-Latn">susuki ni tsuki</span></li>
            <li>the rain man (November), <span lang="ja">柳に小野道風</span> <span lang="ja-Latn">yanagi ni Ono no Tōfū</span></li>
            <li>the phoenix (December), <span lang="ja">桐に鳳凰</span> <span lang="ja-Latn">kiri ni hōō</span></li>
          </ul>
          <ArticleImage
            src={[
              [imgHanafuda1_1, "The crane and pine."],
              [imgHanafuda3_1, "The cherry blossom curtain."],
              [imgHanafuda8_1, "The full moon."],
              [imgHanafuda11_1, "The rain man."],
              [imgHanafuda12_1, "The phoenix."],
            ]}
            source={louieSource}
            perRow={5}>The bright cards.</ArticleImage>
          <p>In some decks, especially Korean ones, these are marked with the 光 character for ease of identification.<Footnote><Noun lang="ja-Latn">Maeda Masafumi</Noun> (<span lang="ja">前田雅文</span>, <abbr title="died">d.</abbr> 1998) of the manufacturer <Noun lang="ja-Latn">Ōishi Tengudō</Noun> has claimed that these markings were actually a trademark-like feature that they used, which was picked up by the Korean manufacturers as a standardized marking.<Cite r="ModernKoreanCards" /></Footnote></p>
          <ArticleImage size="small" src={img5Brights} alt="TODO">The five bright cards, from a standard <Noun lang="ja-Latn">Nintendo</Noun> deck.</ArticleImage>
          <ArticleImage size="small" src={img5BrightsKr} alt="TODO">The five bright cards, from a Korean Pierrot (<span lang="ko">피에로</span>) deck.</ArticleImage>
        </Section>
        <Section title={<><span lang="ja-Latn">Tane</span> cards</>}>
          <p>There are 9 <Pronounce pronouncer="yasuo" word="tane" lang="ja-Latn" file={pronTane} /> (<span lang="ja">種</span>) cards, which are usually worth 10 points each. These cards mostly feature animals, but also a sake cup, and the ‘eight-planked bridge’.</p>
          <ArticleImage
            src={[
              [imgHanafuda2_1, "The tane card for February, a bush warbler."],
              [imgHanafuda4_1, "The tane card for April, a lesser cuckoo."],
              [imgHanafuda5_1, "The tane card for May, a bridge."],
              [imgHanafuda6_1, "The tane card for June, butterflies."],
              [imgHanafuda7_1, "The tane card for July, a boar."],
              [imgHanafuda8_2, "The tane card for August, geese."],
              [imgHanafuda9_1, "The tane card for September, a sake cup."],
              [imgHanafuda10_1, "The tane card for October, a deer."],
              [imgHanafuda11_2, "The tane card for November, a swallow."],
            ]}
            source={louieSource}
            perRow={5}>The 9 <span lang="ja-Latn">tane</span> cards.</ArticleImage>
        </Section>
        <Section title={<><span lang="ja-Latn">Tanzaku</span> cards</>}>
          <p>There are 10 <Pronounce pronouncer="skent" word="tanzaku" lang="ja-Latn" file={pronTanzaku} /> (<span lang="ja">短冊</span>) cards, usually worth 5 points each. These are the cards with the coloured ‘scrolls’ on them. Small pieces of paper were used to write poems on at poetry competitions (see the image below). For some games these are further subdivided into three sub-groups: <span lang="ja-Latn">tanzaku</span> with writing, plain red <span lang="ja-Latn">tanzaku</span>, and plain blue/purple <span lang="ja-Latn">tanzaku</span>.</p>
          <ArticleImage
            src={[
              [imgHanafuda1_2, "The tanzaku card for January."],
              [imgHanafuda2_2, "The tanzaku card for February."],
              [imgHanafuda3_2, "The tanzaku card for March."],
              [imgHanafuda4_2, "The tanzaku card for April."],
              [imgHanafuda5_2, "The tanzaku card for May."],
              [imgHanafuda6_2, "The tanzaku card for June."],
              [imgHanafuda7_2, "The tanzaku card for July."],
              [imgHanafuda9_2, "The tanzaku card for September."],
              [imgHanafuda10_2, "The tanzaku card for October."],
              [imgHanafuda11_3, "The tanzaku card for November."],
            ]}
            source={louieSource}
            perRow={5}>The 10 <span lang="ja-Latn">tanzaku</span> cards.</ArticleImage>
          <ArticleImage
            alt="A screen with a painting of a maple tree in autumn colours, and many tanzaku hanging from its branches."
            size="wide"
            src={imgAutumnMaples}
            source={{
              originalUrl: "https://www.artic.edu/artworks/127644/autumn-maples-with-poem-slips",
              license: 'cc0',
              organization: { orgName: 'The Art Institute of Chicago' }
            }}>
            <cite>Maple with Poem Slips</cite> (c. 1675)<br /><cite lang="ja">櫻楓短冊圖</cite><br />A six-panel screen (one of a pair) by <Noun lang="ja-Latn">Tosa Mitsuoki</Noun> (<span lang="ja">土佐 光起</span>, 1617–1691)
          </ArticleImage>
        </Section>
        <Section title={<><span lang="ja-Latn">Kasu</span> cards</>}>
          <p>The remaining 24 cards that aren’t in one of the previous categories are called <Pronounce pronouncer="poyotan" word="kasu" lang="ja-Latn" file={pronKasu} /> (<span lang="ja">滓</span>, ‘dregs’ or ‘junk’). They are usually worth a single point each. The first ten months have two <span lang="ja-Latn">kasu</span> cards, but November has only one, and December has three.</p>
          <p>These cards can be identified by their lack of distinguishing features. The odd one out is the “lightning card” of the November month, which is printed with a bold red &amp; black pattern. One of the December <span lang="ja-Latn">kasu</span> cards also has a yellow background and this card is treated specially in some games.</p>
          <ArticleImage
            src={[
              [imgHanafuda1_3, "A kasu card for January."],
              [imgHanafuda1_4, "A kasu card for January."],
              [imgHanafuda2_3, "A kasu card for February."],
              [imgHanafuda2_4, "A kasu card for February."],
              [imgHanafuda3_3, "A kasu card for March."],
              [imgHanafuda3_4, "A kasu card for March."],
              [imgHanafuda4_3, "A kasu card for April."],
              [imgHanafuda4_4, "A kasu card for April."],
              [imgHanafuda5_3, "A kasu card for May."],
              [imgHanafuda5_4, "A kasu card for May."],
              [imgHanafuda6_3, "A kasu card for June."],
              [imgHanafuda6_4, "A kasu card for June."],
              [imgHanafuda7_3, "A kasu card for July."],
              [imgHanafuda7_4, "A kasu card for July."],
              [imgHanafuda8_3, "A kasu card for August."],
              [imgHanafuda8_4, "A kasu card for August."],
              [imgHanafuda9_3, "A kasu card for September."],
              [imgHanafuda9_4, "A kasu card for September."],
              [imgHanafuda10_3, "A kasu card for October."],
              [imgHanafuda10_4, "A kasu card for October."],
              [imgHanafuda11_4, "The kasu card for November."],
              [imgHanafuda12_2, "A kasu card for December, with yellow background."],
              [imgHanafuda12_3, "A kasu card for December."],
              [imgHanafuda12_4, "A kasu card for December."],
            ]}
            source={louieSource}
            perRow={8}>The 24 <span lang="ja-Latn">kasu</span> cards.</ArticleImage>
        </Section>
        <Section title="Extra cards">
          <p>Korean decks often contain extra (up to six) joker cards. How these are used (if at all) depends upon the game being played. Many traditional Japanese decks also contain a white (<span lang="ja">白</span> <span lang="ja-Latn">shiro</span>) blank card which can be used to replace a card if it is damaged or lost. Some Japanese decks also contain joker-like cards featuring <span lang="ja-Latn">oni</span> (<span lang="ja">鬼</span>, a Japanese ogre); see the next page for more examples of these.</p>
          <div className="multi">
            <ArticleImage 
              src={imgFlowerJokers}
              alt="Six cards each with a different face.">
              Assorted jokers from a Korean Flower deck.
            </ArticleImage>
            <ArticleImage 
              src={imgRainbowJokers}
              alt="Six cards each with a different face.">
              Assorted jokers from a Korean Rainbow deck.
            </ArticleImage>
          </div>
          <ArticleImage size="small"
            src={imgHwatooJokers}
            alt="Two cards labelled ‘joker’, one with a frog and one with a black bird.">
            Two joker cards from the Yongjaeng Hwatoo ‘Style’ deck.
          </ArticleImage>
        </Section>
      </Section>
    </Section>
    <Section title="Basic matching rules">
      <p>Many <Noun lang="ja-Latn">Hanafuda</Noun> games are of the ‘fishing’ variety, where each player tries to capture cards from a shared pool of cards in the centre of the table. The goal is to capture high-value cards or to form specific scoring patterns called <span lang="ja-Latn">yaku</span> (<span lang="ja">役</span>).</p>
      <ArticleImage
        src={imgKoiKoiSetup}
        alt="Two hands of Hanafuda cards face down on a table with eight cards dealt face-up between them and the remainder of the cards in a stack face-down to the side."
        source={{
          copyrightYear: 2021,
          author: {given: "Marcus", family: "Richert"},
          originalUrl: 'http://www.marcusrichert.com/images/koikoi1/',
          license: 'cc-by',
          licenseVersion: '2.0',
        }}
        >
        A sample setup for the game of <Noun lang="ja-Latn">Koi-Koi</Noun>, with a pool of eight cards.
      </ArticleImage>
      <p>In most <Noun lang="ja-Latn">Hanafuda</Noun> fishing games a turn proceeds as follows:</p>
      <p>First, the player chooses a card from their hand. If it matches (is of the same month as) one of the face-up cards in the pool, they place it face-up on top of that card. If it doesn’t match any of the cards in the pool, they lay it face-up in the pool next to the other cards.</p>
      <p>Next, the player turns over the top card of the face-down deck. If it matches any of the single cards in the pool, they place the card on top of that one.</p>
      <p>Finally, the player takes (‘captures’) any cards that were matched together out of the pool, and places them face-up in front of themselves. This ends their turn.</p>
    </Section>
    {/* <section id="terminology">
      <dl>
        <dt><span lang="ja">場</span> <span lang="ja-Latn">ba</span>, ‘field’</dt>
        <dd>The area where cards are played.</dd>

        <dt><span lang="ja">親</span> <span lang="ja-Latn">oya</span>, ‘parent’</dt>
        <dd>The dealer.</dd>

        <dt><span lang="ja">ナカ</span> <span lang="ja-Latn">naka</span>, ‘middle’</dt>
        <dd>The second player in a three-player game.</dd>
        
        <dt><span lang="ja">ビキ</span> <span lang="ja-Latn">biki</span></dt>
        <dd>The third player in a three-player game.</dd>
      </dl>
    </section> */}
  </>);
}

export default Basics;
