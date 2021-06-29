import * as React from 'react';

import { Cite, Cards, Footnote, ArticleImage, Section } from 'ui';

import imgHHH1 from './shutterstock_1350321158.jpg';
import imgHHH2 from './shutterstock_1350321164.jpg';
import imgBaliDice from './shutterstock_1398460952.jpg';

const Content: React.FC = () => <>
  <p>On this page I collect all games where stakes are placed on a layout board and then the outcomes are decided by a single toss of the dice. I do this because there is so much overlap and cross-pollination between the different games that it is hard to keep them separate!</p>
  <Section title="Sweat-Cloth / Chuck-A-Luck">
    <Section title="Play">
      <p>The play of the game is simple: there is a staking-board with cells containing the numbers 1 through 6. Each player places their bet(s) on numbers of their choosing. The dealer or house rolls three dice; players who have chosen numbers matching the dice are paid out. Bets on numbers that do not match any of the dice are won by the dealer.</p>
      <p>Winning bets are paid 1× the stake if one die matches, 2× if two dice match, and 3× if all three dice match. This leads to a relatively high house edge of 7.87%, and thus an earned reputation as a “suckers” game. In more modern casino variants the payout for all dice matching is usually increased to make the game more attractive: a 5× payout still leads to a house edge of 6.94%, and even a 12× payout<Footnote>As used in the New Zealand variant of Sic Bo.</Footnote> retains a house edge of 3.7%, higher than that of roulette.</p>
    </Section>
    <Section title="History">
      <ArticleImage
        src={require('./ChuckALuckDepiction.jpg')}
        position="aside"
        noborder
        source={{
          license: "cc0",
        }}>
        A depiction of soldiers playing Chuck-A-Luck, by <a href="https://en.wikipedia.org/wiki/George_Yost_Coffin">George Y. Coffin</a>.<br />From <Cite r="SiKlegg" inline />.
    </ArticleImage>
      <p>A game known as Sweat-Cloth<Footnote>Probably in this context meaning a canvas saddle-cloth, upon which numbers were written to serve as a staking layout.</Footnote> was played since at least the early 19th century. The name was often shortened to “Sweat”.<Cite r='TheAmericanHoyle' page={480} /> Gambling histories often cite an English origin, but I have yet to find any early mention of the game there.<Footnote>Although there are old English slang terms for gaming cloths, such as “tatty tog” from <i>tatt</i> dice and <i>tog</i> clothes<Cite r="ADictionaryOfTheSlangAndCantLanguages" /> (American derivatives of these sources note that this is equivalent to “sweat-cloth”<Cite r="Vocabulum" page={89} />), I have yet to find reference to an actual game that is played with these cloths.</Footnote> The earliest reference I have found so far dates from 1808, when a man was indicted in Pennsylvania because he:<Cite r="IndictmentsAndPleas" page={442} /></p>
      <blockquote>
        … unlawfully did publicly and privately set up, erect, make, exercise, keep open, show and expose to be played at, drawn at and thrown at by dice, numbers and figures, a certain play and device called sweat-cloth
    </blockquote>
      <p>Another early reference to the equipment used in the game dates from 1810:</p>
      <blockquote>
        A Nicholas Creerly, has, in a Bucks county (Penn.) paper, in the uſual way, warned the public not to truſt his wife on his account, charging her with having deſtroyed his property, &c. His wife, in reply to this notice, ſays: “That he need not have taken this pains, as no perſon where he is known, will truſt her to the amount of a ſingle cent on <em>his</em> account, and as for bed and board, he never had any for her—and aſks how ſhe could deſtroy his property, when he never had any, except three <em>dice</em>, a <em>sweat-cloth</em>, and a <em>rum bottle</em>.”<Cite r="MarylandGazetteFeb141810" />
      </blockquote>
      <p>Other references from the 19th century show that in the United States the game was commonly played as a side-attraction at horse racing events:<Cite r="TheChiefOfHisTribe" /><Cite r="TheCamdenRaceCourse" /></p>
      <blockquote>
        What is a race-course but a convention of gambling hells out of doors, where, in a wider net, more of the weak and the vain are caught at the faro-bank or sweat-cloth, or induced in the excitement to bet on the horses?<Cite r="GamesOfChanceAsAmusement" />
      </blockquote>
      <ArticleImage
        position="aside"
        alt="Three dice with the numbers 1 to 6 inscribed on their faces, with 1, 2, and 3 in red, and 4, 5, and 6 in black."
        src={require('./Potter_HyronemusDice.jpeg')}
        source={{
          copyrightYear: 2018,
          license: "with-permission",
          organization: { orgName: "Potter & Potter Auctions" },
          originalUrl: "https://auctions.potterauctions.com/Three_Beveled_Ivory_Ball_Dice__-LOT9835.aspx"
        }}>
        Three ball dice for use in the Hyronemus tub; these dice have black and red faces so can also be used to run the game Red Black.
      </ArticleImage>
      <p>A little later in the 19th century, the game began to be called Chuck-A-Luck (or simply Chuck-Luck), and this is the name that stuck. It was commonly played by soldiers and by the late 19th century was known as the “old soldier’s game”.<Footnote>This term is also used for Housie or Bingo.</Footnote></p>
      <p>In casinos the game was augmented with equipment to become either Hyronemus (where the dice were cast into a spinning bowl) or Bird-Cage (where the dice were tumbled inside a wire hourglass).</p>
      <p>Many books of the time claim that these tools were often gaffed or crooked, with one advertisement for an Electric Hyronemus claiming it can roll only “Treys and Fours” on command.</p>
      <div className="multi">
        <ArticleImage
          alt="TODO"
          size="small"
          noborder
          src={require('./Potter_ChuckALuck.jpeg')}
          source={{
            copyrightYear: 2018,
            license: "with-permission",
            organization: { orgName: "Potter & Potter Auctions" },
            originalUrl: "https://auctions.potterauctions.com/Chuck_A_Luck_Hand_Held_Cage_with_Three_Dice__-LOT9883.aspx"
          }}>
          A hand-held “bird cage” for tossing Chuck-A-Luck dice (<abbr title="circa">c.</abbr> 1930).
        </ArticleImage>
        <ArticleImage
          alt=""
          size="small"
          noborder
          src={require('./ChuckALuck_Cage.jpg')}
          source={{ license: 'cc0' }}>
          A mounted “bird cage”, from <Cite r="GamblingAndGamblingDevices" inline page={118} />. The handle at the left is used to invert the cage, and this rings a bell mounted on the right. The top and bottom are made from taut leather and produce a drumming noise when the dice drop. (A video of one of these bird cages in action can be <a href="https://www.youtube.com/watch?v=PEI2bvjXeCU">found on YouTube</a>.)
        </ArticleImage>
      </div>
      <div className="multi">
        <ArticleImage
          alt=""
          size="small"
          noborder
          src={require('./Hyronemus_Layout.jpg')}
          source={{ license: 'cc0' }}>
          Hyronemus tub and staking layout, from <Cite r="GamblingAndGamblingDevices" inline page={119} />.
      </ArticleImage>
        <ArticleImage
          alt="A wooden bowl mounted on a spindle and lined with green baize."
          size="small"
          noborder
          src={require('./Potter_Hyronemus.jpeg')}
          source={{
            copyrightYear: 2018,
            license: "with-permission",
            organization: { orgName: "Potter & Potter Auctions" },
            originalUrl: "https://auctions.potterauctions.com/Will___Finck_Hyronemus_Tub_and_Original_Shipping_C-LOT9831.aspx"
          }}>
          A Will & Finck–brand ‘Hyronemus tub’, which would be spun and then the dice tossed into it (<abbr title="circa">c.</abbr> 1890).
      </ArticleImage>
      </div>
      <p>The game also began to be manufactured with images instead of pips on the dice, and in this form it was called Mustang or Horse-Head (with dice with images of a horse’s head, anchor, and the card suit symbols: club, spade, diamond, and heart). In another form it was known as Feather and Anchor (horse-head, anchor, feather, game cock, leaf, star).<Cite r="WanderingsofaVagabond" page={238} /><Cite r="ATourOfStLouis" page={532} /> Yet another form had the symbols: snake, elephant, eagle, baby, turtle (and 6th?).<Cite r="FoolsOfFortuneOrGamblingAndGamblers" page={283} /></p>
      <p>It seems that it was one of these picturized versions that was taken and adopted by the British as Crown & Anchor.</p>
    </Section>
  </Section>
  <Section title="Crown & Anchor">
    <p>Crown & Anchor games involve simple bets on the outcome of rolling three six-sided dice, which usually have a collection of symbols on them instead of pips. Players place their stakes on a layout containing six symbols, and win if any of the dice show their chosen symbol, paying out 1× for each die that shows the symbol.</p>
    <p>Crown & Anchor itself seems to date from the late 19th or early 20th century. It was especially popular amongst British soldiers during World War I.</p>
    <p>In Chinese communities the game is called <span lang="nan-Latn">hû hê hāu</span> <span lang="nan">魚蝦鱟</span>,<Cite r="GamblingGamesOfMalaya" page={109} /> usually romanized as “Hoo Hey How”. In India it is Jhandi Munda (झंडी मुंडा) or Khora Khore (खोर खोरे), while in Nepal it is <span lang="ne-Latn">langur burja</span> (<span lang="ne">लंगूर or लङ्गुर बुर्जा</span>). Lago Lago in Bhutan?</p>
    <p>Symbols used are:</p>
    <dl>
      <dt>Crown & Anchor</dt>
      <dd>👑&#xfe0e; Crown, ⚓&#xfe0e; Anchor, <Cards>s</Cards> Spade, <Cards>c</Cards> Club, <Cards>d</Cards> Diamond, <Cards>h</Cards> Heart.</dd>
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
