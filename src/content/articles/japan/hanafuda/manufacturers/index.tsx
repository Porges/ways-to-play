import * as React from 'react';

import { ArticleContentProps, ArticleImage, Noun } from 'ui';
import { Yamaguchi, IwanoMatsui, ModernJapaneseWrappers, SalterJapanese } from 'References/bibliography.json';

import imgMarks from '../manufacturer-marks.jpg';
import imgShogundo from './Shogundo.jpg';
import imgGenroku from './AngelGenroku.jpg';
import imgMarue from './Marue.jpg';
import imgAce from './AceGrandDuke.jpg';
import imgOishiTengudo from './OishiTengudo.jpg';
import imgNintendo from './Nintendo.jpg';
import imgNintendoEnd from './NintendoEnd.jpg';
import imgHanaTrump5Brights from './HanaTrump_5Brights.jpg';
import imgHanaTrumpExtra from './HanaTrump_Extra.jpg';
import imgNaPua5Brights from './NaPua_5Brights.jpg';
import imgNaPuaNovember from './NaPua_November.jpg';
import imgHawaii5Brights from './Hawaii_5Brights.jpg';
import imgHawaii5November from './Hawaii_November.jpg';
import imgNyangTu from './Nyangtu.jpg';
import imgMeongTu from './Meongtu.jpg';
import imgKyoHana from './KyoHana.jpg';
import imgNishikiHana from './NishikiHana.jpg';
import imgNishikiFuda from './NishikiFuda.jpg';
import imgNishikiBrights from './Nishiki_Brights.jpg';
import imgPebbleHwatu from './PebbleHwatu.jpg';
import imgYongJaengStyle from './YongJaengStyle.jpg';
import imgHanami from './Hanami.jpg';
import imgAngelJokers from './Angel_Jokers.jpg';
import imgCochaeBrights from './Cochae_Brights.jpg';
import imgMatsuiBrights from './Matsui_Brights.jpg';
import imgMarioBrights from './Nintendo_Mario_Brights.jpg';
import imgJuniorBrights from './Junior_Brights.jpg';
import imgJuniorBamboo from './Junior_Bamboo.jpg';

const Manufacturers: React.FC<ArticleContentProps> = ({cite}) => {
    return (
        <section id="manufacturers">
        <h3>Packaging</h3>
        <p>The branding system of traditional <Noun lang="ja-Latn">hanafuda</Noun> manufacturers can be confusing. Generally the brand (indicated by the artwork on the box or wrapper) indicates the quality of the cards, and the <em>type</em> of cards is written on the end. So a box of Nintendo cards with Napoleon on the front indicates their highest-quality card, but can contain either <Noun lang="ja-Latn">hanafuda</Noun> or <Noun lang="ja-Latn">kabufuda</Noun> cards.</p>
        <ArticleImage
            position="small"
            src={imgNintendoEnd}
            alt="The end of a Hanafuda wrapper with Japanese writing indicating its contents.">
            The end of a <Noun lang="ja-Latn">Nintendō</Noun> wrapper indicating that it contains<br/>standard (<span lang="ja">八々花</span> <span lang="ja-Latn">hachihachibana</span>) Hanafuda cards, with black (<span lang="ja">黒</span>) backs.
        </ArticleImage>
        <h3>Manufacturer’s marks</h3>
        <p>Within the deck, the manufacturer’s mark is nowadays always on one of the Paulownia junk cards, but on older decks it is often on the Peony, or another card entirely.</p>
        <ArticleImage
            position="small"
            src={imgMarks}
            alt="Three cards all featuring Paulownia flowers, with maker’s marks printed upon them.">
            Manufacturer’s marks from <Noun lang="ja-Latn">Nintendo</Noun>, Angel, and <Noun lang="ja-Latn">Maruē</Noun>.</ArticleImage>
        <p>Often the mark is a simplified version of the name, or a different <span lang="ja-Latn">kanji</span>, usually combined with a geometric shape. When pronouncing the mark the shape is usually also ‘read’, so that Nintendo’s mark—a stylized <span lang="ja">福</span> (<span lang="ja-Latn">fuku</span> ‘good fortune’) inside a circle—is read <span lang="ja-Latn">maru-fuku</span> ‘circle-fuku’, much like the brand “<a href="https://en.wikipedia.org/wiki/Circle_K">Circle K</a>”. The same can also be done with the square  (<span lang="ja">角</span> <span lang="ja-Latn">kaku</span>), a corner at top-right (┐) can be described as a carpenter’s square  (<span lang="ja">矩</span> <span lang="ja-Latn">kane</span>), and a corner pointing updwards (∧) can be a mountain (<span lang="ja">山</span> <span lang="ja-Latn">yama</span>).</p>
        <h2>Established Manufacturers</h2>
        <p>All current Japanese manufacturers that I know of are based in <Noun lang="ja-Latn">Kyōto</Noun> prefecture.</p>
        <section id="nintendo">
          <h3><Noun lang="ja-Latn">Nintendō</Noun></h3>
          <ArticleImage
            position="right"
            src={imgNintendo}
            alt="A Hanafuda wrapper featuring an image of Napoleon on the front.">
            <Noun lang="ja-Latn">Nintendō</Noun>’s <span lang="ja-Latn">Daitōryō</span> packaging (1970s). Note the <Noun lang="ja-Latn">Marufuku</Noun> mark at top right.
          </ArticleImage>
          <p>Founded in <Noun lang="jp-Latn">Kyōto</Noun> in 1889, Nintendo is the most prominent company producing <Noun lang="jp-Latn">Hanafuda</Noun> cards today. Out of all the types of cards they previously produced, today they only produce <Noun lang="ja-Latn">Hanafuda</Noun> and <Noun lang="ja-Latn">Kabufuda</Noun> cards. Their current brands are: <span lang="ja-Latn">Daitōryō</span> <span lang="ja">大統領</span> ‘president’ (featuring a picture of Napoleon); <span lang="ja-Latn">Marufuku Tengu</span> <span lang="ja">丸福天狗</span> (<Noun lang="ja-Latn">Marufuku</Noun> being <Noun lang="ja-Latn">Nintendo</Noun>’s manufacturer’s mark); and <span lang="ja-Latn">Miyako no Hana</span> <span lang="ja">都の花</span> ‘flowers of the city’.</p>
          <p>Previously <Noun lang="ja-Latn">Nintendō</Noun> produced many varieties of local cards or <Noun lang="ja-Latn">Mefuda</Noun>.</p>
          <p>One interesting deck they used to produce was <b>Hana-Trump</b>, which combined <Noun lang="ja-Latn">Hanafuda</Noun> cards with the cards of the international standard playing card deck. Each rank of the standard pack corresponds to a month of the <Noun lang="ja-Latn">Hanafuda</Noun> deck:</p>
          <ArticleImage
            src={imgHanaTrump5Brights}
            alt="The 5 bright cards from a Hana-Trump deck, which are hanafuda cards printed on the center of the standard international playing card deck.">
            The 5 Brights of <Noun lang="ja-Latn">Nintendō</Noun>’s “Hana-Trump” deck.
          </ArticleImage>
          <p>Because there are four more cards in the standard deck compared to the <Noun lang="ja-Latn">Hanafuda</Noun> one, <Noun lang="ja-Latn">Nintendō</Noun> added an additional four cards (and two jokers) to the set. These extra cards are counterparts for specialized pieces of equipment present in boxed <Noun lang="ja-Latn">Hachi-Hachi</Noun> (<span lang="ja">八八</span>) sets.</p>
          <ArticleImage
            src={imgHanaTrumpExtra}
            alt="Four additional cards corresponding to the Kings of the standard deck, and one joker card.">
          The extra cards of <Noun lang="ja-Latn">Nintendō</Noun>’s “Hana-Trump” deck. From left-to-right, after the joker, these are: a blindfolded samurai, with text reading <span lang="ja"><q>不見出</q></span> (88 sets have a piece labelled <span lang="ja"><q>不見転</q></span>, ‘loose morals’); a <span lang="ja-Latn">gunbai</span> (<span lang="ja">軍配</span>), a military leader’s fan which is nowadays used by sumo referees, which is inscribed <span lang="ja"><q>跡絶之章</q></span> (pause prize, 88 sets have a piece labelled <span lang="ja"><q>両桐絶体之章</q></span>); a rice winnowing basket (<span lang="ja">箕</span> <span lang="ja-Latn">mi</span>) inscribed <span lang="ja"><q>手役之章</q></span> (hand-<span lang="ja-Latn">yaku</span> prize); and an award medal reading <span lang="ja"><q>吟見勲賞</q></span> (<span lang="ja-Latn">Ginmi Kunshō</span>, ‘<span lang="ja-Latn">Ginmi</span> Medal’), which is a prize for the ‘top player’ (<span lang="ja-Latn">Ginmi</span>, usually spelt <span lang="ja">吟味</span>, 88 sets have a piece labelled <span lang="ja">銀見勲章</span>).
          </ArticleImage>
          <p>Currently Nintendo also produce many novelty decks themed to their videogame characters, such as Mario (pictured below), Pokémon, Mario Pikachu (limited, 2017), Kirby (2020), among others.</p>
          <ArticleImage
            src={imgMarioBrights}
            alt="TODO">
            Nintendo’s Mario deck, featuring recurring characters from the Mario series.
          </ArticleImage>
        </section>
        <section id="oishi-tengudo">
          <h3><a href="https://www.tengudo.jp/" className="proper-noun" lang="ja-Latn">Ōishi Tengudō</a> (<span lang="ja">大石天狗堂</span>)</h3>
          <p>Also based in <Noun lang="ja-Latn">Kyōto</Noun>, <Noun lang="ja-Latn">Ōishi Tengudō</Noun> produces a wide variety of traditional Japanese card games. As far as I know, they are the only major manufacturer still producing <Noun lang="ja-Latn">Mefuda</Noun> cards. They also produce reproductions of even older cards, such as the <Noun lang="ja-Latn">Unsun</Noun> deck.</p>
          <ArticleImage
            src={imgOishiTengudo}
            alt="The front of a wooden Hanafuda box with a pasted-on image of a Tengu mask.">
            High-quality <Noun lang="ja-Latn">Ōishi Tengudō</Noun> decks come in Paulownia-wood boxes.
          </ArticleImage>
          <p>In addition to the many standard & local patterns of <Noun lang="ja-Latn">Hanafuda</Noun> they produce, they also publish some novelty decks, such as the <b><Noun lang="ja-Latn">Kyōto Hanafuda</Noun></b>:</p>
          <ArticleImage
            src={imgKyoHana}
            alt="Five hanafuda cards with depictions of landmarks and various aspects of Kyōto life.">
            The <Noun lang="ja-Latn">Kyōto Hanafuda</Noun>’s 5 Brights, showing icons and landmarks of <Noun lang="ja-Latn">Kyōto</Noun>.
            From left to right they represent: a fox with a jewel in its mouth, from the gate of the <a href="https://en.wikipedia.org/wiki/Fushimi_Inari-taisha"><Noun lang="ja-Latn">Fushimi Inari</Noun> shrine</a> (<span lang="ja">伏見稲荷大社</span>); <a href="https://en.wikipedia.org/wiki/Toyotomi_Hideyoshi"><Noun lang="ja-Latn">Toyotomi Hideyoshi</Noun></a> (<span lang="ja">豊臣秀吉</span>), <a href="https://en.wikipedia.org/wiki/K%C5%8Ddai-in"><Noun lang="ja-Latn">Kita no Mandokoro</Noun></a> (<span lang="ja">北政所</span>), and <a href="https://en.wikipedia.org/wiki/Yodo-dono"><Noun lang="ja-Latn">Yodogimi</Noun></a> (<span lang="ja">淀君</span>) at <a href="https://en.wikipedia.org/wiki/Fushimi_Castle">Fushimi Castle</a> (<span lang="ja">伏見城</span>); the character <span lang="ja">大</span> (<span lang="ja-Latn">dai</span>, ‘large’), which is lit on fire on mount <Noun lang="ja-Latn">Daimonji</Noun> (<span lang="ja">大文字山</span>) during the festival of <a href="https://en.wikipedia.org/wiki/Gozan_no_Okuribi"><Noun lang="ja-Latn">Gozan no Okuribi</Noun></a> (<span lang="ja">五山送り火</span>, ‘five mountain fire’); the warrior monk <a href="https://en.wikipedia.org/wiki/Benkei"><Noun lang="ja-Latn">Benkei</Noun></a> (<span lang="ja">弁慶</span>) meeting <a href="https://en.wikipedia.org/wiki/Minamoto_no_Yoshitsune"><Noun lang="ja-Latn">Minamoto no Yoshitsune</Noun></a> (<span lang="ja">源義経</span>), who is playing the flute, at <Noun lang="ja-Latn">Gojō</Noun> bridge (<span lang="ja">五条橋</span>); and the <a href="https://en.wikipedia.org/wiki/Kyoto_Sanga_FC"><Noun lang="ja-Latn">Kyōto Sanga</Noun></a> (<span lang="ja">京都サンガ</span>) football club, whose logo contains the Chinese/Japanese phoenix that is normally featured on the Paulownia bright card.
          </ArticleImage>
        </section>
        <section id="angel">
          <h3><a href="http://www.angelplayingcards.com/product/hana.php">Angel</a> (<span lang="ja">エンゼル</span> <span lang="ja-Latn">enzeru</span>)</h3>
          <p>Originally based in Yōkaichi, Shiga Ken, now based in Kyōto. They currently produce <Noun lang="ja-Latn">Hanafuda</Noun> and <Noun lang="ja-Latn">Kabufuda</Noun> in two brands: <span lang="ja">千鳥</span> (<span lang="ja-Latn">chidori</span> ‘numerous birds’) and <span lang="ja">元禄</span> (<span lang="ja-Latn">Genroku</span>, an era which spanned 1688–1704).</p>
          <ArticleImage
            src={imgGenroku}
            alt="The front of a Hanafuda wrapper reading ‘genroku’ in Japanese characters and with cherry blossoms.">
            Angel’s <span lang="ja-Latn">Genroku</span> packaging (1970s).
          </ArticleImage>
          <p>Angel also produces cardboard novelty <Noun lang="ja-Latn">hanafuda</Noun> for brands like Disney and Hello Kitty, and both <Noun lang="ja-Latn">Hyakunin Isshu</Noun> and <Noun lang="ja-Latn">Iroha Karuta</Noun>.</p>
          <p>At one point they produced a Hana-Trump deck with similar construction to that of Nintendo’s (above).</p>
          <ArticleImage
            src={imgAngelJokers}
            alt="Four additional cards corresponding to the Kings of the standard deck, and one joker card.">
            The extra cards of Angel’s “Hana-Trump” deck. 
          </ArticleImage>
        </section>
        <section id="tamura-shogundo">
          <h3><a href="http://www.shogundo.co.jp/" className="proper-noun" lang="ja-Latn">Tamura Shōgundō</a> (<span lang="ja">田村将軍堂</span>)</h3>
          <ArticleImage
            position="right"
            alt="A box of hanafuda cards with a depiction of an apprentice geisha under blossoms and autumn leaves on the front."
            src={imgShogundo}>
            <Noun lang="ja-Latn">Tamura Shōgun-dō</Noun>’s <span lang="ja-Latn">Kyō maiko</span> brand.
          </ArticleImage>
          <p>A small manufacturer, founded in 1921. They produce <Noun lang="ja-Latn">Hyakunin Isshu</Noun>, <Noun lang="ja-Latn">Manyo Karuta</Noun>, and <Noun lang="ja-Latn">Hanafuda</Noun>.</p>
          <p>Most of <Noun lang="ja-Latn">Tamura Shōgun-dō</Noun>’s cards are produced with hand-wrapped backing paper; they have <a href="http://www5f.biglobe.ne.jp/~karutaya/brand.html">another web page that details their manufacturing process</a>.</p>
          <p><Noun lang="ja-Latn">Tamura</Noun> manufactures two types of <Noun lang="ja-Latn">Hanafuda</Noun> cards:</p>
          <ol>
            <li>
              The standard pattern, with brands:
              <ul>
                <li><span lang="ja">紫宸殿</span> <span lang="ja-Latn">Shishinden</span>, the ceremonial hall of <Noun lang="ja-Latn">Kyōto</Noun> Imperial Palace</li>
                <li><span lang="ja">大将軍</span> <span lang="ja-Latn">daishōgun</span>, ‘general’</li>
                <li><span lang="ja">満点</span> <span lang="ja-Latn">manten</span>, ‘perfect score’</li>
                <li><span lang="ja">栄光</span> <span lang="ja-Latn">eikō</span>, ‘glory’</li>
                <li><span lang="ja">京乃錦</span> <span lang="ja-Latn">Kyō no nishiki</span>, ‘brocade of <Noun lang="ja-Latn">Kyōto</Noun>’ (indicating the autumn leaves)</li>
                <li><span lang="ja">花くらべ</span> <span lang="ja-Latn">hanakurabe</span>, ‘comparing flowers’</li>
                <li><span lang="ja">夜桜</span> <span lang="ja-Latn">yozakura</span>, ‘evening cherry blossoms’</li>
                <li><span lang="ja">春風</span> <span lang="ja-Latn">harukaze</span>, ‘spring breeze’</li>
              </ul>
            </li>
            <li>
              Their revised pattern, <Noun lang="ja-Latn">Nishiki</Noun> (<span lang="ja">錦</span>), which is larger and has a squarer format than standard cards, and is printed with more, bolder colours. This is sold with brands:
              <ul>
                <li><span lang="ja">京舞妓</span> <span lang="ja-Latn">Kyō maiko</span>, ‘<Noun lang="ja-Latn">Kyōto maiko</Noun>’ (an apprentice <span lang="ja-Latn">geisha</span>)</li>
                <li><span lang="ja">祇園茶屋</span> <span lang="ja-Latn">Gion chaya</span>, ‘<Noun lang="ja-Latn">Gion</Noun> teahouse’ (a district of <Noun lang="ja-Latn">Kyōto</Noun>)</li>
                <li><span lang="ja">にしき花かるた</span> <span lang="ja-Latn">Nishiki hana karuta</span>, ‘<Noun lang="ja-Latn">Nishiki</Noun> flower cards’</li>
              </ul>
            </li>
          </ol>
          <ArticleImage
              src={imgNishikiBrights}
              alt="Five hanafuda cards with very bold colours, unlike normal hanafuda cards.">
              The 5 Brights of the <span lang="ja-Latn">Nishiki</span> pattern.
          </ArticleImage>
        </section>
        <h2>New Brands</h2>
        <p>Here are some internet-era brands that are produced on a small scale (most aren’t manufacturers themselves):</p>
        <section id="blank-project">
          <h3><a href="https://blankproject.kr/">Blank’s Art Project</a> (2016—)</h3>
          <p>Blank’s Art Project have created several Hwatu decks with custom art: Pebble (2016), Golden Toad (2018 & 2019 editions, crowdfunded on Korean site ‘wadiz’), and Pebble Film Edition (2019). They have also created custom promotional decks for Jeju beer (2017).</p>
          <ArticleImage
            src={imgPebbleHwatu}
            alt="TODO">
            The five Bright cards of the Pebble <Noun lang="ko-Latn">Hwatu</Noun> deck (2016).
          </ArticleImage>
        </section>
        <section id="hawaii">
          <h3><a href="http://www.hanafudahawaii.com/">Hanafuda Hawaii</a> (2009—)</h3>
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
        </section>
        <section id="indianwolf">
          <h3><a href="http://www.indianwolfstudios.com/hanami.html">Indianwolf Studios</a> (2018—)</h3>
          <p>Indianwolf have so far produced the <Noun lang="ja-Latn">Hanami Hanafuda</Noun> (2018) and <Noun lang="ja-Latn">Sensu Hanafuda</Noun> (2019) decks, in poker-sized cards printed by Legends Playing Card Company. Both of these are available in a plain version, or one that has indices to aid new players.</p>
          <ArticleImage
            src={imgHanami}
            alt="Five hanafuda cards drawn in a minimalistic but realistic style.">
            The five Bright cards of the <Noun lang="ja-Latn">Hanami Hanafuda</Noun> deck.
          </ArticleImage>
          <p>Indianwolf are also currently producing the ‘Night Parade’ deck, expected to ship in 2020. All Indianwolf’s decks have been crowdfunded through Kickstarter.</p>
        </section>
        <section id="jamaistore">
          <h3><a href="https://www.instagram.com/jamaistore/"><span lang="ko">자매상점</span> (jamaistore)</a> (2016—)</h3>
          <p>Produces ridiculously-cute cat &amp; dog themed <span lang="ko-Latn">hwatu</span> decks. Each of them comes with an additional six joker cards, appropriate to the theme. Both decks were crowfunded on the Korean site ‘tumblbug’.</p>
          <ArticleImage
            src={imgNyangTu}
            alt="The 5 brights of the Nyangtu deck, featuring cats interposed into the traditional cards.">
            Jamaistore’s <span lang="ko">냥투</span> (<span lang="ko-Latn">nyangtu</span>, ‘meow fight’) deck (2016).<br/>The name is a pun on <span lang="ko-Latn">hwatu</span> with the Korean <span lang="ko-Latn">nyang</span> meaning ‘meow’.
          </ArticleImage>
          <ArticleImage
            src={imgMeongTu}
            alt="The 5 brights of the Nyangtu deck, featuring cats interposed into the traditional cards.">
            Jamaistore’s <span lang="ko">멍투</span> (<span lang="ko-Latn">meongtu</span>, ‘bruise fight’) deck (2017).<br/>
            I am uncertain of the meaning!
          </ArticleImage>
        </section>
        <section id="nishiki-fuda">
          <h3><a href="https://www.etsy.com/shop/nishikie" lang="ja-Latn" className="proper-noun">NISHIKI <span lang="ja">錦</span></a> (2017)</h3>
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
          <h3><a href="http://www.hatoo.net/"><span lang="ko">용쟁화투</span> <Noun lang="ko-Latn">Yongjaeng Hwatoo</Noun></a> (2001—)</h3>
          <p><Noun lang="ko-Latn">Yongjaeng Hwatoo</Noun> produce <span lang="ko-Latn">hwatu</span> decks in three varieties: Classic, Cute, and Style (pictured below). These designs have been produced in several editions over the years.</p>
          <ArticleImage
            src={imgYongJaengStyle}
            alt="TODO">
            The five Bright cards of the <Noun lang="ko-Latn">Yongjaeng Hwatoo</Noun> Style deck (2017).
          </ArticleImage>
        </section>
        <section id="cochae">
          <h3>Cochae</h3>
          <p>Japanese paper design house Cochae produces <a href="http://www.cochae.com/system/goods/2359/"><strong lang="ja-Latn">Kokoyo</strong></a> (2019), a deck with bold, crisp visuals and faces on everything. The cards are coded by background colour so that Bright cards have a gold background, Tane have silver, etc.</p>
          <ArticleImage
            src={imgCochaeBrights}
            alt="TODO">
            The 5 Bright cards of the Cochae <Noun lang="ja-Latn">Kokoyo</Noun> deck (2019). The backgrounds are a metallic gold colour, which doesn’t show up well here.
          </ArticleImage>
        </section>
        <section id="junior">
          <h3><a href="https://www.junior.cards/">Junior Cards</a> (2019—)</h3>
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
        </section>
        <h2>Past Manufacturers</h2>
        <p>These are manufacturers that do not exist any more.</p>
        <section id="matsui-tengudo">
          <h3><Noun lang="ja-Latn">Matsui Tengu-dō</Noun> (<span lang="ja">松井天狗堂</span>)</h3>
          <p><Noun lang="ja-Latn">Matsui Tengudō</Noun> appears to have been the last Japanese manufacturer making cards entirely by hand.{cite(SalterJapanese)} It was founded in <Noun lang="ja-Latn">Kyōto</Noun> in 1897 by <Noun lang="ja-Latn">Matsui Shigejiro</Noun> (<span lang="ja">松井重次郎</span>), and was run by the <Noun lang="ja-Latn">Matsui</Noun> family for three generations until it closed in 2010 after <Noun lang="ja-Latn">Matsui Shigeo</Noun> (<span lang="ja">松井重夫</span>) retired.{cite(IwanoMatsui)} Since closing, their decks now fetch high prices on Yahoo! Auctions, often selling for several hundred US dollars.</p>
          <ArticleImage
            src={imgMatsuiBrights}
            alt="TODO">
            The 5 Bright cards from a deck produced by <Noun lang="ja-Latn">Matsui Tengudō</Noun> to demonstrate their printing technique (1978).
          </ArticleImage>
        </section>
        <section id="ace">
          <h3>Ace (<span lang="ja">エース</span> <span lang="ja-Latn">ēsu</span>)</h3>
          <p>Ace was based in <Noun lang="ja-Latn">Kyōto</Noun>. Their brands included <span lang="ja">大公爵</span> ‘grand duke’.</p>
          <ArticleImage
            position="small"
            src={imgAce}
            alt="A Hanafuda wrapper with the image of a European nobleman on the front.">
            Packaging of Ace’s <Noun lang="ja-Latn">Dai Kōshaku</Noun> brand.
          </ArticleImage>
        </section>
        <section>
          <h3><Noun lang="ja-Latn">Maruē</Noun> (<span lang="ja">マルエー</span>)</h3>
          <p><Noun lang="ja-Latn">Maruē</Noun> was from the city of <Noun lang="ja-Latn">Mino</Noun>, in <Noun lang="ja-Latn">Gifu</Noun> prefecture. Their manufacturer’s mark was a circled <span lang="ja">英</span> (<span lang="ja-Latn">ē</span>), i.e. <span lang="ja-Latn">maru-ē</span>. However, <span lang="ja">英</span> has the meaning of ‘flower’ and can also be read with the same pronunciation as <span lang="ja">花</span> <span lang="ja-Latn">hana</span>, making this mark very punny.</p>
          <ArticleImage
            position="small"
            src={imgMarue}
            alt="A Hanafuda wrapper with an image of cherry blossoms on the front.">
            Packaging by <Noun lang="ja-Latn">Maruē</Noun> (1970s).
          </ArticleImage>
        </section>
        <h3>Other past manufacturers</h3>
        <h4>From <Noun lang="ja-Latn">Kyōto</Noun></h4>
        <p>Information about these was manufacturers was found in <Noun lang="ja-Latn">Yamaguchi</Noun>’s book.{cite(Yamaguchi, [102])}</p>
        <ul>
          <li><Noun lang="ja-Latn">Tanaka Gyokusuidō</Noun> (<span lang="ja">田中玉水堂</span>). Existed in 1948; mark was <span lang="ja">田</span> with corner on top.</li>
          <li><Noun lang="ja-Latn">Nihon Karuta Seizō</Noun> (<span lang="ja">日本骨牌製造</span>). Existed in 1948; mark was <span lang="ja">中</span> with corner at top-right.</li>
          <li><Noun lang="ja-Latn">Yamashiro Shōten</Noun> (<span lang="ja">山城商店</span>). Existed in 1948; mark was a circled <span lang="ja">十</span>.</li>
          <li><Noun lang="ja-Latn">Ryūtendō</Noun> (<span lang="ja">龍天堂</span>). Existed in 1948; mark was a circled <span lang="ja">龍</span>.</li>
          <li><Noun lang="ja-Latn">Inoue Juntendō</Noun> (<span lang="ja">井上順天堂</span>). Existed in 1948; mark was a circled <span lang="ja">順</span>.</li>
          <li><Noun lang="ja-Latn">Nakao Seikadō</Noun> (<span lang="ja">中尾清花堂</span>). Existed in 1948; mark was <span lang="ja">セ</span> with corner at top-right.</li>
          <li><Noun lang="ja-Latn">Baba Keieidō</Noun> (<span lang="ja">馬場京栄堂</span>). Existed in 1948; mark was a circled <span lang="ja">京</span>.</li>
        </ul>
        <h4>Elsewhere</h4>
        <p>I have very little information about these manufacturers other than that they existed. The information here is mostly taken from {cite(ModernJapaneseWrappers, undefined, {inline: true})}.</p>
        <ul>
          <li>Heibon (<span lang="ja">平凡</span>), Tōkyō {/*<!--
          https://www.ebay.com/itm/Heibon-Playing-Cards-Vintage-New-Old-Stock-Hanafuda-Kintoki-Zakura-Red-/271168560044
          -->*/}</li>
          <li>Iwata (cards made by Tamura Shōgun-dō)</li>
          <li>Kawakita (cards made by Yamashiro Shōten)</li>
          <li>Kohara, Ōsaka</li>
          <li>Nishimura, Tōkyō</li>
          <li>Kyōto Karuta, Kyōto</li>
          <li>Dai Nippon, Yōkaichi (now part of Higashiōmi), Shiga prefucture</li>
          <li><a href="http://www.nichiyu.net/en" className="proper-noun" lang="ja-Latn">Nippon Yūgi Gangu</a> (<span lang="ja">日本遊戯玩具</span>), Tōkyō (1946). Still exists but no longer appears to produce <Noun lang="ja-Latn">Hanafuda</Noun> cards, specializes in tarot.</li>
          <li>Universal, Ōsaka. At one time Universal produced cards (such as the Hana-Trump deck) for Nintendo.</li>
        </ul>
        </section>
    );
};

export default Manufacturers;
