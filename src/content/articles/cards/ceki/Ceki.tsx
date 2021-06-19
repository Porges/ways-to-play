import * as React from 'react';

import { Cards, Cite, Footnote, ArticleImage, Section, Noun, Article } from 'ui';
import { Link } from 'react-router-dom';
import { GameRef } from 'content/games/Game';
import { LoanWordsIndonesian, GatewayToOldSchoolGames, GamblingGamesOfMalaya, NyonyaMosaic, BabaMalayDictionary, ChikiCards, BalineseChineseCommunity, ChiChiPai, ChineseOfTheStraitsSettlements, TheBabas, TraditionCardGameCeki, MemoryOfTheWorldRegister }  from 'References/bibliography.json';
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


const Content: React.FC = () =>
  <section>
    <p>Ceki or Cherki<Footnote>The spelling Cherki seems to be more common in Malaysia and Singapore. In older Indonesian orthographies it can also be written Tjeki, or <span lang="ms-Arab">چکي</span> in Jawi. The word apparently comes from Amoy (Hokkien) Chinese <span lang="nan-Latn">chít ki</span> (<span lang="nan">一枝</span>)<Cite r={LoanWordsIndonesian} page={48} />, “one card”, perhaps referring to the pick-one/play-one nature of the most common Ceki games. <Cite r={GamblingGamesOfMalaya} inline/> gives the name as <span lang="nan">織箕</span> (<span lang="nan-Latn">chitki</span>) but I have not found this elsewhere; perhaps it is a phonetic back-formation.</Footnote> cards are widely used in Indonesia and parts of Malaysia and Singapore. They originally derive from Chinese 3-suited money cards, and were introduced to the region by <a href="https://en.wikipedia.org/wiki/Peranakans">Peranakan</a> people. In Minang they are called Koa (or Kowah).</p>
    <p>In Indonesia the cards are particularly popular amongst the Minangkabau people of West Sumatra, as the Dutch card-making company <Noun lang="nl">Handelsvereniging Harmsen Verweij & Dunlop N.V.</Noun> had a factory<Footnote>This building was later to become the <a href="https://en.wikipedia.org/wiki/Hotel_Ambacang">Hotel Ambacang</a>, which was destroyed in the <a href="https://en.wikipedia.org/wiki/2009_Sumatra_earthquakes">2009 Sumatran earthquakes</a>.</Footnote> in the city of Padang. The company also had offices in Java & Sulawesi (previously known as Celebes).</p>
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
    <p>Ceki games are also played amongest members of “reterritorialized” Indonesian Chinese communities within mainland China.<Cite r={BalineseChineseCommunity} page={555} /></p>
    <p>During the colonial era, cards were manufactured in Europe by Dutch companies and exported to Indonesia.</p>
    <p>Records of palace expenditure of the Sultan Abdul Hamid Halim of Kedah (1864–1943) from 1896–99 indicate that he enjoyed gambling with Ceki.<Cite r={MemoryOfTheWorldRegister} page={58} /></p>
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
    <p>Each card in the deck has its own nickname, based on its appearance. Malaysian or Singaporean names are based on the rank (derived from Hokkien numbers) and either the suit name or some nickname based on the middle portion of the card,<Cite r={ChikiCards} page={121}/> which is slightly bigger there than in the Indonesian version. The rank names used in Minangkabau are based on the indices in the corners of the cards.</p>
    <p>For each card in the table below I show first a card from a 19th-century deck (collected in <Cite inline r={ChineseOfTheStraitsSettlements} />), and then a modern card from a deck purchased in Bali (2019). The names from Malaysia/Singapore are more obvious with the older style of deck.</p>
    <Table className="text-center" variant="sm">
      <thead>
        <th></th>
        <th>Coins</th>
        <th>Strings</th>
        <th>Myriads</th>
      </thead>
      <tbody>
        <tr>
          <td>Rank 1 (honour cards called kaki (foot?))</td>
          <td><ArticleImage noborder src={[[imgDOT, ""], [imgCOT, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDWF, ""], [imgCWF, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDRF, ""], [imgCRF, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">yu</span> or <span lang="ms">yeo</span><br/>(Hokkien <span lang="nan-Latn">io</span> <span lang="nan">幺</span>, ‘ace’)</td>
          <td>
            <span lang="ms">yu lau chian</span><br/>
            from Hokkien ‘old thousand’ <span lang="nan">老千</span>
            <br/><br/>or <span lang="ms">yu pinding</span>
          </td>
          <td>
            <span lang="ms">yu kuching</span><br/>
            cat
          </td>
          <td>
            <span lang="ms">yu nyonya</span><br/>
            yu (娘仔?)
          </td>
        </tr>
        <tr>
          <td><span lang="min">hiu/iyu</span><br/>‘shark’</td>
          <td><span lang="min">hiu babak</span><br/>chapter shark</td>
          <td><span lang="min">hiu kuciang</span><br/>cat shark</td>
          <td><span lang="min">hiu merah</span> or <span lang="min">pinci</span><br/>red or [unknown] shark</td>
        </tr>
        <tr>
          <td></td>
          <td><ArticleImage noborder src={[[imgDC1, ""], [imgCC1, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDS1, ""], [imgCS1, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDM1, ""], [imgCM1, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">yu</span> or <span lang="ms">yeo</span><br/>(Hokkien <span lang="nan-Latn">io</span> <span lang="nan">幺</span>, ‘ace’)</td>
          <td>
            <span lang="ms">yu kasut</span><br/>
            slipper one (looks like a Nyonya slipper)
          </td>
          <td>
            <span lang="ms">yu panjang</span> or <span lang="ms">yu burung</span><br/>
            long or bird one
          </td>
          <td>
            <span lang="ms">yu hue sio</span><br/>
            from Hokkien ‘monk’ <span lang="nan">和尚</span>
          </td>
        </tr>
        <tr>
          <td><span lang="min">hiu/iyu</span><br/>‘shark’</td>
          <td><span lang="min">hiu itam</span> or <span lang="min">kasuik</span><br/>black or [unknown] shark</td>
          <td><span lang="min">hiu gadang</span> or <span lang="min">panjang</span><br/>big or long shark</td>
          <td><span lang="min">hiu aluih</span> or <span lang="min">bungo</span><br/>genteel or flower shark</td>
        </tr>
        <tr>
          <td>Rank 2</td>
          <td><ArticleImage noborder src={[[imgDC2, ""], [imgCC2, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDS2, ""], [imgCS2, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDM2, ""], [imgCM2, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">ji</span><br/>(Hokkien jī)</td>
          <td><span lang="ms">ji hitam</span> or <span lang="ms">ji bulat</span><br/>black or round two</td>
          <td><span lang="ms">ji burung</span><br/>bird two</td>
          <td><span lang="ms">ji ban</span><br/></td>
        </tr>
        <tr>
          <td><span lang="min">bengkok</span> ‘crooked’</td>
          <td><span lang="min">bengkok (h)itam</span><br/>black crooked</td>
          <td><span lang="min">bengkok gadang</span><br/>big crooked</td>
          <td><span lang="min">bengkok aluih</span> or <span lang="min">halus</span><br/>genteel or fine crooked</td>
        </tr>
        <tr>
          <td>Rank 3</td>
          <td><ArticleImage noborder src={[[imgDC3, ""], [imgCC3, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDS3, ""], [imgCS3, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDM3, ""], [imgCM3, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">sa</span><br/>(Hokkien saⁿ)</td>
          <td><span lang="ms">sa batik</span><br/>batik three</td>
          <td><span lang="ms">sa udang</span><br/>shrimp three</td>
          <td><span lang="ms">sa ban</span></td>
        </tr>
        <tr>
          <td><span lang="min">jarum</span><br/>‘needle’</td>
          <td><span lang="min">jarum wajik</span><br/>diamond needle</td>
          <td><span lang="min">jarum gadang</span> or <span lang="min">udang</span><br/>big or shrimp needle</td>
          <td><span lang="min">jarum aluih</span> or <span lang="min">halus</span><br/>genteel or fine needle</td>
        </tr>
        <tr>
          <td>Rank 4</td>
          <td><ArticleImage noborder src={[[imgDC4, ""], [imgCC4, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDS4, ""], [imgCS4, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDM4, ""], [imgCM4, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">si</span><br/>(Hokkien sì)</td>
          <td><span lang="ms">si hitam</span><br/>black four</td>
          <td><span lang="ms">si putih</span><br/>white four</td>
          <td><span lang="ms">si ban</span></td>
        </tr>
        <tr>
          <td><span lang="min">suduang</span><br/> ‘spoon’(?)</td>
          <td><span lang="min">suduang (h)itam</span> or <span lang="min">wajik</span><br/>black or diamond spoon</td>
          <td><span lang="min">suduang pinggang</span><br/>pinggang spoon</td>
          <td><span lang="min">suduang putiah</span> or <span lang="min">aluih</span><br/>white or genteel spoon</td>
        </tr>
        <tr>
          <td>Rank 5</td>
          <td><ArticleImage noborder src={[[imgDC5, ""], [imgCC5, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDS5, ""], [imgCS5, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDM5, ""], [imgCM5, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">go</span><br/>(Hokkien gō͘)</td>
          <td><span lang="ms">go pending</span><br/>pending five</td>
          <td><span lang="ms">go burung</span><br/>bird five</td>
          <td><span lang="ms">go ban</span></td>
        </tr>
        <tr>
          <td><span lang="min">babi</span><br/>‘pig’ (nostrils?)</td>
          <td><span lang="min">babi pusek</span><br/>navel pig</td>
          <td><span lang="min">babi gadang</span><br/>big pig</td>
          <td><span lang="min">babi aluih</span> or <span lang="id">halus</span><br/>genteel or fine pig</td>
        </tr>
        <tr>
          <td>Rank 6</td>
          <td><ArticleImage noborder src={[[imgDC6, ""], [imgCC6, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDS6, ""], [imgCS6, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDM6, ""], [imgCM6, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">lak</span><br/>(Hokkien la̍k)</td>
          <td><span lang="ms">lak hitam</span><br/>black six</td>
          <td><span lang="ms">lak putih</span><br/>white six</td>
          <td><span lang="ms">lak ban</span></td>
        </tr>
        <tr>
          <td><span lang="min">kapik</span> or <span lang="min">batuang</span><br/>‘grill’ or ‘bamboo’</td>
          <td><span lang="min">kapik/batuang anam</span><br/>grilled or bamboo six</td>
          <td><span lang="min">kapik/batuang manih/rantai</span><br/>grilled/bamboo sweet/chain</td>
          <td><span lang="min">kapik/batuang aluih</span><br/>grilled or bamboo genteel</td>
        </tr>
        <tr>
          <td>Rank 7</td>
          <td><ArticleImage noborder src={[[imgDC7, ""], [imgCC7, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDS7, ""], [imgCS7, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDM7, ""], [imgCM7, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">jit</span><br/>(Hokkien chhit)</td>
          <td><span lang="ms">jit hitam</span> or <span lang="ms">jit daun</span><br/>black or leaf seven</td>
          <td><span lang="ms">jit burung</span><br/>bird seven</td>
          <td><span lang="ms">jit ban</span></td>
        </tr>
        <tr>
          <td><span lang="min">sisiak</span><br/>‘scales’</td>
          <td><span lang="min">sisiak bendera</span><br/>flag scales</td>
          <td><span lang="min">sisiak gadang</span><br/>big scales</td>
          <td><span lang="min">sisiak aluih</span><br/>genteel scales</td>
        </tr>
        <tr>
          <td>Rank 8</td>
          <td><ArticleImage noborder src={[[imgDC8, ""], [imgCC8, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDS8, ""], [imgCS8, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDM8, ""], [imgCM8, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">puek</span><br/>(Hokkien poeh)</td>
          <td><span lang="ms">puek kerang</span><br/>cockle eight</td>
          <td><span lang="ms">puek menak</span><br/>noble{/*<Footnote>Menak is a title for an aristocrat.</Footnote>*/} eight</td>
          <td><span lang="ms">puek ban</span></td>
        </tr>
        <tr>
          <td><span lang="min">pacah</span><br/>‘broken’</td>
          <td><span lang="min">pacah lapan</span><br/>broken eight</td>
          <td><span lang="min">pacah manih</span><br/>broken sweet</td>
          <td><span lang="min">pacah aluih</span><br/>broken genteel</td>
        </tr>
        <tr>
          <td>Rank 9</td>
          <td><ArticleImage noborder src={[[imgDC9, ""], [imgCC9, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDS9, ""], [imgCS9, ""]]} /></td>
          <td><ArticleImage noborder src={[[imgDM9, ""], [imgCM9, ""]]} /></td>
        </tr>
        <tr>
          <td><span lang="ms">kau</span><br/>(Hokkien káu)</td>
          <td><span lang="ms">kau hitam</span><br/>black nine</td>
          <td><span lang="ms">kau merah</span><br/>red nine</td>
          <td><span lang="ms">kau ban</span></td>
        </tr>
        <tr>
          <td><span lang="min">tali</span><br/>‘rope’</td>
          <td><span lang="min">tali bulek</span><br/>round rope</td>
          <td><span lang="min">tali merah</span><br/>red rope</td>
          <td><span lang="min">tali aluih</span><br/>genteel rope</td>
        </tr>
      </tbody>
    </Table>
    <Footnote standalone>
      The book <Cite r={GatewayToOldSchoolGames} inline /> uses the spellings: burung = burong, batik = bateh, yu = yeo, hue sio = huay sio, putih = puteh, ji = jee, sa = sarh, si = see, go = gor, lak = lark.
    </Footnote>
    <Section title="Games">
      <p>There are several games played with Ceki cards. For most of them, I do not know of any rules recorded online:<Cite r={NyonyaMosaic} page={124} /></p>
      <ul>
        <li><GameRef id="cholek-tiga"/> (‘draw three’), a game for two or three players<Cite r={BabaMalayDictionary} page={214}/><Cite r={ChikiCards} page={125}/></li>
        <li>Pak Tui, a solitaire game<Cite r={BabaMalayDictionary} page={215} /></li>
        <li><GameRef id="balik-satu"/> (‘turn one’), a game with no fixed number of players<Cite r={BabaMalayDictionary} page={214}/><Cite r={ChikiCards} page={122}/></li>
        <li><Link to="/games/balik-satu/#variations">Balik Lima Belas</Link><Cite r={ChikiCards} page={127} />/Balek Lima Belair<Cite r={BabaMalayDictionary} page={124} />/Bukak Lima Blas Leh<Cite r={TheBabas} page={167}/> (‘turn fifteen’), an alternate method of scoring Balik Satu</li>
        <li>Choke/Chote (Ramay), a game for more than for players<Cite r={BabaMalayDictionary} /></li>
        <li>Choke/Chote Kiong, a four-player game<Cite r={BabaMalayDictionary} page={214} /></li>
      </ul>
    </Section>
    <Section title="Manufacturers & Brands">
      <p>(Extinct) European manufacturers include:</p>
      <ul>
        <li><Noun lang="fr">Camoin</Noun>, a French company that was based in Marseille</li>
        <li><Noun lang="nl">Handelsvereeniging Harmsen Verweij & Dunlop N.V.</Noun>, a Dutch company<Cite r={TraditionCardGameCeki} /></li>
        <li><a href="https://www.wopc.co.uk/belgium/mesmaeker/mesmaeker-moentack"><Noun lang="fr">Mesmaekers Frères</Noun></a>, a Belgian company based in Turnhour whose cards were imported to Java by Brandon Mesritz & Co.<Cite r={ChiChiPai}/></li>
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
