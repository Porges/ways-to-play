import * as React from 'react';

import { Description, Noun, ArticleImage, Footnote, Section, Cite, Pronounce, SourceInfo } from 'ui';

import imgSC219954 from './SC219954.jpg';
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
import imgEkbRainman from './ekb_rainman.jpg';
import imgHinaMatsuri from './HinaMatsuri-Masanobu.jpg';
import imgHinaMatsuriDetail from './HinaMatsuri-Masanobu-Detail.jpg';
import imgPineUrasu from './pine_urasu.jpg';
import imgCherryBugaku1 from './cherry_bugaku1.jpg';
import imgCherryBugaku2 from './cherry_bugaku2.jpg';
import imgCherryBugaku3 from './cherry_bugaku3.jpg';
import imgKnotGround from './knot_ground.jpg';
import imgKnotOut from './knot_out.jpg';
import imgWisteriaBloom from './wisteria_bloom.jpg';
import imgHagiBloom from './hagi_bloom.jpg';
import imgMiscanthus from './miscanthus.jpg';
import imgHagiTemple from './hagi_temple.jpg';
import imgHagiBoar from './SC138896.jpg';
import imgImperialSealOfJapan from './Imperial_Seal_of_Japan.svg';
import imgBushWarbler from './bush_warbler.jpg';
import imgMushibana from './nintendo_mushibana.jpg';
import imgDairenbana from './dairenbana.jpg';
import imgSuhama from './suhama.jpg';
import imgSuhamaLeft from './suhama-left.jpg';
import imgPaulownia from './shutterstock_666401218.jpg';
import imgToyotomiCrest from './shutterstock_1546151357.jpg';
import imgTatsutagawaPrint from './587094001.jpg';
import imgJapaneseCrane from './shutterstock_1043519431.jpg';
import imgKamigatayaSugoroku from './Kamigataya-Sugoroku.jpg';
import imgPlayLeft from './Play-Left.jpg';
import imgPlayRight from './Play-Right.jpg';
import imgNakagataya from './Nakagataya.jpg';

import imgHanafuda1_1 from '../Hanafuda_1-1.svg';
import imgHanafuda1_2 from '../Hanafuda_1-2.svg';
import imgHanafuda1_3 from '../Hanafuda_1-3.svg';
import imgHanafuda1_4 from '../Hanafuda_1-4.svg';
import imgHanafuda2_1 from '../Hanafuda_2-1.svg';
import imgHanafuda2_2 from '../Hanafuda_2-2.svg';
import imgHanafuda2_3 from '../Hanafuda_2-3.svg';
import imgHanafuda2_4 from '../Hanafuda_2-4.svg';
import imgHanafuda3_1 from '../Hanafuda_3-1.svg';
import imgHanafuda3_2 from '../Hanafuda_3-2.svg';
import imgHanafuda3_3 from '../Hanafuda_3-3.svg';
import imgHanafuda3_4 from '../Hanafuda_3-4.svg';
import imgHanafuda4_1 from '../Hanafuda_4-1.svg';
import imgHanafuda4_2 from '../Hanafuda_4-2.svg';
import imgHanafuda4_3 from '../Hanafuda_4-3.svg';
import imgHanafuda4_4 from '../Hanafuda_4-4.svg';
import imgHanafuda5_1 from '../Hanafuda_5-1.svg';
import imgHanafuda5_2 from '../Hanafuda_5-2.svg';
import imgHanafuda5_3 from '../Hanafuda_5-3.svg';
import imgHanafuda5_4 from '../Hanafuda_5-4.svg';
import imgHanafuda6_1 from '../Hanafuda_6-1.svg';
import imgHanafuda6_2 from '../Hanafuda_6-2.svg';
import imgHanafuda6_3 from '../Hanafuda_6-3.svg';
import imgHanafuda6_4 from '../Hanafuda_6-4.svg';
import imgHanafuda7_1 from '../Hanafuda_7-1.svg';
import imgHanafuda7_2 from '../Hanafuda_7-2.svg';
import imgHanafuda7_3 from '../Hanafuda_7-3.svg';
import imgHanafuda7_4 from '../Hanafuda_7-4.svg';
import imgHanafuda8_1 from '../Hanafuda_8-1.svg';
import imgHanafuda8_2 from '../Hanafuda_8-2.svg';
import imgHanafuda8_3 from '../Hanafuda_8-3.svg';
import imgHanafuda8_4 from '../Hanafuda_8-4.svg';
import imgHanafuda9_1 from '../Hanafuda_9-1.svg';
import imgHanafuda9_2 from '../Hanafuda_9-2.svg';
import imgHanafuda9_3 from '../Hanafuda_9-3.svg';
import imgHanafuda9_4 from '../Hanafuda_9-4.svg';
import imgHanafuda10_1 from '../Hanafuda_10-1.svg';
import imgHanafuda10_2 from '../Hanafuda_10-2.svg';
import imgHanafuda10_3 from '../Hanafuda_10-3.svg';
import imgHanafuda10_4 from '../Hanafuda_10-4.svg';
import imgHanafuda11_1 from '../Hanafuda_11-1.svg';
import imgHanafuda11_2 from '../Hanafuda_11-2.svg';
import imgHanafuda11_3 from '../Hanafuda_11-3.svg';
import imgHanafuda11_4 from '../Hanafuda_11-4.svg';
import imgHanafuda12_1 from '../Hanafuda_12-1.svg';
import imgHanafuda12_2 from '../Hanafuda_12-2.svg';
import imgHanafuda12_3 from '../Hanafuda_12-3.svg';
import imgHanafuda12_4 from '../Hanafuda_12-4.svg';

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
import imgAwaTanka1 from './awa_tanka_1.jpg';
import imgEkbJunk12 from './ekb_junk_12.jpg';
import imgAwaJunk12 from './awa_junk_12.jpg';
import imgAwaJunk8 from './awa_junk_8.jpg';

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
import pron人形町通り from './pronunciation_ja_人形町通り.mp3';
import pronKamigataya from './pronunciation_ja_上方屋.mp3';
import pronMonoawase from './pronunciation_ja_物合わせ.mp3';
import pronEchigokobana from './pronunciation_ja_越後小花.mp3';
import pronAwabana from './pronunciation_ja_阿波花.mp3';
import pronKintokibana from './pronunciation_ja_金時花.mp3';

import { Link } from 'react-router-dom';

const louieSource: SourceInfo = {
  author: {
    family: "Mantia",
    given: "Louie",
  },
  copyrightYear: 2021,
  license: "cc-by-sa",
  licenseVersion: "4.0",
};

const Hanafuda: React.FC = () => {
  return (<>
    <Section title="Origins">
      <Description><Noun lang="ja-Latn">Hanafuda</Noun> cards first appeared in Japan in the middle of the <Pronounce lang="ja-Latn" word="Edo" noun pronouncer="Nipponese" file={pronEdo} /> period (<span lang="ja">江戸</span>, 1603–1868), but the distant origins of <Noun lang="ja-Latn">Hanafuda</Noun> cards lie in much older “object-comparing games” (<span lang="ja">物合わせ</span> <Pronounce lang="ja-Latn" word="mono-awase" file={pronMonoawase} pronouncer="poyotan" />) that had been played since the <Pronounce lang="ja-Latn" word="Heian" noun pronouncer="skent" file={pronHeian} /> period (<span lang="ja">平安</span>, 794–1185).</Description>
      <p>In their original form, <span lang="ja-Latn">mono-awase</span> were courtly competitions in which various objects were compared as to their qualities or unique attributes:<Footnote>Although the same terminology of <span lang="ja-Latn">awase</span> was also used for sports such as cock-fighting.<Cite r="WorldOfTheShiningPrince" page={165} /></Footnote> objects that were judged in these competitions included artifacts such as fans or paintings;<Cite r="BrocadeByNight" page={242} /> flowers and plants (chrysanthemums, iris roots,<Cite r="WorldOfTheShiningPrince" page={163} /> wild pinks); animals (insects, song&shy;birds<Cite r="WorldOfTheShiningPrince" page={163} />); incense; tea<Cite r="AnIntroductionToJapaneseTeaRitual" page={26} />; or — what we are most interested in here — shells.</p>
      <p>The competitions were generally organized between two teams, named Left (who began the game, and usually had higher-ranking members)<Footnote>In Japan, the left-hand side was traditionally considered the dominant or “masculine” side (see the <a href="#kai-awase-to-kai-oi">naming of shells below</a>), the opposite of European tradition. In the <Noun lang="ja-Latn">Heian</Noun> period, the Minister of the Left (<span lang="ja">左大臣</span>) outranked the Minister of the Right (<span lang="ja">右大臣</span>).</Footnote> and Right, and consisted of a series of rounds in which each team would present one item at a time, often with accompanying poem. Another format involved the presentation of a selection of objects on a miniature artificial garden or island called a <span lang="ja-Latn">suhama</span> (<span lang="ja">洲浜</span>), which was constructured especially for the competition and which could be made out of expensive wood or precious metals.</p>
      <ArticleImage
        src={[[imgSuhamaLeft, ""], [imgSuhama, ""]]}
        size="wide"
        source={{
          license: "cc0",
          organization: { orgName: "Waseda University" },
          originalUrl: "https://www.wul.waseda.ac.jp/kotenseki/html/ri05/ri05_06661/index.html"
        }}>
        A depiction of the full-moon competition including two <span lang="ja-Latn">suhama</span>, from an edition of unknown date.
      </ArticleImage>
      <p>In 966, Emperor Murakami held a <span lang="ja-Latn">mono-awase</span> competition on the 15th of the 8th month (the most important full moon of the year). The construction of each team’s <span lang="ja-Latn">suhama</span> is recorded in the <a href="https://en.wikipedia.org/wiki/Eiga_Monogatari"><cite lang="ja-Latn">Eiga Monogatari</cite></a>:</p>
      <blockquote>
        <p>Both sides worked furiously, determined not to be outdone. The contestants from the Office of Painting submitted a painted landscape tray depicting flowering plants of heavenly beauty, a garden stream, and massive rocks. Various kinds of insects were lodged in a rustic fence made of silver foil. The artists had also painted a view of the <Noun lang="ja-Latn">Ōi</Noun> River, showing figures strolling nearby and cormorant boats with basket fires. Near the insects there was a poem.</p>
        <p>The Office of Palace Works presented an interesting tray, carved with great ingenuity to resemble a high tide, which they had planted with artifical flowers and carved bamboo and pines. Their poem was attached to a spray of fresh <span lang="ja-Latn"><a href="https://en.wikipedia.org/wiki/Patrinia">ominaeshi</a></span>.<Cite r="JapaneseAristocraticLife" page={92} /></p>
      </blockquote>
      <p>These elaborate competitions could run all day; another famous competition held by Emperor Murakami six years earlier (on the 30th day of the 3rd month of 960), ran from 4 p.m. until dawn, when the drunken winning team exited while singing and dancing. A courtier’s diary recorded the elaborate preparations made at the palace:<Cite r="MuseInCompetition" page={[[214, 217]]} /></p>
      <blockquote>
        <p>[…] Special care was taken on this occasion as many eminent people of refined taste would be attending the event, and so new plants and flowers were carefully chosen and added to the garden. The Chamberlain Minor Captain <Noun lang="ja-Latn">Sukenobu</Noun> was in charge of the garden, and he had oak logs arranged like a fence and entwined with ivy so that it looked like a cedar forest. He also placed stepping stones here and there so that one could walk along on them. The garden gave the impression of a pastoral landscape and looked more delightful than usual.</p>
        <p>The blinds were replaced by new ones. The Emperor’s seat was arranged in the anteroom at the southern end of the gallery. The atmosphere was so pleasant that it defied description. […]</p>
        <p>[…] The poems [of the Left] were engraved on the silver leaves of golden-yellow mountain roses placed in the <span lang="ja-Latn">suhama</span>—truly a beautiful work of art of exquisite workmanship. The tables were made of rosewood and other wood. The design of the <span lang="ja-Latn">suhama</span> was quite interesting and charming. The cover was of varied shades of dark red and wisteria were embroidered on it; the mat was of violet brocade. Then two court girls […] brought in another <span lang="ja-Latn">suhama</span> for scoring, the design of which was wisteria tendrils made of gold and silver. A twig was to be removed each time a point was scored.</p>
      </blockquote>
      <p>As mentioned in the last paragraph, a special <span lang="ja-Latn">suhama</span> could be used for scoring. During a contest in 1035 one side planted miniature pine trees to track their score; at another in 1078, “the Left inserted arrows with silver shafts and glass feathers into a target to mark their wins, and the Right placed tiny replicas of musical instruments in a silver box inlaid with crystal.”<Cite r="BrocadeByNight" page={243} /><Footnote>Elaborate scoring tracks were <a href="https://images.dnpartcom.jp/ia/workDetail?id=TAM000634">also used for incense competitions</a>.</Footnote></p>
      <Section title={<>An aside about <span lang="ja-Latn">Uta-awase</span></>}>
        <p>Out of all the types of competition, the most esteemed was to eventually be the poetry match (<span lang="ja">歌合わせ</span> <span lang="ja-Latn">uta-awase</span>). At first it was a competition like the others, where the poem was treated as an <em>object</em> to be chosen and presented by the competitor, the poet might not even be present, and more attention was paid to the accompanying costumes and music than the quality of the poetry.<Cite r="BrocadeByNight" page={242} /> </p>
        <p>The poetry competition was highly ritualized, where the result of a contest was not only about who could compose the better poem; on average, authors of a higher rank were more likely to win. In some cases, the winner of a round was decided by convention, and furthermore, some poems could not lose. The first poem presented by the Left team, a poem complimenting the host, or a poem by the Emperor himself would <em>at worst</em> result in a draw.<Cite r="UtaawaseJudgments" page={102} /> At one competition <a href="https://en.wikipedia.org/wiki/Emperor_Uda">Emperor <Noun lang="ja-Latn">Uda</Noun></a> (<span lang="ja">宇多天皇</span>) awarded his own poem a draw, stating “how can an imperial poem lose?”<Cite r="BrocadeByNight" page={244} /></p>
        <p>Later, during what <Noun lang="ja-Latn">Ito Setsuko</Noun> terms the “silver age” of <span lang="ja-Latn">uta-awase</span>,<Cite r="MuseInCompetition" page={207} /> the work of the poet became more important, and poetry competitions were held without the extravagant <span lang="ja-Latn">suhama</span>. The competitions became more austere and aware of the world outside the courtly realm; in 1083 a planned grand competition was cancelled as it was thought to be inappropriate given the unrest at the time.<Footnote>i.e., the <a href="https://en.wikipedia.org/wiki/Genpei_War"><Noun lang="ja-Latn">Genpei</Noun> war.</a></Footnote> Smaller and more intimate competitions were held with poetry as their focus. This doesn’t mean that the proceedings were any less elaborate; the largest competition of this type involved nine poets competing over 1500 rounds.</p>
        <p></p>
      </Section>
      <ArticleImage
        mainImage
        src={imgKaiAwase}
        size="wide"
        alt="Ladies in elaborate traditional Japanese dress sitting in a circle around shells that are arranged face-down on the floor."
        source={{ license: 'cc0', organization: { orgName: "Metropolitan Museum of Art" }, originalUrl: 'https://www.metmuseum.org/art/collection/search/37303' }}>
        Ladies playing a game of <span lang="ja-Latn">kai-ōi</span>.<br />From <cite>Gifts from the Ebb Tide</cite> <cite lang="ja">潮干のつと</cite> (1790), by <Noun lang="ja-Latn">Kitagawa Utamaro</Noun> (<span lang="ja">喜多川歌麿</span>).
      </ArticleImage>
      <Section title={<><span lang="ja-Latn">Kai-awase</span> to <span lang="ja-Latn">Kai-ōi</span></>}>
        <p>The earliest recorded <Pronounce lang="ja-Latn" word="kai-awase" pronouncer="skent" file={pronKaiAwase} /> (<span lang="ja">貝合せ</span>, ‘shell competition’) contest dates from 1040, and was held at <a href="https://en.wikipedia.org/wiki/Ise_Grand_Shrine">the Ise shrine</a> by <a href="https://en.wikipedia.org/wiki/Emperor_Go-Suzaku">Emperor Go-Suzaku</a>’s first daughter, Princess <Noun lang="ja-Latn">Nagako</Noun>. This was a competition very much in the spirit of the other <span lang="ja-Latn">mono-awase</span> games, and consisted of twenty rounds, each shell being presented with an accompanying poem.<Cite r="JapaneseGamesOfMemory" page={269} /></p>
        <p><span lang="ja-Latn">Kai-awase</span> developed from this early comparing-competition form into a completely different style of game called <span lang="ja-Latn">kai-ōi</span> (<span lang="ja">貝覆い</span>, ‘shell covering’) that was based upon collecting matching pairs of shells. <span lang="ja-Latn">Kai-awase</span> itself died out and there is no record of any competitions taking place after the <Noun lang="ja-Latn">Heian</Noun> period.<Cite r="JapaneseGamesOfMemory" page={270} /> However, by the <Noun lang="ja-Latn">Edo</Noun> period, the two terms would be conflated, with <span lang="ja-Latn">kai-awase</span> being used for the matching game as well,<Cite r="KaiOi" /><Cite r="JapaneseGamesOfMemory" page={270} /> and today <span lang="ja-Latn">kai-awase</span> is the term most commonly used for replica game sets.</p>
        <ArticleImage
          size="small"
          position="left"
          src={[
            [imgKnotGround, "An elaborate knot with a single main bow."],
            [imgKnotOut, "An elaborate knot with two main bows."],
          ]}
          source={{
            license: "cc0",
            organization: { orgName: "Waseda University" },
            originalUrl: "https://www.wul.waseda.ac.jp/kotenseki/html/ni15/ni15_00715/index.html"
          }}>
          These diagrams indicate knots that could be tied on <span lang="ja-Latn">kai-oke</span> to distinguish the “ground” shells (left) from the “coming out” shells (right). From <cite>Brocade of Shellfish</cite> <cite lang="ja">貝尽浦の錦</cite> (1751) by <Noun lang="ja-Latn">Ōeda Ryūhō</Noun> (<span lang="ja">大枝流芳</span>).
        </ArticleImage>
        <ArticleImage
          alt="A grandmother, a mother, two young women, and a child sitting in a circle around shells on a tatami mat."
          position="aside"
          size="wide"
          src={imgKaiAwaseGame}
          source={{ license: 'cc0', organization: { orgName: "跡見学園女子大学", orgLang: "ja" }, originalUrl: 'https://trc-adeac.trc.co.jp/Html/ImageView/1171055100/1171055100200010/0010458776-1/' }}>
          Four generations of women playing <span lang="ja-Latn" >kai-ōi</span>.<br />From <cite lang="ja">女有職莩文庫</cite> (1866), by <Noun lang="ja-Latn">Okada Tamayama</Noun> (<span lang="ja">岡田玉山</span>).
        </ArticleImage>
        <p>Unlike <span lang="ja-Latn">kai-awase</span>, the new game was exclusively played with clam (<span lang="ja">蛤</span>) shells, and it offered definitive terms for deciding the winner. In one method of play, the left-hand sides of the shells — also termed the “male” or ‘ground’ (<span lang="ja">地</span>) shells — were arranged face-down on the ground. The right-hand sides — the “female” or ‘coming out’ (<span lang="ja">出</span>) shells — were then drawn from their <span lang="ja-Latn">kai-oke</span> (<span lang="ja">貝桶</span>, ‘shell bucket’) one-by-one and the players would attempt to match them with those on the floor. Whoever was the first to point out a (successful) match would capture both halves of the shell, and the winner was the player who collected the most shells.</p>
        <p>Early instructional books for women from the <Noun lang="ja-Latn">Muromachi</Noun> period (1392–1573) include rules that state that the game is played with twelve shells,<Footnote>A video showing how this game would have been played can be seen <a href="https://www.youtube.com/watch?v=fe4_bz-okxM">here</a>.</Footnote> which should be arranged in a circle on the ground, and that the drawn shell should be placed in the centre, with the pointed end (“head”) directed towards the highest-ranking person in the room.<Cite r="JapaneseGamesOfMemory" page={270} /> Evidently the game could get physical, as those same books warn that “to quarrel and remove shells by force is something that only men and courtesans do.”</p>
        <p>The monk <a href="https://en.wikipedia.org/wiki/Yoshida_Kenk%C5%8D" lang="ja-Latn" className="proper-noun">Kenkō</a> (<span lang="ja">兼好</span>, <abbr title="died">d.</abbr> <abbr title="circa">c.</abbr> 1352) also offered guidance in his book <cite>Essays in Idleness</cite>, published around 1330:<Cite r="EssaysInIdleness" page={130} />
          <Footnote><Noun lang="ja-Latn">Kenkō</Noun> goes on to apply this strategic advice as part of an extended metaphor for good governance and living well: “In all things, do not seek for distant advantage. Simply maintain correctly what is close to hand. In the words of the Chinese sage <a href="https://en.wikipedia.org/wiki/Zhao_Pu">Duke Xiao of Qing</a>, ‘Do what is good, and ask no questions of the future.’ Surely a ruler should also govern in this way.”</Footnote></p>
        <blockquote>If someone engaged in a game of shell matching neglects the shells in front of him while he looks around to check what others might be hiding in their sleeves or by their knees, his own shells will be snatched from in front of him. Those who are good at the game seem not to go to the length of taking shells from distant players but limit themselves to those close at hand, yet they manage to acquire a large number.</blockquote>
        <p>While later depictions (such as the images above) usually represent the game as only played by women, diary entries and paintings from the time show that the game was originally played by everyone, often in mixed teams. Losing teams would also request re-matches to try to beat the victorious team.<Cite r="JapaneseGamesOfMemory" page={257} /></p>
        <p>Records of the imperial household indicate that the shell-matching game was played formally nearly five hundred times over the period 1481–1589, sometimes as many as nine times a month.<Cite r="JapaneseGamesOfMemory" page={257} /></p>
        <ArticleImage
          size="extra-wide"
          src={imgSC219954}
          alt="A group of four people playing a game of kai-oi, one of them a man"
          source={{
            organization: { orgName: 'Boston Museum of Fine Arts' },
            license: 'cc0',
            originalUrl: 'https://collections.mfa.org/objects/27189'
          }}>
          This early depiction from the 16th-century scroll <cite>Tale of Brief Slumbers</cite> <cite lang="ja">うたたね草紙</cite> shows a mixed group playing <span lang="ja-Latn">kai-ōi</span> (at left).
        </ArticleImage>
        <p>When played with many shells, the game must have been difficult, since the clues that point to a match are solely the subtle shades and contours of the shell, and the only way to test if shells truly match is to pick them up and attempt to join them together. Considering that traditional sets could contain up to 360 shells,<Footnote>Modern replicas usually only have around 54.</Footnote> this was a game for a class of person who had a lot of leisure time on their hands.</p>
        <p>Later the game set itself turned into a luxury item: the interior of the shells was at first decorated with matching fabrics, and then elaborately painted or even gilded. After the <Noun lang="ja-Latn">Kamakura</Noun> period (1333), it became common to illustrate the shells with matching scenes from the <a href="https://en.wikipedia.org/wiki/The_Tale_of_Genji">Tale of Genji</a> (<span lang="ja">源氏物語</span> <Pronounce word="Genji Monogatari" file={pronGenjiMonogatari} pronouncer="straycat88" lang="ja-Latn" />) — the game is also played in Chapter 45 of the novel itself. Other designs included shells with half of a poem in each, so that the matching pair could be read as a complete poem; these types of the game would eventually evolve into the <span lang="ja-Latn">uta-garuta</span> (<span lang="ja">歌骨牌</span>) poetry cards.</p>
        <ArticleImage
          src={
            [[imgKai1, 'Two large octagonal wooden containers painted with black lacquer and gold ornamental designs of wisteria.']
              , [imgKai2, 'Eight shells whose interiors have been painted with garden scenes and ornamented with gold.']
            ]}
          source={{ license: 'cc0', organization: { orgName: "Portland Art Museum" }, originalUrl: 'http://portlandartmuseum.us/mwebcgi/mweb.exe?request=record;id=55705;type=101' }}>
          An 18th-century <span lang="ja-Latn">kai-ōi</span> set. The paired boxes are the <span lang="ja-Latn">kai-oke</span>, and half of each shell pair was stored in each bucket. The shells are decorated with painted scenes.
        </ArticleImage>
        <p>A personal <span lang="ja-Latn">kai-ōi</span> set became a standard  part of a noble bride’s wedding gifts, as the joining of the matching shells was symbolic of the join&shy;ing of husband and wife in marriage. However, the elaborate sets with their hand-painted and gilded interiors must have been ex&shy;pen&shy;sive to create and only owned by the richest of families. Indeed, at times restrictions were put in place so that <em>only</em> noble families of the upper ranks were permitted to include the game in their bridal trousseaux.<Cite r="JapaneseGamesOfMemory" page={265} /> When time came to hand over the wedding gifts, it was customary for the <span lang="ja-Latn">kai-oke</span> to be the first item presented.<Cite r="JapaneseGamesOfMemory" page={265} /></p>
        <p> In this role, miniature <span lang="ja-Latn">kai-oke</span> can be found in <a href="https://en.wikipedia.org/wiki/Hinamatsuri"><span lang="ja-Latn">hina-matsuri</span></a> col&shy;lections, and these are still produced for this purpose today.</p>
        <ArticleImage
          position="aside"
          size="small"
          src={imgHinaMatsuriDetail}
          alt="">
          Detail of the miniature <span lang="ja-Latn">kai-oke</span> in the print.
        </ArticleImage>
        <ArticleImage
          src={imgHinaMatsuri}
          alt=""
          source={{ license: "cc0" }}>
          A miniature <span lang="ja-Latn">kai-oke</span> can be seen in this depiction of a <span lang="ja-Latn">hina-matsuri</span> set.<br />By <a href="https://en.wikipedia.org/wiki/Okumura_Masanobu"><Noun lang="ja-Latn">Okumura Masanobu</Noun></a> (<span lang="ja">奥村政信</span>, 1686–1764).
        </ArticleImage>
      </Section>
      <Section title={<span lang="ja-Latn">Hana-awase</span>}>
        <p><Noun lang="ja-Latn">Hanafuda</Noun> seem to originate in a combination of the themes of <span lang="ja-Latn">kai-awase</span> — matching sets, poetry, conventionalized art — with the ideas introduced by the Portuguese playing cards — a regular structure of <i>suits</i> divided into different <i>ranks</i>.</p>
        <p>The two distinct schools of playing-card games first combined in the form of <span lang="ja-Latn">hana-awase</span> (<span lang="ja">花合せ</span>) decks. These early 18th century ancestors of <Noun lang="ja-Latn">Hanafuda</Noun> (such as the deck pictured below) show a very regular configuration of cards for each flower, which evolved during the 18th and 19th centuries into the unusual configuration of the <Noun lang="ja-Latn">Hanafuda</Noun> deck.</p>
        <ArticleImage
          noborder
          size="wide"
          src={img1704Deck}
          alt=""
          source={{
            copyrightYear: 2019,
            organization: {
              orgName: "Japan Playing Card Museum",
              orgAbbr: "JPCM"
            },
            originalUrl: "http://jpcm.sub.jp/home/image/hanafuda-hanaawase02.pdf",
            license: "with-permission",
          }}>
          Some of the cards from a <span lang="ja-Latn">hana-awase</span> deck produced circa 1704 (at least before 1710). This type of deck originally contained 400 cards but many are missing, and the extant set pictured here comprises cards from several different packs. Note the chrysanthemum with <span lang="ja-Latn">sake</span> cup in the third card on the top row.
        </ArticleImage>
        <p>While decks such as the above are obviously for a different style of game, most of the imagery that would become part of the <span lang="ja-Latn">hanafuda</span> deck was already present.</p>
        <p>At the moment it is unclear exactly how the <Noun lang="ja-Latn">Hanafuda</Noun> deck was developed from the <span lang="ja-Latn">hana-awase</span> cards.<Footnote>I hope to expand on this in future!</Footnote> It seems that at some point an enterprising manufacturer began to produce a stripped-down version that Japanese <Noun lang="ja-Latn">Hanafuda</Noun> scholar <Noun lang="ja-Latn">Ebashi Takashi</Noun> (<span lang="ja">江橋崇</span>) calls the <Noun lang="ja-Latn">Musashino</Noun> (<span lang="ja">武蔵野</span>) deck.</p>
      </Section>
      <Section title="Banning &amp; Legalization">
        <p>Some time after its introduction, <Noun lang="ja-Latn">Hanafuda</Noun> games were restricted as part of a total ban on gambling introduced during the <Noun lang="ja-Latn">Kansei</Noun> Reforms<Footnote>During the <Noun lang="ja-Latn">Kansei</Noun> Reforms, gambling was prohibited by the <span lang="ja">博奕賭ノ勝負禁止ノ儀ニ付触書</span>, promulgated by Matsudaira Sadanobu on the 12th of January, 1788.<Cite r="SatireWithinKibyōshi" page={44} /></Footnote> (1787–1793). This ban was to remain in place for nearly 200 years until, in 1886, a bookstore owner in <Noun lang="ja-Latn">Ōsaka</Noun> named <Noun lang="ja-Latn">Maeda Kihei</Noun> (<span lang="ja">前田喜兵衛</span>) decided to open a store selling  <Noun lang="ja-Latn">Hanafuda</Noun>.</p>
        <p>Things had already begun to change in 1885, after a ban on Western playing cards (<span lang="ja">西洋かるた</span> <span lang="ja-Latn">seiyō karuta</span>) was lifted due to complaints from foreign officials.<Cite r="EbashiHanafuda" page={[[189, 192]]} /> <Noun lang="ja-Latn">Maeda Kihei</Noun><Footnote><Noun lang="ja-Latn">Kihei</Noun> appears to have been something of a rogue: he is somewhat infamous in the philately community for selling collections of counterfeit stamps to unsuspecting tourists.</Footnote> became convinced through his reading of legal texts that the selling of <Noun lang="ja-Latn">Hanafuda</Noun> was not actually prohibited, and he moved to <Noun lang="ja-Latn">Tōkyō</Noun> in December 1885 with a plan to open a <Noun lang="ja-Latn">Hana&shy;fuda</Noun> shop. However, he found that the local landlords refused to let to him, believing his business illegal, and he was unable to convince news&shy;papers to print his advertisements. In order to prove himself correct, he came up with a cunning plan: he officially petitioned the <Noun lang="ja-Latn">Tōkyō</Noun> police to ban the sale of <Noun lang="ja-Latn">Hana&shy;fuda</Noun>. His petition was declined, the police stating that the sale of <Noun lang="ja-Latn">Hana&shy;fuda</Noun> was legal, and later that month he opened his first shop in the <Noun lang="ja-Latn">Yagenbori</Noun> neighbourhood of <a href="https://en.wikipedia.org/wiki/Ch%C5%AB%C5%8D,_Tokyo">Chūō</a> district in <Noun lang="ja-Latn">Tōkyō</Noun> (<span lang="ja">中央区薬研堀町</span>, now part of <Noun lang="ja-Latn">Higashi–Nihonbashi</Noun>).  The shop was named “<Pronounce lang="ja-Latn" word="Kamigataya" noun pronouncer="poyotan" file={pronKamigataya} />” (<span lang="ja">上方屋</span>, ‘<Noun lang="ja-Latn">Kyōto</Noun> region store’).<Cite r="EbashiHanafuda" page={[[189, 192]]} /><Cite r="OpeningKamigataya" /></p>
        <ArticleImage
          src={imgKamigatayaSugoroku}
          alt="A Japanese sugoroku board game with images spiraling in counter-clockwise from the outside to the center, showing scenes of Maeda applying to the police to open his store, along with products such as cards and dice."
          size="extra-wide"
          source={{
            organization: {
              orgName: "Japan Playing Card Museum",
              orgAbbr: "JPCM",
            },
            originalUrl: "https://japanplayingcardmuseum.com/111-1-1challenge-openlyhanacartasales-kamigataya/",
            license: "with-permission"
          }}>
          Ever the promotor, at the end of 1887, <Noun lang="ja-Latn">Maeda</Noun> published this <span lang="ja-Latn">sugoroku</span> game based on the story of his struggle to open a store selling playing cards. The track spirals in a counter-clockwise direction to the the centre of the board, where the final square (marked <span lang="ja">上り</span>) shows Japanese and Western cards and dice celebrating together.
        </ArticleImage>
        <p><Noun lang="ja-Latn">Kamigataya</Noun> was thus the first store to openly sell <Noun lang="ja-Latn">Hanafuda</Noun>. A month later, <Noun lang="ja-Latn">Maeda</Noun> opened a second branch of <Noun lang="ja-Latn">Kamigataya</Noun> in <Noun lang="ja-Latn">Muromachi</Noun> district (<span lang="ja">室町</span>), and this was quickly followed by a third store in <Noun lang="ja-Latn">Ginza</Noun> (<span lang="ja">銀座</span>) in March. To promote the opening of the <Noun lang="ja-Latn">Ginza</Noun> store, <Noun lang="ja-Latn">Maeda</Noun> also staged a <Noun lang="ja-Latn">Hanafuda</Noun>-themed play in March 1886, which was held at the <Noun lang="ja-Latn">Chitose</Noun> theatre (now called the <a href="https://en.wikipedia.org/wiki/Meiji-za"><Noun lang="ja-Latn">Meiji-za</Noun></a>).</p>
        <ArticleImage
          cram
          src={[
            [imgPlayLeft, ""],
            [imgPlayRight, ""]
          ]}
          source={{
            organization: { orgName: "Art Research Center, Ritsumeikan University" },
            originalUrl: "https://jpsearch.go.jp/item/arc_nishikie-M648_011aNr010a",
            license: "cc-by-nc-sa",
            licenseVersion: "4.0"
          }}>
          Advertisement for <Noun lang="ja-Latn">Maeda</Noun>’s play entitled <cite lang="ja">花合四季盃</cite> (“Flower-matching four seasons sake cup”). The background shows an early form of <Noun lang="ja-Latn">Hanafuda</Noun> deck. On left is <a href="https://en.wikipedia.org/wiki/Onoe_Kikugor%C5%8D_V">Onoe Kikugorō V</a> (<span lang="ja">五代目尾上菊五郎</span>), on right <a href="https://ja.wikipedia.org/wiki/%E5%B8%82%E5%B7%9D%E5%9C%98%E8%94%B5_(7%E4%BB%A3%E7%9B%AE)"><Noun lang="ja-Latn">Ichikawa Kuzō III</Noun></a> (<span lang="ja">三代目市川九蔵</span>) as <Noun lang="ja-Latn">Ono no Michikaze</Noun>.
        </ArticleImage>
        <p>In addition to the retail stores, a specialized wholesale store was opened in the <Pronounce lang="ja-Latn" noun word="Ningyōchō" pronouncer="keto2204" file={pron人形町通り} /> street in the <Noun lang="ja-Latn">Sumi&shy;yoshi</Noun> neigh&shy;bour&shy;hood,<Footnote><Noun lang="ja-Latn">Sumiyoshi-chō</Noun> was an <Noun lang="ja-Latn">Edo</Noun>-period red light district and the birthplace of the <a href="https://en.wikipedia.org/wiki/Sumiyoshi-kai"><Noun lang="ja-Latn">Sumiyoshi-kai</Noun></a> <span lang="ja-Latn">yakuza</span> organization.<Cite r="Sumiyoshikai" /> The area was destroyed along with most of the rest of <Noun lang="ja-Latn">Nihonbashi</Noun> in the Great <Noun lang="ja-Latn">Kantō</Noun> Earthquake of 1923; the location where <Noun lang="ja-Latn">Sumiyoshi-chō</Noun> existed is now part of <Noun lang="ja-Latn">Nihon-bashi Ningyō-chō 2–chōme</Noun> (<span lang="ja">人形町二丁目</span>).</Footnote> in <Noun lang="ja-Latn">Tōkyō</Noun>’s <Noun lang="ja-Latn">Nihonbashi</Noun> district (<span lang="ja">日本橋住吉町人形町通り</span>). <Noun lang="ja-Latn">Maeda</Noun> later also started other stores with names that punned on the original store, such as <Noun lang="ja-Latn">Nakagataya</Noun> (<span lang="ja">中方屋</span>) and <Noun lang="ja-Latn">Shimogataya</Noun> (<span lang="ja">下方屋</span>).<Cite r="OpeningKamigataya" /></p>
        <ArticleImage
          src={imgKamigatayaMotomachi}
          position="aside"
          size="wide"
          alt="An image of a Japanese street with lots of signs and flags for stores"
          source={{ license: "cc0" }}>
          In this early 20th century postcard, another branch of <Noun lang="ja-Latn">Kamigataya</Noun> can be seen on the left, identified by the large die; this one is in <Noun lang="ja-Latn">Motomachi</Noun> in <Noun lang="ja-Latn">Yokohama</Noun>.
        </ArticleImage>
        <div className="multi">
          <ArticleImage
            src={imgKamigatayaGinza}
            alt="A Japanese storefront, open to the street, with many placards depicting Western cards along with Hanafuda."
            source={{ license: "cc0" }}>
            A newspaper advertisement depicting the outside of the <Noun lang="ja-Latn">Ginza</Noun> <Noun lang="ja-Latn">Kamigataya</Noun> store, 1889. The large die was added to the store in December 1886.
          </ArticleImage>
          <ArticleImage
            src={imgNakagataya}
            alt="A Japanese storefront, open to the street, with a large die shop marker."
            source={{ license: "cc0" }}>
            The storefront of <Noun lang="ja-Latn">Nakagataya</Noun>, as shown on a <Noun lang="ja-Latn">Hyakunin Isshu</Noun> box.
          </ArticleImage>
        </div>
        <p>Once the viability of <Noun lang="ja-Latn">Hanafuda</Noun> had been pro&shy;ven, other manufacturers appeared quickly: the com&shy;pany that was later to become <Noun lang="ja-Latn">Nin&shy;tendo</Noun> began producing <Noun lang="ja-Latn">Hanafuda</Noun> cards in 1889. Other companies such as <Noun lang="ja-Latn">Ōishi Tengudō</Noun> claim to have been operating discreetly during the pro&shy;hi&shy;bition period; in their case behind the doors of a rice merchant named <Noun lang="ja-Latn">Minatoya</Noun> (<span lang="ja">湊屋</span>).<Cite r="OishiTengudoHistory4" /></p>
      </Section>
      <Section title="Changing Attitudes">
        <p>Even after prohibition had ended, <Noun lang="ja-Latn">Hanafuda</Noun> retained a poor reputation, and gambling with the cards remained illegal. In 1892, <Noun lang="ja-Latn">Korekata Kojima</Noun> (<span lang="ja">児島惟謙</span>, 1837–1908), who was the head of Japan’s supreme court (<span lang="ja">大審院</span> <span lang="ja-Latn">daishinin</span>), was accused along with five other supreme court judges of gambling with <Noun lang="ja-Latn">Hanafuda</Noun> (<span lang="ja">弄花</span>, <span lang="ja-Latn">rōka</span>). Due to a lack of evidence, the case was dropped, but <Noun lang="ja-Latn">Kojima</Noun> accepted ‘moral responsibility’ for the scandal and resigned his position.<Cite r="EmperorOfJapan" page={813} /></p>
        <p>Despite this “image problem”, playing <Noun lang="ja-Latn">Hanafuda</Noun> became part of what it meant to be a <span lang="ja-Latn">shinshi</span> (<span lang="ja">紳士</span>) — that is, a modern, wordly gentleman.<Footnote>The Japanese word <span lang="ja-Latn">shinshi</span> had originally been coined in order to translate the English “gentleman”,<Cite r="TheEastandtheIdeaofEurope" page={[[32, 38]]} /> and was particularly associated with those who enthusiastically embraced Westernization during the <Noun lang="ja-Latn">Meiji</Noun> period.</Footnote> The author <Noun lang="ja-Latn">Uchida Roan</Noun> (1868–1929) is said to have joked:</p>
        <blockquote lang="ja">紳士の資格は？　弄花と蓄妾と負債と奔走。</blockquote>
        <blockquote>What are the qualifications of a <span lang="ja-Latn">shinshi</span>? Gambling with <Noun lang="ja-Latn">Hanafuda</Noun>, keeping a mistress, being in debt, and running about.</blockquote>
        <p>Another commentator remarked ironically that “if you can’t play skillfully with 48 flower cards, you can’t be a <span lang="ja-Latn">sōninkan</span> [<span lang="ja">奏任官</span>, a type of official appointed by the prime minister]”.</p>
        <p>The author and politician <a href="https://en.wikipedia.org/wiki/Suematsu_Kench%C5%8D"><Noun lang="ja-Latn">Suematsu Kenchō</Noun></a> (<span lang="ja">末松 謙澄</span>) described the attitude at the time in his 1905 English-language book <Cite r="FantasyOfFarJapan" page={176} inline />:</p>
        <blockquote>In times gone by no game of cards having any resemblance to gambling was played among the gentry; moral discipline forbade such. Since the introduction of European ideas, the rigidity of discipline has somewhat slackened and cards are now played to some extent. Nevertheless, people do not consider card-playing good taste. If they play they do so with some diffidence, somewhat in a similar way as smoking is done by ladies in European society nowadays.</blockquote>
        <p>However, despite his protestation in the book that “I do not care for playing at cards, but I know the methods”, he goes on to give a detailed account of the gameplay — far more than a casual observer would know!</p>
        <div className="multi">
          <ArticleImage
            src={require('./Maeda_game.png')}
            alt=""
            noborder
            source={{
              license: 'cc0'
            }}>
            A Westernized gentleman playing cards with <span lang="ja-Latn">geisha</span>, all of them wearing playing-card themed clothing. Note cigarette and ashtray.<Cite r="MaedaBook" page={25} />
          </ArticleImage>
          <ArticleImage
            src={require('./Maeda_family.png')}
            alt=""
            noborder
            source={{
              license: 'cc0'
            }}>
            Apparently a family playing with <Noun lang="ja-Latn">Hanafuda</Noun> cards.<Cite r="MaedaBook" page={13} />
          </ArticleImage>
        </div>
        <Footnote standalone><Noun lang="ja-Latn">Murai</Noun>’s main competitor was <Noun lang="ja-Latn">Iwaya</Noun> (<span lang="ja-Latn">岩谷商会</span>), run by <Noun lang="ja-Latn">Iwaya Matsuhei</Noun> (<span lang="ja">岩谷松平</span>), who had a more nationalistic outlook. Interestingly, the iconography of their cigarette brands overlaps significantly with that of later <Noun lang="ja-Latn">Hanafuda</Noun> brands — some examples include <span lang="ja-Latn">dai&shy;tengu</span> (<span lang="ja">大天狗</span> “large tengu”), <Noun lang="ja-Latn">Fuji</Noun> (<span lang="ja">冨士</span>), and <span lang="ja-Latn">hinode</span> (<span lang="ja">日乃出</span> “sunrise”) — and their chief logo was that of a red <Noun lang="ja-Latn">Tengu</Noun>, which is also strongly associated with <Noun lang="ja-Latn">Hanafuda</Noun>. It is unclear to me whether there is any real link here or if the coincidence simply reflects the conventionality of traditional Japanese art.</Footnote>
        <p>Another popularizing force during this period was that of cigarette manufacturers who began to include <Noun lang="ja-Latn">Hanafuda</Noun>-patterned cards in cigarette packages as collectible items. The manufacturer <Noun lang="ja-Latn">Murai</Noun> Brothers (<span lang="ja">村井兄弟商會</span>, founded by the “tobacco king” <Noun lang="ja-Latn">Murai Kichibei</Noun> (<span lang="ja">村井吉兵衛</span>) in <Noun lang="ja-Latn">Kyōto</Noun> in 1892) included tobacco cards which combined <Noun lang="ja-Latn">Hanafuda</Noun> with Western playing cards. <Noun lang="ja-Latn">Murai</Noun> was a progressive company that enthusiastically embraced Westernization across the whole of their business. They operated in conjunction with Western tobacco companies such as the British-American Tobacco Company, and many of their cigarette brands bore English titles. Where his competitor <Noun lang="ja-Latn">Iwaya</Noun> would name a brand <span lang="ja">日乃出</span> (<span lang="ja-Latn">hinode</span> “sunrise”), <Noun lang="ja-Latn">Murai</Noun> used the English name “Sunshine”.</p>
        <p>In 1899, <Noun lang="ja-Latn">Murai</Noun> formed the subsidiary “Tōyō Printing”<Footnote>In some sources this is given in its translated form as the “Oriental Printing Company”.</Footnote> (<span lang="ja">東洋印刷</span>), and acquired printing equipment and training from the United States. With this equipment they were able to produce high-quality packaging, and there is some suggestion that they worked with <Noun lang="ja-Latn">Nintendō</Noun> to produce the first Western-style playing cards produced in Japan (1902).<Cite r="EbashiCigaretteCards" /> Certainly <Noun lang="ja-Latn">Nintendō</Noun>’s early cards are often imitations of those produced by such US companies as the National Card Company which had been merged with the United States Playing-card Company in 1894.<Cite r="WOPCNCC" /></p>
        <p>In 1904, the Japanese government nationalized<Footnote><Noun lang="ja-Latn">Kichibei</Noun> was compensated massively for being pushed out of the industry and later founded a bank, among many other enterprises.<Cite r="JapanInTheTaishoEra" page={632} /></Footnote> the manufacture of all tobacco products, and the <Noun lang="ja-Latn">Tōyō</Noun> Printing subsidiary was taken over by British-American Tobacco.<Cite r="TarHeel" page={362} /></p>
        <ArticleImage
          noborder
          size="wide"
          perRow={5}
          src={[
            [require('./Murai1.jpg'), 'A tobacco card with a maple and tanzaku pattern, along with the 10 of diamonds.'],
            [require('./Murai2.jpg'), 'A tobacco card with the moon bright and the 8 of hearts.'],
            [require('./Murai3.jpg'), 'A tobacco card with the wisteria tanzaku and the 4 of hearts.'],
            [require('./Murai4.jpg'), 'A tobacco card with maple leaves drifting on water and the 10 of spades.'],
            [require('./Murai5.jpg'), 'A tobacco card with the November swallow and the King of hearts.'],
            [require('./MuraiBack1.jpg'), ''],
            [require('./MuraiBack2.jpg'), ''],
            [require('./MuraiBack3.jpg'), ''],
            [require('./MuraiBack4.jpg'), ''],
            [require('./MuraiBack5.jpg'), ''],
          ]}>
          Fronts and backs of combination tobacco cards produced by <Noun lang="ja-Latn">Murai</Noun> Brothers, prior to 1904. The hand-written markings on the backs possibly indicate that they were adapted to be used as <Noun lang="ja-Latn">Iroha</Noun> cards.
        </ArticleImage>
      </Section>
      {/* TODO
      <Section title="Traditional Methods of Manufacture">
        <p>(Often manufactured by <span lang="ja-Latn">kuge</span> nobles,<Cite r="GrantsToKugeNobles" /> as they were very poor. Iwakura’s family had even resorted to renting out their house as a gambling den<Cite r="EmperorOfJapan" page={4} /> (although he was later very successful — he was excluded from the grants cited previously.))</p>
      </Section>
      */ }
      <Section title="Taxation, Decline, and Revival">
        <p>In 1902 a stamp duty was introduced that was inspired by similar taxes imposed in Western countries, the intent being to raise the cost of cards (and thereby dis&shy;cour&shy;age their use) but to also raise tax revenue. The tax imposed was crushing: 20 <span lang="ja-Latn">sen</span> per set,<Footnote>The <span lang="ja-Latn">sen</span> (<span lang="ja">銭</span>) was a unit of currency representing 1⁄100 of a <span lang="ja-Latn">yen</span>.</Footnote> in a time when cheap <Noun lang="ja-Latn">Hanafuda</Noun> decks could be had for as little as 2–3 <span lang="ja-Latn">sen</span>. The effect on card manufacturers was “dire”, as Rebecca Salter puts it.<Cite r="PopularJapanesePrints" page={186} /> <Noun lang="ja-Latn">Ebashi</Noun> states that the law led to the closure of many small producers, and made it much harder for new manufacturers to enter the industry; both due to the tax itself as well as onerous record-keeping and inspection requirements.<Cite r="CartaTaxLawContents" /></p>
        <p>During this period, <Noun lang="ja-Latn">Nintendō</Noun> managed to survive in part by taking up the manufacture of regional patterns of Japanese cards (<span lang="ja">地方札</span> <span lang="ja-Latn">chihōfuda</span>), whose original, small-time, manufacturers had failed due to the new taxation law.<Cite r="NintendoHistory" /></p>
        <p>By the mid to late 20th century, interest in the game was waning. A poll by Japan’s Cabinet Office in 1956 indicated that only 9% of people played <Noun lang="ja-Latn">Hanafuda</Noun>, compared with 28% who played with Western playing cards.<Cite r="CabinetOfficeEntertainment" /></p>
        <p>Starting in the late 20th century, <Noun lang="ja-Latn">Hanafuda</Noun> seems to have had something of a revival. “Character” decks featuring popular <span lang="ja-Latn">anime</span> and <span lang="ja-Latn">manga</span> characters began to be produced, and the popularity of <Noun lang="ja-Latn">Hanafuda</Noun> has also been boosted by films featuring the cards, such as <a href="https://en.wikipedia.org/wiki/Summer_Wars"><cite>Summer Wars</cite></a> (2009).</p>
        <p>While Japan produces many new types of <Noun lang="ja-Latn">Hanafuda</Noun> <em>cards</em>, in Korea <Noun lang="ko-Latn">Hwatu</Noun> <em>games</em> appear to be much more popular than their Japanese counterparts, and several films about gambling with <Noun lang="ko-Latn">Hwatu</Noun> — most prominently the <a href="https://en.wikipedia.org/wiki/Tazza:_The_High_Rollers"><cite lang="ko-Latn">Tazza</cite></a> series (2006, 2014, 2019) — have been box-office successes.</p>
        <p>Image search results on Instagram (as of writing in 2021) for the hashtags <a href="https://www.instagram.com/explore/tags/%E8%8A%B1%E6%9C%AD/"><code>#花札</code></a> and <a href="https://www.instagram.com/explore/tags/%ED%99%94%ED%88%AC/"><code>#화투</code></a> show about twice as many Korean-tagged images, despite Korea having only a third of the number of Instagram users that Japan has.<Cite r="JapaneseInstagramUsers" /><Cite r="KoreanInstagramUsers" /> The content of the images also gives many clues to the game’s popularity: Korean images often show games in progress, and many times being played for money, whereas Japanese images are often just of the cards themselves, focusing on their æsthetic value.</p>
      </Section>
    </Section>
    <Section title="The Art of the Cards">
      <p>The culture of the <Noun lang="ja-Latn">Edo</Noun> period in which <Noun lang="ja-Latn">Hanafuda</Noun> cards first appeared was heavily in&shy;flu&shy;enced by the aristocratic culture of the earlier <Noun lang="ja-Latn">Heian</Noun> period. As such, the artwork on the cards abounds with references to <Noun lang="ja-Latn">Heian</Noun> period literature, festivals, and artistic tropes:</p>
      <blockquote className="blockquote">
        <p>With the exception of the peony, which entered the poetic canon in the <Noun lang="ja-Latn">Edo</Noun> period, all the images are from classical poetry of the <Noun lang="ja-Latn">Heian</Noun> period and reflect urban commoners’ knowledge of the poetic and cultural associations of the months.<Cite r="FourSeasons" page={[[1739, 1741]]} pageType="l." /></p>
      </blockquote>
      <p>Artistically, the cards derive from the <span lang="ja-Latn">kachō-ga</span> (<span lang="ja">花鳥画</span> ‘flower and bird image’) tra&shy;dition. Artworks created in this style often have poems written upon them, and these appear on some cards of the <span lang="ja-Latn">Echigo-bana</span> pattern.</p>
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
        noborder
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
      <p>A playing-card ‘pattern’ is a common set of designs that has been used by multiple different manufacturers over a period of time. With <span lang="ja-Latn">hanafuda</span> there is now one primary or “standard” pattern: all other patterns are referred to as ‘local cards’ (<span lang="ja">地方札</span> <span lang="ja-Latn">chihōfuda</span>), and considered to be specific to a particular region. Most of these are of historical interest only and are no longer manufactured, and there is little information about how gameplay differed in different regions.</p>
      <Section title={<>Standard (<Noun lang="ja-Latn">Hachihachi-bana</Noun>)</>}>
        <p>The standard pattern is now one that is called <Pronounce pronouncer="poyotan" word="hachihachi-bana" lang="ja-Latn" file={pronHachihachibana} /> (<span lang="ja">八八花</span>/<span lang="ja">八々花</span>), since it was primarily used to play the game <span lang="ja">八八</span> ‘88’. Almost all decks use this pattern, and images from it are used to show the cards of each month below.</p>
        <ArticleImage size="small" src={img5Brights} alt="Five Hanafuda cards: the crane, cherry curtain, moon, rain-man, and phoenix.">The 5 Bright cards of the <span lang="ja-Latn">hachihachi-bana</span> pattern, from a <Noun lang="ja-Latn">Nintendo</Noun> deck.</ArticleImage>
        <Section title="Korean deck differences">
          <p>Korean decks are also based on the <span lang="ja-Latn">hachi­hachi­-bana</span> pattern, but the ribbons are usually blue instead of purple, and there is Korean text on the standard three red ribbons (labelled <span lang="ko">홍단</span>, <Pronounce lang="ko-Latn" pronouncer="glamstar77" word="hongdan" file={pronHongdan} /> ‘crimson ribbon’) and all three blue ribbons (<span lang="ko">청단</span>, <Pronounce lang="ko-Latn" word="cheongdan" pronouncer="glamstar77" file={pronCheongdan} /> ‘blue ribbon’).</p>
          <ArticleImage
            src={imgKoreanTanzaku}
            alt="Six Hwatu cards showing ribbons with Korean text written on them.">
            Korean <Noun lang="ko-Latn">Hwatu</Noun> cards with ribbons.
          </ArticleImage>
          <p>There are also differences in the ‘rain man’ (see below), and depending on the deck, other aspects of the cards can also be translated into Korean cultural terms. For example, the lesser cuckoo of the Japanese cards is in some decks the Oriental magpie, which is the national bird of Korea.</p>
          <div className="multi">
            <ArticleImage size="small"
              src={imgKoreanMagpie}
              alt="Two hwatu-format cards: the left shows cherry blossoms with a Korean magpie that has a blue chest with black and yellow wings, while the right shows cherry blossoms with a lesser cuckoo that has a yellow body and green wings.">
              The <span lang="ko">무지개</span> (<Pronounce word="mujigae" lang="ko-Latn" file={pronMujigae} pronouncer="fairybel" />, ‘rainbow’) brand <Noun lang="ko-Latn">Hwatu</Noun> deck (on left) features a Korean magpie (<span lang="ko">까치</span> <Pronounce file={pronKkachi} word="kkachi" lang="ko-Latn" pronouncer="goeun" />), instead of the usual lesser cuckoo as shown on the Daiso <Noun lang="ko-Latn">Hwatu</Noun>-format deck.
            </ArticleImage>
            <ArticleImage
              size="small"
              src={imgJapanvsKorea}
              alt="Two Hanafuda cards, the first depicting a man wearing Japanese dress, the second wearing Korean.">
              The ‘rain man’ wears traditional clothing in both Japanese and Korean decks. The Japanese man (left) wears a <Noun lang="ja-Latn">Heian</Noun> period courtier’s daily outfit (<span lang="ja">狩衣</span> <Pronounce pronouncer="skent" lang="ja-Latn" word="kariginu" file={pronKariginu} />), with tall <span lang="ja-Latn">tate-eboshi</span> (<span lang="ja">楯烏帽子</span>) hat, and very tall rain-clogs (<span lang="ja">足駄</span> <Pronounce lang="ja-Latn" word="ashida" pronouncer="skent" file={pronAshida} />) on his feet. The Korean man is wearing a noble’s <Pronounce pronouncer="glamstar77" lang="ko-Latn" word="gat" file={pronGat} /> (<span lang="ko">갓</span>) hat, and an outer coat with very large sleeves.
            </ArticleImage>
          </div>
        </Section>
      </Section>
      <Section title={<><Noun lang="ja-Latn">Mushi-bana</Noun></>}>
        <p>The <Noun lang="ja-Latn">Mushi-bana</Noun> (<span lang="ja">虫花</span> ‘insect flowers’) deck is a variant that contains only ten months, as it lacks the sixth (peony) and seventh (bush clover). It is especially used for playing the game of the same name, <Noun lang="ja-Latn">Mushi</Noun> (‘insects’). It is sometimes described as a shortened version of a standard <Noun lang="ja-Latn">Hachihachi</Noun> deck, but in reality it originated as its own regional pattern.</p>
        <p><Noun lang="ja-Latn">Nintendō</Noun> produced this pattern until recently, but it now appears to be extinct.</p>
        <ArticleImage
          src={imgMushibana}
          alt="">
          <Noun lang="ja-Latn">Nintendō</Noun>’s <Noun lang="ja-Latn">Mushi</Noun> pattern differs slightly from that of its standard deck.
        </ArticleImage>
      </Section>
      <Section title={<><Noun lang="ja-Latn">Echigo-bana</Noun></>}>
        <p>The regional <Pronounce pronouncer="poyotan" word="Echigo-bana" lang="ja-Latn" file={pronEchigobana} /> (<span lang="ja">越後花</span> ‘Echigo flowers’) pattern is based on designs that are older than the standard pattern. The most obvious difference is that all the cards are overpainted with gold and silver in various patterns.</p>
        <ArticleImage
          src={imgEchigoBana}
          alt="Five hanafuda cards which are overpainted in silver and gold paints in various patterns, obscuring the details.">
          The 5 Brights of the <span lang="ja-Latn">Echigo-bana</span> pattern, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
        <p>Some of the <span lang="ja-Latn">kasu</span> cards also carry short poems (<span lang="ja">短歌</span> <Pronounce pronouncer="akitomo" word="tanka" lang="ja-Latn" file={pronTanka} />). Poetry is a common sight on traditional Japanese art — as seen on the <span lang="ja-Latn">kachō-ga</span> prints above — and often provides more context to the images. The poems of the <Noun lang="ja-Latn">Echigo-bana</Noun> will be explained below.</p>
      </Section>
      <Section title={<Noun lang="ja-Latn">Echigo-kobana</Noun>}>
        <p>The <Pronounce lang="ja-Latn" word="Echigo-kobana" file={pronEchigokobana} pronouncer="poyotan" /> (<span lang="ja">越後小花</span> ‘Echigo small flowers’) pattern is similar to the <Noun lang="ja-Latn">Echigo-bana</Noun>, but with very small cards measuring approximately 3&nbsp;cm × 4.5&nbsp;cm (1⅛″ × 1¾″).</p>
        <ArticleImage
          src={imgEchigoKobanaBrights}
          alt="Five hanafuda cards which are overpainted in silver and gold paints in various patterns, obscuring the details.">
          The 5 Brights of the <span lang="ja-Latn">Echigo-kobana</span> pattern, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
        <p>Because of the small size, there are no poems on this deck. However, it does contain four extra cards. Any special rules for the deck, including the use of these extra cards, are unknown — <Noun lang="ja-Latn">Ōishi Tengudō</Noun> even includes a note with every deck sold asking for anyone who knows the rules to contact them!</p>
        <ArticleImage
          size="small"
          src={imgEchigoKobanaExtra}
          alt="Four hanafuda cards, one with a picture of a Tengu and manfacturer’s name, the rest with a stylized depection of a spearman.">
          The four extra cards of an <span lang="ja-Latn">Echigo-kobana</span> deck by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
      </Section>
      <Section title={<><Noun lang="ja-Latn">Awa-­bana</Noun>/<Noun lang="ja-Latn">Kintoki­-bana</Noun></>}>
        <ArticleImage
          position="aside"
          size="small"
          src={imgKintoki}
          alt="A Hanafuda card depicting a red boy carrying an axe, and wearing a shirt with the character for ‘gold’ on it.">
          The <Noun lang="ja-Latn">Kintoki</Noun> card, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>. He is depicted carrying an axe and wearing a shirt with the character <span lang="ja">金</span> (<span lang="ja-Latn">kin</span>, ‘gold’) on it.
        </ArticleImage>
        <p>This is another regional pattern called <Pronounce lang="ja-Latn" word="Awa­-bana" pronouncer="poyotan" file={pronAwabana} /> (<span lang="ja">阿波花</span>) or <Pronounce lang="ja-Latn" word="Kintoki­-bana" pronouncer="poyotan" file={pronKintokibana} /> (<span lang="ja">金時花</span>). It originated in <Noun lang="ja-Latn">Awa</Noun> province, in what is now <Noun lang="ja-Latn">Tokushima</Noun> prefecture.</p>
        <p>Like the <Noun lang="ja-Latn">Echigo-bana</Noun> pattern, some of the <Noun lang="ja-Latn">Awa-­bana</Noun> carry poems (in fact, they carry the same poems). The deck also contains an extra card which features the titular <Pronounce noun lang="ja-Latn" pronouncer="renad" file={pronKintoki} word="Kintoki" /> (<span lang="ja">金時</span>), <a href="https://en.wikipedia.org/wiki/Kintar%C5%8D">a legendary strong-boy also known as <Noun lang="ja-Latn">Kintarō</Noun></a>.</p>
        <ArticleImage
          src={imgKintokiBana}
          alt="Five hanafuda cards with bright colours and overpainted with silver.">
          The 5 Brights of the <span lang="ja-Latn">Awa-bana</span> pattern, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
      </Section>
      <Section title={<><Noun lang="ja-Latn">Dairen-bana</Noun></>}>
        <p><Noun lang="ja-Latn">Dairen-bana</Noun> (<span lang="ja-Latn">大連花</span>) is an extinct regional pattern from city of <a href="https://en.wikipedia.org/wiki/Dalian"><Noun lang="zh-Latn">Dalian</Noun></a> (<span lang="zh">大连市</span>) in China. It dates from the era of the <a href="https://en.wikipedia.org/wiki/Kwantung_Leased_Territory">Kwangtung Leased Territory</a>, when Japan occupied the region from 1905 until the end of WWII. The pattern possibly existed as a way to reduce government taxation on cards, as cards sold in occupied regions did not attract the same level of tax as those sold within Japan’s own islands.</p>
        <p>The main distinguishing feature of the pattern is that each type of <span lang="ja-Latn">tanzaku</span> card has its own background pattern (as opposed to the usual ‘confetti’). The remainder of the cards follow the standard pattern very closely.</p>
        <ArticleImage
          src={imgDairenbana}
          alt="Three hanafuda cards: the first, with a red ribbon with writing on it, has a background consisting of a wave pattern; the second, with a red ribbon without writing, has a diagonal-striped background; and the third, with a blue ribbon, has a hatched background.">
          Three cards showing the different backgrounds for each type of <span lang="ja-Latn">tanzaku</span> card.
        </ArticleImage>
      </Section>
      <Section title="Modern/Novelty decks">
        <p>In addition to the above, there are also many modern revisions or novelty decks that do not conform to any one of the traditional patterns. More information and examples of these can be found in the <Link to="/articles/cards/japan/hanafuda/new-manufacturers">article about new <Noun lang="ja-Latn">Hanafuda</Noun> manufacturers</Link>.</p>
      </Section>
    </Section>
    <Section title="The Cards in Depth">
      <p>A short note about the ordering of the deck: while nominally the cards start in ‘January’, at the time the deck was created Japan’s calendar was based upon the lunisolar Chinese calendar, which started in what is now February. This explains why ‘March’ is the month of the cherry blossom when — according to the current calendar — it should be April,<Footnote>In Kyoto from the 11th to 13th centuries, the average peak of the cherry blossom season was April 17th.<Cite r="FourSeasons" page={484} pageType="l." /></Footnote> and why ‘August’ shows the full moon when the full moon festival (<span lang="ja">月見</span> <Pronounce pronouncer="skent" word="tsukimi" lang="ja-Latn" file={pronTsukimi} />) actually falls in September–October.</p>
      <p>However, even with these modifications the eleventh (willow) and twelfth (paulownia) months are in the wrong place. The eleventh month depicts rain, willows, and a frog, all of which are associated with summer.</p>
      <p>In Korea, an altered ordering is used where the ‘November’ and ‘December’ months are switched. There is also another ordering used in Japan which might be called the “<Noun lang="ja-Latn">Nagoya</Noun> ordering”, as it is used in several games from that region.<Footnote>This order will be explained when I get around to writing the games articles!</Footnote></p>
      <Section title={<span lang="ja">1月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda1_1, "A card with a red moon, a crane, and pine trees."],
            [imgHanafuda1_2, "A card with pine trees and a red tanzaku with writing."],
            [imgHanafuda1_3, "A card with pine trees."],
            [imgHanafuda1_4, "A card with pine trees."],
          ]}
          source={louieSource}>
          The cards for January feature pine trees. There is one bright card, one <span lang="ja-Latn">tanzaku</span> card (with text), and two <span lang="ja-Latn">kasu</span> cards.
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
        <p>The first month is represented by pine trees (<span lang="ja">松</span> <Pronounce pronouncer="_ai_" word="matsu" lang="ja-Latn" file={pronMatsu} />). The bright card shows a crane and pine trees, with the sun rising in the background. Both the crane and the pine are symbols of longevity, so they are a common combination in Japanese art; the mythical <a href="https://en.wikipedia.org/wiki/Mount_Penglai">Mount <Noun lang="ja-Latn">Hōrai</Noun></a>, dwelling-place of immortals, is depicted as wooded with pine trees and populated by cranes.</p>
        <ArticleImage
          src={imgJapaneseCrane}
          alt="Two cranes walking side-by-side through the snow. They have white bodies with black extremities and the top of their head is red."
          source={{
            license: "stock-image",
            organization: { orgName: "Shutterstock.com" },
            author: "Ondrej Prosicky",
            originalUrl: "https://www.shutterstock.com/image-photo/snowy-meadow-dancing-cranes-hokkaido-japan-1043519431"
          }}>
          The <a href="https://en.wikipedia.org/wiki/Red-crowned_crane">Japanese crane</a> has a red crest.
        </ArticleImage>
        <p>The pine is associated with winter and snow, so these cards show the lingering influence of winter during the new year. The first week of the new year is known as the ‘pine week’ (<span lang="ja">松の内</span> <span lang="ja-Latn">matsu no uchi</span>), and the traditional festival that was held on the first Day of the Rat of the new year (<span lang="ja">子の日の宴</span> <span lang="ja-Latn">nenohi no en</span>) involved uprooting small pine trees.<Cite r="WorldOfTheShiningPrince" page={168} /></p>
        <ArticleImage
          noborder
          position="left"
          size="small"
          src={imgPineUrasu}
          alt="A card with a pine tree and a red ribbon"
          source={{
            organization: {
              orgName: "Japan Playing Card Museum",
              orgAbbr: "JPCM",
            },
            originalUrl: "https://japanplayingcardmuseum.com/image/hachihachi-hanafuda16.pdf",
            license: "with-permission"
          }}>
          An old pine <span lang="ja-Latn">tanzaku</span> card with inscription reading <span lang="ja-Latn">urasu</span> (<span lang="ja">宇良す</span>), the name of a <Noun lang="ja-Latn">Hachi-Hachi</Noun> <span lang="ja-Latn">yaku</span>. Produced by <span lang="ja">現〇商会</span>.
        </ArticleImage>
        <p>The text on the <span lang="ja-Latn">tanzaku</span> reads <span lang="ja-Latn">akayoroshi</span> <span lang="ja">あ𛀙よろし</span>.<Footnote>The writing on the <span lang="ja-Latn">tanzaku</span> uses a rare <span lang="ja-Latn">hentaigana</span> character for <span lang="ja-Latn">ka</span>, which is usually written <span lang="ja">か</span>. It may not render correctly on your device.</Footnote> This means ‘red is good’ and was an older name of a <Noun lang="ja-Latn">Hachi-Hachi</Noun> <span lang="ja-Latn">yaku</span> (scoring com&shy;bin&shy;ation) which is now called <span lang="ja-Latn">akatan</span>.<Footnote>The meaning of this phrase is usually said to be “unclear”, even by <Noun lang="ja-Latn">Hanafuda</Noun> manufacturers. Some derive a meaning like ‘clearly good’ based on reading <span lang="ja-Latn">aka</span> as a short form of <span lang="ja-Latn">akiraka ni</span> (‘clearly’). However, old listings of <span lang="ja-Latn">yaku</span> show <span lang="ja-Latn">akayoroshi</span> alongside <span lang="ja-Latn">aoyoroshi</span> (‘blue is good’) indicating that <span lang="ja-Latn">aka</span> should be read straightforwardly as <span lang="ja">赤</span> (‘red’).</Footnote> Cards from vintage decks can carry older names for this <span lang="ja-Latn">yaku</span>, such as <span lang="ja-Latn">urasu</span>, or sometimes simply <span lang="ja">正月/初月</span>, indicating the first lunar month.</p>
        <p>In the <span lang="ja-Latn">Echigo-bana</span> pattern, the <span lang="ja-Latn">kasu</span> cards carry a <span lang="ja-Latn">tanka</span> composed by <Noun lang="ja-Latn"><a href="https://en.wikipedia.org/wiki/Minamoto_no_Muneyuki">Mina­moto no Mune­yuki</a></Noun><Footnote><Noun lang="ja-Latn">Mina­moto no Mune­yuki</Noun> (<abbr title="died">d.</abbr> 983) was a poet of the Heian period, and named one of the ‘Thirty-Six Immortals of Poetry’.</Footnote> (<span lang="ja">源宗于</span>) at a poetry competition organized by the Empress during the reign of Emperor <Noun lang="ja-Latn">Uda</Noun> . It is featured as Poem 24 in the ‘Spring’ section of the <Pronounce pronouncer="skent" word="Kokin Wakashū" lang="ja-Latn" file={pronKokinWakashu} noun /> (<cite lang="ja">古今和歌集</cite> “Collection of Old and New Poems”):</p>
        <Footnote standalone>
          <p><Cite r="PoemsOfTheEchigobana" page={4} inline /> notes that in the standard design printed by Nintendo and <Noun lang="ja-Latn">Ōishi Tengudō</Noun>, the card is missing the <span lang="ja">も</span> on the second ‘line’.</p>
        </Footnote>
        <div className="multi">
          <p lang="ja" className="vertical-rl">
            ときはなる<br />松のみどりも<br />春くれば<br />今ひとしほの<br />色まさりけり
          </p>
          <p>Even the verdure<br />of foliage on the pine tree,<br />“ever unchanging”,<br />deepens into new richness<br />now that springtime has arrived.<Cite r="KokinWakashu" page={18} /></p>
        </div>
        <p>The <span lang="ja-Latn">Awa-bana kasu</span> carries a shortened reference to this poem, announcing that spring is here:</p>
        <div className="multi">
          <p lang="ja" className="vertical-rl">
            とき𛂞き𛂞<br />みどり
          </p>
          <p lang="ja" className="vertical-rl">
            常磐木は<br />緑
          </p>
          <p>The unchanging tree<br />is green.</p>
        </div>
        <div className="multi">
          <ArticleImage
            size="small"
            src={imgPoem1}
            alt="The kasu cards of the Echigo-bana pattern which bear the poem.">
            <span lang="ja-Latn">Echigo-bana</span> <span lang="ja-Latn">kasu</span> cards, with <span lang="ja-Latn">tanka</span>.
          </ArticleImage>
          <ArticleImage
            size="small"
            src={imgAwaTanka1}
            alt="The kasu cards of the Awa-bana pattern which bears a poem.">
            An <span lang="ja-Latn">Awa-bana</span> <span lang="ja-Latn">kasu</span> card, with a shortened version of the same <span lang="ja-Latn">tanka</span> (the other <span lang="ja-Latn">kasu</span> card bears the same phrases).
          </ArticleImage>
        </div>
      </Section>
      <Section title={<span lang="ja">2月</span>}>
        <ArticleImage
          position="aside"
          alt="A small dull-coloured bird sitting on a branch."
          src={imgBushWarbler}
          source={{
            author: { family: "Gropp", given: "Eric" },
            originalUrl: "https://www.flickr.com/photos/egropp/16717864053",
            license: "cc-by",
            copyrightYear: 2015,
            licenseVersion: "2.0"
          }}>
          In reality, the bush warbler is not a brightly-coloured bird.
        </ArticleImage>
        <ArticleImage
          src={[
            [imgHanafuda2_1, ""],
            [imgHanafuda2_2, ""],
            [imgHanafuda2_3, ""],
            [imgHanafuda2_4, ""],
          ]}
          source={louieSource}>
          The cards for February feature plum trees in blossom. There is one <span lang="ja-Latn">tane</span> card, one <span lang="ja-Latn">tanzaku</span> card (with text), and two <span lang="ja-Latn">kasu</span> cards. The text on the <span lang="ja-Latn">tanzaku</span> is the same as that on January’s.
        </ArticleImage>
        <p>The second month is represented by plum trees in blossom (<span lang="ja">梅</span> <Pronounce pronouncer="akitomo" word="ume" lang="ja-Latn" file={pronUme} />). The <span lang="ja-Latn">tane</span> has a bush warbler–plum blossom combination that has been associated with spring since very early times, dating at least from the <Pronounce pronouncer="monekuson" word="Man’yōshū" lang="ja-Latn" file={pronManyoshu} noun />  (<cite lang="ja">万葉集</cite> ‘Collection of Ten Thousand Leaves’, a book of poetry compiled during the <Noun lang="ja-Latn">Nara</Noun> period sometime after 759).<Cite r="FourSeasons" page={978} pageType={'l.'} /></p>
        <p>Despite being a tree introduced from China, the plum blossom was the favoured flower in poetry and art during the <Noun lang="ja-Latn">Nara</Noun> period; the native cherry blossom would only become more popular during the <Noun lang="ja-Latn">Heian</Noun> period:<Cite r="FourSeasons" page={997} pageType='l.' /> after a famous plum tree planted by Emperor <Noun lang="ja-Latn">Kanmu</Noun> at the imperial palace had died, Emperor <Noun lang="ja-Latn">Ninmyō</Noun> replaced it with a cherry tree<Footnote>This cherry tree has been replanted several times since then, and is called the <span lang="ja-Latn">sakon no sakura</span> (<span lang="ja">左近桜</span> ‘left-side cherry’).</Footnote> in 834.<Cite r="HandbookForJapan" page={301} /></p>
        <p>The bush warbler (<span lang="ja">鶯</span> <span lang="ja-Latn">uguisu</span>) was praised for its song, and one of its cries is said to repeat the phrase <span lang="ja-Latn">hō-hoke-kyō</span>, the Japanese name of the <a href="https://en.wikipedia.org/wiki/Lotus_Sutra">Lotus Sutra</a> (<span lang="ja">法華経</span> <span lang="ja-Latn">hokekyō</span>). The first cry of the bush warbler was considered to announce the beginning of spring:</p>
        <Footnote standalone><p>This is Poem 14 from the ‘Spring 1’ section of the <Noun lang="ja-Latn">Kokinshū</Noun>. It was composed by <a href="https://en.wikipedia.org/wiki/%C5%8Ce_no_Chisato"><Noun lang="ja-Latn">Ōe no Chisato</Noun></a> (<span lang="ja">大江千里</span>) during a competition in the <Noun lang="ja-Latn">Kanpyō</Noun> era (889–898).</p></Footnote>
        <div className="multi">
          <p lang="ja">うぐひすの谷よりいづるこゑなくは春くることをたれかしらまし</p>
          <p>Without the voice of the warbler that comes out of the valley, how would we know the arrival of spring?<Cite r="FourSeasons" page={952} pageType="l." /></p>
        </div>
        <ArticleImage
          size="small"
          src={imgPoem4}
          alt="The kasu cards of the Echigo-bana pattern which bear the poem.">
          <span lang="ja-Latn">Echigo-bana</span> <span lang="ja-Latn">kasu</span> cards, with <span lang="ja-Latn">tanka</span>.
        </ArticleImage>
        <p>The poem on the <Noun lang="ja-Latn">Echigo-bana</Noun> <span lang="ja-Latn">kasu</span> cards (the origin of which is unknown) also describes the call of the bush warbler. Note that while the poem must be describing white plum blossoms (<span lang="ja">白梅</span> <span lang="ja-Latn">hakubai</span>), all <Noun lang="ja-Latn">Hanafuda</Noun> patterns depict red plum blossoms (<span lang="ja">紅梅</span> <span lang="ja-Latn">kōbai</span>), which became more popular later on:</p>
        <div className="multi">
          <p lang="ja" className="vertical-rl">
            鴬の<br />鳴音はしるき<br />梅の花<br />色まがえとや<br />雪の降るらん
          </p>
          <p>
            The nightingale’s<br />Song is clear<br />And the white plum blossom<br />Becomes lost<br />In the falling snow.<Cite r="PoemsOfTheEchigobana" page={99} />
          </p>
        </div>
      </Section>
      <Section title={<span lang="ja">3月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda3_1, ""],
            [imgHanafuda3_2, ""],
            [imgHanafuda3_3, ""],
            [imgHanafuda3_4, ""],
          ]}
          source={louieSource}>
          The cards for March show the famous cherry blossoms of Japan. There is one bright card, one <span lang="ja-Latn">tanzaku</span> card (with text), and two <span lang="ja-Latn">kasu</span> cards.
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
        <ArticleImage
          src={imgYoshino}
          position="aside"
          size="wide"
          alt="A mountain covered in cherry blossom trees showing light pink blooms, amongst other dark green trees."
          source={{
            license: 'cc-by-nc-nd',
            licenseVersion: '4.0',
            originalUrl: 'http://photozou.jp/photo/show/314766/35962820',
            copyrightYear: 2010,
            author: { name: 'ゆぼ', lang: "ja" }
          }}>
          The <Noun lang="ja-Latn">Yoshino</Noun> mountainside with cherry trees in bloom.
        </ArticleImage>
        <p>The third month is represented by cherry trees in bloom (<span lang="ja">桜</span> <Pronounce pronouncer="strawberrybrown" word="sakura" lang="ja-Latn" file={pronSakura} />). Blossom-viewing (<span lang="ja">花見</span> <Pronounce pronouncer="samchie" word="hanami" lang="ja-Latn" file={pronHanami} />), parti­cularly of cherry blossoms, is a custom that dates back to the Heian period. The curtains (<span lang="ja">幕</span> <Pronounce pronouncer="skent" word="maku" lang="ja-Latn" file={pronMaku} />) that are shown on the bright card are there provide privacy whilst viewing cherry blossoms. An example of their use can be seen in the image on the left. It was common to use striped fabric, particularly in red &amp; white, while nobility would use curtains bearing their family crest.</p>
        <p>The <span lang="ja-Latn">tanzaku</span> of the March cards reads <span lang="ja-Latn">mi&shy;yoshino</span> <span lang="ja">みよしの</span> ‘beautiful <Noun lang="ja-Latn">Yoshino</Noun>’,<Footnote>
          Some older cards spell this phrase differently, some examples are: <span lang="ja">みよし𛂙</span>, <span lang="ja">美よし𛂙</span>, or <span lang="ja">みよし𛂜</span>.
          Other phrases seen on the cherry <span lang="ja-Latn">tanzaku</span> include <span lang="ja">す𛀙𛂦𛃰</span> (<span lang="ja">すがわら</span> <span lang="ja-Latn">sugawara</span>), or <span lang="ja">宇良す</span> (<span lang="ja">うらす</span> <span lang="ja-Latn">urasu</span>). Both of these are references to the <a href="/games/hachi-hachi"><Noun lang="ja-Latn">Hachi-Hachi</Noun></a> <span lang="ja-Latn">yaku</span> ‘<span lang="ja">うらすがわら</span>’ (<span lang="ja-Latn">urasugawara</span>).
        </Footnote> which is a sobriquet for the mountainous area of <Noun lang="ja-Latn">Yoshino</Noun> (<span lang="ja">吉野</span>) in <Noun lang="ja-Latn">Nara</Noun> prefecture, famous for its cherry blossoms. The term <span lang="ja-Latn">miyoshino</span> is <a href="http://www.wakapoetry.net/?s=miyosino">often used to refer to this location</a> in the imperial poetry collections.</p>
        <p>In 1688, <a href="https://en.wikipedia.org/wiki/Matsuo_Bash%C5%8D"><Noun lang="ja-Latn">Matsuo Bashō</Noun></a> (<span lang="ja">松尾芭蕉</span>), Japan’s most famed composer of <span lang="ja-Latn">hokku</span>, visited <Noun lang="ja-Latn">Yoshino</Noun> during his travels but found himself unable to compose a single poem, overwhelmed by the pressure of trying to live up to his predecessors.<Cite r="NarrowRoad" page={84} /> One of them, <Noun lang="ja-Latn">Yasuhara Teishitsu</Noun> (<span lang="ja">安原貞室</span>), had composed what <Noun lang="ja-Latn">Bashō</Noun> considered to be the “finest <span lang="ja-Latn">hokku</span> ever written”:<Cite r="TheClassicTraditionOfHaiku" page={8} /></p>
        <blockquote>
          <p>
            Look at that! and that!<br />
            Is all I can say of the blossoms<br />
            At Yoshino mountain.
          </p>
        </blockquote>
        <p>Rather than <span lang="ja-Latn">hanami</span>, some older non-standard designs depict a <a href="https://en.wikipedia.org/wiki/Bugaku"><span lang="ja-Latn">bugaku</span></a> (<span lang="ja">舞楽</span>) scene, with a large drum decorated with flames (<span lang="ja">火焔太鼓</span> <span lang="ja-Latn">kaendaiko</span>).</p>
        <div className="multi">
          <ArticleImage
            size="small"
            src={imgCherryBugaku1}
            alt=""
            source={{
              organization: {
                orgName: "Worshipful Company of the Makers of Playing Cards",
                orgAbbr: "WCMPC",
              },
              originalUrl: "http://www.playingcardmakerscollection.co.uk/Cardhtml/W0329.html",
              license: "with-permission"
            }}>
            A <span lang="ja-Latn">bugaku</span> scene from a combination card produced by <Noun lang="ja-Latn">Tenguya Tsutida</Noun>.
          </ArticleImage>
          <ArticleImage
            size="small"
            src={imgCherryBugaku2}
            alt=""
            source={{
              organization: {
                orgName: "Japan Playing Card Museum",
                orgAbbr: "JPCM",
              },
              originalUrl: "https://japanplayingcardmuseum.com/image/kaikinki-hanafuda19.pdf",
              license: "with-permission"
            }}>
            A <span lang="ja-Latn">bugaku</span> scene from a non-standard card by an unknown manufacturer.
          </ArticleImage>
          <ArticleImage
            size="small"
            src={imgCherryBugaku3}
            alt=""
            source={{
              organization: {
                orgName: "Japan Playing Card Museum",
                orgAbbr: "JPCM",
              },
              originalUrl: "https://japanplayingcardmuseum.com/image/hanafuda-musashino-12.pdf",
              license: "with-permission"
            }}>
            A <span lang="ja-Latn">bugaku</span> scene from a mid-<span lang="ja-Latn">Meiji</span> deck by <span lang="ja-Latn">Arakawa Fujibei</span> (<span lang="ja">荒川藤兵衛</span>). Another subtle detail are the <a href="https://en.wikipedia.org/wiki/Yukitsuri"><span lang="ja-Latn">yukitsuri</span></a> at top right.
          </ArticleImage>
        </div>
      </Section>
      <Section title={<span lang="ja">4月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda4_1, ""],
            [imgHanafuda4_2, ""],
            [imgHanafuda4_3, ""],
            [imgHanafuda4_4, ""],
          ]}
          source={louieSource}>
          The cards for April show the drooping branches of wisteria. There is one <span lang="ja-Latn">tane</span> card, one red <span lang="ja-Latn">tanzaku</span> card, and two <span lang="ja-Latn">kasu</span> cards.
        </ArticleImage>
        <ArticleImage
          position="aside"
          alt="Wisteria in bloom, with long strings of flowers dangling."
          src={imgWisteriaBloom}
          source={{
            originalUrl: "https://www.flickr.com/photos/ariari/3490155124",
            author: "ariari",
            copyrightYear: 2009,
            license: "cc-by-nc-nd",
            licenseVersion: "2.0",
          }}
        >
          Wisteria in bloom.
        </ArticleImage>
        <p>The fourth month is represented by wisteria (<span lang="ja">藤</span> <Pronounce pronouncer="kaoring" word="fuji" lang="ja-Latn" file={pronFuji} />). These cards are also nicknamed ‘black bean’ (<span lang="ja">黒豆</span> <Pronounce pronouncer="usako_usagiclub" word="kuromame" lang="ja-Latn" file={pronKuromame} />), due to their appearance. This month shows the tran&shy;sition from spring to summer; the lesser cuckoo (<span lang="ja">ホトトギス</span> <Pronounce pronouncer="forsmith" word="hototogisu" lang="ja-Latn" file={pronHototogisu} />) is a bird of summer,<Cite r="FourSeasons" page={1065} pageType="l." /> while wisteria is associated with the passage of spring into summer;<Cite r="FourSeasons" page={1021} pageType="l." /> it is also known as the ‘two-season plant’ (<span lang="ja">二季草</span> <span lang="ja-Latn">niki&shy;sou</span>). Like the bush warbler and spring, the first cry of the cuckoo was considered to announce the beginning of summer. By the time of the <Noun lang="ja-Latn">Edo</Noun> period this was perhaps more of a poetic dream than reality; the poet <a href="https://en.wikipedia.org/wiki/Yosa_Buson"><Noun lang="ja-Latn">Buson</Noun></a> remarked that he had only heard the bird twice, despite living in Kyoto for 20 years.<Cite r="TheClassicTraditionOfHaiku" page={56} /></p>
        <p>The cuckoo swooping in front of the moon is a common motif in Japanese art. It is tempting to claim that this may be a reference to the tale of <Noun lang="ja-Latn">Yorimasa</Noun> from the <Noun lang="ja-Latn">Heike Monogatari</Noun>,<Cite r="HeikeMonogatari" page={[[161, 163]]} /> but the oldest decks do not have a moon on this card.</p>
        <ArticleImage
          size="small"
          alt="The kasu cards of the Echigo-bana pattern which bear the poem."
          src={imgPoem6}>
          <span lang="ja-Latn">Echigo-bana</span> <span lang="ja-Latn">kasu</span> cards, with <span lang="ja-Latn">tanka</span>.
        </ArticleImage>
        <p>The <span lang="ja-Latn">tanka</span> on the <span lang="ja-Latn">kasu</span> cards is similar to Poem 135 from the Summer section of the <Noun lang="ja-Latn">Kokinshū</Noun>,<Footnote>The poem on the card differs slightly in that the last line starts with <span lang="ja-Latn">ima ya</span> <span lang="ja">今や</span> instead of <span lang="ja-Latn">itu ka</span> <span lang="ja">いつか</span>.<Cite r="PoemsOfTheEchigobana" page={100} /></Footnote> perhaps written by <Noun lang="ja-Latn">Kakinomoto no Hitomaro</Noun> <span lang="ja">柿本 人麻呂</span>. The poem again focuses on the transition from spring (represented by wisteria) to summer (represented by the arrival of the cuckoo):</p>
        <div className="multi">
          <p lang="ja" className="vertical-rl">わがやどの<br />池の藤波<br />さきにけり<br />山郭公<br />いつかきなかむ</p>
          <p>At my home<br />On the pond wisteria waves<br />Are breaking:<br />Mountain cuckoo,<br />When might you come and sing?<br /><Cite r="KKS135" /></p>
          <p>Cascades of flowers<br />bloom on the wisteria<br />by my garden lake.<br />When might the mountain cuckoo<br />come with his melodious song?<br /><Cite r="KokinWakashu" page={40} /></p>
        </div>
        {/*TODO: an image showing upside-down wisteria*/}
        <p>In Korean contexts the non-<span lang="ja-Latn">tane</span> wisteria cards are almost always shown upside-down, so that the plants are presented in the same manner as the bush clover in the seventh month. The cards are also referred to as <span lang="ko">흑싸리</span>, “black bush clover”, possibly because wisteria is not native to Korea. The <span lang="ja-Latn">tane</span> card is never shown inverted.</p>
      </Section>
      <Section title={<span lang="ja">5月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda5_1, ""],
            [imgHanafuda5_2, ""],
            [imgHanafuda5_3, ""],
            [imgHanafuda5_4, ""],
          ]}
          source={louieSource}>
          The cards for May depict iris flowers. There is one <span lang="ja-Latn">tane</span> card, one red <span lang="ja-Latn">tanzaku</span> card, and two <span lang="ja-Latn">kasu</span> cards.
        </ArticleImage>
        <p>The fifth month is represented by iris (<span lang="ja">菖蒲</span> <Pronounce pronouncer="akitomo" word="ayame" lang="ja-Latn" file={pronAyame} />); a nickname for the month is <Pronounce pronouncer="skent" word="negi" lang="ja-Latn" file={pronNegi} /> (<span lang="ja">葱</span>, ‘scallion/leek’).<Cite r="HanaAwase" /></p>
        <p>The bridge shown on the <span lang="ja-Latn">tane</span> card is a reference to the ‘eight bridges’ (<span lang="ja">八橋</span> <Pronounce pronouncer="poyotan" word="yatsu&shy;hashi" lang="ja-Latn" file={pronYatsuhashi} />) featured in an episode of the <a href="https://en.wikipedia.org/wiki/The_Tales_of_Ise"><cite>Tales of Ise</cite></a> (<cite lang="ja">伊勢物語</cite> <span lang="ja-Latn">Ise Monogatari</span>), in which the unnamed protagonist<Footnote>Traditionally this is presumed to be the poet <a href="https://en.wikipedia.org/wiki/Ariwara_no_Narihira"><Noun lang="ja-Latn">Ariwara no Narihira</Noun></a> (<span lang="ja">在原 業平</span>).</Footnote> of the story comes across a braided river that is crossed by overlapping planks forming a zig-zag bridge. Challenged to compose a poem on the subject “a traveller’s sentiments”, he recites the following:</p>
        <div className="multi">
          <p lang="ja" className="vertical-rl"><b>か</b>らごろも<br /><b>き</b>つつなれにし<br /><b>つ</b>ましあれば<br /><b>は</b>るばるきぬる<br /><b>た</b>びをしぞおもふ</p>
          <p>I have a beloved wife,<br />Familiar as the skirt<br />Of a well-worn robe,<br />And so this distant journeying<br />Fills my heart with grief.<Cite r="TalesOfIse" page={[[74, 75]]} /></p>
        </div>
        <ArticleImage
          size="small"
          src={imgPoem5} alt="The kasu cards of the Echigo-bana pattern which bear the poem.">
          <span lang="ja-Latn">Echigo-bana</span> <span lang="ja-Latn">kasu</span> cards, with <span lang="ja-Latn">tanka</span>.
        </ArticleImage>
        <p>This poem, which appears in full on the <span lang="ja-Latn">kasu</span> cards of the <span lang="ja-Latn">Echigo-bana</span> pattern,<Cite r="PoemsOfTheEchigobana" page={100} /> is in the form of an acrostic; the first letters of each line spell out <span lang="ja-Latn">kakitsuhata</span> <span lang="ja">かきつはた</span>, which is the name of the Japanese iris (<span lang="ja">杜若</span> <Pronounce pronouncer="kaoring" word="kakitsubata" lang="ja-Latn" file={pronKakitsubata} />).<Footnote>Note that at the time this poem was written, written Japanese did not distinguish between <span lang="ja">は</span> <span lang="ja-Latn">ha</span> and <span lang="ja">ば</span> <span lang="ja-Latn">ba</span>.</Footnote>  Because of this scene, the iris and the planked bridge have a long association in Japan.</p>
        <ArticleImage
          size="extra-wide"
          src={[
            [imgIrises1, ""],
            [imgIrises2, ""],
          ]}
          perRow={2}
          source={{ license: 'cc0' }}>
          <cite>Irises at <Noun lang="ja-Latn">Yatsuhashi</Noun></cite><br /><cite lang="ja">八橋図屏風</cite><br />A pair of screens by the artist <Noun lang="ja-Latn">Ogata Kōrin</Noun> (<span lang="ja">尾形光琳</span>, 1658–1716)
        </ArticleImage>
      </Section>
      <Section title={<span lang="ja">6月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda6_1, ""],
            [imgHanafuda6_2, ""],
            [imgHanafuda6_3, ""],
            [imgHanafuda6_4, ""],
          ]}
          source={louieSource}>
          The cards for June show peony flowers. There is one <span lang="ja-Latn">tane</span> card, one blue/purple <span lang="ja-Latn">tanzaku</span> card, and two <span lang="ja-Latn">kasu</span> cards.
        </ArticleImage>
        <p>The sixth month is represented by the tree peony (<span lang="ja">牡丹</span> <Pronounce pronouncer="ryomasakamoto" word="botan" lang="ja-Latn" file={pronBotan} />). The peony was a much later introduction to Japan than the plants shown on the other cards, being brought over from China in the 8th century.<Cite r="FlowersAndGardensOfJapan" page={159} /></p>
        <p>The flower was considered to be almost too bold for poetry, and those poems which do exist usually mention its striking colour, size, or Chinese origins.</p>
      </Section>
      <Section title={<span lang="ja">7月</span>}>
        <ArticleImage
          position="aside"
          src={imgHagiBoar}
          source={{
            organization: {
              orgName: "Boston Museum of Fine Arts",
              orgAbbr: "MFA"
            },
            originalUrl: "https://collections.mfa.org/objects/234703",
            license: "cc0"
          }}
          alt="A boar rampant under a spray of bush clover blossoms.">
          This print by <Noun lang="ja-Latn">Hiroshige</Noun> featuring a boar and bush clover shows a remarkably similar form to that of the boar card.
        </ArticleImage>
        <ArticleImage
          src={[
            [imgHanafuda7_1, ""],
            [imgHanafuda7_2, ""],
            [imgHanafuda7_3, ""],
            [imgHanafuda7_4, ""],
          ]}
          source={louieSource}>
          The cards for July show bush clover. There is one <span lang="ja-Latn">tanzaku</span> card, one red <span lang="ja-Latn">tanzaku</span> card, and two <span lang="ja-Latn">kasu</span> cards.
        </ArticleImage>
        <ArticleImage
          position="aside"
          alt="Bush clover blooming, with small pink flowers."
          src={imgHagiBloom}
          source={{
            originalUrl: "https://www.flickr.com/photos/yumem/50224773876",
            author: "Atsuhiko Takagi",
            copyrightYear: 2020,
            license: "cc-by-nc-nd",
            licenseVersion: "2.0",
          }}
        >
          Bush clover in bloom.
        </ArticleImage>
        <Footnote standalone>
          One common species of bush clover in Japan is <a href="https://en.wikipedia.org/wiki/Lespedeza_thunbergii"><cite>Lespedeza thunbergii</cite></a>, named after the Swedish botanist Carl Peter Thunberg who visited Japan from 1775–6. Oddly enough, Thunberg also collected some <span lang="ja-Latn">karuta</span> decks during his stay, and was probably the first European to take one back to Europe. His decks are now <a href="http://collections.smvk.se/carlotta-em/web/object/1000639">in the Swedish Museum of Ethnography in Stockholm</a>. (Thanks to Marcus Richert for pointing out this connection.)
        </Footnote>
        <p>The seventh month is represented by bush clover (<span lang="ja">萩</span> <Pronounce pronouncer="strawberrybrown" word="hagi" lang="ja-Latn" file={pronHagi} />). These cards are also nicknamed ‘red bean’ (<span lang="ja">赤豆</span> <span lang="ja-Latn">akamame</span>/<span lang="ja">小豆</span> <Pronounce pronouncer="poyotan" word="azuki" lang="ja-Latn" file={pronAzuki} />). Bush clover is very strongly associated with autumn — the Japanese character <span lang="ja">萩</span> is a composition of <span lang="ja">秋</span> ‘autumn’ and <span lang="ja">艹</span> (full form <span lang="ja">艸</span>) ‘grass’.</p>
        <ArticleImage
          src={imgHagiTemple}
          source={{ license: "cc0" }}
          alt="Under a full moon, figures walk amongst flowerbeds in a temple courtyard.">
          People viewing <span lang="ja-Latn">hagi</span> flowers at <a href="https://en.wikipedia.org/wiki/Taiy%C5%AB-ji"><Noun lang="ja-Latn">Taiyū</Noun> temple</a> (<span lang="ja">太融寺</span>), by <Noun lang="ja-Latn">Hasegawa Sadanobu</Noun>  (<span lang="ja">長谷川貞信</span>).
        </ArticleImage>
        <p>Bush clover is also (along with miscanthus, see the next month) considered one of the “seven flowers of autumn” (<span lang="ja">秋の七草</span>), a term which derives from a pair of poems in the <Noun lang="ja-Latn">Man’yōshū</Noun> (book 8:1537–8):<Cite r="TheManyoshu" page={212} /></p>
        <div className="multi">
          <p>
            The flowers that blow<br />
            In the autumn fields<br />
            When I count them on my fingers,<br />
            There they are—<br />
            The flowers of seven kinds.
          </p>
          <p>
            They are the bush-clover,<br />
            The ‘tail flower’, the flowers<br />
            Of the kuzu vine and patrinia,<br />
            The fringed pink, and the agrimony,<br />
            And last the blithe ‘morning face’.
          </p>
        </div>
        <p>The bush clover is referred to in the <Noun lang="ja-Latn">Man’yōshū</Noun> even more than the plum or cherry blossoms.<Cite r="ElementsOfJapaneseDesign" page={54} /></p>
        <p>
          On the other hand, the wild boar pictured on the <span lang="ja-Latn">tane</span> card does not feature in any of the imperial poetry collections. As a representative of rural life, it was considered to be outside the boundaries of the aristocratic worldview of the poets.
          For the common people, however, the boar was very important as a source of food. When <a href="https://en.wikipedia.org/wiki/Emperor_Tenmu">Emperor Tenmu</a> banned the consumption of meat in 675, only cattle, horses, dogs, monkeys, and chickens were prohibited.<Cite r="FourSeasons" page={4261} pageType="l." /> Wild game such as boar and deer were not included: either they escaped the imagination of the Emperor, or they were too important as food sources for commoners.
        </p>
        <p>

        </p>
        {/* Deer is associated with bush clover but instead we have a boar? But also
        deer are renowned for being separated from their lovers... */}
      </Section>
      <Section title={<span lang="ja">8月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda8_1, ""],
            [imgHanafuda8_2, ""],
            [imgHanafuda8_3, ""],
            [imgHanafuda8_4, ""],
          ]}
          source={louieSource}>
          The cards for August show waving fields of miscanthus, also known as silvergrass. There is one bright card, one <span lang="ja-Latn">tane</span> card, and two <span lang="ja-Latn">kasu</span> cards.
        </ArticleImage>
        <ArticleImage
          position="aside"
          size="wide"
          alt="Miscanthus brushes in the sun."
          src={imgMiscanthus}
          source={{
            originalUrl: "https://www.flickr.com/photos/mana_wu/4161937912",
            author: "mana_wu",
            copyrightYear: 2009,
            license: "cc-by-nc-nd",
            licenseVersion: "2.0",
          }}>
          Miscanthus plumes.
        </ArticleImage>
        <p>The eighth month is represented by miscanthus or silvergrass (<span lang="ja">芒/薄</span> <Pronounce pronouncer="kaoring" word="susuki" lang="ja-Latn" file={pronSusuki} />). It can also be called <span lang="ja-Latn">tsuki</span> (<span lang="ja">月</span>, ‘moon’),<Cite r="WanderingWords" page={194} /> or <span lang="ja-Latn">oka</span> (<span lang="ja">丘</span> ‘hill’).<Cite r="FolkloreAndSymbolismOfFlowersPlantsAndTrees" page={107} /></p>
        <p>The bold moon card is possibly the most well-recognized of all <span lang="ja-Latn">hanafuda</span> cards. It is the standard card chosen as a representive emoji: 🎴 On printed cards, the fields of grass are often simplified into solid black circles. Because of the resemblance of this to the head of a bald man, another nickname for this month is ‘baldy’ (<span lang="ja">坊主</span> <Pronounce pronouncer="skpronounce" word="bōzu" lang="ja-Latn" file={pronBozu} />), a slang term for a Buddhist monk.</p>
        <p>Traditionally, the most important date of the year for moon viewing was the 15th day of the 8th month (<span lang="ja">中秋観月</span> <span lang="ja-Latn">chūshū kangetsu</span>);<Cite r="WorldOfTheShiningPrince" page={176} /> the full moon always fell on the 15th due to the way the calendar was constructed.<Cite r="WorldOfTheShiningPrince" page={170} /></p>
        <div className="multi">
          <ArticleImage
            size="small"
            src={imgPoem3}
            alt="The kasu cards of the Echigo-bana pattern which bear a poem.">
            <span lang="ja-Latn">Echigo-bana</span> <span lang="ja-Latn">kasu</span> cards, with <span lang="ja-Latn">tanka</span>.
          </ArticleImage>
          <ArticleImage
            size="small"
            src={imgAwaJunk8}
            alt="The kasu cards of the Awa-bana pattern which bears a different portion of the poem.">
            <span lang="ja-Latn">Awa-bana</span> <span lang="ja-Latn">kasu</span> cards, with reduced form of the <span lang="ja-Latn">tanka</span>.
          </ArticleImage>
        </div>
        <p><Cite r="PoemsOfTheEchigobana" inline /> says that the poem on the <span lang="ja-Latn">Echigo-bana</span> <span lang="ja-Latn">kasu</span> cards is “untranslatable”, because it has been corrupted, but that it is based on poem 422 of the <Noun lang="ja-Latn">Shin Kokinshū</Noun>:</p>
        <Footnote standalone>This poem was composed by <Noun lang="ja-Latn"><a href="https://en.wikipedia.org/wiki/Kuj%C5%8D_Yoshitsune">Fujiwara no Yoshitsune</a></Noun> (<span lang="ja">藤原良経</span>, 1169–1206).</Footnote>
        <div className="multi">
          {/*
          <p lang="ja" className="vertical-rl">
            行く末𛂞<br/>雲もひと𛁩に<br/>むさ𛁅の<br/>陰𛂜原より<br/>?𛂦る月影
          </p>
          */}
          <p lang="ja" className="vertical-rl">
            行く末は<br />空もひとつの<br />武蔵野に<br />草の原より<br />出づる月影
          </p>
          <p>
            Its destination:<br /> The skies, one with<br /> Musashi Plain, where<br /> From among the fields of grass<br /> Emerges moonlight.<br /><Cite r="SKKS442" />
          </p>
        </div>
        <p>The <span lang="ja-Latn">Awa-bana kasu</span> carry a shortened version, with the two cards carrying mirror versions:</p>
        <div className="multi">
          <p lang="ja" className="vertical-rl">
            月のけ𛀆<br />
            むさしのゝ𛂦ら<br />
            <br />
            むさしの〻<br />
            月𛂜け𛀆
          </p>
          <p lang="ja" className="vertical-rl">
            月の景武蔵野の原<br />
            武蔵野の月の景
          </p>
          <p>View of the moon: <Noun lang="ja-Latn">Musashino</Noun> plain<br /><br /><Noun lang="ja-Latn">Musashino</Noun>’s view of the moon</p>
        </div>
        <br />
        <ArticleImage
          size="wide"
          src={imgSC14}
          alt="Three horsemen crossing a grassy plain at night, while geese fly past the moon."
          source={{
            license: 'cc0',
            organization: { orgName: 'Boston Museum of Fine Arts' },
            originalUrl: "https://www.mfa.org/collections/object/musashi-plain-musashino-from-the-series-famous-places-in-the-provinces-shokoku-meisho-233023"
          }} >
          <cite>Famous places in the provinces: <Noun lang="ja-Latn">Musashi</Noun> Plain</cite><br /><cite lang="ja">諸国名所　武蔵野</cite><br />A woodblock print by <Noun lang="ja-Latn">Totoya Hokkei</Noun> (<span lang="ja">魚屋 北渓</span>, 1780–1850)
        </ArticleImage>
      </Section>
      <Section title={<span lang="ja">9月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda9_1, ""],
            [imgHanafuda9_2, ""],
            [imgHanafuda9_3, ""],
            [imgHanafuda9_4, ""],
          ]}
          source={louieSource}>
          The cards for September show chrysanthemums. There is one <span lang="ja-Latn">tane</span> card, one blue/purple <span lang="ja-Latn">tanzaku</span> card, and two <span lang="ja-Latn">kasu</span> cards.
        </ArticleImage>
        <Footnote standalone>
          <p>A story invented by <Noun lang="ja-Latn">Tendai</Noun> monks in the 14th century <Noun lang="ja-Latn">Taiheiki</Noun> (<span lang="ja">太平記</span> ‘Chronicle of Great Peace’) provides retroactive justification for the festival:<Cite r="ChigoJapanese" page={[[958, 959]]} /> King <Noun lang="zh-Latn">Mu</Noun>’s (<span lang="zh">周穆王</span>) favourite, a young boy, is banished to a remote mountain. Following the king’s advice, he recites passages of the Buddhist Lotus Sūtra, and writes them upon on chrysanthemum flowers. Dew collecting on the flowers drips into the river from which he drinks. Eight hundred years later he has not aged a day, and he returns to court as the legendary <Noun lang="zh-Latn">Peng Zu</Noun> (<span lang="zh">彭祖</span>) during the reign of King <Noun lang="zh-Latn">Wen</Noun> (<span lang="zh">周文王</span>, <abbr title="reigned">r.</abbr> 1112–1050 <abbr className="initialism">BCE</abbr>), who subsequently institutes the festival.</p>
        </Footnote>
        <p>The ninth month is represented by chrysanthemum (<span lang="ja">菊</span> <Pronounce pronouncer="akitomo" word="kiku" lang="ja-Latn" file={pronKiku} />). The <span lang="ja-Latn">tane</span> card depicts a sake cup, which is an implement of <Pronounce pronouncer="skent" word="chōyō" lang="ja-Latn" file={pronChoyo} /> <span lang="ja">重陽</span>, the chrysanthemum festival, which is held on the 9th day of the 9th month. Because chrysanthemum blooms for a long time, it had become a symbol of long life in China, and the festival was introduced into Japan by the court of Emperor <Noun lang="ja-Latn">Kanmu</Noun> (<span lang="ja">桓武天皇</span>, 735–806).<Cite r="FourSeasons" page={1214} pageType="l." /></p>
        <p>During the festival, chrysanthemum petals are added to sake and consumed. The sake cup (<span lang="ja">杯</span> <span lang="ja-Latn">sakazuki</span>) pictured on the card has the character <span lang="ja">壽/寿</span> (<Pronounce pronouncer="strawberrybrown" word="kotobuki" lang="ja-Latn" file={pronKotobuki} />), meaning ‘long life’, written on it in a cursive script.</p>
        <p>A poem by <Noun lang="ja-Latn">Bashō</Noun> commemorates the evening of the 9th day of the 9th month, in 1691. He was staying at the temple <Noun lang="ja-Latn">Gichu-ji</Noun> (<span lang="ja">義仲寺</span>) in a hermitage known as ‘name&shy;less hut’ (<span lang="ja">無名庵</span> <Noun lang="ja-Latn">Mumyō-an</Noun>), when his disciple <Noun lang="ja-Latn">Kawai Otokuni</Noun> (<span lang="ja">河合乙州</span>) came to visit him with a gift:</p>
        <blockquote>
          <p><span lang="ja">草の戸や日暮てくれし菊の酒</span></p>
        </blockquote>
        <blockquote>
          <p>
            this grass door—<br />dusk arrives with a present<br />of chrysanthemum sake<Cite r="GreveSake" />
          </p>
        </blockquote>
        <ArticleImage
          src={imgImperialSealOfJapan}
          position="aside"
          size="small"
          alt="A very stylized image of a chrysanthemum with 16 petals radiating outward."
          source={{
            license: "cc0",
            originalUrl: "https://commons.wikimedia.org/wiki/File:Imperial_Seal_of_Japan.svg",
            author: {
              given: "Philip",
              family: "Nilsson",
            },
            copyrightYear: 2006,
          }}>
          The Imperial Seal of Japan.
        </ArticleImage>
        <p>Chrysanthemums were also prized for their secular beauty, and collectors competed to breed particularly beautiful varieties.</p>
        <p>The chrysanthemum is also used as a symbol by the Emperor of Japan. It was first adopted by <a href="https://en.wikipedia.org/wiki/Emperor_Go-Toba">Emperor <Noun lang="ja-Latn">Go-Toba</Noun></a> (<abbr title="reigned">r.</abbr> 1183–1198), but was not restricted to this purpose until the <Noun lang="ja-Latn">Meiji</Noun> period. In modern times a stylized version of the chrysanthemum flower is used as the Chrysanthemum Seal (<span lang="ja">菊紋</span> <span lang="ja-Latn">kikumon</span>), which is the crest of the Emperor of Japan (who uses a 16-petal version) and other members of the imperial family (who use a 14-petal version).</p>
      </Section>
      <Section title={<span lang="ja">10月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda10_1, ""],
            [imgHanafuda10_2, ""],
            [imgHanafuda10_3, ""],
            [imgHanafuda10_4, ""],
          ]}
          source={louieSource}>
          The cards for October show fallen maple leaves. There is one <span lang="ja-Latn">tane</span> card, one blue/purple <span lang="ja-Latn">tanzaku</span> card, and two <span lang="ja-Latn">kasu</span> cards.
        </ArticleImage>
        <ArticleImage
          position="aside"
          size="wide"
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
        <p>The tenth month is represnted by autumn leaves/maple (<span lang="ja">紅葉</span> <span lang="ja-Latn">momiji</span>/<Pronounce pronouncer="El55" word="kōyō" lang="ja-Latn" file={pronKoyo} />). The <span lang="ja-Latn">tane</span> card features a deer who is looking back over its shoulder, sometimes inspecting a twig. A reference to this card, the ‘10-point deer’ (<span lang="ja">鹿十</span> <span lang="ja-Latn">shikato</span>) has thus become a slang term <span lang="ja-Latn">shikato</span> (<span lang="ja">しかと</span>) meaning to ignore or neglect.</p>
        <ArticleImage
          alt=""
          src={imgTatsutagawaPrint}
          source={{
            organization: { orgName: "British Museum" },
            originalUrl: 'https://www.britishmuseum.org/collection/object/A_2008-3037-10615',
            license: 'cc-by-nc-sa',
            licenseVersion: '4.0'
          }}>
          The poet <Noun lang="ja-Latn">Narihira</Noun> gazes at leaves floating on the <Noun lang="ja-Latn">Tatsuta</Noun> river. The print features one of his poems about the river from the <a href="https://en.wikipedia.org/wiki/Ogura_Hyakunin_Isshu"><cite lang="ja-Latn">Hyakunin Isshu</cite></a>.
        </ArticleImage>
        <ArticleImage
          noborder
          position="aside"
          size="small"
          alt="A combination Hanafuda-Western playing cards tobacco card with maple leaves floating on water, and the 10 of spades."
          src={require('./Murai4.jpg')}>
          This <Noun lang="ja-Latn">Murai</Noun> Brothers tobacco card shows maple leaves floating on water.
        </ArticleImage>
        <p>While the leaves on the <span lang="ja-Latn">tane</span> card are attached to a tree, the leaves on the other cards appear to be floating on water. This could be a reference to the <Noun lang="ja-Latn">Tatsuta</Noun> river (<span lang="ja">竜田川</span>), which was as famous for autumn foliage as <Noun lang="ja-Latn">Yoshino</Noun> was for cherry blossoms in the spring.<Cite r="FourSeasons" page={1756} pageType="l." /> A anonymous poem from the <cite>Kokinshū</cite> (V: 283) celebrates the leaves floating on its surface:</p>
        <div className="multi">
          <p lang="ja">
            龍田河も<br />
            みぢみだれて<br />
            流るめり<br />
            わたらば錦<br />
            なかやたえなむ
          </p>
          <p>
            Beautiful is the Tatsuta<br />
            With Autumn’s brightest weaving;<br />
            If I cross the stream,<br />
            Alas! the brocade will be rudely rent.<Cite r="JapaneseFloralCalendar" page={43} />
          </p>
        </div>
        <ArticleImage
          size="small"
          src={imgPoem2}
          alt="The kasu cards of the Echigo-bana pattern which bear the poem.">
          <span lang="ja-Latn">Echigo-bana</span> <span lang="ja-Latn">kasu</span> cards, with <span lang="ja-Latn">tanka</span>.
        </ArticleImage>
        <p>The poem on the <span lang="ja-Latn">Echigo-bana</span> <span lang="ja-Latn">kasu</span> cards is Poem 437 from the ‘Autumn 2’ section of the <Noun lang="ja-Latn">Shin Kokinshū</Noun>. It was composed by <Noun lang="ja-Latn">Fujiwara no Ietaka</Noun> (<span lang="ja">藤原家隆</span>, 1158–1237), upon the finalization of the poetry collection:<Cite r="MakingShinkokinshu" page={318} /></p>
        <div className="multi">
          <p lang="ja" className="vertical-rl">
            したもみぢ<br />かつちる山の<br />ゆふしぐれ<br />ぬれてやひとり<br />鹿のなくらん
          </p>
          <p>
            From the lower branches<br />Maple leaves scatter<br />In Autumn showers on the mountain.<br />Is it because he is wet<br />That the lonely stag is belling?
          </p>
        </div>
      </Section>
      <Section title={<span lang="ja">11月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda11_1, ""],
            [imgHanafuda11_2, ""],
            [imgHanafuda11_3, ""],
            [imgHanafuda11_4, ""],
          ]}
          source={louieSource}>
          The cards for November show willow trees. There is one bright card, one <span lang="ja-Latn">tane</span> card, one red <span lang="ja-Latn">tanzaku</span> card, and one <span lang="ja-Latn">kasu</span> card.
        </ArticleImage>
        <p>The eleventh month is represented by willow (<span lang="ja">柳</span> <Pronounce pronouncer="akitomo" word="yanagi" lang="ja-Latn" file={pronYanagi} />); it is also often referred to as ‘rain’ (<span lang="ja">雨</span> <Pronounce pronouncer="strawberrybrown" word="ame" lang="ja-Latn" file={pronAme} />) or ‘drizzle’ (<span lang="ja">時雨</span> <Pronounce pronouncer="akitomo" word="shigure"
          lang="ja-Latn" file={pronShigure} />).</p>
        <p>These cards have a strange relationship to the others — in many games they have special powers, or they are valued lower than the cards of other months. For ex&shy;ample, the bright of November will often score less than the other four brights, and in some games the “lightning card” has special powers, such as being able to match any other card.</p>
        <Footnote standalone>
          <p>It has been suggested (e.g. by author <Noun lang="ja-Latn">Murai Shōzō</Noun> <span lang="ja">村井省三</span> and by <Noun lang="ja-Latn">Ōishi Tengudō</Noun><Cite r="OishiSadakuro" />) that the running “Umbrella Man” has its origins in the character of <Noun lang="ja-Latn">Sadakurō</Noun> from the <span lang="ja-Latn">bunraku</span> play <cite>The Treasury of Loyal Retainers</cite> (<cite lang="ja">仮名手本忠臣蔵</cite> <cite lang="ja-Latn">Kanadehon Chūshingura</cite>), written in 1748. However, as <Noun lang="ja-Latn">Ebashi</Noun> points out,<Cite r="EbashiSadakuro" /> the <span lang="ja-Latn">hana-awase</span> deck pictured at the top of this article contains an “Umbrella Man”. This precludes the <Noun lang="ja-Latn">Sadakurō</Noun> origin story, as the play was written some 40 years after that deck was produced.</p>
          <ArticleImage
            noborder
            size="small"
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
        <p>The man pictured on the bright card is the poet <Noun lang="ja-Latn">Ono no Michikaze</Noun> (<span lang="ja">小野道風</span>), who is considered to be one of the founders of Japanese calligraphy. The jumping frog re&shy;calls an episode in his life: he had failed seven times to achieve a promotion, and was considering abandoning his attempts. One day, walking beside a stream, he saw a frog attempting to jump onto a willow branch. Seven times it jumped, and seven times it failed. On the eighth attempt, the frog reached the branch successfully. <Noun lang="ja-Latn">Michikaze</Noun> was thus inspired to persevere with his attempts.<Cite r="AnimalInFarEasternArt" page={[[86, 87]]} /></p>
        <p>On older decks a different “rain man” is pictured. On these cards the man is running in the rain with the umbrella closed around his head. This feature is preserved in the <Noun lang="ja-Latn">Echigo-bana</Noun> pattern.</p>
        <ArticleImage
          size="small"
          position="left"
          src={imgEkbRainman}
          alt="A card with a picture of a figure carrying an umbrella and walking away from the viewer; the figure has a fluffy orange tail.">
          The <Noun lang="ja-Latn">Echigo-kobana</Noun> “rain man” appears to be some kind of animal.
        </ArticleImage>
        <p>On the <Noun lang="ja-Latn">Echigo-kobana</Noun>’s “rain man” card, the figure has a bushy tail and appears to be either a <span lang="ja-Latn">kitsune</span>, a Japanese fox/spirit; or a <span lang="ja-Latn">tanuki</span>, the raccoon-dog. I am not sure of the significance of this.</p>
        <p>The “lightning card” mentioned above is the red-coloured <span lang="ja-Latn">kasu</span> card, which is usually called the ogre card in Japanese (<span lang="ja">鬼札</span> <Pronounce pronouncer="strawberrybrown" word="onifuda" lang="ja-Latn" file={pronOnifuda} />). The drums, which are visible in some patterns, are an attribute of the thunder god <Pronounce noun lang="ja-Latn" word="Raijin" pronouncer="kaori410f" file={pronRaijin} /> (<span lang="ja">雷神</span>).</p>
        <ArticleImage
          position="aside"
          alt="A grinning ogre in a cloud lowers an anchor towards a Taiko drum floating in the ocean."
          source={{ license: "cc0" }}
          src={imgOtsueRaijin}>
          In this <Noun lang="ja-Latn">Ōtsu-e</Noun>, <Noun lang="ja-Latn">Raijin</Noun> attempts to recover his drum.
        </ArticleImage>
        <p>In some older decks, the lightning card depicts a scene derived from <a href="https://en.wikipedia.org/wiki/Otsu-e"><Noun lang="ja-Latn">Ōtsu-e</Noun> prints</a> (<span lang="ja">大津絵</span>), where <Noun lang="ja-Latn">Raijin</Noun> is attempting to ‘fish’ back a drum that he has dropped. Remnants of this design can be seen in many decks of the standard pattern.</p>
        <div className="multi">
          <ArticleImage
            size="small"
            src={imgRaijinCard1}
            alt="">
            A dramatic fishing scene, from <Cite r="DevilsPictureBooks" inline />.
          </ArticleImage>
          <ArticleImage
            size="small"
            src={imgRaijinCardSun}
            alt="Hands extending from a cloud dangle a hooked rope towards a floating drum.">
            A key-block print of the <Noun lang="ja-Latn">Raijin</Noun> scene, from <Cite r="MuraiSun" inline />.
          </ArticleImage>
          <ArticleImage
            size="small"
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
      <Section title={<span lang="ja">12月</span>}>
        <ArticleImage
          src={[
            [imgHanafuda12_1, ""],
            [imgHanafuda12_2, ""],
            [imgHanafuda12_3, ""],
            [imgHanafuda12_4, ""],
          ]}
          source={louieSource}>
          The cards for December show paulownia flowers. There is one bright card and three <span lang="ja-Latn">kasu</span> cards.
        </ArticleImage>
        <Footnote standalone>
          Curiously, the paulownia genus was given its scientific name by Philipp Franz von Siebold, a German botanist who also collected various playing cards from Japan, including <a href="https://www.rekihaku.ac.jp/up-cgi/getimgrd.pl?tn=1&ti=2047&h=./history/w11614825036_3149&ch=1&p=param/pfvs/db_param&o=1&k=50&sf=0&so=&im=0&li=10&fn=0.jpg">a very early <Noun lang="ja-Latn">Hanafuda</Noun> deck.</a>
        </Footnote>
        <ArticleImage
          position="aside"
          alt=""
          src={imgPaulownia}
          source={{
            license: "stock-image",
            organization: { orgName: "Shutterstock.com" },
            author: "Dina Rogatnykh",
            originalUrl: "https://www.shutterstock.com/image-photo/flowers-paulownia-tomentosa-close-666401218"
          }}>
          Flowers of the paulownia tree.
        </ArticleImage>
        <ArticleImage
          position="aside"
          src={imgToyotomiCrest}
          alt=""
          source={{
            license: "stock-image",
            organization: { orgName: "Shutterstock.com" },
            author: "Stray Toki",
            originalUrl: "https://www.shutterstock.com/image-photo/toyotomi-hideyoshi-family-crest-on-roof-1546151357"
          }}>
          The paulownia crest was most famously used by the <Noun lang="ja-Latn">Toyotomi</Noun> family.
        </ArticleImage>
        <p>The twelfth month is represented by paulownia (<span lang="ja">桐</span> <Pronounce pronouncer="kaoring" word="kiri" lang="ja-Latn" file={pronKiri} />). This is a tree that flowers in spring, and has large heart-shaped leaves.</p>
        <p>The paulownia as a symbol was originally used by the imperial family and ranked second only to the chrysanthemum. Use of the paulownia was granted by <a href="https://en.wikipedia.org/wiki/Emperor_Go-Daigo">Emperor <Noun lang="ja-Latn">Go-Daigo</Noun></a> to <a href="https://en.wikipedia.org/wiki/Ashikaga_Takauji"><Noun lang="ja-Latn">Ashikaga Takauji</Noun></a>, whose descendants used it until the end of the <a href="https://en.wikipedia.org/wiki/Ashikaga_shogunate"><Noun lang="ja-Latn">Ashikaga</Noun> shogunate</a> in 1573. After this, <a href="https://en.wikipedia.org/wiki/Emperor_Go-Y%C5%8Dzei">Emperor <Noun lang="ja-Latn">Go-Yōzei</Noun></a> granted use of the crest to <a href="https://en.wikipedia.org/wiki/Toyotomi_Hideyoshi"><Noun lang="ja-Latn">Toyotomi Hideyoshi</Noun></a> (1537–1598), the second of the three “Great Unifiers” of Japan, and today it is most strongly associated with the <Noun lang="ja-Latn">Toyotomi</Noun> family. However, as <Noun lang="ja-Latn">Toyotomi</Noun> in turn allowed its use by so many of his allies, it is also now the most common crest in Japan.</p>
        <p>In modern times, the paulownia symbol is also associated with the government. This use started after the <Noun lang="ja-Latn">Meiji</Noun> restoration, and it appears on the seal of the prime minister’s office. There are many versions of the crest, with the 3–5–3 flower version being most common. The 5-7–5 version is of higher standing and is the one used by the government.</p>
        <p>The wood of the paulownia is light and strong and often used for boxes; it is very fast-growing and also somewhat fire-proof, so was useful as a storage material. Older high-quality <Noun lang="ja-Latn">Hanafuda</Noun> decks came encased in an outer box of paulownia wood. The manufacturer <Noun lang="ja-Latn">Ōishi Tengudo</Noun> still boxes many of their decks in this way.</p>
        <ArticleImage
          src={imgSC152627}
          alt="A phoenix bird swoops down onto a paulownia tree."
          source={{
            originalUrl: "https://www.mfa.org/collections/object/phoenix-and-paulownia-tree-235857",
            license: 'cc0',
            organization: { orgName: "Boston Museum of Fine Arts" },
          }}>
          <cite>Phoenix and Paulownia Tree</cite><br /><cite lang="ja">桐に鳳凰</cite><br />by <Noun lang="ja-Latn">Isoda Koryūsai</Noun> (<span lang="ja">礒田 湖龍斎</span>, 1735–1790)
        </ArticleImage>
        <p>The phoenix (<span lang="ja">鳳凰</span> <Pronounce pronouncer="akitomo" word="hōō" lang="ja-Latn" file={pronHoo} />, or <span lang="zh-Latn">fèng&shy;huáng</span> in Mandarin Chinese) featured on the bright card is from Japanese mythology, and was traditionally associated with the empress of Japan. According to legend the phoenix will only land on a paulownia tree. What appear to be ‘spikes’ on the card are really its long tail feathers. This card is sometimes casually referred to as the “rooster” card.</p>
        <p>One of the <span lang="ja-Latn">kasu</span> cards is usually coloured, often yellow, but sometimes with red as well. In some games it becomes a <span lang="ja-Latn">tane</span> card, or even a <span lang="ja-Latn">tanzaku</span> card.</p>
        <div className="multi">
          <ArticleImage
            size="small"
            src={imgEkbJunk12}
            alt="A small Hanafuda card depicting Paulownia with a large red streak across it.">
            One of the Paulownia cards of the <Noun lang="ja-Latn">Echigo-kobana</Noun> pattern has a <span lang="ja-Latn">tanzaku</span>.
          </ArticleImage>
          <ArticleImage
            size="small"
            src={imgAwaJunk12}
            alt="A Hanafuda card depicting Paulownia with a red cloud at the top of it.">
            The yellow-coloured <span lang="ja-Latn">kasu</span> of the <Noun lang="ja-Latn">Awa-bana</Noun> pattern is marked with the red clouds that usually indicate a <span lang="ja-Latn">tane</span> card.
          </ArticleImage>
        </div>
        <p>Usually (in Japanese decks) the manufacturer’s mark is on the coloured <span lang="ja-Latn">kasu</span> card, much like the ace of spades is used in European decks. In Korean decks the mark can also be on the full moon card, or on the jokers.</p>
      </Section>
    </Section>
  </>);
}

export default Hanafuda;
