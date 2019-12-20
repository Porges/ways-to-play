import * as React from 'react';

import { Pronunciation, Noun, ArticleImage, ArticleContentProps, Footnote, SourceInfo } from 'ui';
 
import { OishiSadakuro, EbashiSadakuro, AnIntroductionToJapaneseTeaRitual, HanaAwase, MakingShinkokinshu, GreveSake, TalesOfIse, KKS135, SatireWithinKibyōshi, SKKS442,
AnimalInFarEasternArt, ChigoJapanese, FourSeasons, PoemsOfTheEchigobana, HeikeMonogatari, KokinWakashu } from
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
import { Link } from 'react-router-dom';

const svgSourceInfo: SourceInfo = {
    license: 'gpl',
    licenseVersion: '2.0',
    author: { given: '宇帆', family: '張', familyFirst: true, lang: 'zh' },
    copyrightYear: 2014,
    originalUrl: "https://en.wikipedia.org/wiki/User:A2569875"
}

const Hanafuda: React.FC<ArticleContentProps> = ({cite}) => {
    return (<section>
    <section id="history">
    <section>
      <h2>Origins</h2>
      <p><Noun lang="ja-Latn">Hanafuda</Noun> cards first appeared in Japan in the middle of the <Noun lang="ja-Latn">Edo</Noun> period (1603–1868). The origins of <Noun lang="ja-Latn">Hanafuda</Noun> cards lie in older “object-matching games” (<span lang="ja">物合わせ</span> <span lang="ja-Latn">mono-awase</span>). These were courtly competitions in which various objects were compared as to their qualities: objects that were judged in these competitions included artifacts such as fans or paintings; flowers and plants (chrysanthemums, sweet-flag roots, wild pinks); animals (insects, songbirds); incense; tea{cite(AnIntroductionToJapaneseTeaRitual, [26])}; birds; or shells. The most privileged of these competitions was the poetry match (<span lang="ja">歌合</span> <Noun lang="ja-Latn">uta-awase</Noun>).</p>
      <p>The oldest of these seems to have been a game based upon matching pairs of shells (<span lang="ja">貝合わせ</span> <span lang="ja-Latn">kai-awase</span>). This must have been a difficult game, since there is no way to test if shells truly match without placing them together. Eventually this developed into a memory game played with shells that were elaborately painted on the inside, often with scenes from the Tale of Genji (<span lang="ja">源氏物語</span>) — the game is also played in chapter 45 of the novel itself. Traditional <span lang="ja-Latn">kai-awase</span> sets have up to 360 shells, but modern replicas only have around 54.</p>
      <Footnote>
          <p>During the <Noun lang="ja-Latn">Kansei</Noun> Reforms, gambling was prohibited by the <span lang="ja">博奕賭ノ勝負禁止ノ儀ニ付触書</span>, promulgated by Matsudaira Sadanobu on the 12th of January, 1788.{cite(SatireWithinKibyōshi, [44])}</p>
      </Footnote>
      <p><Noun lang="ja-Latn">Hanafuda</Noun> were introduced during a period where gambling had been banned as part of the <Noun lang="ja-Latn">Kansei</Noun> Reforms (1787–1793). This ban was not lifted until 1886, and the company that was later to become <Noun lang="ja-Latn">Nintendo</Noun> began producing <Noun lang="ja-Latn">Hanafuda</Noun> cards in 1889.</p>
    </section>
    <section>
      <h2>The cards</h2>
      <p>The culture of the <Noun lang="ja-Latn">Edo</Noun> period in which <Noun lang="ja-Latn">Hanafuda</Noun> cards appeared was heavily influenced by the aristocratic culture of the earlier <Noun lang="ja-Latn">Heian</Noun> period (794–1185). As such, the art of the cards abounds with references to <Noun lang="ja-Latn">Heian</Noun> period literature, festivals, and artistic tropes:</p>
      <blockquote className="blockquote">
      <p>With the exception of the peony, which entered the poetic canon in the <Noun lang="ja-Latn">Edo</Noun> period, all the images are from classical poetry of the <Noun lang="ja-Latn">Heian</Noun> period and reflect urban commoners’ knowledge of the poetic and cultural associations of the months.{cite(FourSeasons, [[1739,1741]], {page:"l."})}</p>
      </blockquote>
      <Footnote>
        <p>In Kyoto from the 11th to 13th centuries, the average peak of the cherry blossom season was April 17th.{cite(FourSeasons, [484], { page: "l." })}</p>
      </Footnote>
      <p>While nominally the cards start in ‘January’, at the time the deck was created Japan’s calendar was based upon the lunisolar Chinese calendar, which started in what is now February. This explains why ‘March’ is the month of the cherry blossom when — according to the current calendar — it should be April, and why ‘August’ shows the full moon when the full moon festival (<span lang="ja">月見</span> <Pronunciation src={pronTsukimi} lang="ja-Latn">tsukimi</Pronunciation>) actually falls in September–October.</p>
      <p>However, even with these modifications the eleventh (willow) and twelfth (paulownia) months are in the wrong place. The eleventh month depicts rain, willows, and a frog, all of which are associated with summer.</p>
    </section>
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
        Art in the <span lang="ja-Latn">kachō-ga</span> style: a selection of prints from the series <cite>Forty-Eight Hawks Drawn From Life</cite><br/> <cite lang="ja">生うつし四十八鷹</cite> (1859), by <Noun lang="ja-Latn">Nakayama Sūgakudō</Noun>
    </ArticleImage>
    </section>
    <section id="patterns">
    <h2>Card Patterns</h2>
    <section id="standard">
    <h3>Standard</h3>
    <p>The standard pattern is now one that is called <Pronunciation src={pronHachihachibana} lang="ja-Latn">hachi­hachi-­bana</Pronunciation> (<span lang="ja">八八花</span>/<span lang="ja">八々花</span>), since it was primarily used to play the game <span lang="ja">八八</span> ‘88’. Almost all decks use this pattern, and images from it are used to show the cards of each month below.</p>
    <ArticleImage position="small" src={img5Brights} alt="TODO">The 5 Bright cards of the <span lang="ja-Latn">hachihachi-bana</span> pattern, from a <Noun lang="ja-Latn">Nintendo</Noun> deck.</ArticleImage>
    <h4>Korean deck differences</h4>
    <p>Korean decks also use the standard <span lang="ja-Latn">hachi­hachi­-bana</span> pattern, but the ribbons are usually blue instead of purple, and there is Korean text on the standard three red ribbons (labelled <span lang="ko">홍단</span>, <span lang="ko-Latn">hongdan</span> ‘great rank’) and all three blue ribbons (<span lang="ko">청단</span>, <span lang="ko-Latn">cheongdan</span> ‘blue rank’).</p>
    <ArticleImage
        src={imgKoreanTanzaku}
        alt="Six Hwatu cards showing ribbons with Korean text written on them.">
        Korean <Noun lang="ko-Latn">Hwatu</Noun> cards with ribbons.
    </ArticleImage>
    <p>There are also differences in the rain main (see below), and depending on the deck, other aspects of the cards can also be translated into Korean cultural terms. For example, the lesser cuckoo of the Japanese cards is in some decks the Oriental magpie, which is the national bird of Korea.</p>
    <div className="multi">
        <ArticleImage position="small"
            src={imgKoreanMagpie}
            alt="Two hwatu-format cards: the left shows cherry blossoms with a Korean magpie that has a blue chest with black and yellow wings, while the right shows cherry blossoms with a lesser cuckoo that has a yellow body and green wings.">
            The <span lang="ko">무지개</span> (‘rainbow’) brand <Noun lang="ko-Latn">Hwatu</Noun> deck (on left) features a Korean magpie (<span lang="ko">까치</span>), instead of the usual lesser cuckoo as shown on the Daiso <Noun lang="ko-Latn">Hwatu</Noun>-format deck.
        </ArticleImage>
        <ArticleImage
            position="small"
            src={imgJapanvsKorea}
            alt="Two Hanafuda cards, the first depicting a man wearing Japanese dress, the second wearing Korean.">
        The ‘rain main’ wears traditional clothing in both Japanese and Korean decks. The Japanese man (left) wears a <Noun lang="ja-Latn">Heian</Noun> period courtier’s daily outfit (<span lang="ja">狩衣</span> <span lang="ja-Latn">kariginu</span>), with tall <span lang="ja-Latn">tate-eboshi</span> (<span lang="ja">楯烏帽子</span>) hat, and very tall rain-clogs (<span lang="ja">足駄</span> <span lang="ja-Latn">ashida</span>) on his feet. The Korean man is wearing a noble’s <span lang="ko-Latn">gat</span> (<span lang="ko">갓</span>) hat, and an outer coat with very large sleeves.
        </ArticleImage>
    </div>
    </section>
    <section id="echigo-bana">
        <h3><Noun lang="ja-Latn">Echigo-bana</Noun></h3>
        <p>The regional <Pronunciation src={pronEchigobana} lang="ja-Latn">Echigo-bana</Pronunciation> (<span lang="ja">越後花</span> ‘Echigo flowers’) pattern is based on designs that are older than the standard pattern. The most obvious difference is that all the cards are overpainted with gold and silver in various patterns.</p>
        <ArticleImage
        src={imgEchigoBana}
        alt="Five hanafuda cards which are overpainted in silver and gold paints in various patterns, obscuring the details.">
        The 5 Brights of the <span lang="ja-Latn">Echigo-bana</span> pattern, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
        <p>Some of the junk cards also carry short poems (<span lang="ja">短歌</span> <Pronunciation src={pronTanka} lang="ja-Latn" >tanka</Pronunciation>). Poetry is a common sight on traditional Japanese art — as seen on the <span lang="ja-Latn">kachō-ga</span> prints above — and often provides more context to the images. The poems of the <span lang="ja-Latn">Echigo-bana</span> will be explained below.</p>
    </section>
    <section id="awabanakintokibana">
        <h3><Noun lang="ja-Latn">Awa-­bana</Noun>/<Noun lang="ja-Latn">Kintoki­-bana</Noun></h3>
        <p>This is another regional pattern called <span lang="ja-Latn">Awa­-bana</span> (<span lang="ja">阿波花</span>) or <span lang="ja-Latn">Kintoki­-bana</span> (<span lang="ja">金時花</span>). It originated in <Noun
        lang="ja-Latn">Awa</Noun> province, in what is now <Noun lang="ja-Latn">Tokushima</Noun> prefecture.</p>
        <p>Like the <Noun lang="ja-Latn">Echigo-bana</Noun> pattern, some of the <Noun lang="ja-Latn">Awa-­bana</Noun> carry poems (in fact, they carry the same poems).</p>
        <ArticleImage
            src={imgKintokiBana}
            alt="Five hanafuda cards with bright colours and overpainted with silver.">
            The 5 Brights of the <span lang="ja-Latn">Awa-bana</span> pattern, by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>.
        </ArticleImage>
    </section>
    <section id="modern-novelty-decks">
    <h3>Modern/Novelty decks</h3>
    <p>In addition to the traditional standard patterns, there are also many modern revisions or novelty decks that
    can be found. More information and examples of these can be found in the <Link to="/articles/japan/hanafuda/manufacturers">article about <Noun
    lang="ja-Latn">Hanafuda</Noun> manufacturers</Link>.</p>
    </section>
    </section>
    <section id="the-cards-in-depth">
    <h2>The cards in depth</h2>
    <section id="pine-matsu">
    <h3><span lang="ja">1月</span> — pine (<span lang="ja">松</span> <Pronunciation src={pronMatsu} lang="ja-Latn">matsu</Pronunciation>)</h3>
    <ArticleImage
        src={[
            [imgHanafuda1_4, "A card with a red moon, a crane, and pine trees."],
            [imgHanafuda1_3, "A card with pine trees and a red scroll with writing." ],
            [imgHanafuda1_2, "A card with pine trees." ],
            [imgHanafuda1_1, "A card with pine trees." ],
        ]}
        source={svgSourceInfo}>
      The cards for January feature pine trees. There is one bright card, one scroll card (with text), and two junk cards.
    </ArticleImage>
    <p>The bright card for January shows a crane and pine trees, with the sun rising in the background. Both the crane and the pine are symbols of longevity, so they are a common combination in Japanese art; the mythical Mount <Noun lang="ja-Latn">Hōrai</Noun>, dwelling-place of immortals, is depicted as wooded with pine trees and populated by cranes. The pine is associated with winter and snow, so these cards show the lingering influence of winter during the new year. One traditional new year celebration involved pulling up small pine trees.</p>
    <Footnote>
      <p>The writing on the scroll uses a rare <span lang="ja-Latn">hentaigana</span> character for <span lang="ja-Latn">ka</span>, which is usually written <span lang="ja">か</span>. It may not render correctly on your device.</p>
    </Footnote>
    <p>The text on the scroll reads <span lang="ja-Latn">akayoroshi</span> <span lang="ja">あ𛀙よろし</span>. The meaning of this phrase is unclear, even to <Noun lang="ja-Latn">Hanafuda</Noun> manufacturers, but it may be something like ‘clearly the best’.</p>
    <ArticleImage
        position="small"
        src={imgPoem1}
        alt="The junk cards of the Echigo-bana pattern which bear the poem.">
        <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
    </ArticleImage>
    <Footnote>
        <p><Noun lang="ja-Latn">Mina­moto no Mune­yuki</Noun> (<abbr title="died">d.</abbr> 983) was a Heian era poet, and named one of the ‘Thirty-Six Immortals of Poetry’.</p>
    </Footnote>
    <p>In the <span lang="ja-Latn">Echigo-bana</span> pattern, the junk cards carry a <span lang="ja-Latn">tanka</span> composed by <Noun lang="ja-Latn"><a href="https://en.wikipedia.org/wiki/Minamoto_no_Muneyuki">Mina­moto no Mune­yuki</a></Noun> (<span lang="ja">源宗于</span>) at a poetry competition organized by the Empress during the reign of <a href="https://en.wikipedia.org/wiki/Emperor_Uda">Emperor <Noun lang="ja-Latn">Uda</Noun></a> (<span lang="ja">宇多天皇</span>). It is featured as Poem 24 in the ‘Spring’ section of the <Noun><Pronunciation src={pronKokinWakashu} lang="ja-Latn">Kokin Wakashū</Pronunciation></Noun> (<cite lang="ja">古今和歌集</cite> “Collection of Old and New Poems”):</p>
    <Footnote>
        <p>{cite(PoemsOfTheEchigobana, [4], {inline: true})} notes that in the standard design printed by Nintendo and <Noun lang="ja-Latn">Ōishi Tengudō</Noun>, the card is missing the <span lang="ja">も</span> on the second ‘line’.</p>
    </Footnote>
    <div className="multi">
    <p lang="ja" className="vertical-rl">
    ときはなる<br/>松のみどりも<br/>春くれば<br/>今ひとしほの<br/>色まさりけり
    </p>
    <p>Even the verdure<br/>of foliage on the pine tree,<br/>“ever unchanging”,<br/>deepens into new richness<br/>now that springtime has arrived.{cite(KokinWakashu, [18])}</p>
    </div>
    <p>The junk cards of the <Noun lang="ja-Latn">Awa­-bana</Noun> also carry the same poem.</p>
    </section>
    </section>
    <section id="plum--ume">
    <h3><span lang="ja">2月</span> — plum (<span lang="ja">梅</span> <Pronunciation src={pronUme} lang="ja-Latn" >ume</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda2_4, ""],
            [imgHanafuda2_3, ""],
            [imgHanafuda2_2, ""],
            [imgHanafuda2_1, ""],
        ]}>
        The cards for February feature plum trees in blossom. There is one species card, one scroll card (with text), and two junk cards. The text on the scroll is the same as that on January’s.
    </ArticleImage>
    <p>The bush warbler/plum blossom combination has been associated with the arrival of spring since early times, dating at least from the <Noun lang="ja-Latn">Man’yōshū</Noun> (<span lang="ja">万葉集</span> ‘Collection of Ten Thousand Leaves’), a book of poetry compiled during the <Noun lang="ja-Latn">Nara</Noun> period sometime after 759.{cite(FourSeasons, [978], {page: 'loc.'})} At this time, the plum blossom was the favourite flower; cherry blossoms would only become more favoured during the Heian period.{cite(FourSeasons, [997], {page: 'loc.'})}</p>
    <p>The bush warbler was famed for its song, as shown by this poem from <Noun lang="ja-Latn">Ōe no Chisato</Noun> (<span lang="ja">大江千里</span>), composed during a competition in the <Noun lang="ja-Latn">Kanpyō</Noun> era (889–898). The first cry of the bush warbler was considered to announce the beginning of spring:</p>
    <Footnote>This is Poem 14 from the ‘Spring 1’ section of the <Noun lang="ja-Latn">Kokinshū</Noun>.</Footnote>
    <div className="multi">
      <p lang="ja">うぐひすの谷よりいづるこゑなくは春くることをたれかしらまし</p>
      <p>Without the voice of the warbler that comes out of the valley, how would we know the arrival of spring?{cite(FourSeasons, [952], {page: "loc."})}</p>
    </div>
    <br/>
    <ArticleImage
        position="small"
        src={imgPoem4}
        alt="The junk cards of the Echigo-bana pattern which bear the poem.">
        <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
    </ArticleImage>
    <p>The poem on the <Noun lang="ja-Latn">Echigo-bana</Noun> junk cards (the origin of which is unknown) also describes the call of the bush warbler. Note that while the poem must be describing white plum blossoms (<span lang="ja">白梅</span> <span lang="ja-Latn">hakubai</span>), all <Noun lang="ja-Latn">Hanafuda</Noun> patterns depict red plum blossoms (<span lang="ja">紅梅</span> <span lang="ja-Latn">kōbai</span>), which became more popular later on:</p>
    <div className="multi">
    <p lang="ja" className="vertical-rl">
    鴬の<br/>鳴音はしるき<br/>梅の花<br/>色まがえとや<br/>雪の降るらん
    </p>
    <p>
    The nightingale’s<br/>Song is clear<br/>And the white plum blossom<br/>Becomes lost<br/>In the falling snow.{cite(PoemsOfTheEchigobana, [99])}
    </p>
    </div>
    </section>
    <section id="cherry--sakura">
    <h3><span lang="ja">3月</span> — cherry (<span lang="ja">桜</span> <Pronunciation src={pronSakura} lang="ja-Latn">sakura</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda3_4, ""],
            [imgHanafuda3_3, ""],
            [imgHanafuda3_2, ""],
            [imgHanafuda3_1, ""],
        ]}>
        The cards for March show the famous cherry blossoms of Japan. There is one bright card, one scroll card (with text), and two junk cards.
    </ArticleImage>
    <Footnote>
        Some older cards have variations on this phrase, like <span lang="ja">みよし𛂙</span>, <span lang="ja">美よし𛂙</span>, or <span lang="ja">みよし𛂜</span>.
    </Footnote>
    <ArticleImage
        position="right"
        src={img16944}
        alt="A picture of three women and a man consuming heated sake under a cherry tree in blossom, while surrounded by striped curtains."
        source={{
            license: 'cc0',
            originalUrl: "https://www.flickr.com/photos/library_of_congress/16944707362",
            organization: { orgName: "Library of Congress" }
        }} >
        <cite>3rd Month: Blossom-Viewing in Askukayama</cite><br/><cite lang="ja">三月　飛鳥山花見</cite><br/>by <Noun lang="ja-Latn">Kitao Shigemasa</Noun> (<span lang="ja">北尾 重政</span>, 1739–1820).
    </ArticleImage>
    <p>The scroll of the March cards reads <span lang="ja-Latn">miyoshino</span> <span lang="ja">みよしの</span> ‘beautiful <Noun lang="ja-Latn">Yoshino</Noun>’. This is a reference to the mountainous area of <Noun lang="ja-Latn">Yoshino</Noun> (<span lang="ja">吉野</span>) in <Noun lang="ja-Latn">Nara</Noun> prefecture, which is famous for its cherry blossoms.</p>
    <p>Blossom-viewing (<span lang="ja">花見</span> <Pronunciation lang="ja-Latn" src={pronHanami}>hanami</Pronunciation>), parti­cularly of cherry blossoms, is a custom that dates back to the Heian period.</p>
    <p>The curtains (<span lang="ja">幕</span> <Pronunciation src={pronMaku} lang="ja-Latn">maku</Pronunciation>) on the bright card are for providing privacy whilst viewing cherry blossoms. An example of their use can be seen in the image on the right. It was common to use striped fabric, particularly in red &amp; white, while nobility would use curtains bearing their family crest.</p>
    </section>
    <section id="wisteria--fuji">
    <h3><span lang="ja">4月</span> — wisteria (<span lang="ja">藤</span> <Pronunciation src={pronFuji} lang="ja-Latn" >fuji</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda4_4, ""],
            [imgHanafuda4_3, ""],
            [imgHanafuda4_2, ""],
            [imgHanafuda4_1, ""],
        ]}>
        The cards for April show the drooping branches of wisteria. There is one species card, one red scroll card, and two junk cards.
    </ArticleImage>
    <p>The cards for April are also nicknamed ‘black bean’ (<span lang="ja">黒豆</span> <Pronunciation src={pronKuromame} lang="ja-Latn">kuromame</Pronunciation>), due to their appearance. This month shows the transition from spring to summer; the lesser cuckoo (<span lang="ja">ホトトギス</span> <Pronunciation
    src={pronHototogisu} lang="ja-Latn">hototogisu</Pronunciation>) is a bird of summer,{cite(FourSeasons, [1065], {page:"l."})} while wisteria is associated with the end of spring.{cite(FourSeasons, [1021], {page:"l."})} Like the bush warbler and spring, the first cry of the cuckoo was considered to announce the beginning of summer.</p>
    <p>The cuckoo swooping in front of the moon is a common motif in Japanese art. It is tempting to claim that this may be a reference to the tale of <Noun lang="ja-Latn">Yorimasa</Noun> from the <Noun lang="ja-Latn">Heike Monogatari</Noun>,{cite(HeikeMonogatari, [[161,163]])} but the oldest decks do not have a moon on this card.</p>
    <ArticleImage
        position="small"
        alt="The junk cards of the Echigo-bana pattern which bear the poem."
        src={imgPoem6}>
        <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
    </ArticleImage>
    <Footnote>
      The poem on the card differs slightly in that the last line starts with <span lang="ja-Latn">ima ya</span> <span lang="ja">今や</span> instead of <span lang="ja-Latn">itu ka</span> <span lang="ja">いつか</span>.{cite(PoemsOfTheEchigobana, [100])}
    </Footnote>
    <p>The <span lang="ja-Latn">tanka</span> on the junk cards is similar to Poem 135 from the Summer section of the <Noun lang="ja-Latn">Kokinshū</Noun>. This poem (perhaps written by <Noun lang="ja-Latn">Kakinomoto no Hitomaro</Noun> <span lang="ja">柿本 人麻呂</span>) again focuses on the transition from spring (represented by wisteria) to summer (represented by the arrival of the cuckoo):</p>
    <div className="multi">
        <p lang="ja" className="vertical-rl">わがやどの<br/>池の藤波<br/>さきにけり<br/>山郭公<br/>いつかきなかむ</p>
        <p>At my home<br/>On the pond wisteria waves<br/>Are breaking:<br/>Mountain cuckoo,<br/>When might you come and sing?<br/>{cite(KKS135)}</p>
        <p>Cascades of flowers<br/>bloom on the wisteria<br/>by my garden lake.<br/>When might the mountain cuckoo<br/>come with his melodious song?<br/>{cite(KokinWakashu, [40])}</p>
    </div>
    </section>
    <section id="iris--ayame">
    <h3><span lang="ja">5月</span> — iris (<span lang="ja">菖蒲</span> <Pronunciation src={pronAyame} lang="ja-Latn" >ayame</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda5_4, ""],
            [imgHanafuda5_3, ""],
            [imgHanafuda5_2, ""],
            [imgHanafuda5_1, ""],
        ]}>
        The cards for May depict iris flowers. There is one species card, one red scroll card, and two junk cards.
    </ArticleImage>
    <p>A nickname for the month is <Pronunciation src={pronNegi} lang="ja-Latn">negi</Pronunciation> (<span lang="ja">葱</span>, ‘scallion/leek’).{cite(HanaAwase)}</p>
    <Footnote>
        <p>Traditionally the protagonist is presumed to be the poet <Noun lang="ja-Latn">Ariwara no Narihira</Noun> (<span lang="ja">在原 業平</span>).</p>
    </Footnote>
    <p>The bridge shown on the species card is a reference to the ‘eight bridges’ (<span lang="ja">八橋</span> <Pronunciation src={pronYatsuhashi} lang="ja-Latn">yatsuhashi</Pronunciation>) featured in an episode of the <cite>Tales of Ise</cite> (<cite lang="ja">伊勢物語</cite> <span lang="ja-Latn">Ise Monogatari</span>), in which the unnamed protagonist of the story comes across a braided river that is crossed by eight overlapping planks forming a zig-zag bridge. Challenged to compose a poem on the subject “a traveller’s sentiments”, he recites the following:</p>
    <section>
    <ArticleImage
        position="left"
        src={imgPoem5} alt="The junk cards of the Echigo-bana pattern which bear the poem.">
        <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
    </ArticleImage>
    <div className="multi">
        <p lang="ja" className="vertical-rl"><b>か</b>らごろも<br/><b>き</b>つつなれにし<br/><b>つ</b>ましあれば<br/><b>は</b>るばるきぬる<br/><b>た</b>びをしぞおもふ</p>
        <p>I have a beloved wife,<br/>Familiar as the skirt<br/>Of a well-worn robe,<br/>And so this distant journeying<br/>Fills my heart with grief.{cite(TalesOfIse, [[74, 75]])}</p>
    </div>
    </section>
    <Footnote>
        <p>Note that at the time this poem was written, written Japanese did not distinguish between <span lang="ja">は</span> <span lang="ja-Latn">ha</span> and <span lang="ja">ば</span> <span lang="ja-Latn">ba</span>.</p>
    </Footnote>
    <p>This poem, which appears in full on the junk cards of the <span lang="ja-Latn">Echigo-bana</span> pattern,{cite(PoemsOfTheEchigobana, [100])} is in the form of an acrostic; the first letters of each line spell out <span lang="ja-Latn">kakitsuhata</span> <span lang="ja">かきつはた</span>, which is a reference to the name of the Japanese iris <span lang="ja">杜若</span> <Pronunciation src={pronKakitsubata} lang="ja-Latn">kakitsubata</Pronunciation>.  Because of this scene, the iris and the planked bridge have a long association in Japan.</p>
    <ArticleImage
        position="wide"
        src={[
            [imgIrises1, ""],
            [imgIrises2, ""],
        ]}
        perRow={1}
        source={{license: 'cc0'}}>
        <cite>Irises at <Noun lang="ja-Latn">Yatsuhashi</Noun></cite><br/><cite lang="ja">八橋図屏風</cite><br/>A pair of screens by the artist <Noun lang="ja-Latn">Ogata Kōrin</Noun> (<span lang="ja">尾形光琳</span>, 1658–1716) 
    </ArticleImage>
    </section>
    <section id="peony--botan">
    <h3><span lang="ja">6月</span> — peony (<span lang="ja">牡丹</span> <Pronunciation src={pronBotan} lang="ja-Latn" >botan</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda6_4, ""],
            [imgHanafuda6_3, ""],
            [imgHanafuda6_2, ""],
            [imgHanafuda6_1, ""],
        ]}>
        The cards for June show peony flowers. There is one species card, one blue/purple scroll card, and two junk cards.
    </ArticleImage>
    </section>
    <section id="bush-clover--hagi">
    <h3><span lang="ja">7月</span> — bush clover (<span lang="ja">萩</span> <Pronunciation src={pronHagi} lang="ja-Latn" >hagi</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda7_4, ""],
            [imgHanafuda7_3, ""],
            [imgHanafuda7_2, ""],
            [imgHanafuda7_1, ""],
        ]}>
        The cards for July show bush clover. There is one species card, one red scroll card, and two junk cards.
    </ArticleImage>
    <p>The cards for July are also nicknamed ‘red bean’ (<span lang="ja">赤豆</span> <span lang="ja-Latn">akamame</span>/<span lang="ja">小豆</span> <Pronunciation src={pronAzuki} lang="ja-Latn">azuki</Pronunciation>). Bush clover is very strongly associated with autumn — the Japanese character <span lang="ja">萩</span> is a composition of <span lang="ja">秋</span> ‘autumn’ and <span lang="ja">艹</span> (full form <span lang="ja">艸</span>) ‘grass’.</p>
    {/* Deer is associated with bush clover but instead we have a boar? But also
    deer are renowned for being separated from their lovers... */}
    </section>
    <section id="miscanthussilvergrass--susuki">
    <h3><span lang="ja">8月</span> — miscanthus/silvergrass (<span lang="ja">芒/薄</span> <Pronunciation src={pronSusuki} lang="ja-Latn">susuki</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda8_4, ""],
            [imgHanafuda8_3, ""],
            [imgHanafuda8_2, ""],
            [imgHanafuda8_1, ""],
        ]}>
      The cards for August show waving fields of miscanthus, also known as silvergrass. There is one bright card, one species card, and two junk cards.
    </ArticleImage>
    <p>On printed cards, the fields of grass are often simplified into solid black circles. Because of the resemblance of this to the head of a bald man, one nickname for the cards is ‘baldy’ (<span lang="ja">坊主</span> <Pronunciation src={pronBozu} lang="ja-Latn">bōzu</Pronunciation>), a slang term for a Buddhist monk.</p>
    <ArticleImage
        position="wide"
        src={imgSC14} 
        alt="Three horsemen crossing a grassy plain at night, while geese fly past the moon."
        source={{
            license: 'cc0',
            organization: { orgName: 'Boston Museum of Fine Arts' },
            originalUrl: "https://www.mfa.org/collections/object/musashi-plain-musashino-from-the-series-famous-places-in-the-provinces-shokoku-meisho-233023"
        }} >
        <cite>Famous places in the provinces: <Noun lang="ja-Latn">Musashi</Noun> Plain</cite><br/><cite lang="ja">諸国名所　武蔵野</cite><br/>A woodblock print by <Noun lang="ja-Latn">Totoya Hokkei</Noun> (<span lang="ja">魚屋 北渓</span>, 1780–1850)
    </ArticleImage>
    <ArticleImage
        position="small"
        src={imgPoem3}
         alt="The junk cards of the Echigo-bana pattern which bear the poem.">
        <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
    </ArticleImage>
    <p>{cite(PoemsOfTheEchigobana, undefined, {inline: true})} says that the poem on the <span lang="ja-Latn">Echigo-bana</span> junk cards is “untranslatable”, because it has been corrupted. His contact believes it is meant to be poem 422 of the <Noun lang="ja-Latn">Shin Kokinshū</Noun>, or perhaps a revision of it:</p>
    <div className="multi">
    <p lang="ja" className="vertical-rl">
    行く末は<br/>空もひとつの<br/>武蔵野に<br/>草の原より<br/>出づる月影
    </p>
    <p>
    Its destination:<br/> The skies, one with<br/> Musashi Plain, where<br/> From among the fields of grass<br/> Emerges moonlight.<br/>{cite(SKKS442)}
    </p>
    </div>
    <p>This poem was composed by <Noun lang="ja-Latn"><a href="https://en.wikipedia.org/wiki/Kuj%C5%8D_Yoshitsune">Fujiwara no Yoshitsune</a></Noun> (<span lang="ja">藤原良経</span>, 1169–1206).</p>
    </section>
    <section id="chrysanthemum--kiku">
    <h3><span lang="ja">9月</span> — chrysanthemum (<span lang="ja">菊</span> <Pronunciation src={pronKiku} lang="ja-Latn">kiku</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda9_4, ""],
            [imgHanafuda9_3, ""],
            [imgHanafuda9_2, ""],
            [imgHanafuda9_1, ""],
        ]}>
        The cards for September show chrysanthemums. There is one species card, one blue/purple scroll card, and two junk cards.
    </ArticleImage>
    <Footnote>
        <p>A story invented by <Noun lang="ja-Latn">Tendai</Noun> monks in the 14th century <Noun lang="ja-Latn">Taiheiki</Noun> (<span lang="ja">太平記</span> ‘Chronicle of Great Peace’) provides retroactive justification for the festival:{cite(ChigoJapanese, [[958,959]])} King <Noun lang="zh-Latn">Mu</Noun>’s (<span lang="zh">周穆王</span>) favourite, a young boy, is banished to a remote mountain. Following the king’s advice, he recites passages of the Buddhist Lotus Sūtra, and writes them upon on chrysanthemum flowers. Dew collecting on the flowers drips into the river from which he drinks. Eight hundred years later he has not aged a day, and he returns to court as the legendary <Noun lang="zh-Latn">Peng Zu</Noun> (<span lang="zh">彭祖</span>) during the reign of King <Noun lang="zh-Latn">Wen</Noun> (<span lang="zh">周文王</span>, <abbr title="reigned">r.</abbr> 1112–1050 <abbr className="initialism">BCE</abbr>), who subsequently institutes the festival.</p>
    </Footnote>
    <p>The species card for September depicts a sake cup, which is an implement of <Pronunciation src={pronChoyo} lang="ja-Latn">chōyō</Pronunciation> <span lang="ja">重陽</span>, the chrysanthemum festival, which is held on the 9th day of the 9th month. Because chrysanthemum blooms for a long time, it had become a symbol of long life in China, and the festival was introduced into Japan by the court of Emperor <Noun lang="ja-Latn">Kanmu</Noun> (<span lang="ja">桓武天皇</span>, 735–806).{cite(FourSeasons, [1214], {page:"l."})}</p>
    <p>During the festival, chrysanthemum petals are added to sake and consumed. The sake cup pictured on the card has the character <span lang="ja">壽/寿</span> (<Pronunciation src={pronKotobuki} lang="ja-Latn">kotobuki</Pronunciation>), meaning ‘long life’, written in a cursive script.</p>
    <p>A poem by <Noun lang="ja-Latn">Bashō</Noun>, Japan’s most famed composer of <span lang="ja-Latn">hokku</span>, commemorates the evening of the 9th day of the 9th month, in 1691. <Noun lang="ja-Latn">Bashō</Noun> was staying at the temple <Noun lang="ja-Latn">Gichu-ji</Noun> (<span lang="ja">義仲寺</span>) in a hermitage known as ‘nameless hut’ (<span lang="ja">無名庵</span> <Noun lang="ja-Latn">Mumyō-an</Noun>). His disciple <Noun lang="ja-Latn">Kawai Otokuni</Noun> (<span lang="ja">河合乙州</span>) came to visit him:</p>
    <blockquote>
    <p><span lang="ja">草の戸や日暮てくれし菊の酒</span></p>
    </blockquote>
    <blockquote>
    <p>
    this grass door—<br/>dusk arrives with a present<br/>of chrysanthemum sake{cite(GreveSake)}
    </p>
    </blockquote>
    </section>
    <section id="autumn-leavesmaple--momijikoyo">
    <h3><span lang="ja">10月</span> — autumn leaves/maple (<span lang="ja">紅葉</span> <span lang="ja-Latn">momiji</span>/<Pronunciation src={pronKoyo} lang="ja-Latn">kōyō</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda10_4, ""],
            [imgHanafuda10_3, ""],
            [imgHanafuda10_2, ""],
            [imgHanafuda10_1, ""],
        ]}>
        The cards for October show fallen maple leaves. There is one species card, one blue/purple scroll card, and two junk cards.
    </ArticleImage>
    <p>While the leaves on the species card are attached to a tree, the leaves on the other cards appear to be floating on water. This could be a reference to the <Noun lang="ja-Latn">Tatsuta</Noun> river (<span lang="ja">竜田川</span>), which was as famous for autumn foliage as <Noun lang="ja-Latn">Yoshino</Noun> was for cherry blossoms in the spring.{cite(FourSeasons, [1756], {page:"l."})}</p>
    <ArticleImage
        position="small"
        src={imgPoem2}
        alt="The junk cards of the Echigo-bana pattern which bear the poem.">
        <span lang="ja-Latn">Echigo-bana</span> junk cards, with <span lang="ja-Latn">tanka</span>.
    </ArticleImage>
    <p>The poem on the <span lang="ja-Latn">Echigo-bana</span> junk cards is Poem 437 from the ‘Autumn 2’ section of the <Noun lang="ja-Latn">Shin Kokinshū</Noun>. It was composed by <Noun lang="ja-Latn">Fujiwara no Ietaka</Noun>, upon the finalization of the poetry collection:{cite(MakingShinkokinshu, [318])}</p>
    <div className="multi">
    <p lang="ja" className="vertical-rl">
    したもみぢ<br/>かつちる山の<br/>ゆふしぐれ<br/>ぬれてやひとり<br/>鹿のなくらん
    </p>
    <p>
    From the lower branches<br/>Maple leaves scatter<br/>In Autumn showers on the mountain.<br/>Is it because he is wet<br/>That the lonely stag is belling?
    </p>
    </div>
    </section>
    <section id="willow--yanagi">
    <h3><span lang="ja">11月</span> — willow (<span lang="ja">柳</span> <Pronunciation src={pronYanagi} lang="ja-Latn">yanagi</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda11_4, ""],
            [imgHanafuda11_3, ""],
            [imgHanafuda11_2, ""],
            [imgHanafuda11_1, ""],
        ]}>
        The cards for November show willow trees. There is one bright card, one species card, one red scroll card, and one junk card.
    </ArticleImage>
    <p>The month of November is also often referred to as ‘rain’ (<span lang="ja">雨</span> <Pronunciation src={pronAme} lang="ja-Latn">ame</Pronunciation>) or ‘drizzle’ (<span lang="ja">時雨</span> <Pronunciation src={pronShigure} lang="ja-Latn">shigure</Pronunciation>). These cards have a strange relationship to the others — in many games they have special powers, or they are valued lower than the cards of other months. For example, the bright of November will often score less than the other four brights, and in some games the lightning card has special powers.</p>
    <Footnote>
        It has been suggested (e.g. by author <Noun lang="ja-Latn">Murai Shōzō</Noun> <Noun lang="ja">村井省三</Noun> and by <Noun lang="ja-Latn">Ōishi Tengudō</Noun>{cite(OishiSadakuro)}) that the “Umbrella Man” has its origins in the character of <Noun lang="ja-Latn">Sadakurō</Noun> from the <span lang="ja-Latn">bunraku</span> play <cite>The Treasury of Loyal Retainers</cite> (<cite lang="ja">仮名手本忠臣蔵</cite> <cite lang="ja-Latn">Kanadehon Chūshingura</cite>), written in 1748. However, as <Noun lang="ja-Latn">Ebashi</Noun> points out,{cite(EbashiSadakuro)} there is an early progenitor of the Hanafuda deck from 1704 that contains the “Umbrella Man”. This precludes the <Noun lang="ja-Latn">Sadakurō</Noun> origin story, as the play was written some 40 years after the deck was produced.
    </Footnote>
    <p>The man pictured on the bright card is the poet <Noun lang="ja-Latn">Ono no Michikaze</Noun> (<span lang="ja">小野道風</span>), who is considered to be one of the founders of Japanese calligraphy. The jumping frog recalls an episode in his life: he had failed seven times to achieve a promotion, and was considering abandoning his attempts. One day, walking beside a stream, he saw a frog attempting to jump onto a willow branch. Seven times it jumped, and seven times it failed. On the eighth attempt, the frog reached the branch successfully. <Noun lang="ja-Latn">Michikaze</Noun> was thus inspired to persevere with his attempts.{cite(AnimalInFarEasternArt, [[86, 87]])}</p>
    <p>The lightning card is the red-coloured junk card, which is also called the ogre card (<span lang="ja">鬼札</span> <Pronunciation src={pronOnifuda} lang="ja-Latn">onifuda</Pronunciation>). The drums, which are visible in some patterns, are an attribute of the thunder god <Noun lang="ja-Latn">Raijin</Noun> (<span lang="ja">雷神</span>). In many games this card has special abilities such as being able to match any other card.</p>
    </section>
    <section id="paulownia--kiri">
    <h3><span lang="ja">12月</span> — paulownia (<span lang="ja">桐</span> <Pronunciation src={pronKiri} lang="ja-Latn">kiri</Pronunciation>)</h3>
    <ArticleImage
        source={svgSourceInfo}
        src={[
            [imgHanafuda12_4, ""],
            [imgHanafuda12_3, ""],
            [imgHanafuda12_2, ""],
            [imgHanafuda12_1, ""],
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
            organization: {orgName: "Boston Museum of Fine Arts"},
        }}>
        <cite>Phoenix and Paulownia Tree</cite><br/><cite lang="ja">桐に鳳凰</cite><br/>by <Noun lang="ja-Latn">Isoda Koryūsai</Noun> (<span lang="ja">礒田 湖龍斎</span>, 1735–1790)
    </ArticleImage>
    <p>The phoenix (<span lang="ja">鳳凰</span> <Pronunciation src={pronHoo} lang="ja-Latn">hōō</Pronunciation>, or <span lang="zh-Latn">fèng&shy;huáng</span> in Mandarin Chinese) featured on the bright card is from Japanese mythology, and is particularly associated with the empress of Japan. According to legend the phoenix will only land on a paulownia tree. What appear to be ‘spikes’ on the card are really its long tail feathers.</p>
    <p>In modern times, the paulownia tree is associated with the government, and in particular prime minister’s office. In (TODO), the manufacturer <Noun lang="ja-Latn">Ōishi Tengudo</Noun> produced a special deck for the TODO Prime Minister. In addition, <Noun lang="ja-Latn">Ōishi Tengudo</Noun> boxes many of their decks using Paulownia wood.</p>
    <p>One of the junk cards is usually coloured, often yellow, but sometimes with red as well. In some games it becomes a species card, or even a scroll card. Usually (in Japanese decks) the manufacturer’s mark is on the coloured junk card, much like the ace of spades is used in European decks. In Korean decks the mark can also be on the full moon card, or on the jokers.</p>
    </section>
    
    <section id="audio-credits">
    <h2>Audio Credits</h2>
    <p>All audio is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC-BY-NC-SA 3.0</a>. Pronunciations are by:</p>
    <ul>
    <li><span lang="ja">カキツバタ</span> © <a href="https://forvo.com/user/straycat88/">straycat88</a>.</li>
    <li><span lang="ja">スズキ</span> © <a href="https://forvo.com/user/Ruby8823/">Ruby8823</a>.</li>
    <li><span lang="ja">ホトトギス</span> © <a href="https://forvo.com/user/forsmith/">forsmith</a>.</li>
    <li><span lang="ja">桜</span>, <span lang="ja">萩</span>, <span lang="ja">寿</span>, <span lang="ja">鬼札</span>, <span lang="ja">雨</span> © <a href="https://forvo.com/user/strawberrybrown/">strawberrybrown</a>.</li>
    <li><span lang="ja">坊主</span> © <a href="https://forvo.com/user/skpronounce/">skpronounce</a>.</li>
    <li><span lang="ja">月見</span>, <span lang="ja">幕</span>, <span lang="ja">重陽</span>, <span lang="ja">古今和歌集</span>, <span lang="ja">葱</span> © <a href="https://forvo.com/user/skent/">skent</a>.</li>
    <li><span lang="ja">松</span> © <a href="https://forvo.com/user/_ai_/">_ai_</a>.</li>
    <li><span lang="ja">牡丹</span> © <a href="https://forvo.com/user/ryomasakamoto/">ryomasakamoto</a>.</li>
    <li><span lang="ja">短歌</span>, <span lang="ja">梅</span>, <span lang="ja">菖蒲</span>, <span lang="ja">菊</span>, <span lang="ja">柳</span>, <span lang="ja">鳳凰</span>, <span lang="ja">時雨</span> © <a href="https://forvo.com/user/akitomo/">akitomo</a>.</li>
    <li><span lang="ja">紅葉</span> © <a href="https://forvo.com/user/El55/">El55</a>.</li>
    <li><span lang="ja">花見</span> © <a href="https://forvo.com/user/samchie/">samchie</a>.</li>
    <li><span lang="ja">藤</span>, <span lang="ja">桐</span> © <a href="https://forvo.com/user/kaoring/">kaoring</a>.</li>
    <li><span lang="ja">越後花</span>, <span lang="ja">八八花</span>, <span lang="ja">八橋</span>, <span lang="ja">小豆</span>  © <a href="https://forvo.com/user/poyotan/">poyotan</a>.</li>
    <li><span lang="ja">黒豆</span> © <a href="https://forvo.com/user/usako_usagiclub/">usako_usagiclub</a>.</li>
    </ul>
    </section>
    </section>);
}

export default Hanafuda;