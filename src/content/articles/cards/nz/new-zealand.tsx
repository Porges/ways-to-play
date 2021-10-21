import * as React from 'react';

import { ArticleImage, Cards, Cite, Description, Footnote, Noun, Section } from 'ui';

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
import imgDRGCanastaAce from './DRG-Canasta-Ace.jpg';
import imgDRGCanastaJoker from './DRG-Canasta-Joker.jpg';

import imgTannerCouchAce from './TannerCouch-A.jpg';
import imgTannerCouchJoker from './TannerCouch-Joker.jpg';
import imgStrongReadyAce from './StrongReady-A.jpg';
import imgStrongReadyJoker from './StrongReady-Joker.jpg';
import imgStrongReady1953Ace from './StrongReady-1953-Ace.jpg';
import imgStrongReady1953Joker from './StrongReady-1953-Joker.jpg';
import imgStrongReady1953Ad1 from './StrongReady-1953-Ad1.jpg';
import imgStrongReady1953Ad2 from './StrongReady-1953-Ad2.jpg';

import imgArchibaldDudingstonWillis from './Archibald_Dudingston_Willis.jpg';
import imgWillisSpread from './MA_I002836.jpg';
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
import imgUEB3Ace from './UEB3-Ace.jpg';
import imgUEB3Joker from './UEB3-Joker.jpg';
import imgUEB3Queen from './UEB3-Queen.jpg';
import imgUEB3Box from './UEB3-Box.jpg';
import imgWeeksAce from './Weeks-Ace.jpg';
import imgWeeksJoker from './Weeks-Joker.jpg';
import imgWeeksQueen from './Weeks-Queen.jpg';
import imgWeeksCanasta from './Weeks-Canasta.jpg';

import imgGoodallEgmont from './Goodall-Egmont.jpg';
import imgGoodallMatheson from './Goodall-Matheson.jpg';


const NZ: React.FC = () =>
  <>
    <Description>Manufacturing of playing cards in New Zealand started in the 1880s. Despite this early start, there have not been many manufacturers of playing-cards.</Description>
    <p>The main “lines” of manufacturers are (or were):</p>
    <ul>
      <li><a href="#john-dickinsoncroxley">John Dickinson/Croxley</a></li>
      <li><a href="#a-d-willisweeks-ltdunited-empire-boxamcor">A. D. Willis/Weeks Ltd./United Empire Box/Amcor</a></li>
      <li><a href="#strong-andamp-readytanner-couch">Strong &amp; Ready/Tanner Couch</a></li>
    </ul>
    <ArticleImage
      size="wide"
      src={imgWillisAd}
      alt=""
      mainImage
      source={{
        originalUrl: "https://natlib.govt.nz/records/22738050",
        license: "cc0",
        organization: { orgName: "Alexander Turnbull Library" },
      }}>
      An advertisement for A. D. Willis’s playing cards.
    </ArticleImage>
    <Section title="Tax Stamps">
      <p>Playing cards imported into New Zealand were taxed from 1860, and stamped from 1880 until the tax ended in 1930.<Cite r="TaxStampNZ" /> All examples I have seen have been stamped on the <Cards>2d</Cards>.</p>
      <div className="multi">
        <ArticleImage
          src={require('./tax1.jpg')}
          alt="">
          Tax stamp dated 14<sup>th</sup> March, 1913, on imported “1001 Aladdin” cards made by the National Card Co. of Indianapolis & New York.
        </ArticleImage>
        <ArticleImage
          src={require('./tax2.jpg')}
          alt="">
          Tax stamp dated 21<sup>st</sup> June, 1929, on imported “Congress” brand cards made by the United States Playing Card Co. in Windsor, Ontario, Canada.
        </ArticleImage>
        <ArticleImage
          src={require('./tax3.jpg')}
          alt="">
          Undated tax stamp from A. D. Willis cards.
        </ArticleImage>
      </div>
    </Section>
    {/*
    <Section title="Playing cards & Māori">
    </Section>
    */}
    <Section title="Manufacturers">
      <Section title="John Dickinson/Croxley">
        <Footnote standalone>The original John Dickinson/Croxley factory (known as “Croxley house”) still stands in Wellington and was turned into <a href="https://custance.co.nz/project/croxley-mills-apartments">an apartment building</a> in the early 2000s.</Footnote>
        <p>John Dickinson was a stationery company based in the United Kingdom that opened a New Zealand branch (“John Dickinson & Co.”) in 1920.<Cite r="CroxleyHistory" />  “Croxley” was their public brand of stationery products in New Zealand (the UK company originated in <a href="https://en.wikipedia.org/wiki/Croxley_Green">Croxley Green</a>), under which they also published playing cards. As far as I know, the UK company never manufactured cards.</p>
        <ArticleImage noborder alt="" src={imgCroxleyJoker} position="left">
          The Joker card (with the non-pictorial decks) remains unchanged throughout the years, aside from reproduction infelicities.
      </ArticleImage>
        <p>In 1966 the UK company merged with E. S. & A. Robinson to form “Dickinson–Robinson Group”; the New Zealand firm was renamed to “The Dickinson Robinson Group” for a few months from 19 Dec 1968 – 26 Mar 1969, and then “DRG (New Zealand) Limited” until they were liquidated in 1994.<Cite r="DRGCompany" /></p>
        <p>Croxley remained around as its own company, but closed its last manufacturing plant in 2005.<Cite r="CroxleyClosing" /> The brand itself still exists, being owned by OfficeMax. However, it may soon disappear forever as OfficeMax closed all of its New Zealand stores in late 2020,<Footnote>A victim of Covid-19.</Footnote> and is now online-only. Current Croxley cards appear to be made in China and only retain the Ace as a nod to the Dickinson line.</p>
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
        <div className="multi wide">
          <ArticleImage
            noborder
            src={[
              [imgDRGWaddingtonsAce, "An ace of spades with text reading ‘Made under licence from Waddington’s Playing Card Co Ltd. Made in New Zealand by DRG Stationery. A Dickinson–Robinson Group Product.’"],
              [imgDRGWaddingtonsJoker, "A Waddington’s-style Joker card."],
            ]}>
            At one point, DRG produced Waddington’s cards in New Zealand, under licence. Note the text on the Ace and the small ® on the joker.
          </ArticleImage>
          <ArticleImage
            noborder
            src={[
              [imgDRGCanastaAce, ""],
              [imgDRGCanastaJoker, ""],
            ]}>
            Cards from a DRG-produced Canasta set. Note that the Joker is the same as <a href="#strong-andamp-readytanner-couch">Strong & Ready</a>’s. It is possible DRG took over this design from them (the rest of the deck is standard DRG).
          </ArticleImage>
        </div>
        <p>The curled-<Cards>J</Cards> index on the pre-DRG cards is useful in identifying tourist pictorial decks where the card images are replaced by photographs of scenic locations, so that the Ace gives no identifying information. The following cards are from a deck produced before 1958:</p>
        <div className="multi wide">
          <ArticleImage noborder alt="" src={imgCroxleyPictorialJ}>
            A pictorial card with the characteristic <Cards>J</Cards> index.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyPictorialBack}>
            The back of the card deck, showing a woman performing with <a href="https://en.wikipedia.org/wiki/Poi_(performance_art)"><span lang="mi">poi</span></a>.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyPictorialJoker}>
            The joker of the deck, featuring a <a href="https://en.wikipedia.org/wiki/Hei-tiki"><span lang="mi">hei-tiki</span></a>. Note that this rather offensively reduces a <a href="https://en.wikipedia.org/wiki/Taonga"><span lang="mi">taonga</span></a> to the status of a jester.
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
      <Section title="A. D. Willis/Weeks Ltd./United Empire Box/Amcor">
        <ArticleImage
          src={imgWillisSpread}
          alt="A spread of playing cards with joker on top. The joker has an image of a Māori warrior flourishing playing cards."
          size="wide"
          source={{
            organization: { orgName: "Museum of Te Papa Tongarewa" },
            identifier: "GH007256",
            originalUrl: "https://collections.tepapa.govt.nz/object/333268",
            license: "stock-image",
          }}>
          Playing cards, circa 1920, Whanganui, by A. D. Willis Ltd.
      </ArticleImage>
        <ArticleImage
          position="aside"
          src={imgArchibaldDudingstonWillis}
          alt=""
          source={{
            originalUrl: "https://natlib.govt.nz/records/22778453",
            license: "cc0",
            organization: { orgName: "Alexander Turnbull Library" },
          }}>
          Archibald Dudingston Willis, circa 1902.
      </ArticleImage>
        <p>Archibald Dudingston Willis was a very early manufacturer of playing cards in New Zealand, who operated in Wanganui from the 1880s. In 1951 the company was sold to Weeks Ltd, which kept A. D. Willis as a subsidiary, and the business was sold in turn to United Empire Box (UEB) around 1964.<Cite r="AstuteBusinessman" /> In the late 1980s the design was taken over by Kiwi Packaging (part of Amcor). This line of designs now appears to be out-of-print, as Amcor no longer manufacture playing cards.</p>
        <ArticleImage
          noborder
          src={[
            [require('./AD_Old-1.jpg'), ""],
            [require('./AD_Old-2.jpg'), ""],
            [require('./AD_Old-3.jpg'), ""],
            [require('./AD_Old-4.jpg'), ""],
          ]}>
          Cards in the original A. D. Willis style, <abbr title="circa">c.</abbr> 1910.
        </ArticleImage>
        <ArticleImage
          noborder
          src={[
            [imgWillisAce, ""],
            [imgWillisQueen, ""],
            [imgWillisJoker, ""],
            [imgWillisBox500, ""],
          ]}>
          Cards in the later Willis style, this deck possibly produced by A. D. Willis. The deck is a 500 deck and includes <Cards>&#x246A;</Cards>s, <Cards>&#x246B;</Cards>s, and <Cards>&#x246C;</Cards>s. An unusual detail is that the tail of the <Cards>Q</Cards> index is truncated on the red cards.
      </ArticleImage>
        <ArticleImage
          noborder
          src={[
            [imgWeeksAce, ""],
            [imgWeeksQueen, ""],
            [imgWeeksJoker, ""],
            [imgWeeksCanasta, ""],
          ]}>
          “Hostess” Canasta cards in the Willis style, as produced by Weeks Ltd. This deck retains the short tail on the red <Cards>Q</Cards> index.
      </ArticleImage>
        <ArticleImage
          noborder
          src={[
            [imgUEBAce, ""],
            [imgUEBQueen, ""],
            [imgUEBJoker, ""],
            [imgWillisBoxStrand, ""],
          ]}>
          “Strand” Cards in the Willis style, this deck probably made by UEB. The designs are redrawn from the original Willis design. This deck is unusual in that the paper is uncoated and the cards feel like plain cardboard, despite the box promising a “Linen Finish”.
      </ArticleImage>
        <ArticleImage
          noborder
          src={[
            [imgUEB3Ace, ""],
            [imgUEB3Queen, ""],
            [imgUEB3Joker, ""],
            [imgUEB3Box, ""],
          ]}>
          “Royal” Cards in the Willis style, made by UEB in four colours. “Kiwi” on the box describes the card backs.
      </ArticleImage>
        <ArticleImage
          src={imgWillisBoxArcade1}
          size="small"
          alt=""
          position="aside">
          An earlier “Arcade” box as produced by Weeks Ltd.
      </ArticleImage>
        <ArticleImage
          noborder
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
          noborder
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
          [require('./Elfin-1.jpg'), ""],
          [require('./Elfin-2.jpg'), ""],
          [require('./Elfin-3.jpg'), ""],
          [require('./Elfin-4.jpg'), ""],
        ]}>
          Strong & Ready “Elfin” patience-sized playing cards.
        </ArticleImage>
        <ArticleImage noborder size="wide" src={[
          [imgStrongReady1953Joker, ""],
          [imgStrongReady1953Ace, ""],
          [imgStrongReady1953Ad1, ""],
          [imgStrongReady1953Ad2, ""],
        ]}>
          Strong & Ready cards from a Canasta deck, 1953.
      </ArticleImage>
        <div className="multi wide">
          <ArticleImage noborder src={[[imgStrongReadyJoker, ""], [imgStrongReadyAce, ""]]}>
            Strong & Ready Joker and Ace, from a “Mark 1 Canasta” deck.
        </ArticleImage>
          <ArticleImage noborder alt="" src={[[imgTannerCouchAce, ""], [imgTannerCouchJoker, ""]]}>
            Tanner Couch Ace and Joker, from a “Royal Flush 500” deck.
        </ArticleImage>
        </div>
      </Section>
      <Section title="Foreign manufacturers">
        <p>In addition to cards manufactured in New Zealand, cards featuring New Zealand scenes were manufactured in other countries, such as the United Kingdom.</p>
        <ArticleImage
          noborder
          src={[
            [imgGoodallEgmont, ""],
            [imgGoodallMatheson, ""],
          ]}>
          Two card backs produced by Goodall under their “Boudoir” brand, with art by <a href="https://en.wikipedia.org/wiki/Frank_Henry_Mason">Frank H. Mason</a>. The left features <a href="https://en.wikipedia.org/wiki/Mount_Taranaki">Mount Taranaki / Egmont</a>, and the right <a href="https://en.wikipedia.org/wiki/Lake_Matheson">Lake Matheson</a>.
      </ArticleImage>
      </Section>
    </Section>
  </>;

export default NZ;
