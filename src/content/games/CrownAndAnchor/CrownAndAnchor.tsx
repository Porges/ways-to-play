import * as React from 'react';

import { Cite, Cards, ArticleImage, Description, Section, Footnote } from 'ui';
import { GameRef } from '../Game';

import imgHHH1 from './shutterstock_1350321158.jpg';
import imgHHH2 from './shutterstock_1350321164.jpg';
import imgBaliDice from './shutterstock_1398460952.jpg';

const Content: React.FC = () => <>
  <Description>Crown & Anchor is a dice game that was popular with English servicemen in the early 20th century. The game play is equivalent to that of <GameRef id="chuck-a-luck" />, but the pips on the dice and the numbers on the staking-table are replaced by pictures: 👑&#xfe0e; crown, ⚓&#xfe0e; anchor, <Cards>s</Cards> spade, <Cards>c</Cards> club, <Cards>d</Cards> diamond, <Cards>h</Cards> heart.</Description>
  <Section title="History">
    <ArticleImage
      size="wide"
      src={require('./game-crown-anchor-game-mat-world-war-i-1915-791762-large.jpg')}
      alt=""
      source={{
        license: "cc-by",
        licenseVersion: "4.0",
        originalUrl: "https://collections.museumsvictoria.com.au/items/387918",
        author: {
          family: "Morrow",
          given: "Sandra"
        },
        organization: { "orgName": "Museums Victoria" }
      }}>
      A Crown & Anchor mat purchased in Colombo in 1915 and used by Australian troops while in transport.
    </ArticleImage>
    <p>Many gaming histories cite a 17th or 18th century origin for the game, but based on textual evidence it seems to date from the late 19th century, probably derived from pictorial versions of Chuck-A-Luck such as “Mustang”.</p>
    <p>In England there are certainly many references to “dice boards” or “gaming tables”, but they are not described in detail very often. I have found one very early reference to a similar game played with “anchors, stars, clubs, spades, hearts, and diamonds” at the coronation fair of George IV in Hyde Park in 1821.<Cite r="DissolutionOfCoronationFair"/> In 1859 a game involving “anchor, heart, etc” is described at a fair,<Cite r="GamblingAtFairs" /> and in 1860 “clubs, spades, &c.” at a game at the races.<Cite r="GamblingAtTheRaces" /> An 1864 article claims that <a href="https://en.wikipedia.org/wiki/William_Brodie">Deacon Brodie</a> played a game of “anchor, club, star, feather, heart, [and] spade” in his youth, but this may be anachronistic—in any case, it is an early reference.<Cite r="TheMysteriesOfEdinburgh"/> In 1875 there is reference to a game of “feather, star, and anchor” in Epping Forest.<Cite r="EasterMondayInTheForest" /> </p>
    <p>Early references to the game under the name <span lang="nl">anker en zon</span> (“anchor and sun”) appear in Flanders in 1880,<Cite r="Aldenardiana" /> and as “the crown and anchor game” in Australia in 1882.<Cite r="CrownAndAnchorAustralia" /> An equivalent game is recorded as being played in British-controlled Hong Kong in 1884.<Cite r="HongKongCrownAnchor" /></p>
    <ArticleImage
      position="aside"
      size="wide"
      noborder
      src={require('./StarsAndStripes.png')}
      alt=""
      source={{ license: "cc0" }}>
      An image from the patent for the game “Stars and Stripes”.
    </ArticleImage>
    <p>An interesting patent lodged in England in 1895 (see image) indicates that the game must have been known there in some way, but I have yet to find any other references to it this early on, and the patent does not mention Crown & Anchor by name.<Cite r="GB189504141A" /></p>
    <p>The game seems to have first became popular with British soldiers during the <a href="https://en.wikipedia.org/wiki/Second_Boer_War">Second Boer War</a> (1899–1902),<Footnote>A syndicated article from 1914 also discusses the game as having been played in the army “since the first South African campaign”.<Cite r="GamblingInTheArmy" /></Footnote> when British and Australian troops fought alongside American volunteers. In 1900, the game is recorded as having been played by English <abbr className="initialism" title="prisoners of war">POW</abbr>s at the Waterval prison camp, under both the names of “chuck-a-luck”<Cite r="AGlimpseAtWaterval" /> and “crown and anchor”.<Cite r="TrooperMilverton" /> In 1902, the game was described in London as “a new game from South Africa”.<Cite r="ANewGameFromSouthAfrica"/></p>
    <p>Other references from the Boer war period refer to returning British soldiers being swindled at the game,<Cite r="RobbingTommyAtkins" /> returning Australian troops playing it aboard transport ships (including the Drayton Grange<Cite r="DraytonGrange" />), and a report by an American who played the game with English troops.<Cite r="FromTombsBaker" /></p>
    <ArticleImage
      src={require('./6089711.jpg')}
      alt=""
      source={{ license: "cc0", originalUrl: "https://www.awm.gov.au/collection/E04801", "organization": { "orgName": "Australian War Memorial" } }}>
      British gun crews with two 9″ guns, May 1918; the counterweight “dirt box” in front is painted with Crown & Anchor iconography.
    </ArticleImage>
    <p>At the beginning of WWI the game was, at least at first, still unfamiliar to many British soldiers, and seems to have been most strongly associated with Australian troops. Sam Sutcliffe described a camp scene at <a href="https://en.wikipedia.org/wiki/Abbassia">Abbassia</a> in 1915:<Cite r="NobodyOfAnyImportance" page={191} /></p>
    <blockquote>
      <p>
        Gambling was forbidden to us and, officially, it may have been to them, but a mighty sight worth seeing was the Australian Crown And Anchor school. Soon after dusk, quite some distance from their camp, a line of little lights would commence to twinkle. Curiosity lured me over there, spiced by the knowledge that, if our Military Police caught me near those wicked Aussies, I’d be in real trouble.<Footnote>English troops were not permitted to mingle with the Australians.</Footnote> I believe I planned to vanish into the dark desert if trouble threatened, and make my merry way back to our camp later.
      </p>
      <p>
        I found a long line of improvised desks, a space of several yards between each of them. A couple of candles on each desk illuminated the Crown And Anchor board — actually a leatherette sheet, easily folded up and pocketed in an emergency, with the six symbols of the game printed on it. The operator sat on a box and called out his line of persuasion or temptation, such as “Come on, me lucky lads! The more you put down the more you pick up. Who’ll have a bet on the old mudhook?”<Footnote>i.e. anchor</Footnote>
      </p>
      <p>
        Some operators always had a group of punters around them, others did less business. Why should some be more successful than others, even there at the edge of the desert? All had the same set-up, although they did vary the odds. The lowest offer made was to double your money if the symbol you’d backed turned up when the dice was thrown. Perhaps the variations which could be introduced by ingenious operators attracted men who applied careful thought to their gambling. Watching from my respectful distance, I was very impressed, at times amazed, at the quantity of money which changed hands.
      </p>
    </blockquote>
    <ArticleImage
      size="wide"
      src={require('./4169475.jpg')}
      alt=""
      source={{ license: "cc0", originalUrl: "https://www.awm.gov.au/collection/C607?image=1", "organization": { "orgName": "Australian War Memorial" } }}>
      Australians playing Crown & Anchor aboard HMAT Medic, <abbr title="circa">c.</abbr> 1919.
    </ArticleImage>
    <p>Another report from Gallipoli in 1916 indicated that it was associated with “colonials” (Australians and New Zealanders):<Cite r='AnInterestingNarrative' /></p>
    <blockquote>
      I am satisifed there is as much chance of stopping colonials gambling as old Canute had of stopping the tide rising. I have see them playing “crown and anchor,” a great game with them (don’t know if you ever saw it) in all sorts of unlikely places, even on the fire step in first line trenches. It was funny on the Ionian, going back to Egypt, when there was a church parade. The padre paused in the sermon, and in the middle of the silence came a yell from behind the deck-house, “Who’s going to put a bob on the lucky old mud hook?” whilst straight on the bridge, and absolutely the nearest to the parson, was a ring of men gambling all the time, and too straight under the parson for him to see them. It did look comical…
    </blockquote>
    <p>A further 1917 mention of it being associated with “colonials”:<Cite r="AtAnEnglishNCOSchool" /></p>
    <blockquote>
      Colonial slang appears strange to the “Tommy,” […] an invitation to a game of “pounds, coins, or browns” lets one know that the popoular gambling game of “crown and anchor,” for anything from a £1 note to a penny, is in progress.
    </blockquote>
    <p>It was reported to be played on the ill-fated Australian transport Sardinia.<Cite r="LifeOnTransportSardinia"/></p>
  </Section>
  <Section title="Other Versions">
    <p>In Chinese communities the game is called <span lang="nan-Latn">hû hê hāu</span> <span lang="nan">魚蝦鱟</span>,<Cite r="GamblingGamesOfMalaya" page={109} /> usually romanized as “Hoo Hey How”. In India it is Jhandi Munda (झंडी मुंडा) or Khora Khore (खोर खोरे), while in Nepal it is <span lang="ne-Latn">langur burja</span> (<span lang="ne">लंगूर or लङ्गुर बुर्जा</span>). Lago Lago in Bhutan?</p>
    <p>Symbols used are:</p>
    <dl>
      <dt>Crown & Anchor</dt>
      <dt>Langur Burja (??) or Jhandi Munda (Munda flag?)</dt>
      <dd>Jhandi झंडी (flag), munda or burja or mukut मुकुट (crown), surath सुरथ (spade), chid चीड (‘pine’ = club), itta इँट (‘brick’ = diamond), pana पान (‘betel leaf’ = heart)</dd>
      <dt>Balinese</dt>
      <dd>Basir, Robin, Rare (baby), Ikan Barong (fish Barong), Kepiting (crab), Ayam (chicken)<br />or:
        Basir, Bayi Ajaib (magic baby), [???], [a duck], Macan (Tiger), Elang (Javan hawk-eagle)<br />or:
        (??) Tua (old man), Elang, Cewek (girl), Singa (lion), Ikan (fish), Kodok (frog)</dd>
    </dl>
    <div className="multi extra-wide">
      <ArticleImage src={imgHHH1} alt="" source={{
        license: "stock-image",
        organization: { orgName: "Shutterstock.com" },
        author: "Novie Charleen Magne",
        identifier: "1350321158",
        copyrightYear: 2013,
        originalUrl: "https://www.shutterstock.com/image-photo/karangasem-bali-indonesia-26-july-2013-1350321158"
      }}>
        A game being played in Bali: bets are placed…
      </ArticleImage>
      <ArticleImage src={imgHHH2} alt="" source={{
        license: "stock-image",
        organization: { orgName: "Shutterstock.com" },
        author: "Novie Charleen Magne",
        identifier: "1350321164",
        copyrightYear: 2013,
        originalUrl: "https://www.shutterstock.com/image-photo/karangasem-bali-indonesia-26-july-2013-1350321164"
      }}>
        …and the dice are revealed.
      </ArticleImage>
    </div>
    <p>An equivalent (perhaps older) game can be played with three standard six-sided dice. It does not need to be played with a layout board but it can be. In this form it can be known as <span lang="nan-Latn">io jī sam</span> <span lang="nan">么二三</span>  (‘ace, two, three’, often romanized “Yew Yee Sam”).<Cite r="GamblingGamesOfMalaya" page={95} /></p>
  </Section>
  <Section title="Balinese dice game">
    <p>TODO: need to identify this</p>
    <ArticleImage src={imgBaliDice} alt="" source={{
      license: "stock-image",
      organization: { orgName: "Shutterstock.com" },
      author: "Nomad1988",
      identifier: "1398460952",
      copyrightYear: 2017,
      originalUrl: "https://www.shutterstock.com/image-photo/baliindonesia2009-on-weekeds-bali-1398460952"
    }}>
      A Balinese game of <span lang="id">koprok</span> or <span lang="id">kolok</span> or <span lang="id">kopyok</span>.
    </ArticleImage>
  </Section>
</>;


export default Content;
