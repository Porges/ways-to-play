import * as React from 'react';

import { Cards, Cite, Footnote, ArticleImage, Section } from 'ui';
import { Link } from 'react-router-dom';
import { GameRef } from 'content/games/Game';
import { LoanWordsIndonesian, GatewayToOldSchoolGames, GamblingGamesOfMalaya, NyonyaMosaic, BabaMalayDictionary, ChikiCards }  from 'References/bibliography.json';
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

const Content: React.FC = () =>
  <section>
    <p>Ceki or Cherki<Footnote>The spelling Cherki seems to be more common in Malaysia and Singapore. In older Indonesian orthographies it can also be written Tjeki, or <span lang="ms-Arab">چکي</span> in Jawi. The word apparently comes from Amoy (Hokkien) Chinese <span lang="nan-Latn">chít ki</span> (<span lang="nan">一枝</span>)<Cite r={LoanWordsIndonesian} page={48} />, “one card”, perhaps referring to the pick-one/play-one nature of the most common Ceki games. <Cite r={GamblingGamesOfMalaya} inline/> gives the name as <span lang="nan">織箕</span> (<span lang="nan-Latn">chitki</span>) but I have not found this elsewhere; perhaps it is a phonetic back-formation.</Footnote> cards are widely used in Indonesia and parts of Malaysia and Singapore. They originally derive from Chinese 3-suited money cards, and were introduced to the region by <a href="https://en.wikipedia.org/wiki/Peranakans">Peranakan</a> people. In Minang they are called Koa (or Kowah).</p>
    <p>During the colonial era, cards were manufactured in Europe by Dutch companies and exported to Indonesia.</p>
    <p>The cards run <Cards>1–9</Cards> in three suits, and there are three ‘honour cards’, giving 30 different cards. Each deck, or <span lang="ms">kepala</span> (literally ‘head’), contains two copies of each card, giving 60 total. However, most Ceki games require multiple <span lang="ms">kepala</span> to play, often two sets (120 cards).</p>
    <p>The three suits are called:<Cite r={ChikiCards} page={119} /></p>
    <dl>
      <dt>Myriads (Numbers)</dt>
      <dd><span lang="ms">ban</span>, from Hokkien <span lang="nan-Latn">bān</span> <span lang="nan">萬/万</span> (‘myriad’)</dd>
      <dt>Strings</dt>
      <dd><span lang="ms">manek</span> (‘bead’) or <span lang="ms">sok</span>, from Hokkien <span lang="nan">索</span> (‘rope’)</dd>
      <dt>Coins</dt>
      <dd><span lang="ms">hitam</span> (‘black’), or <span lang="ms">batik</span>, or <span lang="ms">tong</span>, from Hokkien <span lang="nan">筒</span> (‘barrel’)</dd>
    </dl>
    <p>Each card in the deck has its own nickname, based on its appearance. Malaysian or Singaporean names are based on the rank (derived from Hokkien numbers) and either the suit name or some nickname based on the middle portion of the card,<Cite r={ChikiCards} page={121}/> which is slightly bigger there than in the Indonesian version. The rank names used in Minangkabau are based on the indices in the corners of the cards. The images in the table below are from a Balinese Ceki deck, so the Malaysian/Singaporean names are sometimes obscure.</p>
    <Table className="text-center">
      <thead>
        <th></th>
        <th>Coins</th>
        <th>Strings</th>
        <th>Myriads</th>
      </thead>
      <tbody>
        <tr>
          <td>Rank 1 (honour cards called kaki (foot?))</td>
          <td><ArticleImage noborder size="small" src={imgCOT} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCWF} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCRF} alt="" /></td>
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
          <td><ArticleImage noborder size="small" src={imgCC1} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCS1} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCM1} alt="" /></td>
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
          <td><ArticleImage noborder size="small" src={imgCC2} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCS2} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCM2} alt="" /></td>
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
          <td><ArticleImage noborder size="small" src={imgCC3} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCS3} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCM3} alt="" /></td>
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
          <td><ArticleImage noborder size="small" src={imgCC4} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCS4} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCM4} alt="" /></td>
        </tr>
        <tr>
          <td><span lang="ms">si</span><br/>(Hokkien sì)</td>
          <td><span lang="ms">si hitam</span><br/>black four</td>
          <td><span lang="ms">si putih</span><br/>white four</td>
          <td><span lang="ms">si ban</span></td>
        </tr>
        <tr>
          <td><span lang="min">suduang</span><br/> ‘hut’(?)</td>
          <td><span lang="min">suduang (h)itam</span> or <span lang="min">wajik</span><br/>black or diamond hut</td>
          <td><span lang="min">suduang pinggang</span><br/>pinggang hut</td>
          <td><span lang="min">suduang putiah</span> or <span lang="min">aluih</span><br/>white or genteel hut</td>
        </tr>
        <tr>
          <td>Rank 5</td>
          <td><ArticleImage noborder size="small" src={imgCC5} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCS5} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCM5} alt="" /></td>
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
          <td><ArticleImage noborder size="small" src={imgCC6} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCS6} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCM6} alt="" /></td>
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
          <td><ArticleImage noborder size="small" src={imgCC7} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCS7} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCM7} alt="" /></td>
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
          <td><ArticleImage noborder size="small" src={imgCC8} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCS8} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCM8} alt="" /></td>
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
          <td><ArticleImage noborder size="small" src={imgCC9} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCS9} alt="" /></td>
          <td><ArticleImage noborder size="small" src={imgCM9} alt="" /></td>
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
        <li>Bukak Lima Belas/Balek Lima Belair/Chot<Cite r={ChikiCards} page={127} /></li>
        <li>Pak Tui, a solitaire game<Cite r={BabaMalayDictionary} page={215} /></li>
        <li>Choke/Chote (Ramay), a game for more than for players<Cite r={BabaMalayDictionary} /></li>
        <li><GameRef id="balek-satu"/> (‘return one’), a game with no fixed number of players<Cite r={BabaMalayDictionary} page={214}/><Cite r={ChikiCards} page={122}/></li>
        <li>Choke/Chote Kiong, a four-player game<Cite r={BabaMalayDictionary} page={214} /></li>
      </ul>
    </Section>
  </section>;

export default Content;
