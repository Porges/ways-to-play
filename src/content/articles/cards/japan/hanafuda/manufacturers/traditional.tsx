import * as React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { Cite, ArticleImage, Noun, Footnote, Section } from 'ui';
import { GameRef } from 'content/games/Game';

import { SchreiberCollection, UmebayashiIsao, TewazaNoKioku, Hargrave, OstasiatischeSpielkarten, Yamaguchi, IwanoMatsui, ModernJapaneseWrappers, SalterJapanese, EbashiCigaretteCards } from 'References/bibliography.json';

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
import imgKyoHana from './KyoHana.jpg';
import imgNishikiBrights from './Nishiki_Brights.jpg';
import imgAngelJokers from './Angel_Jokers.jpg';
import imgMatsuiBrights from './Matsui_Brights.jpg';
import imgMarioBrights from './Nintendo_Mario_Brights.jpg';
import imgOishiMark from './Oishi_Mark.jpg';
import imgAkataNewspaper from './Akata-Newspaper.jpg';
import imgAkataCard from './Akata-Card.jpg';
import imgNintendoShop from './nintendo-shop.jpg';
import imgNishimura1 from './nishimura_1.png';
import imgNishimura2 from './nishimura_2.png';
import imgTaxStampPurple from './tax_stamp_purple.jpg';
import imgTaxStampPink from './tax_stamp_pink.jpg';
import img50SenStamp from './20190921_timbre1.jpg';
import img1YenStamp from './20190921_timbre.jpg';
import imgNihonKaruta四光 from './NihonKaruta_四光.jpg';
import imgWindmillBrights from './Windmill_Brights.jpg';
import imgWindmillExtra from './Windmill_Extra.jpg';
import imgUniversalTrumpHanaBrights from './Universal_TrumpHana_Brights.jpg';
import imgUniversalTrumpHanaExtras from './Universal_TrumpHana_Extras.jpg';
import imgShikishima from './Shikishima.jpg';
import imgAceSaigo from './Ace_Saigo.jpg';
import imgAceAdmiral from './Ace_Admiral.jpg';
//import imgOishiNarikin from './Oishi_Narikin.jpg';
import imgNihon1896 from './Nihon_1896.jpg';
import imgTakarabune from './Takarabune_by_Hiroshige.jpg';
import imgOtafuku from './otafuku.jpg';
import imgMatsuiShop from './2448px-松井天狗堂.jpg';
import imgNishimuraBrand from './nishimura_brand.jpg';
import imgMuraiBrosCard from './murai-bros-card.jpg';
import imgYamashiroExterior from './yamashiro_exterior.jpg';
import imgYamashiroPricelist from './yamashiro_pricelist_cover.jpg';
import imgNGYHanaTrump from './NYG_hanatrump.jpg';
import imgNYGTengu from './NYG_tengu.jpg';
import imgNKhigashinishiki from './NK_higashinishiki.jpg';
import imgNKkoekoe from './NK_kokonoezakura.jpg';
import imgDNhotaiko from './DN_hotaiko.jpg';
import imgDNsenhime from './DN_senhime.jpg';
import imgOToeyama from './OT_oeyama.jpg';
import imgOTtakarabune from './OT_takarabune.jpg';
import imgOThanazukushi from './OT_hanazukushi.jpg';
import imgOTsakura from './OT_sakura.jpg';
import imgOTlincoln from './OT_lincoln.jpg';
import imgOTnarikin from './OT_narikin.jpg';
import imgOTatariya from './OT_atariya.jpg';
import imgOTsantengu from './OT_santengu.jpg';
import imgTSyozakura from './TS_yozakura.jpg';
import imgTSharuzake from './TS_haruzake.jpg';

import imgYaguruma from './yaguruma.png';
import imgMarufuku from './marufuku.svg';
import imgYamami from './yamami.svg';
import imgKakudai from './kakudai.svg';
import imgKakumatsu from './kakumatsu.svg';
import imgMarueSvg from './marue.svg';
import imgYamata from './yamata.svg';
import imgKanenaka from './kanenaka.svg';
import imgMarujuu from './marujuu.svg';
import imgMaruryu from './maruryu.svg';
import imgMarujun from './marujun.svg';
import imgKanese from './kanese.svg';
import imgMarukyou from './marukyou.svg';
import imgMarusa from './marusa.svg';
import imgMarui from './marui.svg';
import imgKaneman from './kaneman.svg';
import imgMarumatsu from './marumatsu.svg';
import imgKanekata from './kanekata.svg';
import imgMarutano from './marutano.svg';
import imgMaruei from './maruei.svg';
import imgMarukin from './marukin.svg';
import imgMarudai from './marudai.svg';
import img3gourds from './3gourds.svg';
import imgHeibon from './heibon.svg';

const Manufacturers: React.FC = () => {
  return (<>
    <Section title="Identification">
      <p>The branding system of traditional <Noun lang="ja-Latn">Hanafuda</Noun> manufacturers can be confusing. Generally the front of the container (whether a box or wrapper) will have a brand, which indicates the quality of the cards, and the <em>type</em> of cards is written on the end of the container. For example, a box of <Noun lang="ja-Latn">Nintendō</Noun> cards with Napoleon on the front indicates their highest-quality card, but can contain either <Noun lang="ja-Latn">Hanafuda</Noun> or <Noun lang="ja-Latn">Kabufuda</Noun> cards.</p>
      <ArticleImage
        size="small"
        src={imgNintendoEnd}
        alt="The end of a Hanafuda wrapper with Japanese writing indicating its contents.">
        The end of a <Noun lang="ja-Latn">Nintendō</Noun> wrapper indicating that it contains<br />standard (<span lang="ja">八々花</span> <span lang="ja-Latn">hachihachibana</span>) Hanafuda cards, with black (<span lang="ja">黒</span>) backs.
      </ArticleImage>
      <Section title="Manufacturer’s Marks">
        <p>Within the deck, the manufacturer’s name or mark is nowadays always on one of the Paulownia junk cards, but on older decks it is can be on a Peony or Wisteria (or another card entirely).</p>
        <ArticleImage
          size="small"
          src={imgMarks}
          alt="Three cards all featuring Paulownia flowers, with maker’s marks printed upon them.">
          Manufacturer’s marks from <Noun lang="ja-Latn">Nintendō</Noun>, Angel, and <Noun lang="ja-Latn">Maruē</Noun>.
        </ArticleImage>
        <p>Often the mark is a simplified version of the name,<Footnote>Also be aware that Japanese can be written in either direction; <Cite r={OstasiatischeSpielkarten} page={136} inline /> describes a deck made by a mysterious manufacturer named ‘<Noun lang="ja-Latn">Dōtennin</Noun>’.</Footnote> or a different <span lang="ja-Latn">kanji</span>, usually combined with a geometric shape. When pronouncing the mark the shape is usually also ‘read’, so that <Noun lang="ja-Latn">Nintendō</Noun>’s mark—a stylized <span lang="ja">福</span> (<span lang="ja-Latn">fuku</span> ‘good fortune’) inside a circle—is read <span lang="ja-Latn">maru-fuku</span> ‘circle-fuku’, much like the brand “<a href="https://en.wikipedia.org/wiki/Circle_K">Circle K</a>”. The same can also be done with the square  (<span lang="ja">角</span> <span lang="ja-Latn">kaku</span>), a corner at top-right (┐) can be described as a carpenter’s square  (<span lang="ja">矩</span> <span lang="ja-Latn">kane</span>), and a corner pointing upwards (∧) is called a mountain (<span lang="ja">山</span> <span lang="ja-Latn">yama</span>).</p>
        <Section title="Index of Marks">
          <div className="multi">
            <Table size="small">
              <tbody>
                <tr>
                  <td><img src={imgMarufuku} className="inline-img big" alt="The Marufuku symbol" /></td>
                  <td><a href="#nintendo"><Noun lang="ja-Latn">Nintendō</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgYamami} className="inline-img big" alt="The Yamami symbol" /> or <img src={imgKakudai} className="inline-img big" alt="The Kakudai symbol" /></td>
                  <td><a href="#oishi-tengudo"><Noun lang="ja-Latn">Ōishi Tengudō</Noun></a></td>
                </tr>
                <tr>
                  <td><span lang="ja" className="inline-img big" style={{ fontFamily: "sans-serif" }}>翁</span></td>
                  <td><a href="#angel-enzeru">Angel</a></td>
                </tr>
                <tr>
                  <td><img src={imgYaguruma.src} className="inline-img big" alt="The Yaguruma symbol" /></td>
                  <td><a href="#tamura-shogundo"><Noun lang="ja-Latn">Tamura Shōgundō</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgKakumatsu} className="inline-img big" alt="The Kakumatsu symbol" /></td>
                  <td><a href="#matsui-tengudo"><Noun lang="ja-Latn">Matsui Tengudō</Noun></a></td>
                </tr>
                <tr>
                  <td><span lang="ja" style={{ fontFamily: "sans-serif" }}>エース</span></td>
                  <td><a href="#ace-esu">Ace</a></td>
                </tr>
                <tr>
                  <td><img src={imgMarueSvg} className="inline-img big" alt="The Marue symbol" /></td>
                  <td><a href="#marue"><Noun lang="ja-Latn">Maruē</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgYamata} className="inline-img big" alt="The Yamata symbol" /></td>
                  <td><a href="#tanaka-gyokusuido-iwata-honten"><Noun lang="ja-Latn">Tanaka Gyokusuidō/Iwata Honten</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgKanenaka} className="inline-img big" alt="The Kanenaka symbol" /></td>
                  <td><a href="#nihon-karuta-seizo-tamada-fukushodo"><Noun lang="ja-Latn">Nihon Karuta</Noun>/<Noun lang="ja-Latn">Tamada Fukushōdō</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarujuu} className="inline-img big" alt="The Marujū symbol" /></td>
                  <td><a href="#yamashiro-shoten"><Noun lang="ja-Latn">Yamashiro Shōten</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMaruryu} className="inline-img big" alt="The Maruryu symbol" /></td>
                  <td><a href="#ryutendo"><Noun lang="ja-Latn">Ryūtendō</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarujun} className="inline-img big" alt="The Marujun symbol" /></td>
                  <td><a href="#inoue-juntendo"><Noun lang="ja-Latn">Inoue Juntendō</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgKanese} className="inline-img big" alt="The Kanese symbol" /></td>
                  <td><a href="#nakao-seikado"><Noun lang="ja-Latn">Nakao Seikadō</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarukyou} className="inline-img big" alt="The Marukyō symbol" /></td>
                  <td><a href="#baba-keieido"><Noun lang="ja-Latn">Baba Keieidō</Noun></a></td>
                </tr>
              </tbody>
            </Table>
            <Table size="small">
              <tbody>
                <tr>
                  <td><img src={imgHeibon} className="inline-img big" alt="A large coin symbol" /></td>
                  <td><a href="#heibon"><Noun lang="ja-Latn">Heibon</Noun></a></td>
                </tr>
                <tr>
                  <td>?</td>
                  <td><a href="#kawakita"><Noun lang="ja-Latn">Kawakita</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarusa} className="inline-img big" alt="The Marusa symbol" /></td>
                  <td><a href="#kohara-honten"><Noun lang="ja-Latn">Kohara Honten</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarui} className="inline-img big" alt="The Marui symbol" /></td>
                  <td><a href="#nishimura"><Noun lang="ja-Latn">Nishimura</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarukyou} className="inline-img big" alt="The Marukyō symbol" /></td>
                  <td><a href="#kyoto-karuta"><Noun lang="ja-Latn">Kyōto Karuta</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={img3gourds} className="inline-img big" alt="A symbol consisting of a bunch of 3 gourds" /></td>
                  <td><a href="#dai-nippon"><Noun lang="ja-Latn">Dai Nippon</Noun></a></td>
                </tr>
                <tr>
                  <td>?</td>
                  <td><a href="#nippon-yugi-gangu"><Noun lang="ja-Latn">Nippon Yūgi Gangu</Noun></a></td>
                </tr>
                <tr>
                  <td>?</td>
                  <td><a href="#universal"><Noun lang="ja-Latn">Universal</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgKaneman} className="inline-img big" alt="The Kaneman symbol" /></td>
                  <td><a href="#kawai"><Noun lang="ja-Latn">Kawai</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarumatsu} className="inline-img big" alt="The Marumatsu symbol" /></td>
                  <td><a href="#akata-shojoya"><Noun lang="ja-Latn">Akata Shōjōya</Noun></a></td>
                </tr>
                <tr>
                  <td>?</td>
                  <td><a href="#suisando"><Noun lang="ja-Latn">Suisando</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarutano} className="inline-img big" alt="The Marutano symbol" /></td>
                  <td><a href="#nihon-goraku"><Noun lang="ja-Latn">Nihon Goraku</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMaruei} className="inline-img big" alt="The Maruei symbol" /></td>
                  <td><a href="#kyowado"><Noun lang="ja-Latn">Kyōwadō</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgKanekata} className="inline-img big" alt="The Kanekata symbol" /></td>
                  <td><a href="#kamigataya"><Noun lang="ja-Latn">Kamigataya</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarukin} className="inline-img big" alt="The Marukin symbol" /></td>
                  <td><a href="#marukin"><Noun lang="ja-Latn">Marukin</Noun></a></td>
                </tr>
                <tr>
                  <td><img src={imgMarudai} className="inline-img big" alt="The Marudai symbol" /></td>
                  <td><a href="#otani-shoten"><Noun lang="ja-Latn">Ōtani Shōten</Noun></a></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Section>
      </Section>
      <Section title="Dating Decks">
        <p>Dating old decks can be difficult. As manufacturers have not published any information about when certain brands or decks were produced, we can only go via public information. Some suggested methods are:</p>
        <ul>
          <li>Japanese written in a right-to-left ordering generally indicates that the deck would have been made before the end of <abbr title="World War Two">WWII</abbr> (from here on, I use the term ‘pre-war’). Thus, <span lang="ja">任天堂</span> is written <bdo dir="rtl" lang="ja">任天堂</bdo> on very old decks. <em>However</em>, some manufacturers such as <Noun lang="ja-Latn">Ōishi Tengudō</Noun> or <Noun lang="ja-Latn">Nihon Karuta</Noun> have persisted in using right-to-left ordering even into the present era.</li>
          <li>The most accurate method of dating is to use tax stamps (see below), if the deck has any still present. This only works for decks produced up to 1989, when the tax on playing-cards was removed.</li>
          <li>For more recent decks, barcodes can give some clues: Japanese barcodes beginning with <span className="barcode">49⋯</span> have been used since 1978, but barcodes beginning with <span className="barcode">45⋯</span> were introduced in 1992.</li>
        </ul>
      </Section>
      <Section title="Tax Stamps">
        <p>For most of the 20th century, <Noun lang="ja-Latn">Hanafuda</Noun> cards were taxed by the Japanese government. This tax has changed over time and thus can be used to identify the time period during which a deck was sold.</p>
        <p>The following table is summarized from <a href="https://japanplayingcardmuseum.com/category/0-0-cartatax-law-history/">a series of articles</a> provided by <Noun lang="ja-Latn">Ebashi</Noun> on his website:</p>
        <Table size="sm" className="numeric">
          <caption>Tax levied on <Noun lang="ja-Latn">Hanafuda</Noun> sets over time.</caption>
          <thead>
            <tr>
              <th className="text-center">Date Introduced</th>
              <th className="text-center">Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>July 1, 1902</td><td>20 <span lang="ja-Latn">sen</span></td></tr>
            <tr><td>April 1, 1926</td><td>50 <span lang="ja-Latn">sen</span></td></tr>
            <tr><td>April 1, 1940</td><td>70 <span lang="ja-Latn">sen</span></td></tr>
            <tr><td>November 22, 1941</td><td>1½ <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>February 44, 1944</td><td>3 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>August 30, 1946</td><td>10 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>March 31, 1947</td><td>30 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>November 30, 1947</td><td>100 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>July 7, 1948</td><td>130 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>March 28, 1951</td><td>50 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>March 31, 1954</td><td>60 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>June 14, 1957</td><td>60 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>October 1, 1960</td><td>60 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>March 31, 1962</td><td>40 <span lang="ja-Latn">yen</span></td></tr>
            <tr><td>April 1, 1989</td><td>abolished</td></tr>
          </tbody>
        </Table>
      </Section>
      <ArticleImage
        src={[
          [img50SenStamp, "A square blue stamp reading ‘50 sen’ in Japanese with a stylized chrysanthemum flower."],
          [img1YenStamp, "A square red stamp reading ‘1 yen’ in Japanese with a stylized chrysanthemum flower and elaborate border."]]}
        source={{
          copyrightYear: 2019,
          author: {given: "Fabrice", family: "Heilig"},
          license: 'with-permission'
        }}>
        Late <Noun lang="ja-Latn">Taishō</Noun>‐era tax stamps: blue 50 <span lang="ja-Latn">sen</span> on left, red 1 <span lang="ja-Latn">yen</span> on right.
      </ArticleImage>
      <ArticleImage
        src={[
          [imgTaxStampPink, "A long rectangular stamp coloured pink, with elaborate border and a serial number in centre."],
          [imgTaxStampPurple, "A long rectangular stamp coloured purple, with elaborate border and a serial number in centre."]]}>
        Tax stamps of the type used from 1960 until the tax was abolished in 1989. Pink was used for <Noun lang="ja-Latn">Hanafuda</Noun> decks and purple was used for Western style (“trump”) decks.
      </ArticleImage>
    </Section>
    <Section title="Current Manufacturers">
      <p>All current Japanese manufacturers that I know of are based in <Noun lang="ja-Latn">Kyōto</Noun> prefecture. The <Noun lang="ja-Latn">Kansai</Noun> region (which contains both <Noun lang="ja-Latn">Kyōto</Noun> and <Noun lang="ja-Latn">Ōsaka</Noun>) is the original source of <Noun lang="ja-Latn">Hanafuda</Noun> cards.</p>
      <Section title={<><img src={imgMarufuku} alt="" className="inline-img" /> <Noun lang="ja-Latn">Nintendō</Noun> (<span lang="ja">任天堂</span>)</>}>
        <p><Noun lang="ja-Latn">Nintendō</Noun> is the most prominent company that produces <Noun lang="jp-Latn">Hanafuda</Noun> cards today. The company was founded in <Noun lang="jp-Latn">Kyōto</Noun> in 1889 by <Noun lang="ja-Latn">Yamauchi Fusajirō</Noun> (<span lang="ja">山内 房治郎</span>), and it was run by the <Noun lang="ja-Latn">Yamauchi</Noun> family for three generations until <Noun lang="ja-Latn">Yamauchi Hiroshi</Noun> (<span lang="ja">山内 溥</span>) stepped down in 2002.</p>
        <p> In the early days of the company,  <Noun lang="ja-Latn">Fusajirō</Noun> joined forces with the “tobacco king” <Noun lang="ja-Latn">Murai Kichibee</Noun> (<span lang="ja">村井吉兵衛</span>) who had founded the <Noun lang="ja-Latn">Murai</Noun> Brothers tobacco company in 1892. Like <Noun lang="ja-Latn">Nintendō</Noun>, who were one of the first companies to produce Western-style cards in Japan, <Noun lang="ja-Latn">Murai</Noun> Bros. was a company that was incorporating Western elements: they were operating in conjunction with American tobacco companies, and many of their cigarette brands bore English titles. Together the two companies invested to purchase printing equipment from an American company in New York that had been taken over by the <abbr title="United States Playing Card Company">USPCC</abbr>, and formed a venture called “Tōyō Printing” (<span lang="ja">東洋印刷</span>).<Cite r={EbashiCigaretteCards} /></p>
        <ArticleImage 
          position="left"
          alt="An image of a cigarette card with a combination Hanafuda (Wisteria) and Western (4 of clubs) on the front, and on the reverse reading “A different card in each package of cigarettes”."
          src={imgMuraiBrosCard}
          source={{
            license: "cc0"
          }}>
          An example of a combination <Noun lang="ja-Latn">Hanafuda</Noun> card included with a packet of Murai Bros. cigarettes. Note that the clubs are printed in the “wrong” colour.
        </ArticleImage>
        <p>Using this printing equipment they were able to produce high-quality collectible cards to include with cigarettes, and by 1894, one of these offerings was a single <Noun lang="ja-Latn">Hanafuda</Noun> card included with each packet of cigarettes sold. These tobacco cards often featured a design which combined Western playing cards with the <Noun lang="ja-Latn">Hanafuda</Noun> pattern. In 1904, the Japanese government nationalized the manufacture of all tobacco products,<Footnote><Noun lang="ja-Latn">Kichibee</Noun> was compensated massively for being pushed out of the industry and so founded a bank instead.</Footnote> and the partnership between the two companies ended.</p>
        <p>A too-brief summary of their later success: after WWII, <Noun lang="jp-Latn">Nintendō</Noun> managed to survive a period of crushing taxation on playing-card products, which wiped out many of the smaller manufacturers. In the second half of the 20th century they (famously!) diversified into children’s toys and, later on, video games.</p>
        <ArticleImage
          size="wide"
          src={imgNintendoShop}
          alt="A wooden storefront with wrought-iron railings and a bicycle parked outside."
          source={{ license: "cc0" }}>
          The <Noun lang="ja-Latn">Nintendō</Noun> storefront in <Noun lang="ja-Latn">Kyōto</Noun> in 1889.
          </ArticleImage>
        <p><Noun lang="ja-Latn">Nintendō</Noun>’s manufacturers mark is a circled <span lang="ja" className="circled">福</span> (<span lang="ja-Latn">fuku</span>, ‘fortune’). This was originally the trade-name (<span lang="ja">屋号</span> <a href="https://en.wikipedia.org/wiki/Yag%C5%8D"><span lang="ja-Latn">yagō</span></a>) of the <Noun lang="ja-Latn">Yamauchi</Noun> family.</p>
        <ArticleImage
          position="right"
          src={imgNintendo}
          alt="A Hanafuda wrapper featuring an image of Napoleon on the front.">
          <Noun lang="ja-Latn">Nintendō</Noun>’s <span lang="ja-Latn">Daitōryō</span> packaging (1970s). Note the <Noun lang="ja-Latn">Marufuku</Noun> mark at top right.
          </ArticleImage>
        <p>In the past <Noun lang="ja-Latn">Nintendō</Noun> produced many varieties of local cards or <Noun lang="ja-Latn">Mekuri</Noun> cards, but today they only produce <Noun lang="ja-Latn">Hanafuda</Noun> and <Noun lang="ja-Latn">Kabufuda</Noun> cards. Their current brands are: <span lang="ja-Latn">Daitōryō</span> <span lang="ja">大統領</span> (featuring a picture of Napoleon); <span lang="ja-Latn">Marufuku Tengu</span> <span lang="ja">丸福天狗</span>; and <span lang="ja-Latn">Miyako no Hana</span> <span lang="ja">都の花</span> ‘flowers of the city’.</p>
        <p><Noun lang="ja-Latn">Nintendō</Noun> <Noun lang="ja-Latn">Hanafuda</Noun> brands have included:<Cite r={ModernJapaneseWrappers} page={54} /></p>
        <ul>
          <li><span lang="ja">大統領</span> (<span lang="ja-Latn">daitōryō</span>, a translation of ‘first consul’, Napoleon’s title from 1799–1804)</li>
          <li><span lang="ja">お多福</span> (<span lang="ja-Latn">otafuku</span>, ‘moon-faced woman’) <ArticleImage position="aside" alt="An actor wearing a mask of a white-faced woman with large cheeks, raised eyebrows, and a smile on her lips." src={imgOtafuku} source={{originalUrl: "https://www.flickr.com/photos/kryptos5/2953289035", author: { given: "See Tatt", family: "Yeo" }, license: "cc-by-nc-nd", licenseVersion: "2.0"}}><Noun lang="ja-Latn">Otafuku</Noun> (also known as <Noun lang="ja-Latn">Okame</Noun>) is a traditional character associated with good luck, and often appears in <span lang="ja-Latn">kagura</span> performances alongside <a href="https://en.wikipedia.org/wiki/Hyottoko"><Noun lang="ja-Latn">Hyottoko</Noun></a>.</ArticleImage></li>
          <li><span lang="ja">天狗</span> (<span lang="ja-Latn">tengu</span>, ‘<Noun lang="ja-Latn">Tengu</Noun>’)</li>
          <li><span lang="ja">大将</span> (<span lang="ja-Latn">taishō</span>, ‘general’)</li>
          <li><span lang="ja">白梅</span> (<span lang="ja-Latn">shira ume</span>, ‘white plum’), not in use as of 1980</li>
          <li><span lang="ja">櫻乃山</span> (<span lang="ja-Latn">sakura no yama</span>, ‘mountain cherry blossoms’), not in use as of 1980</li>
          <li><span lang="ja">朝日桜</span> (<span lang="ja-Latn">asahi sakura</span>, ‘sunrise cherry blossoms’)</li>
          <li><span lang="ja">三羽鶴</span> (<span lang="ja-Latn">sanbazuru</span>, ‘three cranes’), not in use as of 1980</li>
          <li><span lang="ja">大天狗</span> (<span lang="ja-Latn">dai tengu</span>, ‘chief <Noun lang="ja-Latn">Tengu</Noun>’), introduced in 1977</li>
          <li><span lang="ja">千代桜</span> (<span lang="ja-Latn">chiyo zakura</span>, ‘thousand-year cherry blossoms’)</li>
          <li><span lang="ja">春遊</span> (<span lang="ja-Latn">shun’yu</span>, ‘spring outing’, especially of the Emperor)</li>
        </ul>
        <p>One interesting deck they used to produce was <b>Hana-Trump</b>, which combined <Noun lang="ja-Latn">Hanafuda</Noun> cards with the cards of the international standard playing card deck. Each rank of the standard pack corresponds to a month of the <Noun lang="ja-Latn">Hanafuda</Noun> deck:</p>
        <ArticleImage
          src={imgHanaTrump5Brights}
          alt="The 5 bright cards from a Hana-Trump deck, which are hanafuda cards printed on the center of the standard international playing card deck.">
          The 5 Brights of <Noun lang="ja-Latn">Nintendō</Noun>’s “Hana-Trump” deck.
          </ArticleImage>
        <p>Because there are four more cards in the standard deck compared to the <Noun lang="ja-Latn">Hanafuda</Noun> one, <Noun lang="ja-Latn">Nintendō</Noun> added an additional four cards (and two jokers) to the set. These extra cards are counterparts for specialized pieces of equipment present in boxed <GameRef id="hachi-hachi" /> (<span lang="ja">八八</span>) sets.</p>
        <ArticleImage
          src={imgHanaTrumpExtra}
          alt="Four additional cards corresponding to the Kings of the standard deck, and one joker card.">
          The extra cards of <Noun lang="ja-Latn">Nintendō</Noun>’s “Hana-Trump” deck. From left-to-right, after the joker, these are: a blindfolded samurai, with text reading <span lang="ja"><q>不見出</q></span> (88 sets have a piece labelled <span lang="ja"><q>不見転</q></span>, ‘loose morals’); a <span lang="ja-Latn">gunbai</span> (<span lang="ja">軍配</span>), a military leader’s fan which is nowadays used by sumo referees, which is inscribed <span lang="ja"><q>跡絶之章</q></span> (88 sets have a piece labelled <span lang="ja"><q>両桐絶体之章</q></span>); a rice winnowing basket (<span lang="ja">箕</span> <span lang="ja-Latn">mi</span>) inscribed <span lang="ja"><q>手役之章</q></span> (hand-<span lang="ja-Latn">yaku</span> prize); and an award medal reading <span lang="ja"><q>吟見勲賞</q></span> (<span lang="ja-Latn">Ginmi Kunshō</span>, ‘<span lang="ja-Latn">Ginmi</span> Medal’), which is a prize for the ‘top player’ (<span lang="ja-Latn">Ginmi</span>, usually spelt <span lang="ja">吟味</span>, 88 sets have a piece labelled <span lang="ja">銀見勲章</span>).
          </ArticleImage>
        <p>Currently <Noun lang="ja-Latn">Nintendō</Noun> also produce many novelty decks themed with their videogame characters, such as Mario (pictured below), Pokémon, Mario Pikachu (limited edition, 2016), Kirby (2020), among others.</p>
        <ArticleImage
          src={imgMarioBrights}
          alt="TODO">
          <Noun lang="ja-Latn">Nintendō</Noun>’s Mario deck, featuring recurring characters from the Mario series.
          </ArticleImage>
        <p><Noun lang="ja-Latn">Nintendō</Noun> have also on occasion produced decks for other companies, such as the <Noun lang="ja-Latn">Shikishima Hanafuda</Noun> (<span lang="ja">敷島花札</span>) produced for <Noun lang="ja-Latn">Okuno Karuta</Noun> (<span lang="ja">奥野かるた店</span>), a games shop in <Noun lang="ja-Latn">Tōkyō</Noun>.</p>
        <ArticleImage
          src={imgShikishima}
          alt="">
          <Noun lang="ja-Latn">Okuno Karuta’s Shikishima Hanafuda</Noun>. The cards were designed by the print artist <Noun lang="ja-Latn">Itō Takumi</Noun> (<span lang="ja">伊藤卓美</span>, <abbr title="born">b.</abbr> 1946). They are larger than normal <Noun lang="ja-Latn">Hanafuda</Noun> and the cards are printed on flat cardboard, not wrapped with backing paper.
        </ArticleImage>
      </Section>
      <Section title={<><img src={imgYamami} alt="" className="inline-img" /> <a href="https://www.tengudo.jp/" className="proper-noun" lang="ja-Latn">Ōishi Tengudō</a> (<span lang="ja">大石天狗堂</span>)</>}>
        <p>Also based in <Noun lang="ja-Latn">Kyōto</Noun>, <Noun lang="ja-Latn">Ōishi Tengudō</Noun> produces a wide variety of traditional Japanese card games. As far as I know, they are the only major manufacturer still producing <Noun lang="ja-Latn">Mefuda</Noun> cards. They also produce reproductions of even older cards, such as the <Noun lang="ja-Latn">Unsun</Noun> deck.</p>
        <ArticleImage
          position="right"
          size="small"
          src={imgOishiMark}
          alt="A card with wistera showing the manufacturer’s mark.">
          <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s manufacturer’s mark, on a Wisteria card from an old <Noun lang="ja-Latn">Narikin</Noun> deck.
        </ArticleImage>
        <p>Their main manufacturer’s mark is <span lang="ja">み</span> with corner at top, but on some decks (e.g. <Noun lang="ja-Latn">Echigo-kobana</Noun>), they have used <span lang="ja">大</span> in a square. Brands produced by <Noun lang="ja-Latn">Ōishi Tengudō</Noun> in the past included:<Cite r={ModernJapaneseWrappers} page={[[57, 58]]} /></p>
        <ul>
          <li><span lang="ja">金天狗</span> (<span lang="ja-Latn">kintengu</span>, ‘golden <Noun lang="ja-Latn">Tengu</Noun>’), also used for <Noun lang="ja-Latn">Kabu</Noun> and <Noun lang="ja-Latn">Tehonbiki</Noun> cards</li>
          <li><span lang="ja">銀天狗</span> (<span lang="ja-Latn">gintengu</span>, ‘silver <Noun lang="ja-Latn">Tengu</Noun>’), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">若天狗</span> (<span lang="ja-Latn">wakatengu</span>, ‘young <Noun lang="ja-Latn">Tengu</Noun>’)</li>
          <li><span lang="ja">三天狗</span> (<span lang="ja-Latn">santengu</span>, ‘three <Noun lang="ja-Latn">Tengu</Noun>’)</li>
          <li><span lang="ja">成金</span> (<span lang="ja-Latn">narikin</span>, ‘newly rich’, derived from a <Noun lang="ja-Latn">Shogi</Noun> term), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">リンカーン</span> (<span lang="ja-Latn">rinkān</span>, ‘Lincoln’), no longer in use as of 1979</li>
          <li><span lang="ja">福助</span> (<span lang="ja-Latn">fukusuke</span>, a <a href="https://en.wikipedia.org/wiki/Fukusuke">large-headed good luck doll</a>), no longer in use as of 1979</li>
          <li><span lang="ja">當矢</span> (<span lang="ja-Latn">atariya</span>, ‘winning arrow’)</li>
          <li><span lang="ja">四季</span> (<span lang="ja-Latn">shiki</span>, ‘four seasons’)</li>
          <li><span lang="ja">大江山</span> (<span lang="ja-Latn">ōeyama</span>, <a href="https://en.wikipedia.org/wiki/%C5%8Ceyama">a mountain near <Noun lang="ja-Latn">Kyōto</Noun></a>)</li>
          <li><span lang="ja">寳船</span> (<span lang="ja-Latn">takarabune</span>, ‘treasure ship’)<ArticleImage position="aside" size="wide" src={imgTakarabune} alt="TODO" source={{originalUrl: "https://commons.wikimedia.org/wiki/File:Takarabune_by_Hiroshige.png", license:"cc0", author: "MichaelMaggs"}}>The <span lang="ja-Latn">takarabune</span> is a <a href="https://en.wikipedia.org/wiki/Takarabune">mythical ship</a> that carries the <a href="https://en.wikipedia.org/wiki/Seven_Lucky_Gods">seven lucky gods</a>, as shown in this print by <a href="https://en.wikipedia.org/wiki/Hiroshige">Hiroshige</a> (<abbr title="circa">c.</abbr> 1840). </ArticleImage></li>
          <li><span lang="ja">御所車</span> (<span lang="ja-Latn">goshoguruma</span>, ‘ox-drawn coach’)</li>
          <li><span lang="ja">来福</span> (<span lang="ja-Latn">raifuku</span>, ‘fortune comes’, a reference to the full <a href="https://en.wikipedia.org/wiki/Yojijukugo"><span lang="ja-Latn">yojijukugo</span></a> “<span lang="ja">笑門来福</span>”, ‘fortune comes to the home of those who smile’)</li>
          <li><span lang="ja">花津久志/花𛁫くし</span> (<span lang="ja-Latn">hanazukushi</span>, ‘assorted flowers’)</li>
          <li><span lang="ja">舞楽</span>, (<span lang="ja-Latn">bugaku</span>, <a href="https://en.wikipedia.org/wiki/Bugaku">a courtly dance with music</a>)</li>
          <li><span lang="ja">𛀿𛀬ら</span>, (<span lang="ja-Latn">sakura</span>, but written with <span lang="ja-Latn">hentaigana</span> characters)</li>
          <li><span lang="ja">一癶</span>, (<span lang="ja-Latn">ippatsu</span>, ‘one shot’, e.g. baseball home run or a mahjong term)</li>
        </ul>
        <div className="multi">
          <ArticleImage
            src={imgOishiTengudo}
            alt="The front of a wooden Hanafuda box with a pasted-on image of a Tengu mask.">
            <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s <span lang="ja-Latn">kintengu</span> wrapper. This is now their standard brand.
            </ArticleImage>
          <ArticleImage
            src={imgOTnarikin}
            alt="A Hanafuda box front featuring a large Koban coin with ‘Narikin’ (newly rich) written on it.">
            <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s <span lang="ja-Latn">narikin</span> wrapper.
            </ArticleImage>
          <ArticleImage src={imgOToeyama} alt="A hanafuda wrapper with a mountain and a man gazing into the distance.">
            <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s <span lang="ja-Latn">ōeyama</span> wrapper. The man is wearing the clothing of the <a href="https://en.wikipedia.org/wiki/Shugend%C5%8D"><Noun lang="ja-Latn">Shugendō</Noun></a> sect, which <Noun lang="ja-Latn">Tengu</Noun> are also depicted as wearing.
          </ArticleImage>
        </div>
        <div className="multi">
          <ArticleImage src={imgOTtakarabune} alt="A hanafuda wrapper with a boat carrying seven people.">
            <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s <span lang="ja-Latn">takarabune</span> wrapper.
          </ArticleImage>
          <ArticleImage src={imgOTsakura} alt="A hanafuda wrapper with cherry blossoms and an old street light.">
            <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s <span lang="ja-Latn">sakura</span> wrapper.
          </ArticleImage>
          <ArticleImage src={imgOThanazukushi} alt="A hanafuda wrapper with peonies, cherry blossoms, and other flowers.">
            <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s <span lang="ja-Latn">hanazukushi</span> wrapper.
          </ArticleImage>
        </div>
        <div className="multi">
          <ArticleImage src={imgOTlincoln} alt="A hanafuda wrapper with an image of Abaraham Lincoln.">
            <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s Lincoln wrapper.
          </ArticleImage>
          <ArticleImage src={imgOTatariya} alt="A hanafuda wrapper with an arrow striking the centre of a target.">
            <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s <span lang="ja-Latn">atariya</span> wrapper.
          </ArticleImage>
          <ArticleImage src={imgOTsantengu} alt="A hanafuda wrapper three tengu masks.">
            <Noun lang="ja-Latn">Ōishi Tengudō</Noun>’s <span lang="ja-Latn">santengu</span> wrapper.
          </ArticleImage>
        </div>
        <p>In addition to the many standard & local patterns of <Noun lang="ja-Latn">Hanafuda</Noun> they produce, they also publish some novelty decks, such as the <b><Noun lang="ja-Latn">Kyōto Hanafuda</Noun></b>:</p>
        <ArticleImage
          src={imgKyoHana}
          alt="Five hanafuda cards with depictions of landmarks and various aspects of Kyōto life.">
          The <Noun lang="ja-Latn">Kyōto Hanafuda</Noun>’s 5 Brights, showing icons and landmarks of <Noun lang="ja-Latn">Kyōto</Noun>.
            From left to right they represent: a fox with a jewel in its mouth, from the gate of the <a href="https://en.wikipedia.org/wiki/Fushimi_Inari-taisha"><Noun lang="ja-Latn">Fushimi Inari</Noun> shrine</a> (<span lang="ja">伏見稲荷大社</span>); <a href="https://en.wikipedia.org/wiki/Toyotomi_Hideyoshi"><Noun lang="ja-Latn">Toyotomi Hideyoshi</Noun></a> (<span lang="ja">豊臣秀吉</span>), <a href="https://en.wikipedia.org/wiki/K%C5%8Ddai-in"><Noun lang="ja-Latn">Kita no Mandokoro</Noun></a> (<span lang="ja">北政所</span>), and <a href="https://en.wikipedia.org/wiki/Yodo-dono"><Noun lang="ja-Latn">Yodogimi</Noun></a> (<span lang="ja">淀君</span>) at <a href="https://en.wikipedia.org/wiki/Fushimi_Castle">Fushimi Castle</a> (<span lang="ja">伏見城</span>); the character <span lang="ja">大</span> (<span lang="ja-Latn">dai</span>, ‘large’), which is lit on fire on mount <Noun lang="ja-Latn">Daimonji</Noun> (<span lang="ja">大文字山</span>) during the festival of <a href="https://en.wikipedia.org/wiki/Gozan_no_Okuribi"><Noun lang="ja-Latn">Gozan no Okuribi</Noun></a> (<span lang="ja">五山送り火</span>, ‘five mountain fire’); the warrior monk <a href="https://en.wikipedia.org/wiki/Benkei"><Noun lang="ja-Latn">Benkei</Noun></a> (<span lang="ja">弁慶</span>) meeting <a href="https://en.wikipedia.org/wiki/Minamoto_no_Yoshitsune"><Noun lang="ja-Latn">Minamoto no Yoshitsune</Noun></a> (<span lang="ja">源義経</span>), who is playing the flute, at <Noun lang="ja-Latn">Gojō</Noun> bridge (<span lang="ja">五条橋</span>); and the <a href="https://en.wikipedia.org/wiki/Kyoto_Sanga_FC"><Noun lang="ja-Latn">Kyōto Sanga</Noun></a> (<span lang="ja">京都サンガ</span>) football club, whose logo contains the Chinese/Japanese phoenix that is normally featured on the Paulownia bright card.
          </ArticleImage>
      </Section>
      <Section title={<><a href="http://www.angelplayingcards.com/product/hana.php">Angel</a> (<span lang="ja">エンゼル</span> <span lang="ja-Latn">enzeru</span>)</>}>
        <ArticleImage
          position="right"
          src={imgGenroku}
          alt="The front of a Hanafuda wrapper reading ‘genroku’ in Japanese characters and with cherry blossoms.">
          Angel’s <span lang="ja-Latn">Genroku</span> packaging (1970s).
          </ArticleImage>
        <p>Angel was originally named <Noun lang="ja-Latn">Okina Karuta Honpo</Noun> (<span lang="ja">翁かるた本舗</span>), and was based in <Noun lang="ja-Latn">Yōkaichi</Noun> (now <Noun lang="ja-Latn">Higashiōmi</Noun>), <Noun lang="ja-Latn">Shiga</Noun> prefecture. It is now based in <Noun lang="ja-Latn">Kyōto</Noun>. They still use <span lang="ja">翁</span> (<span lang="ja-Latn">okina</span>) as their maker’s mark, or otherwise the name Angel is written <span lang="ja">エンゼル</span>. On some cards this is spelled <span lang="ja">縁是留</span>.</p>
        <p>Angel currently produces <Noun lang="ja-Latn">Hanafuda</Noun> and <Noun lang="ja-Latn">Kabufuda</Noun> in two brands:</p>
        <ul>
          <li><span lang="ja">千鳥</span> (<span lang="ja-Latn">chidori</span> ‘numerous birds’)</li>
          <li><span lang="ja">元禄</span> (<span lang="ja-Latn">Genroku</span>, an era which spanned 1688–1704)</li>
        </ul>
        <p>Other brands produced in the past included:<Cite r={ModernJapaneseWrappers} page={45} /></p>
        <ul>
          <li><span lang="ja">玉将</span> (<span lang="ja-Latn">gyokushō</span>, ‘king of the lesser player’, a <Noun lang="ja-Latn">Shōgi</Noun> term)</li>
          <li><span lang="ja">翁</span> (<span lang="ja-Latn">okina</span>, ‘old man’)</li>
          <li><span lang="ja">泰平</span> (<span lang="ja-Latn">taihei</span>, ‘tranquility’)</li>
          <li><span lang="ja">纏</span> (<span lang="ja-Latn">matoi</span>, ‘<a href="https://en.wikipedia.org/wiki/Matoi">fireman’s standard</a>’), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">旅</span> (<span lang="ja-Latn">tabi</span>, ‘trip’)</li>
          <li><span lang="ja">大天龍</span> (<span lang="ja-Latn">daitenryū</span> ‘great <Noun lang="ja-Latn">Tenryū</Noun>’b)</li>
        </ul>
        <p>Angel also produces cardboard novelty <Noun lang="ja-Latn">hanafuda</Noun> for brands like Disney and Hello Kitty, and both <Noun lang="ja-Latn">Hyakunin Isshu</Noun> and <Noun lang="ja-Latn">Iroha Karuta</Noun>.</p>
        <p>At one point they produced a Hana-Trump deck with similar construction to that of <Noun lang="ja-Latn">Nintendō</Noun>’s (above).</p>
        <ArticleImage
          src={imgAngelJokers}
          alt="Four additional cards corresponding to the Kings of the standard deck, and one joker card.">
          The extra cards of Angel’s “Hana-Trump” deck.
          </ArticleImage>
      </Section>
      <Section title={<><img src={imgYaguruma.src} alt="" className="inline-img" /> <a href="http://www.shogundo.co.jp/" className="proper-noun" lang="ja-Latn">Tamura Shōgundō</a> (<span lang="ja">田村将軍堂</span>)</>}>
        <p>A small manufacturer, founded in 1921. Unlike other manufacturers, their mark is not a standard <span lang="ja-Latn">kanji</span>-shape combination, but instead a stylized depiction of a <span lang="ja-Latn">yaguruma</span> (<span lang="ja">矢車</span>, ‘arrow wheel’).<Footnote>
          The <span lang="ja-Latn">yaguruma</span> is a windmill-like device of arrows arranged in a wheel and allowed to rotate in the wind. They are associated with festivals, particularly the May 5th <a href="https://en.wikipedia.org/wiki/Tango_no_sekku"><Noun lang="ja-Latn">Tango no Sekku</Noun></a> festival, where they are placed on top of tall poles from which <a href="https://en.wikipedia.org/wiki/Koinobori"><span lang="ja-Latn">koi</span> streamers</a> are flown.
            <img className="d-block mx-auto w-75" src={imgYaguruma.src} alt="An example yaguruma symbol of seven arrows in a wheel, with the flights facing outwards." />
        </Footnote> They have also published <Noun lang="ja-Latn">Harifuda</Noun> and <Noun lang="ja-Latn">Shirofuda</Noun> (blank cards) under the mark <span lang="ja">㊀</span> (circled <span lang="ja">一</span>). They currently produce <Noun lang="ja-Latn">Hyakunin Isshu</Noun>, <Noun lang="ja-Latn">Manyo Karuta</Noun>, and <Noun lang="ja-Latn">Hanafuda</Noun>.</p>
        <p>Most of <Noun lang="ja-Latn">Tamura Shōgundō</Noun>’s cards are produced with hand-wrapped backing paper; they have <a href="http://www5f.biglobe.ne.jp/~karutaya/brand.html">another web page that details their manufacturing process</a>.</p>
        <p><Noun lang="ja-Latn">Tamura</Noun> manufactures two types of <Noun lang="ja-Latn">Hanafuda</Noun> cards; firstly the standard pattern, with brands (these have been maintained since the 1970s):<Cite r={ModernJapaneseWrappers} page={39} /></p>
        <ul>
          <li><span lang="ja">紫宸殿</span> (<span lang="ja-Latn">Shishinden</span>, the ceremonial hall of <Noun lang="ja-Latn">Kyōto</Noun> Imperial Palace)</li>
          <li><span lang="ja">大将軍</span> (<span lang="ja-Latn">daishōgun</span>, ‘general’), also used for <Noun lang="ja-Latn">Kabu</Noun>, <Noun lang="ja-Latn">Tehonbiki</Noun>, <Noun lang="ja-Latn">Shiro</Noun> (blank) cards</li>
          <li><span lang="ja">満点</span> (<span lang="ja-Latn">manten</span>, ‘perfect score’), also <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">栄光</span> (<span lang="ja-Latn">eikō</span>, ‘glory’), also <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">京乃錦</span> (<span lang="ja-Latn">Kyō no nishiki</span>, ‘brocade of <Noun lang="ja-Latn">Kyōto</Noun>’, indicating the autumn leaves)</li>
          <li><span lang="ja">花くらべ</span> (<span lang="ja-Latn">hanakurabe</span>, ‘comparing flowers’)</li>
          <li><span lang="ja">夜櫻</span> (<span lang="ja-Latn">yozakura</span>, ‘evening cherry blossoms’)</li>
          <li><span lang="ja">春風</span> (<span lang="ja-Latn">harukaze</span>, ‘spring breeze’), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">花あそび</span> (<span lang="ja-Latn">hanaasobi</span>, ‘flower playing’), no longer in use as of 2019</li>
          <li><span lang="ja">世界長</span> (<span lang="ja-Latn">sekaichō</span>, ‘world leader’), no longer in use as of 1980</li>
          <li><span lang="ja">宝玉</span> (<span lang="ja-Latn">hōgyoku</span>, ‘jewel’), no longer in use as of 1980</li>
          <li><span lang="ja">将軍</span> (<span lang="ja-Latn">shōgun</span>, <Noun lang="ja-Latn">Shogun</Noun>), used for <Noun lang="ja-Latn">Tehonbiki</Noun> only</li>
          <li><span lang="ja">総帥</span> (<span lang="ja-Latn">sōsui</span>, ‘commander-in-chief’), no longer in use as of 1980</li>
        </ul>
        <div className="multi wide">
          <ArticleImage src={imgTSyozakura} alt="A hanafuda wrapper with cherry blossoms and a brazier.">
            <Noun lang="ja-Latn">Tamura Shōgundō</Noun>’s <span lang="ja-Latn">yozakura</span> wrapper.
          </ArticleImage>
          <ArticleImage src={imgTSharuzake} alt="A hanafuda wrapper with a palace on a lake.">
            <Noun lang="ja-Latn">Tamura Shōgundō</Noun>’s <span lang="ja-Latn">haruzake</span> wrapper.
          </ArticleImage>
        </div>
        <ArticleImage
          size="small"
          position="right"
          alt="A hanafuda wrapper with a depiction of an apprentice geisha under blossoms and autumn leaves."
          src={imgShogundo}>
          <Noun lang="ja-Latn">Tamura Shōgundō</Noun>’s <span lang="ja-Latn">Kyō maiko</span> brand.
          </ArticleImage>
        <p>They also print a revised pattern, <Noun lang="ja-Latn">Nishiki</Noun> (<span lang="ja">錦</span>), which is larger and has a squarer format than standard cards, and is printed with more, bolder colours. This is sold under brands:</p>
        <ul>
          <li><span lang="ja">京舞妓</span> <span lang="ja-Latn">Kyō maiko</span>, ‘<Noun lang="ja-Latn">Kyōto maiko</Noun>’ (an apprentice <span lang="ja-Latn">geisha</span>)</li>
          <li><span lang="ja">祇園茶屋</span> <span lang="ja-Latn">Gion chaya</span>, ‘<Noun lang="ja-Latn">Gion</Noun> teahouse’ (a district of <Noun lang="ja-Latn">Kyōto</Noun>)</li>
          <li><span lang="ja">にしき花かるた</span> <span lang="ja-Latn">Nishiki hana karuta</span>, ‘<Noun lang="ja-Latn">Nishiki</Noun> flower cards’</li>
        </ul>
        <ArticleImage
          src={imgNishikiBrights}
          alt="Five hanafuda cards with very bold colours, unlike normal hanafuda cards.">
          The 5 Brights of the <span lang="ja-Latn">Nishiki</span> pattern.
          </ArticleImage>
      </Section>
    </Section>
    <Section title="Extinct Manufacturers">
      <p>These are producers that do not exist any more.</p>
      <Section title={<><img src={imgKakumatsu} alt="" className="inline-img" /> <Noun lang="ja-Latn">Matsui Tengudō</Noun> (<span lang="ja">松井天狗堂</span>)</>}>
        <ArticleImage
          position="aside"
          src={imgMatsuiShop}
          alt="A Japanese storefront with disintegrating sign and a pine tree growing in front."
          source={{originalUrl: "https://commons.wikimedia.org/wiki/File:%E6%9D%BE%E4%BA%95%E5%A4%A9%E7%8B%97%E5%A0%82.jpg",
            copyrightYear: 2017,
            author: "Kokoron78",
            license: "cc-by-sa",
            licenseVersion: "4.0",
          }}>
          The <Noun lang="ja-Latn">Matsui Tengudō</Noun> store as it appeared in 2017, 7 years after shutting down.
        </ArticleImage>
        <p><Noun lang="ja-Latn">Matsui Tengudō</Noun> was founded in <Noun lang="ja-Latn">Kyōto</Noun><Footnote>There was also an <Noun lang="ja-Latn">Ōsaka</Noun>-based <Noun lang="ja-Latn">Matsui Tengudō</Noun>, started by the younger brother of <Noun lang="ja-Latn">Matsui Shigejiro</Noun>, which had actually opened before the <Noun lang="ja-Latn">Kyōto</Noun> branch. It used the same manufacturer’s mark but closed after the second generation.</Footnote> in 1897 by <Noun lang="ja-Latn">Matsui Shigejiro</Noun> (<span lang="ja">松井重次郎</span>), and was run by the <Noun lang="ja-Latn">Matsui</Noun> family for three generations until it closed in 2010 after <Noun lang="ja-Latn">Matsui Shigeo</Noun> (<span lang="ja">松井重夫</span>, 1931–2016) retired.<Cite r={IwanoMatsui} /></p>
        <p><Noun lang="ja-Latn">Matsui Tengudō</Noun> was the last manufacturer to make cards entirely by hand;<Cite r={SalterJapanese} /> <Noun lang="ja-Latn">Matsui Shigeo</Noun> had recovered this process in 1976 as a way to distinguish his cards from those being produced by other manufacturers, after a former teacher of his told him to “make something that doesn’t exist anywhere”.<Cite r={TewazaNoKioku} /></p>
        <p>Since closing, <Noun lang="ja-Latn">Matsui Tengudō</Noun> decks now fetch high prices on Yahoo! Auctions, often selling for several hundred US dollars.</p>
        <ArticleImage
          src={imgMatsuiBrights}
          alt="TODO">
          The 5 Bright cards from a deck produced by <Noun lang="ja-Latn">Matsui Shigeo</Noun> to demonstrate his printing technique (1978).
          </ArticleImage>
        <p><Noun lang="ja-Latn">Matsui</Noun>’s mark was <span lang="ja">松</span> in a square, and brands included:</p>
        <ul>
          <li><span lang="ja">鳳凰</span> (<span lang="ja-Latn">hōō</span>, the Japanese phoenix)</li>
          <li><span lang="ja">龍虎</span> (<span lang="ja-Latn">ryū ko</span>, ‘dragon and tiger’), also used for <Noun lang="ja-Latn">Kabu</Noun>, <Noun lang="ja-Latn">Tehonbiki</Noun>, and <Noun lang="ja-Latn">Komaru</Noun> cards</li>
          <li><span lang="ja">九一</span> (<span lang="ja-Latn">kuppin</span>, ‘nine and one’, the highest combination in <Noun lang="ja-Latn">Kabufuda</Noun> games), used for <Noun lang="ja-Latn">Kabu</Noun> cards only</li>
          <li><span lang="ja">金龍&#xe0101;</span> (<span lang="ja-Latn">kinryū</span>, ‘gold dragon’), used for <Noun lang="ja-Latn">Komaru</Noun> cards only</li>
          <li><span lang="ja">菊華</span> (<span lang="ja-Latn">kikka</span>, ‘chrysanthemum’)</li>
          <li><span lang="ja">牡丹</span> (<span lang="ja-Latn">botan</span>, ‘peony’)</li>
          <li><span lang="ja">冨士櫻</span> (<span lang="ja-Latn">fujizakura</span>, ‘<Noun lang="ja-Latn">Fuji</Noun> cherry blossoms’), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">三光</span> (<span lang="ja-Latn">sankō</span>, ‘three brights’)</li>
        </ul>
      </Section>
      <Section title={<>Ace (<span lang="ja">エース</span> <span lang="ja-Latn">ēsu</span>)</>}>
        <p>Ace was a manufacturer based in <Noun lang="ja-Latn">Kyōto</Noun>. Their brands included:<Cite r={ModernJapaneseWrappers} page={44} /></p>
        <ul>
          <li><span lang="ja">大公爵</span> (<span lang="ja-Latn">daikōshaku</span>, ‘grand duke’, also used for <Noun lang="ja-Latn">Kabufuda</Noun>)</li>
          <li><span lang="ja">大西郷</span> (<span lang="ja-Latn">daisaigō</span>, ‘great <a href="https://en.wikipedia.org/wiki/Saig%C5%8D_Takamori">Saigō</a>’)</li>
          <li><span lang="ja">エース</span> (<span lang="ja-Latn">ēsu</span>, also used for <Noun lang="ja-Latn">Kabufuda</Noun>)</li>
          <li><span lang="ja">大提督</span> (<span lang="ja-Latn">daiteitoku</span>, ‘grand admiral’, featuring a picture of <a href="https://en.wikipedia.org/wiki/Horatio_Nelson,_1st_Viscount_Nelson">Horatio Nelson</a>)</li>
          <li><span lang="ja">大勝利</span> (<span lang="ja-Latn">daishōri</span>, ‘huge win’, featuring a picture of <a href="https://en.wikipedia.org/wiki/T%C5%8Dg%C5%8D_Heihachir%C5%8D">Tōgō Heihachirō</a>)</li>
          <li><span lang="ja">紅葉</span> (<span lang="ja-Latn">momiji</span>, ‘autumn leaves’)</li>
          <li><span lang="ja">源氏</span> (<span lang="ja-Latn">genji</span>, ‘<a href="https://en.wikipedia.org/wiki/Hikaru_Genji" lang="ja-Latn" className="proper-noun">Genji</a>’)</li>
        </ul>
        <p>They also made two all-plastic <Noun lang="ja-Latn">Hanafuda</Noun> decks: <span lang="ja">金花</span> (<span lang="ja-Latn">kin-hana</span> ‘gold flowers’) and <span lang="ja">銀花</span> (<span lang="ja-Latn">gin-hana</span> ‘silver flowers’).</p>
        <div className="multi">
          <ArticleImage
            src={imgAceAdmiral}
            alt="A Hanafuda wrapper with the image of a Lord Nelson on the front.">
            Packaging of Ace’s <Noun lang="ja-Latn">Dai Teitoku</Noun> brand, featuring Lord Nelson.
          </ArticleImage>
          <ArticleImage
            src={imgAce}
            alt="A Hanafuda wrapper with the image of a European nobleman on the front.">
            Packaging of Ace’s <Noun lang="ja-Latn">Dai Kōshaku</Noun> brand; this is from a <Noun lang="ja-Latn">Kurofuda deck</Noun>.
          </ArticleImage>
          <ArticleImage
            src={imgAceSaigo}
            alt="A Hanafuda wrapper with the image of a Japanese man in a double-breasted coat.">
            Packaging of Ace’s <Noun lang="ja-Latn">Dai Saigō</Noun> brand.
          </ArticleImage>
        </div>
      </Section>
      <Section title={<><img src={imgMarueSvg} alt="" className="inline-img" /> <Noun lang="ja-Latn">Maruē</Noun> (<span lang="ja">マルエー</span>)</>}>
        <ArticleImage
          position="right"
          src={imgMarue}
          alt="A Hanafuda wrapper with an image of cherry blossoms on the front.">
          Packaging for <Noun lang="ja-Latn">Maruē</Noun>’s <Noun lang="ja-Latn">Goten Sakura</Noun> brand (1970s).
          </ArticleImage>
        <p><Noun lang="ja-Latn">Maruē</Noun> was from the city of <Noun lang="ja-Latn">Mino</Noun>, in <Noun lang="ja-Latn">Gifu</Noun> prefecture. Their manufacturer’s mark was a circled <span lang="ja">英</span> (<span lang="ja-Latn">ē</span>), i.e. <span lang="ja-Latn">maru-ē</span>. However, <span lang="ja">英</span> has the meaning of ‘flower’ and can also be read with the same pronunciation as <span lang="ja">花</span> <span lang="ja-Latn">hana</span>, making this mark very punny.</p>
        <p>Brands produced by <Noun lang="ja-Latn">Maruē</Noun> included:<Cite r={ModernJapaneseWrappers} page={52} /></p>
        <ul>
          <li><span lang="ja">東洋一</span> (<span lang="ja-Latn">tōyōichi</span>, ‘best in the East’), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">金獅子</span> (<span lang="ja-Latn">kinjishi</span>, ‘gold lion’), also used for <Noun lang="ja-Latn">Kabufuda</Noun> and <Noun lang="ja-Latn">Tehonbiki</Noun> cards</li>
          <li><span lang="ja">金龍</span> (<span lang="ja-Latn">kinryū</span>, ‘gold dragon’)</li>
          <li><span lang="ja">銀龍</span> (<span lang="ja-Latn">ginryū</span>, ‘silver dragon’), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">御殿櫻</span> (<span lang="ja-Latn">gotensakura</span>, ‘palace cherry blossoms’)</li>
          <li><span lang="ja">夜櫻</span> (<span lang="ja-Latn">yorusakura</span> ‘evening cherry blossoms’)</li>
          <li><span lang="ja">梅の花</span> (<span lang="ja-Latn">ume no hana</span> ‘plum flowers’)</li>
        </ul>
      </Section>
      <Section title={<><img src={imgYamata} alt="" className="inline-img" /> <Noun lang="ja-Latn">Tanaka Gyokusuidō</Noun> (<span lang="ja">田中玉水堂</span>)/<Noun lang="ja-Latn">Iwata Honten</Noun> (<span lang="ja">岩田本店</span>)</>}>
        <p>Both of these companies used a mark of <span lang="ja">田</span> with corner on top.</p>
        <p><Noun lang="ja-Latn">Tanaka Gyokusuidō</Noun> existed in <Noun lang="ja-Latn">Kyōto</Noun> in 1948,<Cite r={Yamaguchi} page={102} /> but had stopped producing in the early 1960s.<Cite r={ModernJapaneseWrappers} page={33} /> Their brands (including <Noun lang="ja-Latn">Fukusuke</Noun> and <Noun lang="ja-Latn">Ginsuehiro</Noun>) and manufacturer’s mark were taken over by <Noun lang="ja-Latn">Iwata Honten</Noun>, who had their cards made by <Noun lang="ja-Latn">Tamura Shōgundō</Noun>.<Cite r={ModernJapaneseWrappers} page={[48, 59]} /> Brands included:</p>
        <ul>
          <li><span lang="ja">福助</span> (<span lang="ja-Latn">fukusuke</span>, a <a href="https://en.wikipedia.org/wiki/Fukusuke">large-headed good luck doll</a>)</li>
          <li><span lang="ja">銀末廣</span>/<span lang="ja">銀末広</span> (<span lang="ja-Latn">ginsuehiro</span> ‘silver fan’)</li>
          <li><span lang="ja">花扇</span> (<span lang="ja-Latn">hanaōgi</span>, ‘flower fan’)</li>
          <li><span lang="ja">金剛</span> (<span lang="ja-Latn">kongō</span>, a mythical indestructible substance)</li>
          <li><span lang="ja">横綱</span> (<span lang="ja-Latn">yokozuna</span>, the highest rank in <span lang="ja-Latn">sumo</span>)</li>
          <li><span lang="ja">大関</span> (<span lang="ja-Latn">ōzeki</span>, the second-highest <span lang="ja-Latn">sumo</span> rank)</li>
          <li><span lang="ja">春</span> (<span lang="ja-Latn">haru</span>, ‘spring’)</li>
          <li><span lang="ja">小判</span> (<span lang="ja-Latn">koban</span>, a <a href="https://en.wikipedia.org/wiki/Koban_(coin)">type of coin</a>)</li>
        </ul>
      </Section>
      <Section title={<><img src={imgKanenaka} alt="" className="inline-img" /> <Noun lang="ja-Latn">Nihon Karuta Seizō</Noun>  (<span lang="ja">日本骨牌製造</span>)/<Noun lang="ja-Latn">Tamada Fukushōdō</Noun> (<span lang="ja">玉田福勝堂</span>)</>}>
        <ArticleImage
          position="aside"
          src={imgNihon1896}
          alt="A box front depicting the storefront of a Japanese karuta manufacturer."
          source={{
            organization: { orgName: "British Museum" },
            license: "cc-by-nc-sa",
            licenseVersion: "4.0",
            originalUrl: "https://www.britishmuseum.org/collection/object/A_1896-0501-876-1-96"
          }}
          >
          A <Noun lang="ja-Latn">Tamada Fukushōdō</Noun> box depicting a storefront, from the collection of Lady Charlotte Schreiber, bequeathed to the British Museum in 1895. (This deck is briefly described in <Cite inline r={SchreiberCollection} page={184} />, under ‘Japanese #2’.)
        </ArticleImage>
        <p>The mark of both of these companies was <span lang="ja">中</span> with corner at top-right.</p>
        <p><Noun lang="ja-Latn">Nihon Karuta</Noun> claimed to have been founded in 1806.<Cite r={TewazaNoKioku} /> It is hard to prove this, but an earlier company named <Noun lang="ja-Latn">Tamada Fukushōdō</Noun> that used the same manufacturer’s mark had definitely existed in <Noun lang="ja-Latn">Kyōto</Noun> since before 1895 (see image). It is unclear precisely what the relationship was between the two companies, but <Noun lang="ja-Latn">Nihon Karuta</Noun> advertised their decks as being in the “<Noun lang="ja-Latn">Tamada</Noun> style” (<span lang="ja">玉田式</span>), and certainly the patterns they printed were very similar. <Noun lang="ja-Latn">Nihon Karuta</Noun> decks also often have the <Noun lang="ja-Latn">Tamada</Noun> name printed on their branding cards. A safe guess would be that <Noun lang="ja-Latn">Nihon Karuta</Noun> was a rebranding or expansion of the original <Noun lang="ja-Latn">Tamada Fukushōdō</Noun> name, either to reflect the scope of a larger company or to project its ambitions.</p>
        <p>Later records show that <Noun lang="ja-Latn">Nihon Karuta</Noun> existed in 1948<Cite r={Yamaguchi} page={102} /> and through to at least the early 1980s.<Cite r={ModernJapaneseWrappers} page={54} /></p>
        <p>Brands of both companies have included:<Cite r={ModernJapaneseWrappers} page={[[54, 55]]} /></p>
        <ul>
          <li><span lang="ja">花の王</span> (<span lang="ja-Latn">hana no ō</span>, ‘queen of flowers’, the <a href="https://en.wikipedia.org/wiki/Cattleya">Cattleya</a>)</li>
          <li><span lang="ja">七福神</span> (<span lang="ja-Latn">shichi fukujin</span>, the <a href="https://en.wikipedia.org/wiki/Seven_Lucky_Gods">Seven Lucky Gods</a>)</li>
          <li><span lang="ja">大隊長</span> (<span lang="ja-Latn">daitaichō</span>, ‘battalion commander’)</li>
          <li><span lang="ja">ふじ</span> (<span lang="ja-Latn">fuji</span>, ‘<Noun lang="ja-Latn">Fuji</Noun>’)</li>
          <li><span lang="ja">四光</span> (<span lang="ja-Latn">shikō</span>, ‘four brights’)</li>
          <li><span lang="ja">金の仲</span> (<span lang="ja-Latn">kane no naka</span>, ‘golden relationship’, a reference to the trademark pronounced <span lang="ja-Latn">kane-naka</span>)</li>
          <li><span lang="ja">百万弗</span> (<span lang="ja-Latn">hyakumandoru</span>, ‘a million dollars’)</li>
          <li><span lang="ja">天狗</span> (<span lang="ja-Latn">tengu</span>, Tengu)</li>
          <li><span lang="ja">万両</span> (<span lang="ja-Latn">manryū</span>, ‘10&thinsp;000 coins’)</li>
          <li><span lang="ja">千両</span> (<span lang="ja-Latn">senryū</span>, ‘1000 coins’)</li>
          <li><span lang="ja">九重櫻</span>/<span lang="ja">九重さくら</span> (<span lang="ja-Latn">kokonoezakura</span>, ‘<Noun lang="ja-Latn">Kokonoe</Noun> cherry blossoms’)</li>
          <li><span lang="ja">梅印</span> (<span lang="ja-Latn">umejirushi</span> ‘plum seal’)</li>
          <li><span lang="ja">金富士</span> (<span lang="ja-Latn">kinfuji</span> ‘gold <Noun lang="ja-Latn">Fuji</Noun>’)</li>
          <li><span lang="ja">御所車</span> (<span lang="ja-Latn">goshoguruma</span> ‘ox-drawn coach’)</li>
          <li><span lang="ja">金鷲</span> (<span lang="ja-Latn">kinshū</span> ‘golden eagle’)</li>
          <li><span lang="ja">金龍</span> (<span lang="ja-Latn">kinryū</span> ‘golden dragon’)</li>
          <li><span lang="ja">大入</span> (<span lang="ja-Latn">ōiri</span>, ‘full house’, a theatre term)</li>
          <li><span lang="ja">東錦</span> (<span lang="ja-Latn">higashinishiki</span>, ‘eastern brocade’)</li>
          <li><span lang="ja">三福</span> (<span lang="ja-Latn">sanfuku</span>, ‘three fortunes’)</li>
          <li><span lang="ja">般若</span> (<span lang="ja-Latn">hannya</span>, a <span lang="ja-Latn">noh</span> mask representing a horned female demon)</li>
          <li><span lang="ja">萬國一</span>/<span lang="ja">万国一</span> (<span lang="ja-Latn">bankokuichi</span>, ‘best in the world’)</li>
        </ul>
        <div className="multi wide">
          <ArticleImage src={imgNKhigashinishiki} alt="A hanafuda wrapper featuring a fan.">
            <Noun lang="ja-Latn">Nihon Karuta</Noun>’s <span lang="ja-Latn">higashinishiki</span> wrapper.
          </ArticleImage>
          <ArticleImage src={imgNKkoekoe} alt="A hanafuda wrapper featuring a palace and cherry blossom trees.">
            <Noun lang="ja-Latn">Nihon Karuta</Noun>’s <span lang="ja-Latn">kokonoezakura</span> wrapper.
          </ArticleImage>
        </div>
        <p><Noun lang="ja-Latn">Nihon Karuta</Noun>’s standard pattern was a variation on the <Noun lang="ja-Latn">Hachi&shy;hachi&shy;bana</Noun> which included more detailing in the form of fine blue lines. The standout feature was the full moon card, which featured a <a href="https://en.wikipedia.org/wiki/Moon_rabbit">rabbit pounding <span lang="ja-Latn">mochi</span></a> in the moon:</p>
        <ArticleImage
          alt="Five Hanafuda cards, which have thin blue lines showing detail in the black areas, unlike standard Hanafuda cards."
          src={imgNihonKaruta四光}>
          The bright cards of <Noun lang="ja-Latn">Nihon Karuta</Noun>’s special pattern.
          </ArticleImage>
        <p>Under the brand name of “Wind Mill”, <Noun lang="ja-Latn">Nihon Karuta</Noun> have also produced Western-style playing cards, including their own Hana-Trump deck:</p>
        <ArticleImage
          alt="Five playing cards with the Hanafuda design in center and a corresponding Western card depicted in the corners that are not occupied by the card indices."
          src={imgWindmillBrights}>
          The bright cards of <Noun lang="ja-Latn">Nihon Karuta</Noun>’s Hana-Trump deck. These are obviously based on the much older <a href="#universal">Universal</a> <Noun lang="ja-Latn">Trump-Hana</Noun> deck.
        </ArticleImage>
        <ArticleImage
          alt="Five cards, one a joker and the other four being kings with various objects depicted."
          src={imgWindmillExtra}>
          The extra <GameRef id="hachi-hachi" />-related cards of <Noun lang="ja-Latn">Nihon Karuta</Noun>’s Hana-Trump deck. There is a windmill depicted in the corners of the Joker card.
        </ArticleImage>
      </Section>
      <Section title={<><img className="inline-img" src={imgMarujuu} alt="" /> <Noun lang="ja-Latn">Yamashiro Shōten</Noun> (<span lang="ja">山城商店</span>)</>}>
        <p>A manufacturer that existed in <Noun lang="ja-Latn">Kyōto</Noun> in 1948,<Cite r={Yamaguchi} page={102} /> but stopped producing in 1962.<Cite r={ModernJapaneseWrappers} page={33} /> Their manfufacturer’s mark was <span lang="ja">㊉</span> (circled <span lang="ja">十</span>). Brands included:</p>
        <ul>
          <li><span lang="ja">金坊主</span> (<span lang="ja-Latn">kinbōzu</span>, ‘gold baldy’, ‘baldy’ being a nickname for a priest)</li>
          <li><span lang="ja">関羽</span> (<span lang="ja-Latn">kan’u</span>, <a lang="zh-Latn" href="https://en.wikipedia.org/wiki/Guan_Yu">Guan Yu</a>)</li>
          <li><span lang="ja">九紋竜</span> (<span lang="ja-Latn">kumonryū</span>, ‘nine-tattoo dragon’, a nickname for <a lang="zh-Latn" href="https://en.wikipedia.org/wiki/Shi_Jin">Shi Jin</a>)</li>
          <li><span lang="ja">大黒</span> (<span lang="ja-Latn">daikoku</span>, <a href="https://en.wikipedia.org/wiki/Daikokuten">Daikokuten</a>)</li>
        </ul>
        <ArticleImage
          alt="The frontage of a very wide Japanese store, with signs depicting several figures."
          size="wide"
          src={imgYamashiroExterior}
          source={{ license: "cc0" }}>
          A box wrapper from around 1900 featuring an imaginary depiction of the <Noun lang="ja-Latn">Yamashiro</Noun> store exterior; in reality it was nowhere near as large as this. The advertising boards at the left depict <Noun lang="zh-Latn">Guan Yu</Noun> and <Noun lang="zh-Latn">Shi Jin</Noun>, who represent two of the company’s brands.
        </ArticleImage>
        <ArticleImage
          alt="The front and back cover of a pamphlet"
          src={imgYamashiroPricelist}
          source={{ license: "cc0" }}>
          The cover of their pricelist shows a more realistic shopfront, of similar construction to <Noun lang="ja-Latn">Nintendō</Noun>’s store that is shown in a photo above.
        </ArticleImage>
      </Section>
      <Section title={<><img src={imgMaruryu} alt="" className="inline-img" /> <Noun lang="ja-Latn">Ryūtendō</Noun> (<span lang="ja">龍天堂</span>)</>}>
        <p>Existed in <Noun lang="ja-Latn">Kyōto</Noun> in 1948;<Cite r={Yamaguchi} page={102} /> mark was a circled <span lang="ja">龍</span> (they also possibly had another trade name of <span lang="ja">マルナ</span> with circled <span lang="ja" className="circled">名</span> as mark). Brands included:</p>
        <ul>
          <li><span lang="ja">龍田川</span> (<span lang="ja-Latn">tatsutagawa</span>, ‘<Noun lang="ja-Latn">Tatsuta</Noun> river’)</li>
          <li><span lang="ja">天龍</span> (<span lang="ja-Latn">tenryū</span>, ‘<Noun lang="ja-Latn">Tenryū</Noun>’)</li>
          <li><span lang="ja">龍王</span> (<span lang="ja-Latn">ryūō</span>, ‘dragon king’)</li>
          <li><span lang="ja">鞍馬金天狗</span> (<span lang="ja-Latn">kurama kintengu</span>, ‘<a href="https://en.wikipedia.org/wiki/Mount_Kurama"><Noun lang="ja-Latn">Kurama</Noun></a> golden tengu’; according to myth, <Noun lang="ja-Latn">Kurama</Noun> is the home of the king of the <span lang="ja-Latn">tengu</span>)</li>
          <li><span lang="ja">福宝</span> (<span lang="ja-Latn">fukuhō</span>, ‘good fortune, treasure’)</li>
        </ul>
      </Section>
      <Section title={<><img src={imgMarujun} alt="" className="inline-img" /> <Noun lang="ja-Latn">Inoue Juntendō</Noun> (<span lang="ja">井上順天堂</span>)</>}>
        <p>Existed in <Noun lang="ja-Latn">Kyōto</Noun> in 1948;<Cite r={Yamaguchi} page={102} /> mark was a circled <span lang="ja">順</span>.</p>
      </Section>
      <Section title={<><img src={imgKanese} alt="" className="inline-img" /> <Noun lang="ja-Latn">Nakao Seikadō</Noun> (<span lang="ja">中尾清花堂</span>)</>}>
        <p>Existed in <Noun lang="ja-Latn">Kyōto</Noun> in 1948;<Cite r={Yamaguchi} page={102} /> mark was <span lang="ja">セ</span> with corner at top-right.</p>
      </Section>
      <Section title={<><img src={imgMarukyou} alt="" className="inline-img" /> <Noun lang="ja-Latn">Baba Keieidō</Noun> (<span lang="ja">馬場京栄堂</span>)</>}>
        <p>Existed in <Noun lang="ja-Latn">Kyōto</Noun> in 1948;<Cite r={Yamaguchi} page={102} /> mark was a circled <span lang="ja">京</span>.</p>
      </Section>
      <Section title={<><img src={imgHeibon} alt="" className="inline-img" /> <Noun lang="ja-Latn">Heibon</Noun> (<span lang="ja">平凡</span>)</>}>
        <p>This <Noun lang="ja-Latn">Tōkyō</Noun> manufacturer stopped producing shortly after 1972.<Cite r={ModernJapaneseWrappers} page={42} /> Their maker’s mark was the phrase <span lang="ja">天下一</span> (<span lang="ja-Latn">tenkaichi</span> ‘best in the world’) written inside a large <a href="https://en.wikipedia.org/wiki/Koban_(coin)"><span lang="ja-Latn">koban</span></a>. Their brands included:</p>
        <ul>
          <li><span lang="ja">四天王</span> (<span lang="ja-Latn">shi tennō</span> the <a href="https://en.wikipedia.org/wiki/Four_Heavenly_Kings">four heavenly kings</a>), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">牡丹獅子</span> (<span lang="ja-Latn">botanjishi</span> ‘peony and lion’), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">金時桜</span> (<span lang="ja-Latn">kintokizakura</span> ‘<a href="https://en.wikipedia.org/wiki/Kintar%C5%8D">Kintoki</a> and cherry blossom’)</li>
          <li><span lang="ja">旭富士</span> (<span lang="ja-Latn">asahifuji</span> ‘<Noun lang="ja-Latn">Fuji</Noun> sunrise’)</li>
          <li><span lang="ja">桜判官</span> (<span lang="ja-Latn">sakurahangan</span> ‘cherry blossom judge’, a reference to <a href="https://en.wikipedia.org/wiki/T%C5%8Dyama_Kagemoto"><Noun lang="ja-Latn">Tōyama Kagemoto</Noun></a>)</li>
        </ul>
      </Section>
      <Section title={<><Noun lang="ja-Latn">Kawakita</Noun> (<span lang="ja">川北</span>)</>}>
        <p><Noun lang="ja-Latn">Kawakita</Noun> had its own brands but cards were made by <Noun lang="ja-Latn">Yamashiro Shōten</Noun>. It closed after 1962.<Cite r={ModernJapaneseWrappers} page={[[48, 49]]} /> Brands included:</p>
        <ul>
          <li><span lang="ja">牛若丸</span> (<span lang="ja-Latn">ushiwakamaru</span>, the childhood name of <a href="https://en.wikipedia.org/wiki/Minamoto_no_Yoshitsune" lang="ja-Latn" className="proper-noun">Minamoto no Yoshitsune</a>)</li>
          <li><span lang="ja">金閣寺</span> (<span lang="ja-Latn">kinkaku-ji</span>, the Golden Pavilion in <Noun lang="ja-Latn">Kyōto</Noun>)</li>
          <li><span lang="ja">銀閣寺</span> (<span lang="ja-Latn">ginkaku-ji</span>, the Silver Pavilion in <Noun lang="ja-Latn">Kyōto</Noun>)</li>
          <li><span lang="ja">弁慶</span> (<span lang="ja-Latn">benkei</span>, <a href="https://en.wikipedia.org/wiki/Benkei">a famous warrior monk</a>)</li>
          <li><span lang="ja">大文字</span> (<span lang="ja-Latn">daimonji</span>, <a href="https://en.wikipedia.org/wiki/Gozan_no_Okuribi">a mountain in <Noun lang="ja-Latn">Kyōto</Noun></a>)</li>
          <li><span lang="ja">祇園</span> (<span lang="ja-Latn">gion</span>, the <span lang="ja-Latn">geisha</span> district of <Noun lang="ja-Latn">Kyōto</Noun>)</li>
        </ul>
      </Section>
      <Section title={<><img src={imgMarusa} alt="" className="inline-img" /> <Noun lang="ja-Latn">Kohara Honten</Noun> (<span lang="ja">小原本店</span>)</>}>
        <p><Noun lang="ja-Latn">Kohara</Noun> was a manufacturer based in <Noun lang="ja-Latn">Ōsaka</Noun> until 1980.<Cite r={ModernJapaneseWrappers} page={48} /> Their manufacturer’s mark was a circled <span lang="ja" className="circled">さ</span>, and brands included:</p>
        <ul>
          <li><span lang="ja">鬼印</span> (<span lang="ja-Latn">onijirushi</span>, ‘ogre brand’, also for <Noun lang="ja-Latn">Kabufuda</Noun> and <Noun lang="ja-Latn">Harifuda</Noun>)</li>
          <li><span lang="ja">王将</span> (<span lang="ja-Latn">ōshō</span>, the king of the stronger player in <Noun lang="ja-Latn">Shōgi</Noun>, also used for <Noun lang="ja-Latn">Kabufuda</Noun>)</li>
          <li><span lang="ja">大登龍</span> (<span lang="ja-Latn">daitōryū</span>, ‘great rising dragon’), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">金札印</span> (<span lang="ja-Latn">kinfudajirushi</span>, ‘golden card brand’)</li>
          <li><span lang="ja">鍾馗</span> (<span lang="ja-Latn">shōki</span>, <a href="https://en.wikipedia.org/wiki/Zhong_Kui"><Noun lang="ja-Latn">Shōki</Noun> the demon-queller</a>)</li>
          <li><span lang="ja">馬印</span> (<span lang="ja-Latn">umajirushi</span>, ‘horse brand’)</li>
          <li><span lang="ja">宝船</span> (<span lang="ja-Latn">takarabune</span>, ‘treasure ship’)</li>
          <li><span lang="ja">寶引</span> (<span lang="ja-Latn">hōbiki</span>, ‘treasure pull’, a kind of lottery where one rope out of a bundle was tied to the prize, and whoever pulled it won; these were <Noun lang="ja-Latn">Hikifuda</Noun> cards)</li>
        </ul>
      </Section>
      <Section title={<><img src={imgMarui} alt="" className="inline-img" /> <Noun lang="ja-Latn">Nishimura</Noun> (<span lang="ja">西村</span>)</>}>
        <ArticleImage
          position="aside"
          src={imgNishimuraBrand}
          alt="A card with a samurai wearing traditional clothing and carrying an open umbrella"
          source={{
            author: {
              family: "Richert",
              given: "Marcus"
            },
            copyrightYear: 2020,
            license: "with-permission"
          }}>
          An extra ‘advertising’ card featuring the <span lang="ja-Latn">kabuki</span> character <a href="https://en.wikipedia.org/wiki/Sukeroku"><Noun lang="ja-Latn">Sukeroku</Noun></a>, who appeared often in <Noun lang="ja-Latn">Nishimura</Noun>’s branding. <Noun lang="ja-Latn">Sukeroku</Noun> popularized the style of umbrella called a ‘snake-eye umbrella’ (<span lang="ja">蛇の目傘</span>) due to its pattern, so this type of umbrella is also referred to as a <span lang="ja-Latn">Sukeroku-gasa</span> (<span lang="ja">助六傘</span>).
        </ArticleImage>
        <p>At first an important manufacturer in <Noun lang="ja-Latn">Tōkyō</Noun>, but later cards were made by other makers including <Noun lang="ja-Latn">Ōishi Tengudō</Noun>. Their mark was a circled <span lang="ja" className="circled">い</span>, and their brands included:<Cite r={ModernJapaneseWrappers} page={[54, 58]} /></p>
        <ul>
          <li><span lang="ja">金助六</span> (<span lang="ja-Latn">kinsukeroku</span>, ‘golden <a href="https://en.wikipedia.org/wiki/Sukeroku" className="proper-noun" lang="ja-Latn">Sukeroku</a>’)</li>
          <li><span lang="ja">銀助六</span> (<span lang="ja-Latn">ginsukeroku</span>, ‘silver Sukeroku’)</li>
          <li><span lang="ja">小天狗</span> (<span lang="ja-Latn">kotengu</span>, ‘little <Noun lang="ja-Latn">Tengu</Noun>’)</li>
          <li><span lang="ja">花の花</span> (<span lang="ja-Latn">hana no hana</span>, ‘flower of flowers’)</li>
          <li><span lang="ja">白雪</span> (<span lang="ja-Latn">shirayuki</span>, ‘white snow’)</li>
          <li><span lang="ja">百万石</span> (<span lang="ja-Latn">hyakumangoku</span>, ‘one million <a href="https://en.wikipedia.org/wiki/Koku" lang="ja-Latn">koku</a>’, a nickname for the rich <a lang="ja-Latn" href="https://en.wikipedia.org/wiki/Kaga_Domain">Kaga domain</a>, or its lord, in the <Noun lang="ja-Latn">Edo</Noun> period), no longer produced as of 1980</li>
          <li><span lang="ja">奴さん</span> (<span lang="ja-Latn">yakkosan</span>, ‘guy’, a samurai manservant, also a traditional origami shape imitating a man), no longer produced as of 1980</li>
        </ul>
        <ArticleImage
          src={[
            [imgNishimura1, "A picture of a die surrounded by various playing cards."],
            [imgNishimura2, "A picture of a hand holding various playing cards, and a Tengu mask."]
          ]}
          source={{ license: "cc0", originalUrl: "http://www.tga-j.org/documents/i/627/detail.html", organization: { orgName: "日本粧業会 資料館" } }}>
          Two <Noun lang="ja-Latn">Nishimura</Noun> advertisements, from the December 1907 issue of the “Tokyo Toilet Trade Journal”. The advert on the right shows that they also sold <Noun lang="ja-Latn">Ōishi Tengudō</Noun> products.
          </ArticleImage>
      </Section>
      <Section title={<><img src={imgMarukyou} alt="" className="inline-img" /> <Noun lang="ja-Latn">Kyōto Karuta</Noun> (<span lang="ja">京都かるた</span>)</>}>
        <p>A <Noun lang="ja-Latn">Kyōto</Noun> manufacturer, founded by an ex-employee of <Noun lang="ja-Latn">Nihon Karuta</Noun>. They were active in the 1960s & ’70s, but closed in the 1990s.<Cite r={UmebayashiIsao} /> Their brands included:<Cite r={ModernJapaneseWrappers} page={49} /></p>
        <ul>
          <li><span lang="ja">金の司</span> (<span lang="ja-Latn">kin no tsukasa</span> ‘officer of gold’)</li>
          <li><span lang="ja">大帝王</span> (<span lang="ja-Latn">daiteiō</span> ‘great emperor’, also used for <Noun lang="ja-Latn">Kabufuda</Noun>)</li>
          <li><span lang="ja">神鉾</span> (<span lang="ja-Latn">kamihoko</span> ‘sacred halberd’, also used for <Noun lang="ja-Latn">Kabufuda</Noun>)</li>
          <li><span lang="ja">つかさ天狗</span> (<span lang="ja-Latn">tsukasatengu</span>, ‘chief tengu’)</li>
          <li><span lang="ja">花あらし</span> (<span lang="ja-Latn">hanaarashi</span>, ‘flower storm’, a heavy fall of blossoms)</li>
          <li><span lang="ja">短冊</span> (<span lang="ja-Latn">tanzaku</span>, ‘poetry strip’)</li>
          <li><span lang="ja">ぼたん</span> (<span lang="ja-Latn">botan</span>, ‘peony’)</li>
        </ul>
      </Section>
      <Section title={<><img src={img3gourds} alt="" className="inline-img" /> <Noun lang="ja-Latn">Dai Nippon</Noun> (<span lang="ja">大日本</span>)</>}>
        <p>A manufacturer from <Noun lang="ja-Latn">Yōkaichi</Noun> (now part of <Noun lang="ja-Latn">Higashiōmi</Noun>), <Noun lang="ja-Latn">Shiga</Noun> prefecture. Their logo is a group of three gourds, which are considered to be lucky.</p>
        <p>Brands included:<Cite r={ModernJapaneseWrappers} page={46} /></p>
        <ul>
          <li><span lang="ja">銀達磨</span> (<span lang="ja-Latn">gindaruma</span> ‘silver <a href="https://en.wikipedia.org/wiki/Bodhidharma">Daruma</a>’)</li>
          <li><span lang="ja">千姫</span> (<span lang="ja-Latn">senhime</span> ‘<a href="https://en.wikipedia.org/wiki/Senhime">Lady Sen</a>’)</li>
          <li><span lang="ja">銀瓠</span> (<span lang="ja-Latn">ginhyō</span> ‘silver gourd’)</li>
          <li><span lang="ja">金瓠</span> (<span lang="ja-Latn">kinhyō</span> ‘gold gourd’)</li>
          <li><span lang="ja">豊太閤</span><Footnote>On some versions of this, it is misspelt <span lang="ja">豊太閣</span>.</Footnote> (<span lang="ja-Latn">hōtaikō</span>, a title of honour for <a href="https://en.wikipedia.org/wiki/Toyotomi_Hideyoshi">Toyotomi Hideyoshi</a>)</li>
          <li><span lang="ja">千成</span> (<span lang="ja-Latn">sennari</span>, short for <span lang="ja">千成瓢箪</span> <span lang="ja-Latn">sennaribyōtan</span> ‘thousand gourds’, the standard used by <Noun lang="ja-Latn">Hideyoshi</Noun>)</li>
        </ul>
        <div className="multi">
          <ArticleImage src={imgDNhotaiko} alt="A hanafuda wrapper with a man wearing tall headdress and holding a fan.">
            <Noun lang="ja-Latn">Dai Nippon</Noun>’s <span lang="ja-Latn">hōtaikō</span> wrapper.
          </ArticleImage>
          <ArticleImage src={imgDNsenhime} alt="A hanafuda wrapper with a woman wearing robes.">
            <Noun lang="ja-Latn">Dai Nippon</Noun>’s <span lang="ja-Latn">senhime</span> wrapper.
          </ArticleImage>
        </div>
      </Section>
      <Section title={<><a href="http://www.nichiyu.net/en" className="proper-noun" lang="ja-Latn">Nippon Yūgi Gangu</a> (<span lang="ja">日本遊戯玩具</span>)</>}>
        <ArticleImage
          position="right"
          alt=""
          src={imgNYGTengu}>
          <Noun lang="ja-Latn">Nippon Yūgi</Noun>’s <span lang="ja-Latn">kintengu</span> brand.
        </ArticleImage>
        <p><Noun lang="ja-Latn">Nippon Yūgi</Noun> was founded in <Noun lang="ja-Latn">Tōkyō</Noun> in 1946. They still exist but no longer appear to produce <Noun lang="ja-Latn">Hanafuda</Noun> cards, instead specializing in tarot. Their previous brands included:<Cite r={ModernJapaneseWrappers} page={54} /></p>
        <ul>
          <li><span lang="ja">白鶴</span> (<span lang="ja-Latn">hakuzuru</span>, ‘white crane’)</li>
          <li><span lang="ja">(日遊)金天狗</span> (<span lang="ja-Latn">(nichiyū) kintengu</span>, ‘<Noun lang="ja-Latn">Nippon Yūgi</Noun> golden <Noun lang="ja-Latn">Tengu</Noun>’)</li>
          <li><span lang="ja">鳳</span> (<span lang="ja-Latn">ōtori</span>, ‘splendid bird’, a male Japanese phoenix)</li>
          <li><span lang="ja">宴</span> (<span lang="ja-Latn">utage</span>, ‘banquet’)</li>
          <li><span lang="ja">大入叶</span> (<span lang="ja-Latn">ōirikanō</span>, ‘grant a full house’, a theatre term)</li>
          <li><span lang="ja">兜</span> (<span lang="ja-Latn">kabuto</span>, ‘samurai helmet’)</li>
          <li><span lang="ja">花川戸</span> (<span lang="ja-Latn">hanakawado</span>, a place in <Noun lang="ja-Latn">Tōkyō</Noun>)</li>
          <li><span lang="ja">花あわせ</span> (<span lang="ja-Latn">hana-awase</span>, ‘flower matching’)</li>
        </ul>
        <p>They also produced a poker-sized <Noun lang="ja-Latn">Hanafuda</Noun> deck that included point values on the cards, as well as the name of the month and the flower associated with the month. Interestingly, the point values on some of the cards indicate that they were intended to be played with Hawaiian rules.</p>
        <ArticleImage 
          alt="Five hanafuda cards with points which are marked with values listed in the corners, the flower listed at top, and the month listed at bottom."
          src={imgNGYHanaTrump}>
          <Noun lang="ja-Latn">Nippon Yūgi</Noun>’s poker-format deck, possibly created for sale in <Noun lang="haw">Hawai'i</Noun>.
        </ArticleImage>
      </Section>
      <Section title={<>Universal (<span lang="ja">ユニバーサル</span>)</>}>
        <p>The Universal Playing Card Company was based in <Noun lang="ja-Latn">Ōsaka</Noun>. Their maker’s mark was a drawstring purse (<span lang="ja">巾着</span> <span lang="ja-Latn">kinchaku</span>). Their own brands included:<Cite r={ModernJapaneseWrappers} page={[[59, 62]]} /></p>
        <ul>
          <li><span lang="ja">ゴム花</span> (<span lang="ja-Latn">gomuhana</span>, ‘rubber flower’)</li>
          <li><span lang="ja">萬年花</span> (<span lang="ja-Latn">mannenhana</span>, ‘10&thinsp;000 year flower’)</li>
        </ul>
        <p>They also, like other manufacturers, produced a <Noun lang="ja-Latn">Trump-Hana</Noun> (<span lang="ja">トランプ花</span>) deck. The size of the cards in this deck is much closer to that of <Noun lang="ja-Latn">Hanafuda</Noun> than Trump cards.</p>
        <ArticleImage
          src={imgUniversalTrumpHanaBrights}
          alt="">
          The Bright cards of Universal’s <Noun lang="ja-Latn">Trump-Hana</Noun> deck. This particular deck is listed as number “350” on the packaging.
        </ArticleImage>
        <ArticleImage
          src={imgUniversalTrumpHanaExtras}
          alt="">
          The extra <GameRef id="hachi-hachi"/>-related cards of Universal’s <Noun lang="ja-Latn">Trump-Hana</Noun> deck. I’m not sure of the significance of the “vase” Joker, since usually the Joker has the manufacturer’s name. It could be intended as a multilingual pun on “Universal” (<span lang="ja">ユニバーセル</span> <span lang="ja-Latn">yunibāseru</span>) → “Universe” (<span lang="ja">ユニバース</span> <span lang="ja-Latn">yunibāsu</span>), which sounds like “uni-vase” (one vase).
        </ArticleImage>
      </Section>
      <Section title={<><img src={imgKaneman} alt="" className="inline-img" /> <Noun lang="ja-Latn">Kawai</Noun></>}>
        <p>A manufacturer from <Noun lang="ja-Latn">Ōsaka</Noun>, whose mark was <span lang="ja">万</span> with corner at top-right.<Cite r={OstasiatischeSpielkarten} page={135} /></p>
      </Section>
      <Section title={<><img src={imgMarumatsu} alt="" className="inline-img" /> <Noun lang="ja-Latn">Akata Shōjōya</Noun> (<span lang="ja">赤田猩々屋</span>)</>}>
        <p>A <Noun lang="ja-Latn">Kyōto</Noun> manufacturer whose mark was <span lang="ja">松</span> in a circle.</p>
        <div className="multi">
          <ArticleImage
            alt="A card with an image of a woman carrying a fan with the manufacturer’s name written upon it, surrounded by leaves of the various plants of the Hanafuda deck"
            src={imgAkataCard}
            source={{
              license: "cc0",
              originalUrl: 'https://gallica.bnf.fr/ark:/12148/btv1b105093472',
              organization: { orgName: 'Bibliothèque nationale de France', orgAbbr: 'BnF' }
            }}
          >
            An additional manufacturer’s card included with an <Noun lang="ja-Latn">Akata Shōjōya</Noun> deck, produced after 1902.
              BnF Gallica has <a href="https://gallica.bnf.fr/ark:/12148/btv1b105093472">high-quality scans</a> of this deck, and Yale University also <a href="https://search.library.yale.edu/catalog/13318512">owns a copy</a>.
              </ArticleImage>
          <ArticleImage
            alt="A newspaper ad in Japanese with pictures of Hanafuda and Western playing cards."
            src={imgAkataNewspaper}
            source={{
              license: "cc0",
              originalUrl: 'https://hojishinbun.hoover.org/?a=d&d=jan19210920-01.1.4',
              organization: { orgName: 'Hoover Institution' }
            }}
          >
            An advertisement for <Noun lang="ja-Latn">Akata Shōjōya</Noun> cards in the <a href="https://en.wikipedia.org/wiki/Nichi_Bei_Times">Nichi Bei Times</a>, September 1921. This indicates the cards were being imported into San Francisco in the 1920s.
            </ArticleImage>
        </div>
      </Section>
      <Section title={<><Noun lang="ja-Latn">Suisando</Noun> (<span lang="ja">翠山堂</span>)</>}>
        <p>A manufacturer that has a very finely-detailed deck of cards reproduced in <Cite r={Hargrave} page={13} inline />.</p>
      </Section>
      <Section title={<><img src={imgMarutano} alt="" className="inline-img" /> <Noun lang="ja-Latn">Nihon Goraku</Noun> (<span lang="ja">日本娯楽</span>)</>}>
        <p><Noun lang="ja-Latn">Nihon Goraku</Noun> was founded in 1945 in <Noun lang="ja-Latn">Shinhama</Noun> (<span lang="ja">新浜</span>), <Noun lang="ja-Latn">Onomichi</Noun> city (<span lang="ja">尾道市</span>), <Noun lang="ja-Latn">Hiroshima</Noun> prefecture (<span lang="ja">広島県</span>), and originally had cards manufactured by <Noun lang="">Kyōto Karuta</Noun>. Nowadays the company imports musical instruments.</p>
        <p>Their mark was circled <span lang="ja">娯</span>, and brands included:</p>
        <ul>
          <li><span lang="ja">山伏</span> (<span lang="ja-Latn">yamabushi</span>, a mountain-dwelling hermit, practitioner of <a href="https://en.wikipedia.org/wiki/Shugend%C5%8D"><Noun lang="ja-Latn">Shugendō</Noun></a>)</li>
          <li><span lang="ja">福の神</span> (<span lang="ja-Latn">fuku no kami</span>, ‘god of fortune’, the name of a recurring character in <a href="https://en.wikipedia.org/wiki/Ky%C5%8Dgen"><span lang="ja-Latn">kyōgen</span></a> and also the title of a play)</li>
          <li><span lang="ja">天狗</span> (<span lang="ja-Latn">tengu</span>), also used for <Noun lang="ja-Latn">Kabufuda</Noun></li>
          <li><span lang="ja">竹印</span> (<span lang="ja-Latn">takejirushi</span>, ‘bamboo brand’)</li>
        </ul>
      </Section>
      <Section title={<><img src={imgMaruei} alt="" className="inline-img" /> <Noun lang="ja-Latn">Kyōwadō</Noun> (<span lang="ja">京和堂</span>)</>}>
        <p>A company about which I know little, other than that they were a company that also produced board games. Presumably from the name they were based in <Noun lang="ja-Latn">Kyōto</Noun>. Their mark was a circled <span lang="ja">榮</span>. Brands included:</p>
        <ul>
          <li><span lang="ja">おたのしみ</span> (<span lang="ja-Latn">otanoshimi</span>, ‘enjoyment’)</li>
          <li><span lang="ja">京寶船</span> (<span lang="ja-Latn">kyōtakarabune</span>, ‘<Noun lang="ja-Latn">Kyōto</Noun> treasure ship’)</li>
        </ul>
      </Section>
      <Section title={<><img src={imgKanekata} alt="" className="inline-img" /> <Noun lang="ja-Latn">Kamigataya</Noun> (<span lang="ja">上方屋</span>)</>}>
        <p>For more about <Noun lang="ja-Latn">Kamigataya</Noun>, see the <Link to="/articles/cards/japan/hanafuda/art">history article</Link>. Early on, <Noun lang="ja-Latn">Kamigataya</Noun> had decks made (by <Noun lang="ja-Latn">Nintendō</Noun>) with their own brand, but they would later sell <Noun lang="ja-Latn">Nintendō</Noun>-branded cards directly. Their maker’s mark was <span lang="ja">片&#xe0103;</span> with angle. Brands included:</p>
        <ul>
          <li><span lang="ja">白菊</span> (<span lang="ja-Latn">shirokiku</span>, ‘white chrysanthemum’)</li>
          <li><span lang="ja">倭錦</span> (<span lang="ja-Latn">yamatonishiki</span>, ‘ancient Japanese brocade’)</li>
          <li><span lang="ja">都錦</span> (<span lang="ja-Latn">miyakonishiki</span>, ‘capital brocade’)</li>
        </ul>
      </Section>
      <Section title={<><img src={imgMarukin} alt="" className="inline-img" /> <Noun lang="ja-Latn">Marukin</Noun></>}>
        <p><Noun lang="ja-Latn">Marukin</Noun> was a company based in <Noun lang="ja-Latn">Sakata</Noun> (<span lang="ja">酒田市</span>), <Noun lang="ja-Latn">Yamaguchi</Noun> prefecture (<span lang="ja">山口県</span>). Their mark was a circled <span lang="ja" className="circled">金</span>. Brands included:</p>
        <ul>
          <li><span lang="ja">金天狗</span> (<span lang="ja-Latn">kintengu</span>, ‘golden <Noun lang="ja-Latn">Tengu</Noun>’)</li>
        </ul>
      </Section>
      <Section title={<><img src={imgMarudai} alt="" className="inline-img" /> <Noun lang="ja-Latn">Ōtani Shōten</Noun> (<span lang="ja">大谷商店</span>)</>}>
        <p><Noun lang="ja-Latn">Ōtani Shōten</Noun> was a company based in <Noun lang="ja-Latn">Sakurai</Noun> town (<span lang="ja">桜井町</span>), in <Noun lang="ja-Latn">Shiki</Noun> district (<span lang="ja">磯城郡</span>), <Noun lang="ja-Latn">Nara</Noun> prefecture (<span lang="ja">奈良県</span>). Their mark was a circled <span lang="ja" className="circled">大</span>. Brands included:</p>
        <ul>
          <li><span lang="ja">千島</span> (<span lang="ja-Latn">chishima</span>, ‘thousand islands’, the Japanese name for the <a href="https://en.wikipedia.org/wiki/Kuril_Islands">Kuril Islands</a>)</li>
        </ul>
      </Section>
    </Section>
    <Section title="Unknown">
      <p>The following brands are by unknown manufacturers. Any help identifying them would be greatly appreciated!</p>
      <ul>
        <li><span lang="ja">𛂁𛁲゙𛁈𛀸</span>/<span lang="ja">な𛁲゙𛁈𛀸</span>/<span lang="ja">なでしこ</span> (<span lang="ja-Latn">nadeshiko</span>, ‘pink’ (the flower))</li>
        <li><span lang="ja">金舞扇</span> (<span lang="ja-Latn">kinmaiōgi</span>, ‘gold dancer’s fan’)</li>
        <li><span lang="ja">銀舞扇</span> (<span lang="ja-Latn">ginmaiōgi</span>, ‘silver dancer’s fan’)</li>
        <li><span lang="ja">勝力士</span> (<span lang="ja-Latn">katsu rikishi</span>, ‘winning sumo wrestler’)</li>
      </ul>
    </Section>
  </>);
};

export default Manufacturers;
