import * as React from 'react';
import { Table } from 'react-bootstrap';

import { Cards, Cite, Footnote, ArticleImage, Section, Description } from 'ui';
import { GameRef } from '../Game';

const Content: React.FC = () => <>
  <Description>Chuck-A-Luck was a simple dicing game popular in the United States in the mid to late 19th century and early 20th century. It began as a portable soldier’s game and later developed into more complex casino variants.</Description>
  <Section title="Sweat-Cloth / Chuck-A-Luck">
    <Section title="Play">
      <ArticleImage
        src={require('./ChuckALuckLayout.jpg')}
        alt="The numbers from 1 to 6 written in separate boxes."
        source={{ license: "cc0" }}>
        A professionally-produced Chuck-A-Luck layout, from Kernan Manufacturing’s <Cite r="KernanCatalogue" page={19} inline />.
      </ArticleImage>
      <p>The play of the game is simple: there is a staking-board with six cells containing the numbers 1 through 6. Each player places their bet(s) on numbers of their choosing. The dealer or house rolls three dice and players whose numbers show up on the dice win. Bets on numbers that do not match any of the dice are won by the dealer.</p>
      <p>Winning bets are paid at 1× the stake for each die that matches the number (so, a maximum of 3× if all three dice match).</p>
      <p>These usual payouts lead to a relatively high house edge of 7.87%, and thus Chuck-A-Luck has an earned reputation of being a “suckers” game. In more modern casino variants the payout for all three dice matching is usually increased to make the game more attractive: a 5× payout still leads to a house edge of 6.94%, and even a 12× payout<Footnote>As used in the New Zealand variant of Sic Bo.</Footnote> retains a house edge of 3.7%, higher than that of roulette.</p>
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
      <p>A game known as Sweat-Cloth<Footnote>Probably in this context meaning a canvas saddle-cloth, upon which numbers were written to serve as a staking layout.</Footnote> was played since at least the early 19th century. The name could also be shortened to simply “Sweat”.<Cite r='TheAmericanHoyle' page={480} /> Gambling histories often cite an English origin, but I have yet to find any early mention of the game there.<Footnote>Although there are old English slang terms for gaming cloths, such as “tatty tog” from <i>tatt</i> dice and <i>tog</i> clothes<Cite r="ADictionaryOfTheSlangAndCantLanguages" /> (American derivatives of these sources note that this is equivalent to “sweat-cloth”<Cite r="Vocabulum" page={89} />), I have yet to find reference to an actual game that is played with these cloths.</Footnote> The earliest reference I have found so far dates from 1808, when a man was indicted in Pennsylvania because he:<Cite r="IndictmentsAndPleas" page={442} /></p>
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
      <p>By 1830, the game began to be called Chuck-A-Luck (or simply Chuck-Luck), and this is the name that stuck. It was commonly played by soldiers and by the late 19th century was known as the “old soldier’s game”.<Footnote>This term is also used for Housie or Bingo.</Footnote></p>
    </Section>
    <Section title="Pictorial dice">
      <ArticleImage
        src={require('./MustangLayout.jpg')}
        alt="Six cells containing: a horse’s head, the suits of hearts, diamonds, clubs, and spades, and an anchor."
        source={{ license: "cc0" }}>
        A Mustang layout, from Kernan Manufacturing’s <Cite r="KernanCatalogue" page={19} inline />.
        </ArticleImage>
      <p>By the 1870s, the game also began to be manufactured with images instead of pips on the dice, and in this form it was called Mustang or Horse-Head (with dice with images of a horse’s head, anchor, and the card suit symbols: club, spade, diamond, and heart). In another form it was known as Feather and Anchor (horse-head, anchor, feather, game cock, leaf, star).<Cite r="WanderingsofaVagabond" page={238} /><Cite r="ATourOfStLouis" page={532} /> Yet another form had the symbols: snake, elephant, eagle, baby, turtle (and 6th?).<Cite r="FoolsOfFortuneOrGamblingAndGamblers" page={283} /></p>
      <p>It seems that it was one of these pictorial versions that was taken and adopted by the British as <GameRef id="crown-and-anchor"/>.</p>
      <ArticleImage
        position="aside"
        alt="Three dice with the letters P A C E R S on them."
        src={require('./Potter_Pacers.jpeg')}
        source={{
          copyrightYear: 2018,
          license: "with-permission",
          organization: { orgName: "Potter & Potter Auctions" },
          originalUrl: "https://auctions.potterauctions.com/Three_Ivory_Ball_Dice__-LOT9833.aspx"
        }}>
        Three Hyronemus (see below) ball dice for use with Cubic Mutual Pool.
        </ArticleImage>
      <ArticleImage
        src={require('./CubicMutualPool.jpg')}
        alt="A layout board titled Cubic Mutal Pool and with six cells with horses depicted, named: Pilot, Arab, Canada, Eclipse, Rover, and Saxton."
        source={{ license: "cc0" }}>
        A Cubic Mutal Pool layout, from Kernan Manufacturing’s <Cite r="KernanCatalogue" page={20} inline />.
        </ArticleImage>
      <p>The came was also transmuted into a horse-racing form, played using dice with sides marked <Cards>PACERS</Cards>. Under the name “Cubic Mutual Pool”, this was played as early as 1888.<Cite r="CubicMutualPool"/></p>
    </Section>
  </Section>
  <Section title="Casino Chuck-A-Luck / Grand Hazard">
    <ArticleImage
      mainImage
      alt="Men sitting around a table with an extended Chuck-A-Luck staking layout and bird-cage sitting on it."
      size="wide"
      src={require('./chuk-a-luck_bank_club_reno_nevada.jpg')}
      source={{
        license: "cc0",
        organization: { orgName: "University of Nevada, Reno" },
        originalUrl: "https://unr.dgicloud.com/islandora/object/spphotoscollection%3A5615"
      }}>
      Chuk-A-Luck with an expanded staking board being played at the Bank Club, Reno, Nevada (<abbr title="circa">c.</abbr> 1932).
    </ArticleImage>
    <p>In casinos the basic game was augmented with equipment to become known as either “Hyronemus” (where the dice were spun in a bowl) or “Bird-Cage” (where the dice were tumbled inside a wire hourglass).</p>
    <p>Many books of the time claim that these tools were often gaffed or crooked, with one advertisement for an Electric Hyronemus claiming it can be made to roll only “Treys and Fours” on command.</p>
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
      Three ball dice for use in the Hyronemus tub; these dice have black and red faces so can also be used to run other side bets.
      </ArticleImage>
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
        A Will & Finck–brand ‘Hyronemus tub’, which would be spun, driving the dice up to the rim, and then stopped so that they fell to the centre (<abbr title="circa">c.</abbr> 1890).
      </ArticleImage>
    </div>
    <Section title="Extended Bets">
      <p>The basic 1–6 betting game was also extended to incorporate other types of bets. This version of the game could also be called Grand Hazard (despite its name, this has nothing to do with the earlier game of Hazard). These kinds of bets are still used in modern games run under the name of Chuck-A-Luck.</p>
      <ArticleImage
        alt="A table-top painted with various locations for bets to be placed"
        size="wide"
        noborder
        src={require('./Potter_GrandHazard.jpeg')}
        source={{
          copyrightYear: 2018,
          license: "with-permission",
          organization: { orgName: "Potter & Potter Auctions" },
          originalUrl: "https://auctions.potterauctions.com/will___finck_hand_painted_oil_cloth_grand_hazard_l-lot9830.aspx"
        }}>
        A Will & Finck Grand Hazard layout (<abbr title="circa">c.</abbr> 1890).
      </ArticleImage>
      <p>In addition to the “Chuck” bets, which are played in boxes labelled 1–6 as usual, the extended staking layout contains boxes for the following bets:</p>
      <dl>
        <dt>Raffles</dt>
        <dd><p>A “raffle” is a three-of-a-kind. There are two different raffles bets that can be made: either that any raffle will come up, which pays 29:1<Footnote>Note that the payments on the board in the image below are given as “30 <em>for</em> 1” and not “30 <em>to</em> 1”. This means that the stake counts as part of the winnings and thus increases the already-high house edge.</Footnote> (fair odds 35:1), or else a bet can be placed on a specific raffle, which pays 179:1 (fair odds 216:1). Both bets have the same high house edge of 16.67% and so in the long-term are equivalent bets.</p>
          <p>More modern versions of the game might pay out 30:1 for any 3-of-a-kind, which has a slightly lower edge of 13.89%.</p></dd>
        <dt>Low (≤10) or High (≥11)</dt>
        <dd>These bets are on what the total number of pips showing on the dice will be. Both would be even bets except that they lose on a raffle. They have the same odds and pay 1:1 (fair 37:35); the house edge is the lowest on the board at 2.78%.</dd>
        <dt>Specific totals</dt>
        <dd>
          <p>Each total is paid out at a different rate. All have extremely high house edges:</p>
          <Table className="numeric">
            <thead>
              <tr>
                <th>Values</th>
                <th>Paid</th>
                <th>Fair</th>
                <th>Edge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10, 11</td>
                <td>5:1</td>
                <td>7:1</td>
                <td>25.00%</td>
              </tr>
              <tr>
                <td>9, 12</td>
                <td>5:1</td>
                <td>≈8:1</td>
                <td>30.56%</td>
              </tr>
              <tr>
                <td>8, 13</td>
                <td>7:1</td>
                <td>≈9:1</td>
                <td>22.22%</td>
              </tr>
              <tr>
                <td>7, 14</td>
                <td>11:1</td>
                <td>≈13:1</td>
                <td>16.67%</td>
              </tr>
              <tr>
                <td>6, 15</td>
                <td>17:1</td>
                <td>≈21:1</td>
                <td>16.67%</td>
              </tr>
              <tr>
                <td>5, 16</td>
                <td>29:1</td>
                <td>35:1</td>
                <td>16.67%</td>
              </tr>
              <tr>
                <td>4, 17</td>
                <td>59:1</td>
                <td>71:1</td>
                <td>16.67%</td>
              </tr>
            </tbody>
          </Table>
        </dd>
      </dl>
    </Section>
    <Section title="Other Hyronemus bets">
      <ArticleImage
        size="small"
        src={require('./HyronemusBets.jpg')}
        alt="A layout containing the Chuck-A-Luck numbers and 4 other betting cells: Under 10, Over 11, 10, and 11."
        source={{ license: "cc0" }}>
        A Hyronemus layout, from <Cite r="GamblingAndGamblingDevices" page={117} inline />.
        </ArticleImage>
      <p>Some bets seen on Hyronemus layouts are based on the sum of the dice:</p>
      <dl>
        <dt>Low (&lt;10) and High (&gt;11)</dt>
        <dd>Both of these are bad bets, paying 1:1 (fair odds 1⅔:1) for a house edge of 25%.</dd>
        <dt>10 &middot; 11</dt>
        <dd>Both of these are worse bets, paying 4:1 (fair odds 7:1) for a house edge of 37.5%!</dd>
      </dl>
    </Section>
    <Section title="Field bets">
      <p>Other versions of the game include “field” bets, which are a bet that the dice pip total will be one of a range of numbers. These bets always pay 1:1.</p>
      <p>Examples include:</p>
      <dl>
        <dt>5 &middot; 6 &middot; 7 &middot; 8 / 13 &middot; 14 &middot; 15 &middot; 16</dt>
        <dd>This field has a house edge of 3.7%.</dd>
        <dt>3 &middot; 4 &middot; 5 &middot; 6 &middot; 7 / 13 &middot; 14 &middot; 15 &middot; 16 &middot; 17 &middot; 18</dt>
        <dd>Despite having more numbers, this field excludes the common ‘8’, and has a house edge of 15.74%.</dd>
      </dl>
      <p>There are also two-dice fields, where two of the three dice are coloured differently to the third, and the field value is based upon their total:</p>
      <dl>
        <dt>2 &middot; 3 &middot; 4 &middot; 9 &middot; 10 &middot; 11 &middot; 12</dt>
        <dd>As seen on layouts produced by <a href="https://www.icollector.com/Framed-Chuck-a-Luck-Layout-with-Field-Bet-Game-was-pl_i8609509">Taylor & Co.</a> or the <a href="http://museumofgaminghistory.org/mogh.php?p=gallery&d=Gallery/Antique%20Equipment/Hazard/&i=3">K. C. Card Company</a>. The house edge on this field is 11.11%.</dd>
        <dt>2 &middot; 3 &middot; 5 &middot; 9 &middot; 10 &middot; 11 &middot; 12</dt>
        <dd>As seen on layouts produced by <a href="https://www.icollector.com/Mason-Co-Straight-Chuck-A-Luck-Layout-ca-1900_i8638281">Mason & Co</a>. The house edge on this field is 5.56%.</dd>
      </dl>
    </Section>
  </Section>
  <Section title="Fairground variants">
    <p>Given the high house edge on all Chuck-A-Luck bets, it wouldn’t seem that any further advantage would be needed—but gambling operators apparently didn’t think so. Further developments of the game increased the returns for the operators.</p>
    <Section title="3-Spindle Chuck-A-Luck">
      <p>This version has three separately-rotating spindles, and has exactly the same odds and house edge as standard Chuck-A-Luck.</p>
      <ArticleImage
        src={require('./ChuckALuck3Spindle.jpg')}
        alt="Three overlapping spinners that can point to any one of the numbers 1 to 6."
        source={{ license: "cc0" }}>
        As found in Kernan Manufacturing’s <Cite inline r="KernanCatalogue" page={26} />.
      </ArticleImage>
    </Section>
    <Section title="Spindle Chuck-A-Luck">
      <p>This version of the game used a spindle, which is spun, and the numbers that it lands on are the winners. Since the distribution of the numbers is different to the distribution given by dice, the house edge is higher than normal. The manufacturer claimed that it would double the usual take, but in reality the edge is nearly three times higher, at 21.43%.</p>
      <p>If this wasn’t enough, the game was often played with a gaffed wheel that allowed the operator to stop the spindle spinning at will.</p>
      <ArticleImage
        src={require('./Spindle_ChuckALuck.png')}
        alt="A single spinner that can point to 14 different sectors with 3 numbers in each sector."
        source={{ license: "cc0" }}>
        An H. C. Evans & Co. spindle and layout from their 1909–10 catalogue, as reproduced in <Cite inline r="GamblingAndGamblingDevices" page={145} />.
      </ArticleImage>
    </Section>
    <Section title="Jumbo Dice Wheel (Big Six)">
      <p>The standard version of this nowadays (at least in the United States) is a wheel-of-fortune with money printed on it, but in its earliest form the wheel had dice drawn in each sector. As with Spindle Chuck-A-Luck, the distribution of the dice rolls has been manipulated to provide the operator extra income. The house edge on the wheel on the right below, with 48 sectors, is 14.583%. The edge on the wheel at left, with 54 sectors, is 12.963%.<Footnote>Or at least, it is intended to be. The wheel represented here seems to have an error where one 5 has been switched with a 3, so the edge on those two numbers is different. (Scarne<Cite r="ScarneGambling" page={[[501, 503]]} /> miscalculates the house edge on this wheel as 22.22%, as it seems has was working from a different version than in the photo.)</Footnote></p>
      <p>In general the more doubles or triples on the wheel, the worse the odds are for the players.</p>
      <div className="multi">
        <ArticleImage
          noborder
          src={require('./Big6Wheel1960.jpg')}
          alt="A large upright wheel that can be spun, with a pointer at top."
          source={{
            license: "cc0",
            copyrightYear: 1960,
            author: "H. C. Evans & Co."
          }}>
          A K. C. Card Co. Jumbo Dice Wheel, from their 1960 catalogue.
        </ArticleImage>
        <ArticleImage
          src={require('./Gambling_wheel_by_H._C._Evans_and_Co.,_Chicago_-_Bayernhof_Museum_-_DSC06276.jpg')}
          alt="A large upright wheel that can be spun, with a pointer at top."
          source={{
            license: "cc0",
            author: "Daderot",
            originalUrl: "https://commons.wikimedia.org/wiki/File:Gambling_wheel_by_H._C._Evans_and_Co.,_Chicago_-_Bayernhof_Museum_-_DSC06276.JPG"
          }}>
          An H. C. Evans & Co. Big Six wheel at the Baryernhof Museum.
        </ArticleImage>
      </div>
    </Section>
  </Section>
</>;


export default Content;
