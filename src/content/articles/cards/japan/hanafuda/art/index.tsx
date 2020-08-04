import * as React from 'react';

import { Noun, ArticleImage, Footnote, Section, Cite, Pronounce } from 'ui';

import {
  MuraiSun, DevilsPictureBooks,
  CartaTaxLawContents, PopularJapanesePrints, Sumiyoshikai, EbashiHanafuda, OishiTengudoHistory4, OishiSadakuro, EbashiSadakuro, AnIntroductionToJapaneseTeaRitual, HanaAwase, MakingShinkokinshu, GreveSake, TalesOfIse, KKS135, SatireWithinKibyōshi, SKKS442,
  AnimalInFarEasternArt, ChigoJapanese, FourSeasons, PoemsOfTheEchigobana, HeikeMonogatari, KokinWakashu
} from
  'References/bibliography.json';

import imgSC232139 from "../SC232139.jpg";
import imgSC232140 from "../SC232140.jpg";
import imgSC232143 from "../SC232143.jpg";
import imgSC232156 from "../SC232156.jpg";
import imgSC232159 from "../SC232159.jpg";
import imgSC232172 from "../SC232172.jpg";
import imgSC232177 from "../SC232177.jpg";
import imgSC232155 from "../SC232155.jpg";
import imgSC152627 from '../SC152627.jpg';
import imgIrises1 from "../Irises_at_Yatsuhashi_(left).jpg";
import imgIrises2 from "../Irises_at_Yatsuhashi_(right).jpg";
import imgJapanvsKorea from "./Japan_vs_Korean_man.jpg";
import imgKoreanTanzaku from './Korean_tanzaku.jpg';
import imgKoreanMagpie from './Magpie_vs_Hototogisu.jpg';
import img5Brights from '../5_brights.jpg';
import imgEchigoKobanaBrights from './Echigo_Kobana_Brights.jpg';
import imgEchigoKobanaExtra from './Echigo_Kobana_Extras.jpg';
import imgKintoki from './KintoBana_Kintoki.jpg';

import imgHanafuda1_1 from '../Hanafuda_1-1.png';
import imgHanafuda1_2 from '../Hanafuda_1-2.png';
import imgHanafuda1_3 from '../Hanafuda_1-3.png';
import imgHanafuda1_4 from '../Hanafuda_1-4.png';
import imgHanafuda2_1 from '../Hanafuda_2-1.png';
import imgHanafuda2_2 from '../Hanafuda_2-2.png';
import imgHanafuda2_3 from '../Hanafuda_2-3.png';
import imgHanafuda2_4 from '../Hanafuda_2-4.png';
import imgHanafuda3_1 from '../Hanafuda_3-1.png';
import imgHanafuda3_2 from '../Hanafuda_3-2.png';
import imgHanafuda3_3 from '../Hanafuda_3-3.png';
import imgHanafuda3_4 from '../Hanafuda_3-4.png';
import imgHanafuda4_1 from '../Hanafuda_4-1.png';
import imgHanafuda4_2 from '../Hanafuda_4-2.png';
import imgHanafuda4_3 from '../Hanafuda_4-3.png';
import imgHanafuda4_4 from '../Hanafuda_4-4.png';
import imgHanafuda5_1 from '../Hanafuda_5-1.png';
import imgHanafuda5_2 from '../Hanafuda_5-2.png';
import imgHanafuda5_3 from '../Hanafuda_5-3.png';
import imgHanafuda5_4 from '../Hanafuda_5-4.png';
import imgHanafuda6_1 from '../Hanafuda_6-1.png';
import imgHanafuda6_2 from '../Hanafuda_6-2.png';
import imgHanafuda6_3 from '../Hanafuda_6-3.png';
import imgHanafuda6_4 from '../Hanafuda_6-4.png';
import imgHanafuda7_1 from '../Hanafuda_7-1.png';
import imgHanafuda7_2 from '../Hanafuda_7-2.png';
import imgHanafuda7_3 from '../Hanafuda_7-3.png';
import imgHanafuda7_4 from '../Hanafuda_7-4.png';
import imgHanafuda8_1 from '../Hanafuda_8-1.png';
import imgHanafuda8_2 from '../Hanafuda_8-2.png';
import imgHanafuda8_3 from '../Hanafuda_8-3.png';
import imgHanafuda8_4 from '../Hanafuda_8-4.png';
import imgHanafuda9_1 from '../Hanafuda_9-1.png';
import imgHanafuda9_2 from '../Hanafuda_9-2.png';
import imgHanafuda9_3 from '../Hanafuda_9-3.png';
import imgHanafuda9_4 from '../Hanafuda_9-4.png';
import imgHanafuda10_1 from '../Hanafuda_10-1.png';
import imgHanafuda10_2 from '../Hanafuda_10-2.png';
import imgHanafuda10_3 from '../Hanafuda_10-3.png';
import imgHanafuda10_4 from '../Hanafuda_10-4.png';
import imgHanafuda11_1 from '../Hanafuda_11-1.png';
import imgHanafuda11_2 from '../Hanafuda_11-2.png';
import imgHanafuda11_3 from '../Hanafuda_11-3.png';
import imgHanafuda11_4 from '../Hanafuda_11-4.png';
import imgHanafuda12_1 from '../Hanafuda_12-1.png';
import imgHanafuda12_2 from '../Hanafuda_12-2.png';
import imgHanafuda12_3 from '../Hanafuda_12-3.png';
import imgHanafuda12_4 from '../Hanafuda_12-4.png';

import imgEchigoBana from './EchigoBana.jpg';
import imgKintokiBana from './KintokiBana_Brights.jpg';
import imgPoem1 from '../poem-1.jpg';
import imgPoem2 from '../poem-2.jpg';
import imgPoem3 from '../poem-3.jpg';
import imgPoem4 from '../poem-4.jpg';
import imgPoem5 from '../poem-5.jpg';
import imgPoem6 from '../poem-6.jpg';
import img16944 from '../16944707362_9f2f1aa838_o.jpg';
import imgSC14 from '../SC148933.jpg';
import imgKaiAwase from './DP135571.jpg';
import imgKai1 from './2008_0079_0000_01_P.jpg';
import imgKai2 from './2008_0079_0000_02_P.jpg';
import imgKamigatayaGinza from './Kamigataya-Ginza.jpg';
import imgKamigatayaMotomachi from './Kamigataya-Motomachi.jpg';
import imgTatsutagawa from './Tatsutagawa.jpg';
import imgYoshino from './Yoshino.jpg';
import imgHoraiKimono from './HoraiKimono.jpg';
import imgKaiAwaseGame from './KaiAwaseGame.jpg';
import img1704Deck from './hanafuda-hanaawase02.jpg';
import imgOtsueRaijin from './otsue_raijin.jpg';
import imgRaijinCardSun from './raijin_card_sun.jpg';
import imgRaijinCard1 from './hanafuda-musashino-09.pdf-000.jpg';
import imgRaijinCard2 from './kaikinki-hanafuda11.pdf-000.jpg';
import imgRunningMan from './running_man.jpg';

import pronHachihachibana from '../pronunciation_ja_八八花.mp3';
import pronEchigobana from '../pronunciation_ja_越後花.mp3';
import pronTanka from '../pronunciation_ja_短歌.mp3';
import pronKokinWakashu from '../pronunciation_ja_古今和歌集.mp3';
import pronSakura from '../pronunciation_ja_桜.mp3';
import pronHanami from '../pronunciation_ja_花見.mp3';
import pronMaku from '../pronunciation_ja_幕.mp3';
import pronFuji from '../pronunciation_ja_藤.mp3';
import pronMatsu from '../pronunciation_ja_松.mp3';
import pronUme from '../pronunciation_ja_梅.mp3';
import pronHototogisu from '../pronunciation_ja_ホトトギス.mp3';
import pronKuromame from '../pronunciation_ja_黒豆.mp3';
import pronAyame from '../pronunciation_ja_菖蒲.mp3';
import pronYatsuhashi from '../pronunciation_ja_八橋.mp3';
import pronKakitsubata from '../pronunciation_ja_カキツバタ.mp3';
import pronBotan from '../pronunciation_ja_牡丹.mp3';
import pronHagi from '../pronunciation_ja_萩.mp3';
import pronAzuki from '../pronunciation_ja_赤豆.mp3';
import pronSusuki from '../pronunciation_ja_スズキ.mp3';
import pronBozu from '../pronunciation_ja_坊主.mp3';
import pronKiku from '../pronunciation_ja_菊.mp3';
import pronChoyo from '../pronunciation_ja_重陽.mp3';
import pronKotobuki from '../pronunciation_ja_寿.mp3';
import pronKoyo from '../pronunciation_ja_紅葉.mp3';
import pronYanagi from '../pronunciation_ja_柳.mp3';
import pronOnifuda from '../pronunciation_ja_鬼札.mp3';
import pronAme from '../pronunciation_ja_雨.mp3';
import pronKiri from '../pronunciation_ja_桐.mp3';
import pronHoo from '../pronunciation_ja_鳳凰.mp3';
import pronShigure from '../pronunciation_ja_時雨.mp3';
import pronNegi from '../pronunciation_ja_葱.mp3';
import pronTsukimi from '../pronunciation_ja_月見.mp3';
import pronManyoshu from './pronunciation_ja_万葉集.mp3'
import pronHongdan from './pronunciation_ko_홍단.mp3'
import pronCheongdan from './pronunciation_ko_청단.mp3'
import pronKaiAwase from './pronunciation_ja_貝合わせ.mp3';
import pronGenjiMonogatari from './pronunciation_ja_源氏物語.mp3';
import pronHeian from './pronunciation_ja_平安.mp3';
import pronEdo from './pronunciation_ja_江戸.mp3';
import pronKkachi from './pronunciation_ko_까치.mp3';
import pronMujigae from './pronunciation_ko_무지개.mp3';
import pronKariginu from './pronunciation_ja_狩衣.mp3';
import pronGat from './pronunciation_ko_갓.mp3';
import pronAshida from './pronunciation_ja_足駄.mp3';
import pronKintoki from './pronunciation_ja_kintoki.mp3';
import pronRaijin from './pronunciation_ja_雷神.mp3';

import { Link } from 'react-router-dom';

const Hanafuda: React.FC = () => {
  return (<>
    <Section title="Origins">
      <p><Noun lang="ja-Latn">Hanafuda</Noun> cards first appeared in Japan in the middle of the <Pronounce lang="ja-Latn" word="Edo" noun pronouncer="Nipponese" file={pronEdo} /> period (<span lang="ja">江戸</span>, 1603–1868). The distant origins of <Noun lang="ja-Latn">Hanafuda</Noun> cards lie in older “object-matching games” (<span lang="ja">物合わせ</span> <span lang="ja-Latn">mono-awase</span>), which existed since the <Noun lang="ja-Latn">Heian</Noun> period. These were courtly competitions in which various objects were compared as to their qualities: objects that were judged in these competitions included artifacts such as fans or paintings; flowers and plants (chrysanthemums, sweet-flag roots, wild pinks); animals (insects, songbirds); incense; tea<Cite r={AnIntroductionToJapaneseTeaRitual} page={26} />; birds; or shells. The most privileged of these competitions was the poetry match (<span lang="ja">歌合</span> <span lang="ja-Latn">uta-awase</span>).</p>
      <ArticleImage
        src={imgKaiAwase}
        position="wide"
        alt="Girls in elaborate traditional Japanese dress sitting in a circle around shells that are arranged face-down on the floor."
        source={{ license: 'cc0', organization: { orgName: "Metropolitan Museum of Art" }, originalUrl: 'https://www.metmuseum.org/art/collection/search/37303' }}>
        Girls playing a game of <span lang="ja-Latn">kai-awase</span>.<br />From <cite>Gifts from the Ebb Tide</cite> <cite lang="ja">潮干のつと</cite> (1790), by <Noun lang="ja-Latn">Kitagawa Utamaro</Noun> (<span lang="ja">喜多川歌麿</span>)
      </ArticleImage>
      <ArticleImage
        alt="A grandmother, a mother, two young women, and a child sitting in a circle around shells on a tatami mat."
        position="aside-wide"
        src={imgKaiAwaseGame}
        source={{ license: 'cc0', organization: { orgName: "跡見学園女子大学" }, originalUrl: 'https://trc-adeac.trc.co.jp/Html/ImageView/1171055100/1171055100200010/0010458776-1/' }}>
        A family game of <span lang="ja-Latn" >kai-awase</span>, from <cite lang="ja">女有職莩文庫</cite> (1866), by <Noun lang="ja-Latn">Okada Tamayama</Noun> (<span lang="ja">岡田玉山</span>)
        </ArticleImage>
      <p>The most relevant of these games was one based upon matching pairs of shells called <Pronounce lang="ja-Latn" word="kai-awase" pronouncer="skent" file={pronKaiAwase} /> (<span lang="ja">貝合わせ</span>, ‘shell matching’). This must have originally been a difficult game, since there is no way to test if shells truly match without placing them together. Eventually it developed into a memory game played with shells that were elaborately painted on the inside, often with scenes from the Tale of Genji (<span lang="ja">源氏物語</span> <Pronounce word="Genji monogatari" file={pronGenjiMonogatari} pronouncer="straycat88" lang="ja-Latn" />) — the game is also played in chapter 45 of the novel itself. Traditional <span lang="ja-Latn">kai-awase</span> sets have up to 360 shells, but modern replicas only have around 54.</p>
      <ArticleImage
        src={
          [ [imgKai1, 'Two large octagonal wooden containers painted with black lacquer and gold ornamental designs of wisteria.']
          , [imgKai2, 'Eight shells whose interiors have been painted with garden scenes and ornamented with gold.']
          ]}
        source={{ license: 'cc0', organization: { orgName: "Portland Art Museum" }, originalUrl: 'http://portlandartmuseum.us/mwebcgi/mweb.exe?request=record;id=55705;type=101' }}>
        An 18th-century <span lang="ja-Latn">kai-awase</span> set. The paired boxes are called <span lang="ja-Latn">kai-oke</span> (<span lang="ja">貝桶</span>, ‘shell buckets’), and half of each shell pair was stored in each bucket. The shells are decorated with painted scenes.
        </ArticleImage>
      <p><Noun lang="ja-Latn">Hanafuda</Noun> seem to originate in a combination of the themes of <span lang="ja-Latn">kai-awase</span> — matching sets, poetry, conventionalized art — with the ideas introduced by the Portuguese playing cards — a regular structure of <i>suits</i> divided into different <i>ranks</i>.</p>
      <p>These two distinct schools of playing-card games first combined in the form of <span lang="ja-Latn">hana-awase</span> decks. These early 18th century ancestors of <Noun lang="ja-Latn">Hanafuda</Noun> (such as the deck below) show a very regular configuration of cards for each flower, which evolved during the 18th and 19th centuries into the unusual configuration of the <Noun lang="ja-Latn">Hanafuda</Noun> deck.</p>
      <ArticleImage
        noborder
        position="wide"
        src={img1704Deck}
        alt=""
        source={{
          copyrightYear: 2019,
          author: {family: "崇", given: "江橋", familyFirst: true},
          originalUrl: "http://jpcm.sub.jp/home/image/hanafuda-hanaawase02.pdf",
          license: "with-permission",
        }}>
        Some of the cards from a <span lang="ja-Latn">hana-awase</span> deck produced circa 1704 (at least before 1710). The deck originally contained 400 cards but many are missing. Note the chrysanthemum with <span lang="ja-Latn">sake</span> cup in the third card on the top row.
        </ArticleImage>
      <p>The earliest type of card that is recognizably a <Noun lang="ja-Latn">Hanafuda</Noun> deck is that of the <Noun lang="ja-Latn">Musashino</Noun> pattern.</p>
      <p>Some time after its introduction, the game was restricted as part of a total ban on gambling introduced during the <Noun lang="ja-Latn">Kansei</Noun> Reforms<Footnote>During the <Noun lang="ja-Latn">Kansei</Noun> Reforms, gambling was prohibited by the <span lang="ja">博奕賭ノ勝負禁止ノ儀ニ付触書</span>, promulgated by Matsudaira Sadanobu on the 12th of January, 1788.<Cite r={SatireWithinKibyōshi} page={44} /></Footnote> (1787–1793). This ban was to remain in place until 1886, when <Noun lang="ja-Latn">Maeda Kihei</Noun> (<span lang="ja">前田喜兵衛</span>) decided to open a store selling  <Noun lang="ja-Latn">Hanafuda</Noun>.</p>
      <p>Things had begun to change in 1885, after a ban on Western playing cards (<span lang="ja">西洋かるた</span> <span lang="ja-Latn">seiyō karuta</span>) was lifted due to complaints from foreign officials.<Cite r={EbashiHanafuda} page={[[189, 192]]} /> <Noun lang="ja-Latn">Maeda Kihei</Noun><Footnote><Noun lang="ja-Latn">Kihei</Noun> appears to have been something of a rogue: he is somewhat infamous in the philately community for selling collections of counterfeit stamps to unsuspecting tourists.</Footnote> became convinced through his reading of legal texts that the selling of <Noun lang="ja-Latn">Hanafuda</Noun> was not actually prohibited, and he moved to <Noun lang="ja-Latn">Tōkyō</Noun> in December 1885 with a plan to open a <Noun lang="ja-Latn">Hanafuda</Noun> shop. However, he found that the local landlords refused to let to him, believing his business illegal, and he was unable to convince newspapers to print his advertisements. In order to prove himself correct, he came up with a cunning plan: he officially petitioned the <Noun lang="ja-Latn">Tōkyō</Noun> police to ban the sale of <Noun lang="ja-Latn">Hanafuda</Noun>. His petition was declined, the court stating that the sale of <Noun lang="ja-Latn">Hanafuda</Noun> was legal, and later that month he opened his first shop in the <Noun lang="ja-Latn">Sumiyoshi</Noun> neighbourhood,<Footnote><Noun lang="ja-Latn">Sumiyoshi-chō</Noun> was an <Noun lang="ja-Latn">Edo</Noun>-period red light district and the birthplace of the <Noun lang="ja-Latn">Sumiyoshi-kai</Noun> <span lang="ja-Latn">yakuza</span> organization.<Cite r={Sumiyoshikai} /> The area was destroyed along with most of the rest of <Noun lang="ja-Latn">Nihonbashi</Noun> in the Great <Noun lang="ja-Latn">Kantō</Noun> Earthquake of 1923; the location where <Noun lang="ja-Latn">Sumiyoshi-chō</Noun> existed is now part of <Noun lang="ja-Latn">Nihon-bashi Ningyō-chō 2–chōme</Noun> (<span lang="ja">人形町二丁目</span>).</Footnote> (<span lang="ja">住吉町</span>) on <Noun lang="ja-Latn">Ningyōchō</Noun> street (<span lang="ja">人形町通り</span>) in <Noun lang="ja-Latn">Tōkyō</Noun>’s <Noun lang="ja-Latn">Nihonbashi</Noun> district (<span lang="ja">日本橋</span>). The shop was named “<Noun lang="ja-Latn">Kamigataya</Noun>” (<span lang="ja">上方屋</span>, ‘<Noun lang="ja-Latn">Kyōto</Noun> region store’).<Cite r={EbashiHanafuda} page={[[189, 192]]} /></p>
      <ArticleImage
        position="left"
        src={imgKamigatayaGinza}
        alt="A Japanese storefront, open to the street, with many placards depicting Western cards along with Hanafuda."
        source={{ license: "cc0" }}>
        A newspaper advertisement depicting the outside of the <Noun lang="ja-Latn">Ginza</Noun> <Noun lang="ja-Latn">Kamigataya</Noun> store, 1889.
        </ArticleImage>
      <ArticleImage
        position="aside-wide"
        src={imgKamigatayaMotomachi}
        alt="An image of a Japanese street with lots of signs and flags for stores"
        source={{ license: "cc0" }}>
        In this early 20th century postcard, another branch of <Noun lang="ja-Latn">Kamigataya</Noun> can be seen on the left, identified by the large die; this one is in <Noun lang="ja-Latn">Motomachi</Noun> in <Noun lang="ja-Latn">Yokohama</Noun>.
        </ArticleImage>
      <p><Noun lang="ja-Latn">Kamigataya</Noun> was the first store to openly sell <Noun lang="ja-Latn">Hanafuda</Noun>. A month later, <Noun lang="ja-Latn">Kihei</Noun> opened a second branch of <Noun lang="ja-Latn">Kamigataya</Noun> in the <Noun lang="ja-Latn">Ginza</Noun> (<span lang="ja">銀座</span>) district, which became instantly successful. Once the viability of <Noun lang="ja-Latn">Hanafuda</Noun> had been proven, other manufacturers appeared quickly: the company that was later to become <Noun lang="ja-Latn">Nintendo</Noun> began producing <Noun lang="ja-Latn">Hanafuda</Noun> cards in 1889. Other companies such as <Noun lang="ja-Latn">Ōishi Tengudō</Noun> claim to have been operating discreetly during the prohibition period; in their case behind the doors of a rice merchant named <Noun lang="ja-Latn">Minatoya</Noun> (<span lang="ja">湊屋</span>).<Cite r={OishiTengudoHistory4} /></p>
      <p>However, even after prohibition had ended, <Noun lang="ja-Latn">Hanafuda</Noun> retained a poor reputation, and gambling remained illegal. In 1892, <Noun lang="ja-Latn">Korekata Kojima</Noun> (<span lang="ja">児島惟謙</span>, 1837–1908), who was the head of Japan’s supreme court (<span lang="ja">大審院</span> <span lang="ja-Latn">daishinin</span>), was accused along with five other supreme court judges of <span lang="ja-Latn">rōka</span> (<span lang="ja">弄花</span>, gambling with <Noun lang="ja-Latn">Hanafuda</Noun>). Despite a lack of evidence, <Noun lang="ja-Latn">Kojima</Noun> accepted ‘moral responsibility’ for the scandal and resigned his position.</p>
      <p>In 1902 a stamp duty was introduced that was inspired by similar taxes imposed in Western countries; the effect being to raise the cost of cards (and thereby discourage their use) but to also raise tax revenue. The tax imposed was crushing: 20 <span lang="ja-Latn">sen</span> per set,<Footnote>The <span lang="ja-Latn">sen</span> (<span lang="ja">銭</span>) was a unit of currency representing 1⁄100 of a <span lang="ja-Latn">yen</span>.</Footnote> in a time when cheap <Noun lang="ja-Latn">Hanafuda</Noun> decks could be had for as little as 2–3 <span lang="ja-Latn">sen</span>. The effect on card manufacturers was “dire”, as Rebecca Salter puts it.<Cite r={PopularJapanesePrints} page={186} /> Japanese <Noun lang="ja-Latn">Hanafuda</Noun> scholar <Noun lang="ja-Latn">Ebashi Takashi</Noun> (<span lang="ja">江橋崇</span>) states that the law led to the closure of many small producers, and made it much harder for new manufacturers to enter the industry; both due to the tax itself as well as onerous record-keeping and inspection requirements.<Cite r={CartaTaxLawContents} /></p>
    </Section>
    <Section title="Art of the Cards">
      <p>The culture of the <Noun lang="ja-Latn">Edo</Noun> period in which <Noun lang="ja-Latn">Hanafuda</Noun> cards appeared was heavily influenced by the aristocratic culture of the earlier <Pronounce lang="ja-Latn" word="Heian" noun pronouncer="skent" file={pronHeian}/> period (<span lang="ja">平安</span>, 794–1185). As such, the art of the cards abounds with references to <Noun lang="ja-Latn">Heian</Noun> period literature, festivals, and artistic tropes:</p>
      <blockquote className="blockquote">
        <p>With the exception of the peony, which entered the poetic canon in the <Noun lang="ja-Latn">Edo</Noun> period, all the images are from classical poetry of the <Noun lang="ja-Latn">Heian</Noun> period and reflect urban commoners’ knowledge of the poetic and cultural associations of the months.<Cite r={FourSeasons} page={[[1739, 1741]]} pageType="l." /></p>
      </blockquote>
      <p>While nominally the cards start in ‘January’, at the time the deck was created Japan’s calendar was based upon the lunisolar Chinese calendar, which started in what is now February. This explains why ‘March’ is the month of the cherry blossom when — according to the current calendar — it should be April,<Footnote>In Kyoto from the 11th to 13th centuries, the average peak of the cherry blossom season was April 17th.<Cite r={FourSeasons} page={484} pageType="l." /></Footnote> and why ‘August’ shows the full moon when the full moon festival (<span lang="ja">月見</span> <Pronounce pronouncer="skent" word="tsukimi" lang="ja-Latn" file={pronTsukimi} />) actually falls in September–October.</p>
      <p>However, even with these modifications the eleventh (willow) and twelfth (paulownia) months are in the wrong place. The eleventh month depicts rain, willows, and a frog, all of which are associated with summer.</p>
      <p>Artistically, the cards derive from the <span lang="ja-Latn">kachō-ga</span> (<span lang="ja">花鳥画</span> ‘flower and bird image’) tradition. Artworks in this style often have poems written upon them, and these appear on some cards of the <span lang="ja-Latn">Echigo-bana</span> pattern.</p>
      <ArticleImage
        src={[
          [imgSC232139, ""],
          [imgSC232140, ""],
          [imgSC232143, ""],
          [imgSC232156, ""],
          [imgSC232159, ""],
          [imgSC232172, ""],
          [imgSC232177, ""],
          [imgSC232155, ""],
        ]}
        perRow={4}
        source={{
          license: 'cc0',
          organization: { orgName: 'Boston Museum of Fine Arts' },
          originalUrl: "https://www.mfa.org/collections/object/title-page-from-the-series-forty-eight-hawks-drawn-from-life-ikiutsushi-shij%C3%BBhachi-taka-209778",
        }}>
        Art in the <span lang="ja-Latn">kachō-ga</span> style: a selection of prints from the series <cite>Forty-Eight Hawks Drawn From Life</cite><br /> <cite lang="ja">生うつし四十八鷹</cite> (1859), by <Noun lang="ja-Latn">Nakayama Sūgakudō</Noun>
      </ArticleImage>
    </Section>
    <Section title="Hanafuda Patterns">
      <Section title={<>Standard (<Noun lang="ja-Latn">Hachihachi-bana</Noun>)</>}>
        <p>The standard pattern is now one that is called <Pronounce pronouncer="poyotan" word="hachihachi-bana" lang="ja-Latn" file={pronHachihachibana} /> (<span lang="ja">八八花</span>/<span lang="ja">八々花</span>), since it was primarily used to play the game <span lang="ja">八八</span> ‘88’. Almost all decks use this pattern, and images from it are used to show the cards of each month below.</p>
        <ArticleImage position="small" src={img5Brights} alt="TODO">The 5 Bright cards of the <span lang="ja-Latn">hachihachi-bana</span> pattern, from a <Noun lang="ja-Latn">Nintendo</Noun> deck.</ArticleImage>
        <Section title="Korean deck differences">
          <p>Korean decks are also based on the <span lang="ja-Latn">hachi­hachi­-bana</span> pattern, but the ribbons are usually blue instead of purple, and there is Korean text on the standard three red ribbons (labelled <span lang="ko">홍단</span>, <Pronounce lang="ko-Latn" pronouncer="glamstar77" word="hongdan" file={pronHongdan} /> ‘crimson ribbon’) and all three blue ribbons (<span lang="ko">청단</span>, <Pronounce lang="ko-Latn" word="cheongdan" pronouncer="glamstar77" file={pronCheongdan} /> ‘blue ribbon’).</p>
          <ArticleImage
            src={imgKoreanTanzaku}
            alt="Six Hwatu cards showing ribbons with Korean text written on them.">
            Korean <Noun lang="ko-Latn">Hwatu</Noun> cards with ribbons.
            </ArticleImage>
          <p>There are also differences in the ‘rain man’ (see below), and depending on the deck, other aspects of the cards can also be translated into Korean cultural terms. For example, the lesser cuckoo of the Japanese cards is in some decks the Oriental magpie, which is the national bird of Korea.</p>
          <div className="multi">
            <ArticleImage position="small"
              src={imgKoreanMagpie}
              alt="Two hwatu-format cards: the left shows cherry blossoms with a Korean magpie that has a blue chest with black and yellow wings, while the right shows cherry blossoms with a lesser cuckoo that has a yellow body and green wings.">
              The <span lang="ko">무지개</span> (<Pronounce word="mujigae" lang="ko-Latn" file={pronMujigae} pronouncer="fairybel" />, ‘rainbow’) brand <Noun lang="ko-Latn">Hwatu</Noun> deck (on left) features a Korean magpie (<span lang="ko">까치</span> <Pronounce file={pronKkachi} word="kkachi" lang="ko-Latn" pronouncer="goeun" />), instead of the usual lesser cuckoo as shown on the Daiso <Noun lang="ko-Latn">Hwatu</Noun>-format deck.
                </ArticleImage>
            <ArticleImage
              position="small"
              src={imgJapanvsKorea}
              alt="Two Hanafuda cards, the first depicting a man wearing Japanese dress, the second wearing Korean.">
              The ‘rain man’ wears traditional clothing in both Japanese and Korean decks. The Japanese man (left) wears a <Noun lang="ja-Latn">Heian</Noun> period courtier’s daily outfit (<span lang="ja">狩衣</span> <Pronounce pronouncer="skent" lang="ja-Latn" word="kariginu" file={pronKariginu} />), with tall <span lang="ja-Latn">tate-eboshi</span> (<span lang="ja">楯烏帽子</span>) hat, and very tall rain-clogs (<span lang="ja">足駄</span> <Pronounce lang="ja-Latn" word="ashida" pronouncer="skent" file={pronAshida} />) on his feet. The Korean man is wearing a noble’s <Pronounce pronouncer="glamstar77" lang="ko-Latn" word="gat" file={pronGat} /> (<span lang="ko">갓</span>) hat, and an outer coat with very large sleeves.
                </ArticleImage>
          </div>
        </Section>
      </Section>
      <Section title={<><Noun lang="ja-Latn">Echigo-bana</Noun></>}>
        <p>The regional <Pronounce pronouncer="poyotan" word="Echigo-bana" lang="ja-Latn" file={pronEchigobana} /> (<span lang="ja">越後花</span> ‘Echigo flowers’) pattern is based on designs that are older than the standard pattern. The most obvious difference is that all the cards are overpainted with gold and silver in various patterns.</p>
        <ArticleImage
          src={imgEchigoBana}
          alt="Five hanafuda cards which are overpainted in silver and gold paints in various patterns, obscuring the details.">
          The 5 Brights of the <span lang="ja-Latn">Echigo-bana</span> pattern, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
        <p>Some of the junk cards also carry short poems (<span lang="ja">短歌</span> <Pronounce pronouncer="akitomo" word="tanka" lang="ja-Latn" file={pronTanka} />). Poetry is a common sight on traditional Japanese art — as seen on the <span lang="ja-Latn">kachō-ga</span> prints above — and often provides more context to the images. The poems of the <Noun lang="ja-Latn">Echigo-bana</Noun> will be explained below.</p>
      </Section>
      <Section title={<Noun lang="ja-Latn">Echigo-kobana</Noun>}>
        <p>The <span lang="ja-Latn">Echigo-kobana</span> (<span lang="ja">越後小花</span> ‘Echigo small flowers’) pattern is similar to the <Noun lang="ja-Latn">Echigo-bana</Noun>, but with very small cards measuring approximately 3&nbsp;cm × 4.5&nbsp;cm (1⅛″ × 1¾″).</p>
        <ArticleImage
          src={imgEchigoKobanaBrights}
          alt="Five hanafuda cards which are overpainted in silver and gold paints in various patterns, obscuring the details.">
          The 5 Brights of the <span lang="ja-Latn">Echigo-kobana</span> pattern, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
        <p>Because of the small size, there are no poems on this deck. However, it does contain four extra cards. Any special rules for the deck, including the use of these extra cards, are unknown — <Noun lang="ja-Latn">Ōishi Tengudō</Noun> even includes a note with every deck sold asking for anyone who knows the rules to contact them!</p>
        <ArticleImage
          position="small"
          src={imgEchigoKobanaExtra}
          alt="Four hanafuda cards, one with a picture of a Tengu and manfacturer’s name, the rest with a stylized depection of a spearman.">
          The four extra cards of an <span lang="ja-Latn">Echigo-kobana</span> deck by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
      </Section>
      <Section title={<><Noun lang="ja-Latn">Awa-­bana</Noun>/<Noun lang="ja-Latn">Kintoki­-bana</Noun></>}>
        <ArticleImage
          position="aside"
          src={imgKintoki}
          alt="A Hanafuda card depicting a red boy carrying an axe, and wearing a shirt with the character for ‘gold’ on it.">
          The <Noun lang="ja-Latn">Kintoki</Noun> card, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>. He is depicted carrying an axe and wearing a shirt with the character <span lang="ja">金</span> (<span lang="ja-Latn">kin</span>, ‘gold’) on it.
        </ArticleImage>
        <p>This is another regional pattern called <span lang="ja-Latn">Awa­-bana</span> (<span lang="ja">阿波花</span>) or <span lang="ja-Latn">Kintoki­-bana</span> (<span lang="ja">金時花</span>). It originated in <Noun lang="ja-Latn">Awa</Noun> province, in what is now <Noun lang="ja-Latn">Tokushima</Noun> prefecture.</p>
        <p>Like the <Noun lang="ja-Latn">Echigo-bana</Noun> pattern, some of the <Noun lang="ja-Latn">Awa-­bana</Noun> carry poems (in fact, they carry the same poems). The deck also contains an extra card which features the titular <Pronounce noun lang="ja-Latn" pronouncer="renad" file={pronKintoki} word="Kintoki" /> (<span lang="ja">金時</span>), <a href="https://en.wikipedia.org/wiki/Kintar%C5%8D">a legendary strong-boy also known as <Noun lang="ja-Latn">Kintarō</Noun></a>.</p>
        <ArticleImage
          src={imgKintokiBana}
          alt="Five hanafuda cards with bright colours and overpainted with silver.">
          The 5 Brights of the <span lang="ja-Latn">Awa-bana</span> pattern, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
      </Section>
      <Section title="Modern/Novelty decks">
        <p>In addition to the traditional standard patterns, there are also many modern revisions or novelty decks that
        can be found. More information and examples of these can be found in the <Link to="/articles/cards/japan/hanafuda/new-manufacturers">article about new <Noun
            lang="ja-Latn">Hanafuda</Noun> manufacturers</Link>.</p>
      </Section>
    </Section>
    <Section title="Cards in Depth">
      <Section title={<><span lang="ja">1月</span> — pine (<span lang="ja">松</span> <Pronounce pronouncer="_ai_" word="matsu" lang="ja-Latn" file={pronMatsu} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda1_1, "A card with a red moon, a crane, and pine trees."],
            [imgHanafuda1_2, "A card with pine trees and a red scroll with writing."],
            [imgHanafuda1_3, "A card with pine trees."],
            [imgHanafuda1_4, "A card with pine trees."],
          ]}>
          The cards for January feature pine trees. There is one bright card, one scroll card (with text), and two junk cards.
        </ArticleImage>
        <ArticleImage
          position="aside"
          alt="A kimono featuring pine trees and cranes on the back of a large turtle."
          src={imgHoraiKimono}
          source={{
            originalUrl: "https://collections.mfa.org/objects/30805/kimono-uchikake",
            organization: { orgAbbr: "MFA", orgName: "Museum of Fine Arts Boston" },
            license: 'cc0'
          }}>
          An elaborate 19th century <span lang="ja-Latn">kimono</span> with Mount <Noun lang="ja-Latn">Hōrai</Noun> pattern: plum and pine trees with cranes, atop a large turtle.
        </ArticleImage>
        <p>The bright card for January shows a crane and pine trees, with the sun rising in the background. Both the crane and the pine are symbols of longevity, so they are a common combination in Japanese art; the mythical Mount <Noun lang="ja-Latn">Hōrai</Noun>, dwelling-place of immortals, is depicted as wooded with pine trees and populated by cranes. The pine is associated with winter and snow, so these cards show the lingering influence of winter during the new year. One traditional new year celebration involved pulling up small pine trees.</p>
        <p>The text on the scroll reads <span lang="ja-Latn">akayoroshi</span> <span lang="ja">あ𛀙よろし</span>.<Footnote>The writing on the scroll uses a rare <span lang="ja-Latn">hentaigana</span> character for <span lang="ja-Latn">ka</span>, which is usually written <span lang="ja">か</span>. It may not render correctly on your device.</Footnote> The meaning of this phrase is unclear, even to <Noun lang="ja-Latn">Hanafuda</Noun> manufacturers, but it may be something like ‘clearly the best’.</p>
        <ArticleImage
          position="small"
          src={imgPoem1}
          alt="The junk cards of the Echigo-bana pattern which bear the poem.">
          <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
        </ArticleImage>
        <p>In the <span lang="ja-Latn">Echigo-bana</span> pattern, the junk cards carry a <span lang="ja-Latn">tanka</span> composed by <Noun lang="ja-Latn"><a href="https://en.wikipedia.org/wiki/Minamoto_no_Muneyuki">Mina­moto no Mune­yuki</a></Noun><Footnote><Noun lang="ja-Latn">Mina­moto no Mune­yuki</Noun> (<abbr title="died">d.</abbr> 983) was a Heian era poet, and named one of the ‘Thirty-Six Immortals of Poetry’.</Footnote> (<span lang="ja">源宗于</span>) at a poetry competition organized by the Empress during the reign of <a href="https://en.wikipedia.org/wiki/Emperor_Uda">Emperor <Noun lang="ja-Latn">Uda</Noun></a> (<span lang="ja">宇多天皇</span>). It is featured as Poem 24 in the ‘Spring’ section of the <Pronounce pronouncer="skent" word="Kokin Wakashū" lang="ja-Latn" file={pronKokinWakashu} noun /> (<cite lang="ja">古今和歌集</cite> “Collection of Old and New Poems”):</p>
        <Footnote standalone>
          <p><Cite r={PoemsOfTheEchigobana} page={4} inline /> notes that in the standard design printed by Nintendo and <Noun lang="ja-Latn">Ōishi Tengudō</Noun>, the card is missing the <span lang="ja">も</span> on the second ‘line’.</p>
        </Footnote>
        <div className="multi">
          <p lang="ja" className="vertical-rl">
            ときはなる<br />松のみどりも<br />春くれば<br />今ひとしほの<br />色まさりけり
        </p>
          <p>Even the verdure<br />of foliage on the pine tree,<br />“ever unchanging”,<br />deepens into new richness<br />now that springtime has arrived.<Cite r={KokinWakashu} page={18} /></p>
        </div>
        <p>The junk cards of the <Noun lang="ja-Latn">Awa­-bana</Noun> also carry the same poem.</p>
      </Section>
      <Section title={<><span lang="ja">2月</span> — plum (<span lang="ja">梅</span> <Pronounce pronouncer="akitomo" word="ume" lang="ja-Latn" file={pronUme} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda2_1, ""],
            [imgHanafuda2_2, ""],
            [imgHanafuda2_3, ""],
            [imgHanafuda2_4, ""],
          ]}>
          The cards for February feature plum trees in blossom. There is one species card, one scroll card (with text), and two junk cards. The text on the scroll is the same as that on January’s.
        </ArticleImage>
        <p>The bush warbler/plum blossom combination has been associated with the arrival of spring since early times, dating at least from the <Pronounce pronouncer="monekuson" word="Man’yōshū" lang="ja-Latn" file={pronManyoshu} noun />  (<cite lang="ja">万葉集</cite> ‘Collection of Ten Thousand Leaves’), a book of poetry compiled during the <Noun lang="ja-Latn">Nara</Noun> period sometime after 759.<Cite r={FourSeasons} page={978} pageType={'loc.'} /> At this time, the plum blossom was the favourite flower; cherry blossoms would only become more favoured during the Heian period.<Cite r={FourSeasons} page={997} pageType='loc.' /></p>
        <p>The bush warbler was famed for its song, as shown by this poem from <Noun lang="ja-Latn">Ōe no Chisato</Noun> (<span lang="ja">大江千里</span>), composed during a competition in the <Noun lang="ja-Latn">Kanpyō</Noun> era (889–898). The first cry of the bush warbler was considered to announce the beginning of spring:</p>
        <Footnote standalone><p>This is Poem 14 from the ‘Spring 1’ section of the <Noun lang="ja-Latn">Kokinshū</Noun>.</p></Footnote>
        <div className="multi">
          <p lang="ja">うぐひすの谷よりいづるこゑなくは春くることをたれかしらまし</p>
          <p>Without the voice of the warbler that comes out of the valley, how would we know the arrival of spring?<Cite r={FourSeasons} page={952} pageType="loc." /></p>
        </div>
        <br />
        <ArticleImage
          position="small"
          src={imgPoem4}
          alt="The junk cards of the Echigo-bana pattern which bear the poem.">
          <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
        </ArticleImage>
        <p>The poem on the <Noun lang="ja-Latn">Echigo-bana</Noun> junk cards (the origin of which is unknown) also describes the call of the bush warbler. Note that while the poem must be describing white plum blossoms (<span lang="ja">白梅</span> <span lang="ja-Latn">hakubai</span>), all <Noun lang="ja-Latn">Hanafuda</Noun> patterns depict red plum blossoms (<span lang="ja">紅梅</span> <span lang="ja-Latn">kōbai</span>), which became more popular later on:</p>
        <div className="multi">
          <p lang="ja" className="vertical-rl">
            鴬の<br />鳴音はしるき<br />梅の花<br />色まがえとや<br />雪の降るらん
        </p>
          <p>
            The nightingale’s<br />Song is clear<br />And the white plum blossom<br />Becomes lost<br />In the falling snow.<Cite r={PoemsOfTheEchigobana} page={99} />
          </p>
        </div>
      </Section>
      <Section title={<><span lang="ja">3月</span> — cherry (<span lang="ja">桜</span> <Pronounce pronouncer="strawberrybrown" word="sakura" lang="ja-Latn" file={pronSakura} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda3_1, ""],
            [imgHanafuda3_2, ""],
            [imgHanafuda3_3, ""],
            [imgHanafuda3_4, ""],
          ]}>
          The cards for March show the famous cherry blossoms of Japan. There is one bright card, one scroll card (with text), and two junk cards.
        </ArticleImage>
        <ArticleImage
          position="left"
          src={img16944}
          alt="A picture of three women and a man consuming heated sake under a cherry tree in blossom, while surrounded by striped curtains."
          source={{
            license: 'cc0',
            originalUrl: "https://www.flickr.com/photos/library_of_congress/16944707362",
            organization: { orgName: "Library of Congress" }
          }} >
          <cite>Third Month: Blossom-Viewing in Askukayama</cite><br /><cite lang="ja">三月　飛鳥山花見</cite><br />by <Noun lang="ja-Latn">Kitao Shigemasa</Noun> (<span lang="ja">北尾 重政</span>, 1739–1820).
        </ArticleImage>
        <p>The scroll of the March cards reads <span lang="ja-Latn">miyoshino</span> <span lang="ja">みよしの</span> ‘beautiful <Noun lang="ja-Latn">Yoshino</Noun>’.<Footnote>
          Some older cards have variations on this phrase, like <span lang="ja">みよし𛂙</span>, <span lang="ja">美よし𛂙</span>, or <span lang="ja">みよし𛂜</span>.
            Other phrases seen on the cherry <span lang="ja-Latn">tanzaku</span> include <span lang="ja">す𛀙𛂦𛃰</span> (<span lang="ja">すがわら</span> <span lang="ja-Latn">sugawara</span>), or <span lang="ja">宇良す</span> (<span lang="ja">うらす</span> <span lang="ja-Latn">urasu</span>). Both of these are references to the <a href="/games/hachi-hachi"><Noun lang="ja-Latn">Hachi-Hachi</Noun></a> <span lang="ja-Latn">yaku</span> ‘<span lang="ja">うらすがわら</span>’ (<span lang="ja-Latn">urasugawara</span>).
        </Footnote> This is a reference to the mountainous area of <Noun lang="ja-Latn">Yoshino</Noun> (<span lang="ja">吉野</span>) in <Noun lang="ja-Latn">Nara</Noun> prefecture, which is famous for its cherry blossoms.</p>
        <ArticleImage
          src={imgYoshino}
          position="aside-wide"
          alt="A mountain covered in cherry blossom trees showing light pink blooms, amongst other dark green trees."
          source={{
            license: 'cc-by-nc-nd',
            licenseVersion: '4.0',
            originalUrl: 'http://photozou.jp/photo/show/314766/35962820',
            copyrightYear: 2010,
            author: 'ゆぼ'
          }}>
          The <Noun lang="ja-Latn">Yoshino</Noun> mountainside with cherry trees in bloom.
        </ArticleImage>
        <p>Blossom-viewing (<span lang="ja">花見</span> <Pronounce pronouncer="samchie" word="hanami" lang="ja-Latn" file={pronHanami} />), parti­cularly of cherry blossoms, is a custom that dates back to the Heian period. The curtains (<span lang="ja">幕</span> <Pronounce pronouncer="skent" word="maku" lang="ja-Latn" file={pronMaku} />) that are shown on the bright card provide privacy whilst viewing cherry blossoms. An example of their use can be seen in the image on the right. It was common to use striped fabric, particularly in red &amp; white, while nobility would use curtains bearing their family crest.</p>
      </Section>
      <Section title={<><span lang="ja">4月</span> — wisteria (<span lang="ja">藤</span> <Pronounce pronouncer="kaoring" word="fuji" lang="ja-Latn" file={pronFuji} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda4_1, ""],
            [imgHanafuda4_2, ""],
            [imgHanafuda4_3, ""],
            [imgHanafuda4_4, ""],
          ]}>
          The cards for April show the drooping branches of wisteria. There is one species card, one red scroll card, and two junk cards.
        </ArticleImage>
        <p>The cards for April are also nicknamed ‘black bean’ (<span lang="ja">黒豆</span> <Pronounce pronouncer="usako_usagiclub" word="kuromame" lang="ja-Latn" file={pronKuromame} />), due to their appearance. This month shows the transition from spring to summer; the lesser cuckoo (<span lang="ja">ホトトギス</span> <Pronounce pronouncer="forsmith" word="hototogisu" lang="ja-Latn" file={pronHototogisu} />) is a bird of summer,<Cite r={FourSeasons} page={1065} pageType="l." /> while wisteria is associated with the end of spring.<Cite r={FourSeasons} page={1021} pageType="l." /> Like the bush warbler and spring, the first cry of the cuckoo was considered to announce the beginning of summer.</p>
        <p>The cuckoo swooping in front of the moon is a common motif in Japanese art. It is tempting to claim that this may be a reference to the tale of <Noun lang="ja-Latn">Yorimasa</Noun> from the <Noun lang="ja-Latn">Heike Monogatari</Noun>,<Cite r={HeikeMonogatari} page={[[161, 163]]} /> but the oldest decks do not have a moon on this card.</p>
        <ArticleImage
          position="small"
          alt="The junk cards of the Echigo-bana pattern which bear the poem."
          src={imgPoem6}>
          <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
        </ArticleImage>
        <p>The <span lang="ja-Latn">tanka</span> on the junk cards is similar to Poem 135 from the Summer section of the <Noun lang="ja-Latn">Kokinshū</Noun>.<Footnote>
          The poem on the card differs slightly in that the last line starts with <span lang="ja-Latn">ima ya</span> <span lang="ja">今や</span> instead of <span lang="ja-Latn">itu ka</span> <span lang="ja">いつか</span>.<Cite r={PoemsOfTheEchigobana} page={100} />
        </Footnote> This poem (perhaps written by <Noun lang="ja-Latn">Kakinomoto no Hitomaro</Noun> <span lang="ja">柿本 人麻呂</span>) again focuses on the transition from spring (represented by wisteria) to summer (represented by the arrival of the cuckoo):</p>
        <div className="multi">
          <p lang="ja" className="vertical-rl">わがやどの<br />池の藤波<br />さきにけり<br />山郭公<br />いつかきなかむ</p>
          <p>At my home<br />On the pond wisteria waves<br />Are breaking:<br />Mountain cuckoo,<br />When might you come and sing?<br /><Cite r={KKS135} /></p>
          <p>Cascades of flowers<br />bloom on the wisteria<br />by my garden lake.<br />When might the mountain cuckoo<br />come with his melodious song?<br /><Cite r={KokinWakashu} page={40} /></p>
        </div>
      </Section>
      <Section title={<><span lang="ja">5月</span> — iris (<span lang="ja">菖蒲</span> <Pronounce pronouncer="akitomo" word="ayame" lang="ja-Latn" file={pronAyame} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda5_1, ""],
            [imgHanafuda5_2, ""],
            [imgHanafuda5_3, ""],
            [imgHanafuda5_4, ""],
          ]}>
          The cards for May depict iris flowers. There is one species card, one red scroll card, and two junk cards.
        </ArticleImage>
        <p>A nickname for the month is <Pronounce pronouncer="skent" word="negi" lang="ja-Latn" file={pronNegi} /> (<span lang="ja">葱</span>, ‘scallion/leek’).<Cite r={HanaAwase} /></p>
        <p>The bridge shown on the species card is a reference to the ‘eight bridges’ (<span lang="ja">八橋</span> <Pronounce pronouncer="poyotan" word="yatsuhashi" lang="ja-Latn" file={pronYatsuhashi} />) featured in an episode of the <cite>Tales of Ise</cite> (<cite lang="ja">伊勢物語</cite> <span lang="ja-Latn">Ise Monogatari</span>), in which the unnamed protagonist<Footnote>Traditionally this is presumed to be the poet <Noun lang="ja-Latn">Ariwara no Narihira</Noun> (<span lang="ja">在原 業平</span>).</Footnote> of the story comes across a braided river that is crossed by eight overlapping planks forming a zig-zag bridge. Challenged to compose a poem on the subject “a traveller’s sentiments”, he recites the following:</p>
        <section>
          <ArticleImage
            position="left"
            src={imgPoem5} alt="The junk cards of the Echigo-bana pattern which bear the poem.">
            <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
            </ArticleImage>
          <div className="multi">
            <p lang="ja" className="vertical-rl"><b>か</b>らごろも<br /><b>き</b>つつなれにし<br /><b>つ</b>ましあれば<br /><b>は</b>るばるきぬる<br /><b>た</b>びをしぞおもふ</p>
            <p>I have a beloved wife,<br />Familiar as the skirt<br />Of a well-worn robe,<br />And so this distant journeying<br />Fills my heart with grief.<Cite r={TalesOfIse} page={[[74, 75]]} /></p>
          </div>
        </section>
        <p>This poem, which appears in full on the junk cards of the <span lang="ja-Latn">Echigo-bana</span> pattern,<Cite r={PoemsOfTheEchigobana} page={100} /> is in the form of an acrostic; the first letters of each line spell out <span lang="ja-Latn">kakitsuhata</span> <span lang="ja">かきつはた</span>, which is a reference to the name of the Japanese iris (<span lang="ja">杜若</span> <Pronounce pronouncer="kaoring" word="kakitsubata" lang="ja-Latn" file={pronKakitsubata} />).<Footnote>Note that at the time this poem was written, written Japanese did not distinguish between <span lang="ja">は</span> <span lang="ja-Latn">ha</span> and <span lang="ja">ば</span> <span lang="ja-Latn">ba</span>.</Footnote>  Because of this scene, the iris and the planked bridge have a long association in Japan.</p>
        <ArticleImage
          position="wide"
          src={[
            [imgIrises1, ""],
            [imgIrises2, ""],
          ]}
          perRow={1}
          source={{ license: 'cc0' }}>
          <cite>Irises at <Noun lang="ja-Latn">Yatsuhashi</Noun></cite><br /><cite lang="ja">八橋図屏風</cite><br />A pair of screens by the artist <Noun lang="ja-Latn">Ogata Kōrin</Noun> (<span lang="ja">尾形光琳</span>, 1658–1716)
        </ArticleImage>
      </Section>
      <Section title={<><span lang="ja">6月</span> — peony (<span lang="ja">牡丹</span> <Pronounce pronouncer="ryomasakamoto" word="botan" lang="ja-Latn" file={pronBotan} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda6_1, ""],
            [imgHanafuda6_2, ""],
            [imgHanafuda6_3, ""],
            [imgHanafuda6_4, ""],
          ]}>
          The cards for June show peony flowers. There is one species card, one blue/purple scroll card, and two junk cards.
        </ArticleImage>
      </Section>
      <Section title={<><span lang="ja">7月</span> — bush clover (<span lang="ja">萩</span> <Pronounce pronouncer="strawberrybrown" word="hagi" lang="ja-Latn" file={pronHagi} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda7_1, ""],
            [imgHanafuda7_2, ""],
            [imgHanafuda7_3, ""],
            [imgHanafuda7_4, ""],
          ]}>
          The cards for July show bush clover. There is one species card, one red scroll card, and two junk cards.
        </ArticleImage>
        <p>The cards for July are also nicknamed ‘red bean’ (<span lang="ja">赤豆</span> <span lang="ja-Latn">akamame</span>/<span lang="ja">小豆</span> <Pronounce pronouncer="poyotan" word="azuki" lang="ja-Latn" file={pronAzuki} />). Bush clover is very strongly associated with autumn — the Japanese character <span lang="ja">萩</span> is a composition of <span lang="ja">秋</span> ‘autumn’ and <span lang="ja">艹</span> (full form <span lang="ja">艸</span>) ‘grass’.</p>
        {/* Deer is associated with bush clover but instead we have a boar? But also
        deer are renowned for being separated from their lovers... */}
      </Section>
      <Section title={<><span lang="ja">8月</span> — miscanthus/silvergrass (<span lang="ja">芒/薄</span> <Pronounce pronouncer="kaoring" word="susuki" lang="ja-Latn" file={pronSusuki} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda8_1, ""],
            [imgHanafuda8_2, ""],
            [imgHanafuda8_3, ""],
            [imgHanafuda8_4, ""],
          ]}>
          The cards for August show waving fields of miscanthus, also known as silvergrass. There is one bright card, one species card, and two junk cards.
        </ArticleImage>
        <p>On printed cards, the fields of grass are often simplified into solid black circles. Because of the resemblance of this to the head of a bald man, one nickname for the cards is ‘baldy’ (<span lang="ja">坊主</span> <Pronounce pronouncer="skpronounce" word="bōzu" lang="ja-Latn" file={pronBozu} />), a slang term for a Buddhist monk.</p>
        <ArticleImage
          position="wide"
          src={imgSC14}
          alt="Three horsemen crossing a grassy plain at night, while geese fly past the moon."
          source={{
            license: 'cc0',
            organization: { orgName: 'Boston Museum of Fine Arts' },
            originalUrl: "https://www.mfa.org/collections/object/musashi-plain-musashino-from-the-series-famous-places-in-the-provinces-shokoku-meisho-233023"
          }} >
          <cite>Famous places in the provinces: <Noun lang="ja-Latn">Musashi</Noun> Plain</cite><br /><cite lang="ja">諸国名所　武蔵野</cite><br />A woodblock print by <Noun lang="ja-Latn">Totoya Hokkei</Noun> (<span lang="ja">魚屋 北渓</span>, 1780–1850)
        </ArticleImage>
        <ArticleImage
          position="small"
          src={imgPoem3}
          alt="The junk cards of the Echigo-bana pattern which bear the poem.">
          <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
        </ArticleImage>
        <p><Cite r={PoemsOfTheEchigobana} inline /> says that the poem on the <span lang="ja-Latn">Echigo-bana</span> junk cards is “untranslatable”, because it has been corrupted. His contact believes it is meant to be poem 422 of the <Noun lang="ja-Latn">Shin Kokinshū</Noun>, or perhaps a revision of it:</p>
        <div className="multi">
          <p lang="ja" className="vertical-rl">
            行く末は<br />空もひとつの<br />武蔵野に<br />草の原より<br />出づる月影
        </p>
          <p>
            Its destination:<br /> The skies, one with<br /> Musashi Plain, where<br /> From among the fields of grass<br /> Emerges moonlight.<br /><Cite r={SKKS442} />
          </p>
        </div>
        <p>This poem was composed by <Noun lang="ja-Latn"><a href="https://en.wikipedia.org/wiki/Kuj%C5%8D_Yoshitsune">Fujiwara no Yoshitsune</a></Noun> (<span lang="ja">藤原良経</span>, 1169–1206).</p>
      </Section>
      <Section title={<><span lang="ja">9月</span> — chrysanthemum (<span lang="ja">菊</span> <Pronounce pronouncer="akitomo" word="kiku" lang="ja-Latn" file={pronKiku} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda9_1, ""],
            [imgHanafuda9_2, ""],
            [imgHanafuda9_3, ""],
            [imgHanafuda9_4, ""],
          ]}>
          The cards for September show chrysanthemums. There is one species card, one blue/purple scroll card, and two junk cards.
        </ArticleImage>
        <Footnote standalone>
          <p>A story invented by <Noun lang="ja-Latn">Tendai</Noun> monks in the 14th century <Noun lang="ja-Latn">Taiheiki</Noun> (<span lang="ja">太平記</span> ‘Chronicle of Great Peace’) provides retroactive justification for the festival:<Cite r={ChigoJapanese} page={[[958, 959]]} /> King <Noun lang="zh-Latn">Mu</Noun>’s (<span lang="zh">周穆王</span>) favourite, a young boy, is banished to a remote mountain. Following the king’s advice, he recites passages of the Buddhist Lotus Sūtra, and writes them upon on chrysanthemum flowers. Dew collecting on the flowers drips into the river from which he drinks. Eight hundred years later he has not aged a day, and he returns to court as the legendary <Noun lang="zh-Latn">Peng Zu</Noun> (<span lang="zh">彭祖</span>) during the reign of King <Noun lang="zh-Latn">Wen</Noun> (<span lang="zh">周文王</span>, <abbr title="reigned">r.</abbr> 1112–1050 <abbr className="initialism">BCE</abbr>), who subsequently institutes the festival.</p>
        </Footnote>
        <p>The species card for September depicts a sake cup, which is an implement of <Pronounce pronouncer="skent" word="chōyō" lang="ja-Latn" file={pronChoyo} /> <span lang="ja">重陽</span>, the chrysanthemum festival, which is held on the 9th day of the 9th month. Because chrysanthemum blooms for a long time, it had become a symbol of long life in China, and the festival was introduced into Japan by the court of Emperor <Noun lang="ja-Latn">Kanmu</Noun> (<span lang="ja">桓武天皇</span>, 735–806).<Cite r={FourSeasons} page={1214} pageType="l." /></p>
        <p>During the festival, chrysanthemum petals are added to sake and consumed. The sake cup pictured on the card has the character <span lang="ja">壽/寿</span> (<Pronounce pronouncer="strawberrybrown" word="kotobuki" lang="ja-Latn" file={pronKotobuki} />), meaning ‘long life’, written in a cursive script.</p>
        <p>A poem by <Noun lang="ja-Latn">Bashō</Noun>, Japan’s most famed composer of <span lang="ja-Latn">hokku</span>, commemorates the evening of the 9th day of the 9th month, in 1691. <Noun lang="ja-Latn">Bashō</Noun> was staying at the temple <Noun lang="ja-Latn">Gichu-ji</Noun> (<span lang="ja">義仲寺</span>) in a hermitage known as ‘nameless hut’ (<span lang="ja">無名庵</span> <Noun lang="ja-Latn">Mumyō-an</Noun>). His disciple <Noun lang="ja-Latn">Kawai Otokuni</Noun> (<span lang="ja">河合乙州</span>) came to visit him:</p>
        <blockquote>
          <p><span lang="ja">草の戸や日暮てくれし菊の酒</span></p>
        </blockquote>
        <blockquote>
          <p>
            this grass door—<br />dusk arrives with a present<br />of chrysanthemum sake<Cite r={GreveSake} />
          </p>
        </blockquote>
      </Section>
      <Section title={<><span lang="ja">10月</span> — autumn leaves/maple (<span lang="ja">紅葉</span> <span lang="ja-Latn">momiji</span>/<Pronounce pronouncer="El55" word="kōyō" lang="ja-Latn" file={pronKoyo} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda10_1, ""],
            [imgHanafuda10_2, ""],
            [imgHanafuda10_3, ""],
            [imgHanafuda10_4, ""],
          ]}>
          The cards for October show fallen maple leaves. There is one species card, one blue/purple scroll card, and two junk cards.
        </ArticleImage>
        <ArticleImage
          position="aside-wide"
          src={imgTatsutagawa}
          alt="Maple trees with their leaves showing a bright red-orange colour."
          source={{
            license: 'cc-by-sa',
            licenseVersion: '3.0',
            originalUrl: 'https://commons.wikimedia.org/wiki/File:Nara_Prefectural_Tatsuta_Park01s3s4200.jpg',
            author: '663highland',
            copyrightYear: 2010
          }}
        >
          Maple trees along the banks of the <Noun lang="ja-Latn">Tatsuta-gawa</Noun> in autumn.
        </ArticleImage>
        <p>While the leaves on the species card are attached to a tree, the leaves on the other cards appear to be floating on water. This could be a reference to the <Noun lang="ja-Latn">Tatsuta</Noun> river (<span lang="ja">竜田川</span>), which was as famous for autumn foliage as <Noun lang="ja-Latn">Yoshino</Noun> was for cherry blossoms in the spring.<Cite r={FourSeasons} page={1756} pageType="l." /></p>
        <ArticleImage
          position="small"
          src={imgPoem2}
          alt="The junk cards of the Echigo-bana pattern which bear the poem.">
          <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
        </ArticleImage>
        <p>The poem on the <span lang="ja-Latn">Echigo-bana</span> junk cards is Poem 437 from the ‘Autumn 2’ section of the <Noun lang="ja-Latn">Shin Kokinshū</Noun>. It was composed by <Noun lang="ja-Latn">Fujiwara no Ietaka</Noun>, upon the finalization of the poetry collection:<Cite r={MakingShinkokinshu} page={318} /></p>
        <div className="multi">
          <p lang="ja" className="vertical-rl">
            したもみぢ<br />かつちる山の<br />ゆふしぐれ<br />ぬれてやひとり<br />鹿のなくらん
            </p>
          <p>
            From the lower branches<br />Maple leaves scatter<br />In Autumn showers on the mountain.<br />Is it because he is wet<br />That the lonely stag is belling?
            </p>
        </div>
      </Section>
      <Section title={<><span lang="ja">11月</span> — willow (<span lang="ja">柳</span> <Pronounce pronouncer="akitomo" word="yanagi" lang="ja-Latn" file={pronYanagi} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda11_1, ""],
            [imgHanafuda11_2, ""],
            [imgHanafuda11_3, ""],
            [imgHanafuda11_4, ""],
          ]}>
          The cards for November show willow trees. There is one bright card, one species card, one red scroll card, and one junk card.
        </ArticleImage>
        <p>The month of November is also often referred to as ‘rain’ (<span lang="ja">雨</span> <Pronounce pronouncer="strawberrybrown" word="ame" lang="ja-Latn" file={pronAme} />) or ‘drizzle’ (<span lang="ja">時雨</span> <Pronounce pronouncer="akitomo" word="shigure"
          lang="ja-Latn" file={pronShigure} />). These cards have a strange relationship to the others — in many games they have special powers, or they are valued lower than the cards of other months. For example, the bright of November will often score less than the other four brights, and in some games the “lightning card” has special powers, such as being able to match any other card.</p>
        <Footnote standalone>
          <p>It has been suggested (e.g. by author <Noun lang="ja-Latn">Murai Shōzō</Noun> <span lang="ja">村井省三</span> and by <Noun lang="ja-Latn">Ōishi Tengudō</Noun><Cite r={OishiSadakuro} />) that the running “Umbrella Man” has its origins in the character of <Noun lang="ja-Latn">Sadakurō</Noun> from the <span lang="ja-Latn">bunraku</span> play <cite>The Treasury of Loyal Retainers</cite> (<cite lang="ja">仮名手本忠臣蔵</cite> <cite lang="ja-Latn">Kanadehon Chūshingura</cite>), written in 1748. However, as <Noun lang="ja-Latn">Ebashi</Noun> points out,<Cite r={EbashiSadakuro} /> the <span lang="ja-Latn">hana-awase</span> deck pictured at the top of this article contains an “Umbrella Man”. This precludes the <Noun lang="ja-Latn">Sadakurō</Noun> origin story, as the play was written some 40 years after that deck was produced.</p>
          <ArticleImage 
            noborder
            position="small"
            src={imgRunningMan}
            alt="A very old card picturing a man with an umbrella running from lightning."
            source={{
              organization: { 
                orgName: "Japan Playing Card Museum",
                orgAbbr: "JPCM",
              },
              originalUrl: "https://japanplayingcardmuseum.com/image/hanafuda-hanaawase04.pdf",
              license: "with-permission"
            }} />
        </Footnote>
        <p>The man pictured on the bright card is the poet <Noun lang="ja-Latn">Ono no Michikaze</Noun> (<span lang="ja">小野道風</span>), who is considered to be one of the founders of Japanese calligraphy. The jumping frog recalls an episode in his life: he had failed seven times to achieve a promotion, and was considering abandoning his attempts. One day, walking beside a stream, he saw a frog attempting to jump onto a willow branch. Seven times it jumped, and seven times it failed. On the eighth attempt, the frog reached the branch successfully. <Noun lang="ja-Latn">Michikaze</Noun> was thus inspired to persevere with his attempts.<Cite r={AnimalInFarEasternArt} page={[[86, 87]]} /></p>
        <p>On older decks a different “rain man” is pictured. On these cards the man is running in the rain with the umbrella closed around his head. This feature is preserved in the <Noun lang="ja-Latn">Echigo-bana</Noun> pattern.</p>
        <p>The “lightning card” is the red-coloured junk card, which is usually called the ogre card in Japanese (<span lang="ja">鬼札</span> <Pronounce pronouncer="strawberrybrown" word="onifuda" lang="ja-Latn" file={pronOnifuda} />). The drums, which are visible in some patterns, are an attribute of the thunder god <Pronounce noun lang="ja-Latn" word="Raijin" pronouncer="kaori410f" file={pronRaijin} /> (<span lang="ja">雷神</span>).</p>
        <ArticleImage
          position="aside"
          alt="A grinning ogre in a cloud lowers an anchor towards a Taiko drum floating in the ocean."
          source={{license: "cc0"}}
          src={imgOtsueRaijin}>
          In this <Noun lang="ja-Latn">Ōtsu-e</Noun>, <Noun lang="ja-Latn">Raijin</Noun> attempts to recover his drum.
        </ArticleImage>
        <p>In some older decks, the lightning card depicts a scene derived from <a href="https://en.wikipedia.org/wiki/Otsu-e"><Noun lang="ja-Latn">Ōtsu-e</Noun> prints</a> (<span lang="ja">大津絵</span>), where <Noun lang="ja-Latn">Raijin</Noun> is attempting to ‘fish’ back a drum that he has dropped.</p>
        <div className="multi">
          <ArticleImage
            position="small"
            src={imgRaijinCard1}
            alt="">
            A dramatic fishing scene, from <Cite r={DevilsPictureBooks} inline/>.
          </ArticleImage>
          <ArticleImage
            position="small"
            src={imgRaijinCardSun}
            alt="Hands extending from a cloud dangle a hooked rope towards a floating drum.">
            A key-block print of the <Noun lang="ja-Latn">Raijin</Noun> scene, from <Cite r={MuraiSun} inline/>.
          </ArticleImage>
          <ArticleImage
            position="small"
            src={imgRaijinCard2}
            alt=""
            source={{
              organization: { 
                orgName: "Japan Playing Card Museum",
                orgAbbr: "JPCM",
              },
              originalUrl: "https://japanplayingcardmuseum.com/image/kaikinki-hanafuda11.pdf",
              license: "with-permission"
            }}>
            A card with hook visible at bottom, from a deck by <Noun lang="ja-Latn">Hakamada</Noun> (<span lang="ja">袴田</span>).
          </ArticleImage>
        </div>
      </Section>
      <Section title={<><span lang="ja">12月</span> — paulownia (<span lang="ja">桐</span> <Pronounce pronouncer="kaoring" word="kiri" lang="ja-Latn" file={pronKiri} />)</>}>
        <ArticleImage
          src={[
            [imgHanafuda12_1, ""],
            [imgHanafuda12_2, ""],
            [imgHanafuda12_3, ""],
            [imgHanafuda12_4, ""],
          ]}>
          The cards for December show paulownia flowers. There is one bright card and three junk cards.
        </ArticleImage>
        <ArticleImage
          position="left"
          src={imgSC152627}
          alt="A phoenix bird swoops down onto a paulownia tree."
          source={{
            originalUrl: "https://www.mfa.org/collections/object/phoenix-and-paulownia-tree-235857",
            license: 'cc0',
            organization: { orgName: "Boston Museum of Fine Arts" },
          }}>
          <cite>Phoenix and Paulownia Tree</cite><br /><cite lang="ja">桐に鳳凰</cite><br />by <Noun lang="ja-Latn">Isoda Koryūsai</Noun> (<span lang="ja">礒田 湖龍斎</span>, 1735–1790)
        </ArticleImage>
        <p>The phoenix (<span lang="ja">鳳凰</span> <Pronounce pronouncer="akitomo" word="hōō" lang="ja-Latn" file={pronHoo} />, or <span lang="zh-Latn">fèng&shy;huáng</span> in Mandarin Chinese) featured on the bright card is from Japanese mythology, and is particularly associated with the empress of Japan. According to legend the phoenix will only land on a paulownia tree. What appear to be ‘spikes’ on the card are really its long tail feathers.</p>
        <p>In modern times, the paulownia tree is associated with the government, and in particular prime minister’s office. In (TODO), the manufacturer <Noun lang="ja-Latn">Ōishi Tengudo</Noun> produced a special deck for the TODO Prime Minister. In addition, <Noun lang="ja-Latn">Ōishi Tengudo</Noun> boxes many of their decks using Paulownia wood.</p>
        <p>One of the junk cards is usually coloured, often yellow, but sometimes with red as well. In some games it becomes a species card, or even a scroll card. Usually (in Japanese decks) the manufacturer’s mark is on the coloured junk card, much like the ace of spades is used in European decks. In Korean decks the mark can also be on the full moon card, or on the jokers.</p>
      </Section>
    </Section>
  </>);
}

export default Hanafuda;