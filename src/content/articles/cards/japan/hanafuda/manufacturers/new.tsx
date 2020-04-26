import * as React from 'react';

import { ArticleContentProps, ArticleImage, Noun, Section } from 'ui';

import imgNaPua5Brights from './NaPua_5Brights.jpg';
import imgNaPuaNovember from './NaPua_November.jpg';
import imgHawaii5Brights from './Hawaii_5Brights.jpg';
import imgHawaii5November from './Hawaii_November.jpg';
import imgNyangTu from './Nyangtu.jpg';
import imgMeongTu from './Meongtu.jpg';
import imgNishikiHana from './NishikiHana.jpg';
import imgNishikiFuda from './NishikiFuda.jpg';
import imgPebbleHwatu from './PebbleHwatu.jpg';
import imgYongJaengStyle from './YongJaengStyle.jpg';
import imgHanami from './Hanami.jpg';
import imgCochaeBrights from './Cochae_Brights.jpg';
import imgJuniorBrights from './Junior_Brights.jpg';
import imgJuniorBamboo from './Junior_Bamboo.jpg';

const Manufacturers: React.FC<ArticleContentProps> = ({cite}) => {
    return (<>
        <p>In the internet era there are now many brands that are produced on a small scale (most aren’t manufacturers themselves). Thanks to the rise of crowdfunding, the variety of designs has greatly expanded from the traditional patterns.</p>
        <Section title={<a href="https://blankproject.kr/">Blank’s Art Project</a>}>
          <p>Blank’s Art Project have created several Hwatu decks with custom art: Pebble (2016), Golden Toad (2018 & 2019 editions, crowdfunded on Korean site ‘wadiz’), and Pebble Film Edition (2019). They have also created custom promotional decks for Jeju beer (2017).</p>
          <ArticleImage
            src={imgPebbleHwatu}
            alt="TODO">
            The five Bright cards of the Pebble <Noun lang="ko-Latn">Hwatu</Noun> deck (2016).
          </ArticleImage>
        </Section>
        <Section title={<a href="http://www.hanafudahawaii.com/">Hanafuda Hawaii</a>}>
          <p>Produces two different decks: Hanafuda Hawai‘i Style (2009), and Hanafuda Nā Pua Hawai‘i (2016).</p>
          <p><b>Hanafuda Hawai‘i Style</b> recreates the traditional Japanese deck with bold artwork, including scores printed on the cards and with helpful icons to identify scoring combinations on the cards. In the rules given with the deck, there are not “5 Brights”, so the “4 Brights” are reproduced here:</p>
          <ArticleImage
            src={imgHawaii5Brights}
            alt="TODO">
            Hanafuda Hawai‘i Style bright cards.
          </ArticleImage>
          <p>The cards of November show more of the style of the cards (note the ‘rain man’ is worth a mere 5 points with the Hawaiian rules):</p>
          <ArticleImage
            src={imgHawaii5November}
            alt="TODO">
            Hanafuda Hawai‘i Style November cards.
          </ArticleImage>
          <p><b>Hanafuda Nā Pua Hawai‘i</b> is probably my favourite of all the modern <Noun lang="ja-Latn">Hanafuda</Noun> decks. It recontextualizes the game with the flora and fauna native to Hawai‘i, matching visual puns to the bold art of the Hawai‘i Style deck: in the month of March, for example, the cherry blossoms become <span lang="haw">‘iliahi</span> (sandalwood) flowers, and the curtain becomes the traditional <span lang="haw">kapa</span> cloth.</p>
          <ArticleImage
            src={imgNaPua5Brights}
            alt="TODO">
            Hanafuda Nā Pua Hawai‘i bright cards.
          </ArticleImage>
          <ArticleImage
            src={imgNaPuaNovember}
            alt="TODO">
            Hanafuda Nā Pua Hawai‘i November cards.
          </ArticleImage>
        </Section>
        <Section title={<a href="http://www.indianwolfstudios.com/hanami.html">Indianwolf Studios</a>}>
          <p>Indianwolf have so far produced the <Noun lang="ja-Latn">Hanami Hanafuda</Noun> (2018) and <Noun lang="ja-Latn">Sensu Hanafuda</Noun> (2019) decks, in poker-sized cards printed by Legends Playing Card Company. Both of these are available in a plain version, or one that has indices to aid new players.</p>
          <ArticleImage
            src={imgHanami}
            alt="Five hanafuda cards drawn in a minimalistic but realistic style.">
            The five Bright cards of the <Noun lang="ja-Latn">Hanami Hanafuda</Noun> deck.
          </ArticleImage>
          <p>Indianwolf are also currently producing the ‘Night Parade’ deck, expected to ship in 2020. All Indianwolf’s decks have been crowdfunded through Kickstarter.</p>
        </Section>
        <Section title={<><a href="https://www.instagram.com/jamaistore/"><span lang="ko">자매상점</span> (jamaistore)</a></>}>
          <p>Produces ridiculously-cute cat &amp; dog themed <span lang="ko-Latn">hwatu</span> decks. Each of them comes with an additional six joker cards, appropriate to the theme. Both decks were crowfunded on the Korean site ‘tumblbug’.</p>
          <ArticleImage
            src={imgNyangTu}
            alt="The 5 brights of the Nyangtu deck, featuring cats interposed into the traditional cards.">
            Jamaistore’s <span lang="ko">냥투</span> (<span lang="ko-Latn">nyangtu</span>, ‘meow fight’) deck (2016).<br/>
            The name is a pun on <span lang="ko-Latn">hwatu</span> with the Korean <span lang="ko-Latn">nyang</span> meaning ‘meow’.
          </ArticleImage>
          <ArticleImage
            src={imgMeongTu}
            alt="The 5 brights of the Nyangtu deck, featuring cats interposed into the traditional cards.">
            Jamaistore’s <span lang="ko">멍투</span> (<span lang="ko-Latn">meongtu</span>, ‘woof fight’) deck (2017).
          </ArticleImage>
        </Section>
        <Section title={<a href="https://www.etsy.com/shop/nishikie" lang="ja-Latn" className="proper-noun">NISHIKI <span lang="ja">錦</span></a>}>
          <p>This redesign by <Noun lang="ja-Latn">Hanako</Noun> of <a href="http://www.estudio-artes.com/">estudio artes</a> produced the only 3-way standard/<Noun lang="ja-Latn">Hanafuda</Noun>/<Noun lang="ja-Latn">Kabufuda</Noun> deck that I know of, which is printed on poker-sized cards. There is also a <Noun lang="ja-Latn">Hanafuda</Noun>-only deck, in a traditional format.</p>
          {/*<p>by Hanako: https://profile.ameba.jp/ameba/estudio-artes</p>*/}
          <ArticleImage
            src={imgNishikiFuda}
            alt="TODO">
            The 5 Bright cards of the combination <Noun lang="ja-Latn">Nishiki Fuda</Noun> deck. The cards from A–10 have Japanese numerals for use as  <Noun lang="ja-Latn">Kabufuda</Noun> cards.
          </ArticleImage>
          <ArticleImage
            src={imgNishikiHana}
            alt="TODO">
            The 5 Bright cards of the standard <Noun lang="ja-Latn">Nishiki Fuda</Noun> deck.
          </ArticleImage>
        </Section>
        <Section title={<a href="http://www.hatoo.net/"><span lang="ko">용쟁화투</span> <Noun lang="ko-Latn">Yongjaeng Hwatoo</Noun></a>}>
          <p><Noun lang="ko-Latn">Yongjaeng Hwatoo</Noun> produce <span lang="ko-Latn">hwatu</span> decks in three varieties: Classic, Cute, and Style (pictured below). These designs have been produced in several editions over the years.</p>
          <ArticleImage
            src={imgYongJaengStyle}
            alt="TODO">
            The five Bright cards of the <Noun lang="ko-Latn">Yongjaeng Hwatoo</Noun> Style deck (2017).
          </ArticleImage>
        </Section>
        <Section title="Cochae">
          <p>Japanese paper design house Cochae produces <a href="http://www.cochae.com/system/goods/2359/"><strong lang="ja-Latn">Kokoyo</strong></a> (2019), a deck with bold, crisp visuals and faces on everything. The cards are coded by background colour so that Bright cards have a gold background, Tane have silver, etc.</p>
          <ArticleImage
            src={imgCochaeBrights}
            alt="TODO">
            The 5 Bright cards of the Cochae <Noun lang="ja-Latn">Kokoyo</Noun> deck (2019). The backgrounds are a metallic gold colour, which doesn’t show up well here.
          </ArticleImage>
        </Section>
        <Section title={<a href="https://www.junior.cards/">Junior Cards</a>}>
          <p>Junior Cards have produced a ground-up redesign of Hanafuda into a poker format deck, printed by <abbr title="the United States Playing Card Company">USPCC</abbr>. The different kinds of cards have different backgrounds and all are identified by suit marker indices, which helps to clarify the cards for new players.</p>
          <ArticleImage
            src={imgJuniorBrights}
            alt="TODO">
            The 5 Bright cards of the Junior <Noun lang="ja-Latn">Hanafuda</Noun> deck (2019).
          </ArticleImage>
          <p>To fill out the full 54 cards of a standard poker deck, there are an additional 6 ‘bamboo’ cards including an additional <Noun lang="ja-Latn">Fuji</Noun> Bright and second Oni card:</p>
          <ArticleImage
            src={imgJuniorBamboo}
            alt="TODO">
            The additional ‘Bamboo’ suit of the Junior <Noun lang="ja-Latn">Hanafuda</Noun> deck.
          </ArticleImage>
        </Section>
    </>);
};

export default Manufacturers;
