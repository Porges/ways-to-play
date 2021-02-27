import * as React from 'react';

import { CroxleyHistory, CroxleyClosing, DRGCompany } from 'References/bibliography.json';

import { ArticleImage, Cards, Cite, Footnote, Section } from 'ui';
import { Link } from 'react-router-dom';

import imgCroxleyA1 from './Croxley-A-1.jpg';
import imgCroxleyA2 from './Croxley-A-2.jpg';
import imgCroxleyA3 from './Croxley-A-3.jpg';
import imgCroxleyJ1 from './Croxley-J-1.jpg';
import imgCroxleyJ2 from './Croxley-J-2.jpg';
import imgCroxleyJ3 from './Croxley-J-3.jpg';
import imgCroxleyPictorialJ from './Croxley-pictorial-J.jpg';
import imgCroxleyPictorialJoker from './Croxley-pictorial-joker.jpg';
import imgCroxleyPictorialBack from './Croxley-pictorial-back.jpg';

const NZ: React.FC = () =>
  <>
    <p>There have not been many manufacturers of playing-cards in New Zealand.</p>
    <Section title="John Dickinson/Croxley">
      <Footnote standalone>The original John Dickinson/Croxley factory (known as “Croxley house”) still stands in Wellington and was turned into <a href="https://custance.co.nz/project/croxley-mills-apartments">an apartment building</a> in the early 2000s.</Footnote>
      <p>John Dickinson was a stationery company based in the United Kingdom that opened a New Zealand branch (“John Dickinson & Co.”) in 1920.<Cite r={CroxleyHistory} />  “Croxley” was their public brand of stationery products in New Zealand (the UK company originated in <a href="https://en.wikipedia.org/wiki/Croxley_Green">Croxley Green</a>), under which they also published playing cards. As far as I know, the UK company never manufactured cards.</p>
      <p>In 1966 the UK company merged with E. S. & A. Robinson to form “Dickinson–Robinson Group”; the New Zealand firm was renamed to “The Dickinson Robinson Group” for a few months from 19 Dec 1968 – 26 Mar 1969, and then “DRG (New Zealand) Limited” until they were liquidated in 1994.<Cite r={DRGCompany} /></p>
      <p>Croxley remained around as its own company, but closed its last manufacturing plant in 2005.<Cite r={CroxleyClosing} /> The brand itself still exists, being owned by OfficeMax. However, it may soon disappear forever as OfficeMax closed all of its New Zealand stores in late 2020,<Footnote>A victim of Covid-19.</Footnote> and is now online-only.</p>
      <Section title="Cards">
        <p>The aces have changed over the years to match the name of the company; the later aces are often poor copies of the earlier ones, where detail has been lost.</p>
        <div className="multi wide">
          <ArticleImage noborder alt="" src={imgCroxleyA1}>
            An early “John Dickinson & Co.” Ace.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyA2}>
            A “John Dickinson” Ace.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyA3}>
            A “DRG” Ace.
          </ArticleImage>
        </div>
        <p>The earlier (pre-DRG) cards are most easily identified by a <Cards>J</Cards>-index which has a turned-in tail, but this feature is lost in the DRG cards which shifted to a sans-serif index.</p>
        <div className="multi wide">
          <ArticleImage noborder alt="" src={imgCroxleyJ1}>
            An early “John Dickinson & Co.” Jack, printed in four colours.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyJ2}>
            A “John Dickinson” Jack, printed in two colours.
          </ArticleImage>
          <ArticleImage noborder alt="" src={imgCroxleyJ3}>
            A “DRG” Jack, with visible degradation of linework and sans-serif indices.
          </ArticleImage>
        </div>
        <p>The index is useful in identifying tourist pictorial decks where the card images are replaced by photographs of scenic locations, so that the Ace gives no identifying information. The following cards are from a deck produced before 1958:</p>
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
      </Section>
    </Section>
  </>;

export default NZ;
