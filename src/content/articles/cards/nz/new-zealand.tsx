import * as React from 'react';

import { CroxleyHistory, AstuteBusinessman, CroxleyClosing, DRGCompany } from 'References/bibliography.json';

import { ArticleImage, Cards, Cite, Footnote, Noun, Section } from 'ui';

import imgCroxleyA1 from './Croxley-A-1.jpg';
import imgCroxleyA2 from './Croxley-A-2.jpg';
import imgCroxleyA3 from './Croxley-A-3.jpg';
import imgCroxleyA4 from './Croxley-A-4.jpg';
import imgCroxleyJ1 from './Croxley-J-1.jpg';
import imgCroxleyJ2 from './Croxley-J-2.jpg';
import imgCroxleyJ3 from './Croxley-J-3.jpg';
import imgCroxleyJ4 from './Croxley-J-4.jpg';
import imgCroxleyPictorialJ from './Croxley-pictorial-J.jpg';
import imgCroxleyPictorialJoker from './Croxley-pictorial-joker.jpg';
import imgCroxleyPictorialBack from './Croxley-pictorial-back.jpg';
import imgCroxleyFantail from './Croxley-Fantail.jpg';
import imgCroxleyTui from './Croxley-Tui.jpg';
import imgCroxleyChch from './Croxley-Chch.jpg';
import imgCroxleyCook from './Croxley-Cook.jpg';
import imgCroxleyQueenstown from './Croxley-Queenstown.jpg';
import imgCroxleyJoker from './Croxley-Joker.jpg';
import imgDRGWaddingtonsAce from './DRG-Waddingtons-Ace.jpg';
import imgDRGWaddingtonsJoker from './DRG-Waddingtons-Joker.jpg';

import imgTannerCouchAce from './TannerCouch-A.jpg';
import imgTannerCouchJoker from './TannerCouch-Joker.jpg';
import imgStrongReadyAce from './StrongReady-A.jpg';
import imgStrongReadyJoker from './StrongReady-Joker.jpg';
import imgStrongReady1953Ace from './StrongReady-1953-Ace.jpg';
import imgStrongReady1953Joker from './StrongReady-1953-Joker.jpg';
import imgStrongReady1953Ad1 from './StrongReady-1953-Ad1.jpg';
import imgStrongReady1953Ad2 from './StrongReady-1953-Ad2.jpg';

import imgArchibaldDudingstonWillis from './Archibald_Dudingston_Willis.jpg';
import imgWillisAd from './22738050.jpg';
import imgWillisBox500 from './ADWillis-500.jpg';
import imgWillisBoxArcade1 from './ADWillis-Arcade-Old.jpg';
import imgWillisBoxArcade2 from './ADWillis-Arcade-New.jpg';
import imgWillisBoxStrand from './ADWillis-Strand-Box.jpg';
import imgWillisAce from './Willis-Ace.jpg';
import imgWillisJoker from './Willis-Joker.jpg';
import imgWillisQueen from './Willis-Queen.jpg';
import imgUEBAce from './UEB-Ace.jpg';
import imgUEBJoker from './UEB-Joker.jpg';
import imgUEBQueen from './UEB-Queen.jpg';
import imgUEB2Back from './UEB2-Back.jpg';
import imgUEB2Joker from './UEB2-Joker.jpg';
import imgUEB2Queen from './UEB2-Queen.jpg';
import imgAmcorAce from './Amcor-Ace.jpg';
import imgAmcorJoker from './Amcor-Joker.jpg';
import imgAmcorQueen from './Amcor-Queen.jpg';

import imgGoodallEgmont from './Goodall-Egmont.jpg';
import imgGoodallMatheson from './Goodall-Matheson.jpg';

const NZ: React.FC = () =>
  <>
    <p>There have not been many manufacturers of playing-cards in New Zealand.</p>
    <Section title="John Dickinson/Croxley">
      <Footnote standalone>The original John Dickinson/Croxley factory (known as “Croxley house”) still stands in Wellington and was turned into <a href="https://custance.co.nz/project/croxley-mills-apartments">an apartment building</a> in the early 2000s.</Footnote>
      <p>John Dickinson was a stationery company based in the United Kingdom that opened a New Zealand branch (“John Dickinson & Co.”) in 1920.<Cite r={CroxleyHistory} />  “Croxley” was their public brand of stationery products in New Zealand (the UK company originated in <a href="https://en.wikipedia.org/wiki/Croxley_Green">Croxley Green</a>), under which they also published playing cards. As far as I know, the UK company never manufactured cards.</p>
      <p>In 1966 the UK company merged with E. S. & A. Robinson to form “Dickinson–Robinson Group”; the New Zealand firm was renamed to “The Dickinson Robinson Group” for a few months from 19 Dec 1968 – 26 Mar 1969, and then “DRG (New Zealand) Limited” until they were liquidated in 1994.<Cite r={DRGCompany} /></p>
      <p>Croxley remained around as its own company, but closed its last manufacturing plant in 2005.<Cite r={CroxleyClosing} /> The brand itself still exists, being owned by OfficeMax. However, it may soon disappear forever as OfficeMax closed all of its New Zealand stores in late 2020,<Footnote>A victim of Covid-19.</Footnote> and is now online-only.</p>
      <Section title="Cards">
        <ArticleImage noborder alt="" src={imgCroxleyJoker}>
          The Joker card (with the non-pictorial decks) remains unchanged throughout the years, aside from reproduction infelicities.
        </ArticleImage>
        <p>The aces have changed over the years to match the name of the company; the later aces are often poor copies of the earlier ones, where detail has been lost.</p>
        <div className="multi wide">
          <ArticleImage noborder alt="" src={imgCroxleyA1}>
            An early “John Dickinson & Co.” Realm Ace.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyA2}>
            A “John Dickinson” Ace.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyA3}>
            A “DRG” Ace.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyA4}>
            A “Croxley” Realm Ace, purchased 2021.
          </ArticleImage>
        </div>
        <p>The earlier (pre-DRG) cards are most easily identified by a <Cards>J</Cards> index which has a turned-in tail, but this feature is lost in the DRG cards which shifted to a sans-serif index.</p>
        <div className="multi wide">
          <ArticleImage noborder alt="" src={imgCroxleyJ1}>
            An early “John Dickinson & Co.” Realm Jack, printed in four colours.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyJ2}>
            A “John Dickinson” Jack, printed in two colours.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyJ3}>
            A “DRG” Jack, with portrait reduced in size and sans-serif indices. There is visible degradation of the linework.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyJ4}>
            A “Croxley” Realm Jack, with courts no longer derived from the John Dickinson pattern.
          </ArticleImage>
        </div>
        <p>At one point, DRG also produced Waddington’s cards in New Zealand, under licence:</p>
        <ArticleImage
          src={[
            [imgDRGWaddingtonsAce,"An ace of spades with text reading ‘Made under licence from Waddington’s Playing Card Co Ltd. Made in New Zealand by DRG Stationery. A Dickinson–Robinson Group Product.’"],
            [imgDRGWaddingtonsJoker,"A Waddington’s-style Joker card."],
          ]}>
          DRG-produced Waddington’s cards. Note the text on the Ace and the small ® on the joker.
        </ArticleImage>
        <p>The curled-<Cards>J</Cards> index on the pre-DRG cards is useful in identifying tourist pictorial decks where the card images are replaced by photographs of scenic locations, so that the Ace gives no identifying information. The following cards are from a deck produced before 1958:</p>
        <div className="multi wide">
          <ArticleImage noborder alt="" src={imgCroxleyPictorialJ}>
            A pictorial card with the characteristic <Cards>J</Cards> index.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyPictorialBack}>
            The back of the card deck, showing a woman performing with <a href="https://en.wikipedia.org/wiki/Poi_(performance_art)"><span lang="mi">poi</span></a>.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyPictorialJoker}>
            The joker of the deck, featuring a <a href="https://en.wikipedia.org/wiki/Hei-tiki"><span lang="mi">hei-tiki</span></a>.
          </ArticleImage>
        </div>
        <p>The Dickinson and DRG cards are probably most often found with backs designed for tourists, depicting locations around New Zealand, or New Zealand wildlife:</p>
        <div className="multi">
          <ArticleImage noborder alt="" src={imgCroxleyTui}>
            Croxley/John Dickinson & Co. card back showing a <a href="https://en.wikipedia.org/wiki/Tui_(bird)">Tūī</a>.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyFantail}>
            Croxley/John Dickinson & Co. card back showing a <a href="https://en.wikipedia.org/wiki/New_Zealand_fantail">Fantail</a>.
          </ArticleImage>
        </div>
        <div className="multi wide">
          <ArticleImage noborder alt="" src={imgCroxleyChch}>
            Croxley/John Dickinson card back showing the <a href="http://ketechristchurch.peoplesnetworknz.info/places_and_streets/topics/show/415-ferrier-fountain-christchurch-town-hall">Ferrier fountain</a>.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyQueenstown}>
            John Dickinson card back showing the Queenstown gondola (the first in the southern hemisphere).
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyCook}>
            Croxley/DRG card back showing <a href="https://en.wikipedia.org/wiki/Aoraki_/_Mount_Cook"><Noun lang="mi">Aoraki</Noun> / Mount Cook</a>.
          </ArticleImage>
        </div>
      </Section>
    </Section>
    <Section title="A. D. Willis/Weeks Ltd./United Empire Box/Amcor">
      <ArticleImage 
        size="wide"
        src={imgWillisAd}
        alt=""
        source={{
          originalUrl: "https://natlib.govt.nz/records/22738050",
          license: "cc0",
          organization: {orgName:"Alexander Turnbull Library"},
        }}>
        An advertisement for A. D. Willis’s playing cards.
      </ArticleImage>
      <ArticleImage 
        position="aside"
        src={imgArchibaldDudingstonWillis}
        alt=""
        source={{
          originalUrl: "https://natlib.govt.nz/records/22778453",
          license: "cc0",
          organization: {orgName:"Alexander Turnbull Library"},
        }}>
        Archibald Dudingston Willis, circa 1902.
      </ArticleImage>
      <p>Archibald Dudingston Willis was a very early manufacturer of playing cards in New Zealand, who operated in Wanganui from the 1880s. In 1951 the company was sold to Weeks Ltd, which kept A. D. Willis as a subsidiary, and the business was sold in turn to United Empire Box (UEB) around 1964.<Cite r={AstuteBusinessman}/> In the late 1980s the design was taken over by Kiwi Packaging (part of Amcor). This line of designs now appears to be out-of-print, as Amcor no longer manufacture playing cards.</p>
      <ArticleImage
        src={[
          [imgWillisAce, ""],
          [imgWillisQueen, ""],
          [imgWillisJoker, ""],
          [imgWillisBox500, ""],
        ]}>
        Cards in the Willis style, this deck possibly produced by A. D. Willis. The deck is a 500 deck and includes <Cards>&#x246A;</Cards>s, <Cards>&#x246B;</Cards>s, and <Cards>&#x246C;</Cards>s. An unusual detail is that the tail of the <Cards>Q</Cards> index is truncated on the red cards.
      </ArticleImage>
      <ArticleImage
        src={[
          [imgUEBAce, ""],
          [imgUEBQueen, ""],
          [imgUEBJoker, ""],
          [imgWillisBoxStrand, ""],
        ]}>
        “Strand” Cards in the Willis style, this deck probably made by UEB. The designs are redrawn from the deck above. This deck is unusual in that the paper is uncoated and the cards feel like plain cardboard, despite the box promising a “Linen Finish”.
      </ArticleImage>
      <ArticleImage
        src={imgWillisBoxArcade1}
        size="small"
        alt=""
        position="aside">
        An earlier “Arcade” box as produced by Weeks Ltd.
      </ArticleImage>
      <ArticleImage
        src={[
          [imgAmcorAce, ""],
          [imgAmcorQueen, ""],
          [imgAmcorJoker, ""],
          [imgWillisBoxArcade2, ""],
        ]}>
        “Arcade” Cards in the Willis style, produced by Amcor Cartons.
      </ArticleImage>
      <p>UEB also produced pictorial souvenir decks, such as the one below.</p>
      <ArticleImage
        src={[
          [imgUEB2Back, ""],
          [imgUEB2Queen, ""],
          [imgUEB2Joker, ""],
        ]}>
        Back and cards from a UEB tourist deck.
      </ArticleImage>
    </Section>
    <Section title="Strong & Ready/Tanner Couch">
      <p>Strong & Ready Ltd. was registered from 1948–1974.</p>
      <ArticleImage noborder size="wide" src={[
        [imgStrongReady1953Joker, ""],
        [imgStrongReady1953Ace, ""],
        [imgStrongReady1953Ad1, ""],
        [imgStrongReady1953Ad2, ""],
      ]}>
        Strong & Ready cards from a Canasta deck, 1953.
      </ArticleImage>
      <div className="multi wide">
        <ArticleImage noborder src={[[imgStrongReadyJoker, ""],[imgStrongReadyAce, ""]]}>
          Strong & Ready Joker and Ace, from a “Mark 1 Canasta” deck.
        </ArticleImage>
        <ArticleImage noborder alt="" src={[[imgTannerCouchAce, ""],[imgTannerCouchJoker, ""]]}>
          Tanner Couch Ace and Joker, from a “Royal Flush 500” deck.
        </ArticleImage>
      </div>
    </Section>
    <Section title="Foreign manufacturers">
      <p>In addition to cards manufactured in New Zealand, cards featuring New Zealand scenes were manufactured in other countries, such as the United Kingdom.</p>
      <ArticleImage
        src={[
          [imgGoodallEgmont, ""],
          [imgGoodallMatheson, ""],
        ]}>
        Two card backs produced by Goodall under their “Boudoir” brand, with art by <a href="https://en.wikipedia.org/wiki/Frank_Henry_Mason">Frank H. Mason</a>. The left features <a href="https://en.wikipedia.org/wiki/Mount_Taranaki">Mount Taranaki / Egmont</a>, and the right <a href="https://en.wikipedia.org/wiki/Lake_Matheson">Lake Matheson</a>.
      </ArticleImage>
    </Section>
  </>;

export default NZ;
