import * as React from 'react';

import { Cards, Cite, Footnote, ArticleImage, Section, Noun } from 'ui';
import { Link } from 'react-router-dom';
import { GameRef } from 'content/games/Game';
import { LoanWordsIndonesian, GatewayToOldSchoolGames, GamblingGamesOfMalaya, NyonyaMosaic, BabaMalayDictionary, ChikiCards, BalineseChineseCommunity, ChiChiPai, ChineseOfTheStraitsSettlements, TheBabas, TraditionCardGameCeki, MemoryOfTheWorldRegister, RancangBangun, LombokCeki, JavanischeKartenspiele } from 'References/bibliography.json';
import { Table } from 'react-bootstrap';

import imgCOT from './COT.jpg';
import imgCWF from './CWF.jpg';
import imgCRF from './CRF.jpg';
import imgCC1 from './CC1.jpg';
import imgCC2 from './CC2.jpg';
import imgCC3 from './CC3.jpg';
import imgCC4 from './CC4.jpg';
import imgCC5 from './CC5.jpg';
import imgCC6 from './CC6.jpg';
import imgCC7 from './CC7.jpg';
import imgCC8 from './CC8.jpg';
import imgCC9 from './CC9.jpg';
import imgCS1 from './CS1.jpg';
import imgCS2 from './CS2.jpg';
import imgCS3 from './CS3.jpg';
import imgCS4 from './CS4.jpg';
import imgCS5 from './CS5.jpg';
import imgCS6 from './CS6.jpg';
import imgCS7 from './CS7.jpg';
import imgCS8 from './CS8.jpg';
import imgCS9 from './CS9.jpg';
import imgCM1 from './CM1.jpg';
import imgCM2 from './CM2.jpg';
import imgCM3 from './CM3.jpg';
import imgCM4 from './CM4.jpg';
import imgCM5 from './CM5.jpg';
import imgCM6 from './CM6.jpg';
import imgCM7 from './CM7.jpg';
import imgCM8 from './CM8.jpg';
import imgCM9 from './CM9.jpg';
import imgDRF from './DRF.jpg';
import imgDOT from './DOT.jpg';
import imgDWF from './DWF.jpg';
import imgDM1 from './DM1.jpg';
import imgDM2 from './DM2.jpg';
import imgDM3 from './DM3.jpg';
import imgDM4 from './DM4.jpg';
import imgDM5 from './DM5.jpg';
import imgDM6 from './DM6.jpg';
import imgDM7 from './DM7.jpg';
import imgDM8 from './DM8.jpg';
import imgDM9 from './DM9.jpg';
import imgDS1 from './DS1.jpg';
import imgDS2 from './DS2.jpg';
import imgDS3 from './DS3.jpg';
import imgDS4 from './DS4.jpg';
import imgDS5 from './DS5.jpg';
import imgDS6 from './DS6.jpg';
import imgDS7 from './DS7.jpg';
import imgDS8 from './DS8.jpg';
import imgDS9 from './DS9.jpg';
import imgDC1 from './DC1.jpg';
import imgDC2 from './DC2.jpg';
import imgDC3 from './DC3.jpg';
import imgDC4 from './DC4.jpg';
import imgDC5 from './DC5.jpg';
import imgDC6 from './DC6.jpg';
import imgDC7 from './DC7.jpg';
import imgDC8 from './DC8.jpg';
import imgDC9 from './DC9.jpg';
import imgGameplay from './shutterstock_1293448237.jpg';
import imgScattered from './3915400394_ce30e3617d_o.jpg';

const Content: React.FC = () =>
  <section>
    <p>Ceki/Cherki<Footnote>The spelling Cherki seems to be more common in Malaysia and Singapore. It can also be written <Noun lang="id">Tjeki</Noun> in older Indonesian orthographies, or <span lang="ms-Arab">چکي</span> in Jawi script. The word apparently comes from Amoy (Hokkien) Chinese <span lang="nan-Latn">chít ki</span> (<span lang="nan">一枝</span>)<Cite r={LoanWordsIndonesian} page={48} />,{/*TODO: or 7 cards? https://core.ac.uk/download/pdf/48633257.pdf */} “one card”, perhaps referring to the pick-one/play-one nature of the most common Ceki games. <Cite r={GamblingGamesOfMalaya} inline /> gives the name as <span lang="nan">織箕</span> (<span lang="nan-Latn">chitki</span>) but I have not found this elsewhere; perhaps it is a phonetic back-formation.</Footnote> or Koa cards are widely used in Indonesia and parts of Malaysia and Singapore. They originally derive from Chinese 3-suited money cards (particularly the “Water Margin” type), and over time the imagery on the cards developed into smaller, simpler, and more abstract forms, while retaining the original deck structure.</p>
    <ArticleImage
      src={imgScattered}
      alt=""
      source={{
        author: "ecv5",
        copyrightYear: 2008,
        license: "cc-by-nc-nd",
        licenseVersion: "2.0",
        originalUrl: "https://www.flickr.com/photos/habsburg/3915400394"
      }}>
      Scattered Cherki cards (of Malaysian variety).
    </ArticleImage>
    <p>Ceki games are also played amongst members of “reterritorialized” Indonesian Chinese communities within mainland China.<Cite r={BalineseChineseCommunity} page={555} /></p>
    <Section title="Malaysia & Singapore">
      <p>The use of Cherki cards in Malaysia & Singapore was introduced by <a href="https://en.wikipedia.org/wiki/Peranakans">Peranakan</a> (Baba–Nyonya) communities. Much of the terminology and card naming derives from Hokkien, and the cards used are closer to their ancestral forms than those used in Indonesia (<a href="#the-cards">see below</a>).</p>
      <ArticleImage
        src={imgGameplay}
        alt="TODO"
        source={{
          license: "stock-image",
          organization: { orgName: "Shutterstock.com" },
          author: "Fiqah Anugerah Dah Besa",
          identifier: "1293448237",
          originalUrl: "https://www.shutterstock.com/image-photo/penang-malaysia-january-22-2019-happy-1293448237"
        }}>
        An exhibition game using Cherki cards being played in Penang, Malaysia.
      </ArticleImage>
      <p>In Malaysia & Singapore the game was almost exclusively played by women, and has now nearly died out. <Cite inline r={TheBabas} /> reported that by the 1980s it was only possible to get cards in Melaka.</p>
      {/*<p>Records of palace expenditure of the Sultan Abdul Hamid Halim of Kedah (1864–1943) from 1896–99 indicate that he enjoyed gambling with Ceki.<Cite r={MemoryOfTheWorldRegister} page={58} /></p>*/}
    </Section>
    <Section title="Indonesia">
      <p>During the colonial era, cards were manufactured in Europe by Dutch companies and exported to Indonesia.</p>
      <p>In Indonesia, Ceki games are still popular, especially in Sumatra, Java, and Bali, all of which have historically had large Chinese influence.</p>
      <p>In Indonesia the cards are particularly popular amongst the Minangkabau people of West Sumatra, as the Dutch card-making company <Noun lang="nl">Handelsvereniging Harmsen Verweij & Dunlop N.V.</Noun> had a factory<Footnote>This building was later to become the <a href="https://en.wikipedia.org/wiki/Hotel_Ambacang">Hotel Ambacang</a>, which was destroyed in the <a href="https://en.wikipedia.org/wiki/2009_Sumatra_earthquakes">2009 Sumatran earthquakes</a>.</Footnote> in the city of Padang. The company also had offices in Java & Sulawesi (previously known as Celebes).</p>
      <p>In Minang they are called Koa (or Kowah).</p>
    </Section>
    <Section title="The Cards">
      <p>The cards run <Cards>1–9</Cards> in three suits, and there are three ‘honour cards’, giving 30 different cards. Each deck, or <span lang="ms">kepala</span> (literally ‘head’), contains two copies of each card, giving 60 total. However, most Ceki games require multiple <span lang="ms">kepala</span> to play, often two sets (120 cards).</p>
      <p>The three suits are called:<Cite r={ChikiCards} page={119} /></p>
      <dl>
        <dt>Myriads (Numbers)</dt>
        <dd><span lang="ms">ban</span> (from Hokkien <span lang="nan-Latn">bān</span> <span lang="nan">萬/万</span> ‘myriad’)</dd>
        <dt>Strings</dt>
        <dd><span lang="ms">manek</span> (‘bead’) or <span lang="ms">sok</span> (from Hokkien <span lang="nan">索</span> ‘rope’)</dd>
        <dt>Coins</dt>
        <dd><span lang="ms">hitam</span> (‘black’), <span lang="ms">batik</span>, <span lang="ms">piah</span> (from Hokkien <span lang="nan">餅</span> ‘round thing’), or <span lang="ms">tong</span> (from Hokkien <span lang="nan">筒</span> ‘barrel’)</dd>
      </dl>
      <p>For each card in the table below I show first (i.e. at left) a card from a 19th-century deck collected in <Cite inline r={ChineseOfTheStraitsSettlements} />, and then a modern card from a deck purchased in Bali  in 2019. The Malaysian & Singaporean decks are closer in style to the older deck.</p>
      <p>Each card in the deck has its own nickname, based on its appearance.</p>
      <p>In the table, Malaysian or Singaporean names are presented in the first row. They are a combination of the rank (derived from Hokkien number names) and either the suit name or some nickname based on the middle portion of the card,<Cite r={ChikiCards} page={121} /> which is slightly bigger there than in the Indonesian version.</p>
      <p>The second row of names records the names used by Minangkabau people in Indonesia. Instead of numeric ranks, they are based on the appearance of the indices in the corners of the cards.</p>
      <p>The third row of names are those used in Java, as recorded in the early 20th century,<Cite r={JavanischeKartenspiele} /> and as such might be very outdated.</p>
      <p>The fourth row of names records names reportedly used in Bali<Cite r={RancangBangun} page={[[45, 47]]} /> or Lombok,<Cite r={LombokCeki} /> where almost every card has a specific name. This section of the table is much more imprecise than the previous lines.</p>
      <Table className="text-center" variant="sm">
        <thead>
          <tr>
            <th></th>
            <th>Coins</th>
            <th>Strings</th>
            <th>Myriads</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rank 1 (honour cards called kaki (foot?))</td>
            <td><ArticleImage noborder cram src={[[imgDOT, ""], [imgCOT, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDWF, ""], [imgCWF, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDRF, ""], [imgCRF, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">yu</span> or <span lang="ms">yeo</span><br />(Hokkien <span lang="nan-Latn">io</span> <span lang="nan">幺</span>, ‘ace’)</td>
            <td>
              <span lang="ms">yu lau chian</span><br />
            from Hokkien ‘old thousand’ <span lang="nan">老千</span>
              <br /><br />or <span lang="ms">yu pinding</span>
            </td>
            <td>
              <span lang="ms">yu kuching</span><br />
            cat
          </td>
            <td>
              <span lang="ms">yu nyonya</span><br />
            yu (娘仔?)
          </td>
          </tr>
          <tr>
            <td><span lang="min">hiu/iyu</span><br />‘shark’</td>
            <td><span lang="min">hiu babak</span><br />chapter shark</td>
            <td><span lang="min">hiu kuciang</span><br />cat shark</td>
            <td><span lang="min">hiu merah</span> or <span lang="min">pinci</span><br />red shark or <a href="https://en.wikipedia.org/wiki/Songkok">a hat</a></td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">besar</span><br />large</td>
            <td><span lang="jv-Latn">kucing</span><br />cat</td>
            <td><span lang="jv-Latn">cinci</span><br />[unknown]</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">raja</span> or <span lang="ban">kobar</span><br />king or burning</td>
            <td><span lang="ban">cakra</span><br />[unknown]</td>
            <td><span lang="ban">kunci</span><br />key</td>
          </tr>
          <tr>
            <td></td>
            <td><ArticleImage noborder cram src={[[imgDC1, ""], [imgCC1, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDS1, ""], [imgCS1, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDM1, ""], [imgCM1, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">yu</span> or <span lang="ms">yeo</span><br />(Hokkien <span lang="nan-Latn">io</span> <span lang="nan">幺</span>, ‘ace’)</td>
            <td><span lang="ms">yu kasut</span><br />slipper one (looks like a Nyonya slipper)</td>
            <td><span lang="ms">yu panjang</span> or <span lang="ms">yu burung</span><br />long or bird one</td>
            <td><span lang="ms">yu hue sio</span><br />from Hokkien ‘monk’ <span lang="nan">和尚</span></td>
          </tr>
          <tr>
            <td><span lang="min">hiu/iyu</span><br />‘shark’</td>
            <td><span lang="min">hiu itam</span> or <span lang="min">kasuik</span><br />black or [unknown] shark</td>
            <td><span lang="min">hiu gadang</span> or <span lang="min">panjang</span><br />big or long shark</td>
            <td><span lang="min">hiu aluih</span> or <span lang="min">bungo</span><br />genteel or flower shark</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">kesut</span><br />[var: kasut?]</td>
            <td><span lang="jv-Latn">sotur</span><br />[unknown]</td>
            <td><span lang="jv-Latn">p’té</span><br />[unknown]</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">likas</span><br />reel</td>
            <td><span lang="ban">lojor</span> or <span lang="ban">selodor</span><br />a long Balinese drum or [unknown]</td>
            <td><span lang="ban">cina</span><br />China</td>
          </tr>
          <tr>
            <td>Rank 2</td>
            <td><ArticleImage noborder cram src={[[imgDC2, ""], [imgCC2, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDS2, ""], [imgCS2, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDM2, ""], [imgCM2, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">ji</span><br />(Hokkien jī)</td>
            <td><span lang="ms">ji hitam</span> or <span lang="ms">ji bulat</span><br />black or round two</td>
            <td><span lang="ms">ji burung</span><br />bird two</td>
            <td><span lang="ms">ji ban</span><br /></td>
          </tr>
          <tr>
            <td><span lang="min">bengkok</span> ‘crooked’</td>
            <td><span lang="min">bengkok (h)itam</span><br />black crooked</td>
            <td><span lang="min">bengkok gadang</span><br />big crooked</td>
            <td><span lang="min">bengkok aluih</span> or <span lang="min">halus</span><br />genteel or fine crooked</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">dimpil tolu</span><br />larger than normal or fused digit, [fifth week?]</td>
            <td><span lang="jv-Latn">cekok</span><br />neck-hollow</td>
            <td><span lang="jv-Latn">dimpil wong</span><br />larger than normal or fused digit, person</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">(je)bug dua</span><br />two dried betel nuts</td>
            <td><span lang="ban">dengkek</span><br />having a bent back</td>
            <td><span lang="ban">pelik</span> or <span lang="ban">kolo</span><br />[strange?]</td>
          </tr>
          <tr>
            <td>Rank 3</td>
            <td><ArticleImage noborder cram src={[[imgDC3, ""], [imgCC3, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDS3, ""], [imgCS3, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDM3, ""], [imgCM3, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">sa</span><br />(Hokkien saⁿ)</td>
            <td><span lang="ms">sa batik</span><br />batik three</td>
            <td><span lang="ms">sa udang</span><br />shrimp three</td>
            <td><span lang="ms">sa ban</span></td>
          </tr>
          <tr>
            <td><span lang="min">jarum</span><br />‘needle’</td>
            <td><span lang="min">jarum wajik</span><br />diamond needle</td>
            <td><span lang="min">jarum gadang</span> or <span lang="min">udang</span><br />big or shrimp needle</td>
            <td><span lang="min">jarum aluih</span> or <span lang="min">halus</span><br />genteel or fine needle</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">cerud jarum</span><br />[unknown] needle</td>
            <td><span lang="jv-Latn">gunung</span><br />mountain</td>
            <td><span lang="jv-Latn">jarum wong</span><br />needle person</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">(je)bug telu</span><br />three dried betel nuts</td>
            <td><span lang="ban">gunung</span><br />mountain</td>
            <td><span lang="ban">caling</span> or <span lang="ban">jarum</span><br />canine or needle</td>
          </tr>
          <tr>
            <td>Rank 4</td>
            <td><ArticleImage noborder cram src={[[imgDC4, ""], [imgCC4, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDS4, ""], [imgCS4, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDM4, ""], [imgCM4, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">si</span><br />(Hokkien sì)</td>
            <td><span lang="ms">si hitam</span><br />black four</td>
            <td><span lang="ms">si putih</span><br />white four</td>
            <td><span lang="ms">si ban</span></td>
          </tr>
          <tr>
            <td><span lang="min">suduang</span><br /> ‘spoon’(?)</td>
            <td><span lang="min">suduang (h)itam</span> or <span lang="min">wajik</span><br />black or diamond spoon</td>
            <td><span lang="min">suduang pinggang</span><br />pinggang spoon</td>
            <td><span lang="min">suduang putiah</span> or <span lang="min">aluih</span><br />white or genteel spoon</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">gobok</span><br />coin</td>
            <td><span lang="jv-Latn">cawang</span><br />spool</td>
            <td><span lang="jv-Latn">sundul</span><br />spool</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">bela</span> or <span lang="ban">besar</span><br />[unknown] or large</td>
            <td><span lang="ban">sangkap</span> or <span lang="ban">cawang</span><br />[unknown]</td>
            <td><span lang="ban">mendut</span> or <span lang="ban">celek</span><br />steamed rice flour balls or [unknown]</td>
          </tr>
          <tr>
            <td>Rank 5</td>
            <td><ArticleImage noborder cram src={[[imgDC5, ""], [imgCC5, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDS5, ""], [imgCS5, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDM5, ""], [imgCM5, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">go</span><br />(Hokkien gō͘)</td>
            <td><span lang="ms">go pending</span><br />pending five</td>
            <td><span lang="ms">go burung</span><br />bird five</td>
            <td><span lang="ms">go ban</span></td>
          </tr>
          <tr>
            <td><span lang="min">babi</span><br />‘pig’ (nostrils?)</td>
            <td><span lang="min">babi pusek</span><br />navel pig</td>
            <td><span lang="min">babi gadang</span><br />big pig</td>
            <td><span lang="min">babi aluih</span> or <span lang="id">halus</span><br />genteel or fine pig</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">cupa</span><br />[unknown]</td>
            <td><span lang="jv-Latn">babi lintrik</span><br />pig [unknown]</td>
            <td><span lang="jv-Latn">babi wong</span><br />pig person</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">prau</span> or <span lang="ban">perahu</span><br />boat</td>
            <td><span lang="ban">mategede</span> or <span lang="ban">gogos</span><br />[unknown]</td>
            <td><span lang="ban">bongkar</span> or <span lang="ban">polak</span><br />[unload: forklift?] or [unknown]</td>
          </tr>
          <tr>
            <td>Rank 6</td>
            <td><ArticleImage noborder cram src={[[imgDC6, ""], [imgCC6, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDS6, ""], [imgCS6, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDM6, ""], [imgCM6, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">lak</span><br />(Hokkien la̍k)</td>
            <td><span lang="ms">lak hitam</span><br />black six</td>
            <td><span lang="ms">lak putih</span><br />white six</td>
            <td><span lang="ms">lak ban</span></td>
          </tr>
          <tr>
            <td><span lang="min">kapik</span> or <span lang="min">batuang</span><br />‘grill’ or ‘bamboo’</td>
            <td><span lang="min">kapik/batuang anam</span><br />grilled or bamboo six</td>
            <td><span lang="min">kapik/batuang manih/rantai</span><br />grilled/bamboo sweet/chain</td>
            <td><span lang="min">kapik/batuang aluih</span><br />grilled or bamboo genteel</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">mendung</span><br />[unknown]</td>
            <td><span lang="jv-Latn">condro</span><br />[unknown]</td>
            <td><span lang="jv-Latn">gabit</span><br />[unknown]</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">nyem</span> or <span lang="ban">pis nem</span><br />[unknown] or six coins</td>
            <td><span lang="ban">mer</span><br />[unknown]</td>
            <td><span lang="ban">klenteng</span> or <span lang="ban">megat</span><br />Chinese temple or [unknown]</td>
          </tr>
          <tr>
            <td>Rank 7</td>
            <td><ArticleImage noborder cram src={[[imgDC7, ""], [imgCC7, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDS7, ""], [imgCS7, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDM7, ""], [imgCM7, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">jit</span><br />(Hokkien chhit)</td>
            <td><span lang="ms">jit hitam</span> or <span lang="ms">jit daun</span><br />black or leaf seven</td>
            <td><span lang="ms">jit burung</span><br />bird seven</td>
            <td><span lang="ms">jit ban</span></td>
          </tr>
          <tr>
            <td><span lang="min">sisiak</span><br />‘scales’</td>
            <td><span lang="min">sisiak bendera</span><br />flag scales</td>
            <td><span lang="min">sisiak gadang</span><br />big scales</td>
            <td><span lang="min">sisiak aluih</span><br />genteel scales</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">lajar</span><br />plough</td>
            <td><span lang="jv-Latn">reab lintrik</span><br />[unknown]</td>
            <td><span lang="jv-Latn">reab wong</span><br />[unknown]</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">paku</span> or <span lang="ban">bendera</span><br />fern or flag</td>
            <td><span lang="ban">ringying</span> or <span lang="ban">curing</span><br />[unknown] or [a type of gamelan?]</td>
            <td><span lang="ban">ringgit</span><br />jagged</td>
          </tr>
          <tr>
            <td>Rank 8</td>
            <td><ArticleImage noborder cram src={[[imgDC8, ""], [imgCC8, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDS8, ""], [imgCS8, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDM8, ""], [imgCM8, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">puek</span><br />(Hokkien poeh)</td>
            <td><span lang="ms">puek kerang</span><br />cockle eight</td>
            <td><span lang="ms">puek menak</span><br />noble{/*<Footnote>Menak is a title for an aristocrat.</Footnote>*/} eight</td>
            <td><span lang="ms">puek ban</span></td>
          </tr>
          <tr>
            <td><span lang="min">pacah</span><br />‘broken’</td>
            <td><span lang="min">pacah lapan</span><br />broken eight</td>
            <td><span lang="min">pacah manih</span><br />broken sweet</td>
            <td><span lang="min">pacah aluih</span><br />broken genteel</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">lekok pecis</span><br />dented [<a href="https://en.wikipedia.org/wiki/Songkok">peci</a> or coin?]</td>
            <td><span lang="jv-Latn">lekok lintrik</span><br />dented [unknown]</td>
            <td><span lang="jv-Latn">lekok wong</span><br />dented person</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">sekutus</span> or <span lang="ban">pis ulu</span><br />[adj:] eight or eight coins</td>
            <td><span lang="ban">ulu</span> or <span lang="ban">manis</span><br />eight or sweet</td>
            <td><span lang="ban">manak</span> or <span lang="ban">kelepok</span><br />[to be born?] or [unknown]</td>
          </tr>
          <tr>
            <td>Rank 9</td>
            <td><ArticleImage noborder cram src={[[imgDC9, ""], [imgCC9, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDS9, ""], [imgCS9, ""]]} /></td>
            <td><ArticleImage noborder cram src={[[imgDM9, ""], [imgCM9, ""]]} /></td>
          </tr>
          <tr>
            <td><span lang="ms">kau</span><br />(Hokkien káu)</td>
            <td><span lang="ms">kau hitam</span><br />black nine</td>
            <td><span lang="ms">kau merah</span><br />red nine</td>
            <td><span lang="ms">kau ban</span></td>
          </tr>
          <tr>
            <td><span lang="min">tali</span><br />‘rope’</td>
            <td><span lang="min">tali bulek</span><br />round rope</td>
            <td><span lang="min">tali merah</span><br />red rope</td>
            <td><span lang="min">tali aluih</span><br />genteel rope</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="jv-Latn">pecis</span><br />[<a href="https://en.wikipedia.org/wiki/Songkok">peci</a> or coin?]</td>
            <td><span lang="jv-Latn">gang abang</span><br />red gap</td>
            <td><span lang="jv-Latn">gang</span><br />gap</td>
          </tr>
          <tr>
            <td></td>
            <td><span lang="ban">sanga</span> or <span lang="ban">gada</span><br />nine or <a href="https://en.wikipedia.org/wiki/Gada_(mace)">mace</a></td>
            <td><span lang="ban">besar</span> or <span lang="ban">teja</span><br />large or shining</td>
            <td><span lang="ban">kao</span> or <span lang="ban">jering</span><br />[unknown] or upright</td>
          </tr>
        </tbody>
      </Table>
    </Section>
    <Footnote standalone>
      The book <Cite r={GatewayToOldSchoolGames} inline /> uses the spellings: burung = burong, batik = bateh, yu = yeo, hue sio = huay sio, putih = puteh, ji = jee, sa = sarh, si = see, go = gor, lak = lark.
    </Footnote>
    <Section title="Games">
      <p>There are several games played with Ceki cards. For most of them, I do not know of any rules recorded online:<Cite r={NyonyaMosaic} page={124} /></p>
      <ul>
        <li><GameRef id="cholek-tiga" /> (‘draw three’), a game for two or three players<Cite r={BabaMalayDictionary} page={214} /><Cite r={ChikiCards} page={125} /></li>
        <li>Pak Tui, a solitaire game<Cite r={BabaMalayDictionary} page={215} /></li>
        <li><GameRef id="balik-satu" /> (‘turn one’), a game with no fixed number of players<Cite r={BabaMalayDictionary} page={214} /><Cite r={ChikiCards} page={122} /></li>
        <li><Link to="/games/balik-satu/#variations">Balik Lima Belas</Link><Cite r={ChikiCards} page={127} />/Balek Lima Belair<Cite r={BabaMalayDictionary} page={124} />/Bukak Lima Blas Leh<Cite r={TheBabas} page={167} /> (‘turn fifteen’), an alternate method of scoring Balik Satu</li>
        <li>Choke/Chote (Ramay), a game for more than for players<Cite r={BabaMalayDictionary} /></li>
        <li>Choke/Chote Kiong, a four-player game<Cite r={BabaMalayDictionary} page={214} /></li>
      </ul>
    </Section>
    <Section title="Manufacturers & Brands">
      <p>(Extinct) European manufacturers include:</p>
      <ul>
        <li><Noun lang="fr">Camoin</Noun>, a French company that was based in Marseille</li>
        <li><Noun lang="nl">Handelsvereeniging Harmsen Verweij & Dunlop N.V.</Noun>, a Dutch company<Cite r={TraditionCardGameCeki} /></li>
        <li><a href="https://www.wopc.co.uk/belgium/mesmaeker/mesmaeker-moentack"><Noun lang="fr">Mesmaekers Frères</Noun></a>, a Belgian company based in Turnhour whose cards were imported to Java by Brandon Mesritz & Co.<Cite r={ChiChiPai} /></li>
      </ul>
      {/*<p>榮興記</p>*/}
      <p>Indonesian brands include:</p>
      <ul>
        <li><Noun lang="ms">Ceki Hiu</Noun> (Old Thousand has a colour image of a shark)</li>
        <li><Noun lang="ms">Ceki Kalong Mas</Noun> (Old Thousand inscribed <span lang="zh">𫑟林</span>?)</li>
        <li><Noun lang="ms">Ceki Leak</Noun>, a <a href="https://en.wikipedia.org/wiki/Leyak">mythological creature</a></li>
        <li><Noun lang="ms">Gunting Baja</Noun>, Bali</li>
        <li><Noun lang="ms">Gunting Rumput</Noun></li>
        <li><Noun lang="ms">Gar’da Kencana</Noun></li>
        <li><Noun lang="ms">Kabuki</Noun></li>
        <li><Noun lang="ms">Kapal Ferry</Noun> (Old Thousand has a colour image of a ship)</li>
        <li><Noun lang="ms">Pura Dewa</Noun>, Bali</li>
      </ul>
    </Section>
  </section>;

export default Content;
