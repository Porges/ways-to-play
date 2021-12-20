import * as React from 'react';
import { Link } from 'react-router-dom';

import { ArticleImage, Footnote, Noun, Section, Cite, Pronounce } from 'ui';

import imgKliptown from "./8237668945_878d81116c_o.jpg";
import imgSothoBoard from "./large_merels_with_diagonals_and_centre.svg";
import imgSothoBoardExamples from "./large_merels_with_diagonals_and_centre_mill_examples.svg";
import imgSothoBoardBad from "./large_merels_with_diagonals_and_centre_bad_move.svg";
import imgLargeMerelsWithDiagonals from "content/articles/mill-games/large_merels_with_diagonals.svg";
import imgLargeMerelsWithFullDiagonals from "./large_merels_with_full_diagonals.svg";
import imgInPlay from "./shutterstock_1431198950.jpg";
import imgMuravarava from "./shutterstock_1268455078.jpg";
import imgStaff from "./shutterstock_1759308824.jpg";
import imgThabaBosiu from "./shutterstock_1180878514.jpg";
import imgMenPlaying from './16908233_1262123897217460_4095342219718819840_n.jpg';

import pronIsibhamu from 'content/articles/mill-games/pronunciation_zu_isibhamu.mp3';

const Morabaraba: React.FC = () => (
  <>
    <p><Noun lang="st">Morabaraba</Noun> is a <Link to="/articles/mill-games">mill game</Link> from south-eastern Africa. The gameplay of the standardized version is very similar to <Link to="/games/twelve-mens-morris" className="game-title">Twelve Men’s Morris</Link> (with a few minor differences), but the version played in Lesotho has a unique board.</p>
    <p><Noun lang="st">Morabaraba</Noun> is played as a competitive sport in South Africa, administered by <a href="http://mindsportsa.co.za/">Mind Sports South Africa</a>. It is widely played throughout the country; a poll conducted by <cite>The Sowetan</cite> in 1996 indicated that 40% of South Africans played the game.<Cite r="MorabarabaGetOnBoard" /></p>
    <ArticleImage
      alt="A morabaraba board with bottlecaps being used as pieces. One player is using them right-side-up and the other player is using them upside-down."
      size="wide"
      src={imgInPlay}
      source={{
        organization: {orgName: "Shutterstock.com"},
        author: "ivanfolio",
        originalUrl: "https://www.shutterstock.com/image-photo/traditonal-african-strategy-board-game-know-1431198950",
        license: "stock-image",
      }}>
      A game of <Noun lang="st">Morabaraba</Noun> being played.
    </ArticleImage>
    <Section title="History">
      <p>Surprisingly, unlike most board games we know who was responsible for transmitting the game from Europe:<Cite r="MkeleMorabaraba" page={134} /><Cite r="FromBearnToSouthernAfrica" page={79} /> it was introduced to Lesotho—then called Basutoland—some time between 1832 and 1855 by Eugène Casalis, a French protestant missionary who acted as Foreign Advisor to <a href="https://en.wikipedia.org/wiki/Moshoeshoe_I">King Moshoeshoe I</a> for nearly two decades.<Footnote>Casalis is also sometimes also referred to as Cazalis in English sources. Upon his return to France he wrote about his experiences in <cite lang="fr">Les Bassoutos: Vingt-Trois Années de Séjour et D’Observations au Sud de L’Afrique</cite> (Paris, 1859) (later published in English as <cite>The Basutos: or Twenty-Three Years in South Africa</cite> (London: Nisbet, 1861)), but the book contains no mention of any board games. There is now <a href="https://goo.gl/maps/jymZMMft3fB2">a roundabout</a> in his home town, <Noun lang="fr">Orthez</Noun>, <a href="http://www.larepubliquedespyrenees.fr/2013/02/16/un-nom-pour-les-ronds-points-la-gare-routiere-et-la-rocade,1118172.php">named after him</a>.</Footnote> The introduction of the game had unintended consequences for the mission: young men preferred to play the game rather than attend mass.<Cite r="FromBearnToSouthernAfrica" page={79} /> Obsession with the game also led herders to neglect their flocks,<Cite r="FromBearnToSouthernAfrica" page={79} /> so it became known by the epithet <span lang="st">sethetsabadisana</span> ‘deceiver of the herd-boys’:‌<Cite r="BasothoChildren" page={41} /> “for when you play it, old or young, you forget your herds, and they wander into the corn…”‌<Cite r="TheWorldAndCattle" page={56} /></p>
      <p>The game was also popular amongst Basotho men who travelled to South Africa to work in its mines. References to <Noun lang="st">Morabaraba</Noun> can be found in <span lang="st">difela</span>/<span lang="st">lifela</span> (singular <span lang="st">sefela</span>), song–poems that were sung by these migrant workers.<Cite r="BasothoOralPoetry" page={[17, 175, 229]} /><Cite r="TimeOfCannibals" page={[[98, 101]]} /></p>
      <p>In Lesotho’s past the game was restricted to being played by men, to the point that women were not permitted in the vicinity of the gaming area.<Cite r="SesothoFarming" page={95} /> Thankfully, times are changing, and as of 2021, the top-ranked player in Mind Sports South Africa’s league is a woman, named Saudah Bhaimia, who has won the last three national championships.<Cite r="SaudahBhaimia" /> </p>
      <ArticleImage
        src={imgThabaBosiu}
        size="extra-wide"
        alt=""
        source={{
          organization: {orgName: "Shutterstock.com"},
          originalUrl: "https://www.shutterstock.com/image-photo/thaba-bosiu-lesotho-royal-graveyard-1180878514",
          author: {given: "Damian", family: "Ryszawy"},
          license: "stock-image"
        }}>
        Casalis was stationed at Moshoeshoe’s stronghold <a href="https://en.wikipedia.org/wiki/Thaba_Bosiu">Thaba-Bosiu</a>, which was positioned atop a sandstone plateau.
      </ArticleImage>
    </Section>
    <Section title="Terminology">
      <p>The name <span lang="st">moraba-raba</span> comes from the Sesotho language, and is related to the verb <span lang="st">ho raba raba</span> ‘to roam in small circles’,<Cite r="SeSothoDictionary" page={304} /> so could refer to the action of a mill.‌ In Nguni languages (isiZulu, isiXhosa), it is known as <Noun lang="zu">(Um)labalaba</Noun>, with similar meaning,‌<Cite r="GamesBasotho" page={[[247, 250]]} /> and in Ronga, spoken in Mozambique, it is called <Noun lang="rng">Muravarava</Noun>.</p>
      <Footnote standalone>There are two different <a href="https://en.wikipedia.org/wiki/Sesotho_orthography">Sesotho orthographies</a>. In this article I give the South African one first, followed by the Lesotho.</Footnote>
      <ArticleImage
        alt="Two men dressed in warm blankets, gumboots, and balaclava, carrying staffs"
        position="left"
        src={imgStaff}
        source={{
          originalUrl: "https://www.shutterstock.com/image-photo/bloemfontein-south-africa-september-11th-2019-1759308824",
          author: { given :"Vladimira", family: "Pufflerova" },
          organization: {orgName: "Shutterstock.com"},
          license: "stock-image"
        }}
        >
        Two Lesotho herdsmen carrying staffs. What appear to be caps are rolled-up balaclava: most of Lesotho is above 1&#x202f;800&nbsp;m, so it is cooler than many neighbouring countries.
      </ArticleImage>
      <p>There are other names which are probably derived from the European name of ‘mill’:‌<Cite r="MkeleMorabaraba" page={134} /> an alternate Sesotho name is <span lang="st">mmila</span>/<span lang="st">’mila</span>, ‘road’.‌<Cite r="UsingGamesToPromote" page={283} /> In Botswana, the game is called <span lang="tn">mhele</span> (‘reedbuck’, a type of antelope‌<Cite r="OldTswana" page={350} />), and the name <span lang="tn">morabaraba</span> refers solely to a mancala game.
      <Footnote>Because of the large overlap of names, in written descriptions <Noun lang="st">Morabaraba</Noun> is often confused with or included in lists of other mancala games, such as <span lang="ve">mefuvha</span> (from Limpopo) or <span lang="sn">tsoro</span> (from Mozambique/Zimbabwe) (see, for example, <Cite r="MorabarabaGetOnBoard" inline />).</Footnote></p>
      <p>A distinctive feature of this game is its bovine theme: in each language, the pieces are called ‘cows’. In Sesotho this is <span lang="st">dikgomo</span>/<span lang="st">likhomo</span> (singular <span lang="st">kgomo</span>/<span lang="st">khomo</span>);‌<Cite r="UseOfMorabara" page={588} /> in isiZulu it is <span lang="zu">izinkomo</span> (singular <span lang="zu">inkomo</span>). In isiZulu a mill is a <Pronounce pronouncer="Lungii" word="isibhamu" file={pronIsibhamu} lang="zu" /> (‘gun’), which allows you to “shoot” an opponent’s cow, while in Sesotho the mill is called a <span lang="st">molamu</span> (a staff carried by shepherds), and you can eat (<span lang="st">ja</span>) a cow.<Cite r="BasothoChildren" page={36} /></p>
    </Section>
    <Section title="Play">
      <p>The following description is based on Mind Sports South Africa’s “Generally Accepted Rules”. As with all traditional board games, local rules can vary.</p>
      <p>Each player has 12 pieces. Commonly, plastic or metal bottle caps<Footnote>
        The use of bottle caps is so common that even <a href="https://www.instagram.com/p/BMBbRAzBg1z/">commercial sets use bottle caps</a>, and they show up in <a href="https://www.instagram.com/p/Bf-isgxnIPF/">computerized versions</a> as a skeuomorphic feature.
            </Footnote> are used in two contrasting colours.</p>
      <ArticleImage
        position="right"
        src={imgLargeMerelsWithDiagonals}
        alt="">
        Standard <span className="game-title" lang="st">Morabaraba</span> is played on the large mill board with diagonals.
            </ArticleImage>
      <p>During the placement phase, players must place a single piece on any vacant point of the board. Once all their pieces are placed, players can move a single piece to another vacant point, along one of the lines.</p>
      <p>If a player places or moves a piece to form a new mill, they remove one of the opponent’s pieces. The removed piece may not be from a mill unless there are no other pieces that can be removed.</p>
      <p>During the placement phase it is possible to form two mills at once. In <span className="game-title" lang="st">Morabaraba</span> this only allows a player to remove one piece.</p>
      <p>When a player is reduced to three pieces, their pieces can ‘fly’ and move to any vacant point on the board, ignoring the lines.</p>
      <p>A player loses the game when they are reduced to fewer than three pieces, or if they are unable to make a valid move on their turn.</p>
      <ArticleImage
        alt="Two school chidren stand next to a table where a game of muravarava is being played, looking at the board intensely, while an umpire watches."
        src={imgMuravarava}
        source={{
          copyrightYear: 2018,
          organization: {orgName: "Shutterstock.com"},
          author: "ivanfolio",
          originalUrl: "https://www.shutterstock.com/image-photo/manica-mozambique-december-19-2018-young-1268455078",
          license: "stock-image",
        }}>
        A game of <Noun lang="rng">Muravarava</Noun> being played in Mozambique, at Chinhamapere Secondary School.
    </ArticleImage>
      <p>In tournament play, Mind Sports adopted an additional rule: During the movement phase, a piece that is moved from one mill to form another mill may not move back to form a mill again at the original point on the next turn. Instead, a different move must be taken before doing so. This rule prevents a player from moving backwards and forwards between two mills quickly. This rule seems to me to be unlikely to be used in casual play.</p>
    </Section>
    {/*
    <Section title="Strategy">
      <p>There are some well-known strategies (<span lang="st">mawa</span>/<span lang="st">maoa</span>, singular <span lang="st">lewa</span>/<span lang="st">leoa</span>) that have been named. Unfortunately I have not been able to figure out exactly what they represent, but possibly they are names of specific piece formations.<Cite r="TransmitterOfAccolades" /> The Sesotho names are: <span lang="st">tjhitja</span>/<span lang="st">chitja</span> (‘hornless’ or ‘round’), which is apparently a winning strategy; <span lang="st">katapane</span>, another good strategy; and <span lang="st">qheane</span>, which is a poor or losing strategy.<Cite r="MasculinityAccordion" page={[[185, 186]]} /> {/*Others are seakgela/seakhela and qholo. thoenthoere/thwenthwere is a 'double hit' when two are formed at once (BasuthoChildren) /}</p>
    </Section>
    */}
    <Section title="Theory">
      <p>With perfect play, the first player can force a win in 49 moves.<Cite r="UltraStrongMorris" /></p>
    </Section>
    <Section title="Variants">
      <Section title="Sotho version">
        <ArticleImage
          position="right"
          src={imgSothoBoard}
          alt="">
          The Sotho version of the game is played on a board with a central cross.
        </ArticleImage>
        <p>The Sotho version of the game is played on a special board or flat stone (<span lang="st">letlapa</span>)<Cite r="BasothoChildren" page={35} /> where the centre square is also crossed, and the inner diagonals are missing, giving 25 points that can be played on.‌<Cite r="IndigenousGamesRuleBook" /><Cite r="MkeleMorabaraba" page={133} /> This means that there is no possibility of a deadlock after the placement phase.</p>
        <p>Most rulesets state that a piece on the central point can only be the middle piece of a mill. Other lines of three formed with the central point do not count as mills.<Cite r="BlacUmlabalaba" /><Cite r="TicTacToe" page={[[67,70]]}/></p>
        <p>Note that it is not possible to form a diagonal mill on this board.</p>
        <div className="multi">
          <ArticleImage
            src={imgSothoBoardExamples}
            alt="">
            Some examples of valid mills on the Sotho board.
          </ArticleImage>
          <ArticleImage
            src={imgSothoBoardBad}
            alt="">
            Not a mill; any mill using the centre point must have its middle piece on the centre point.
          </ArticleImage>
        </div>
        <ArticleImage
          src={imgKliptown}
          alt="A well-used morabaraba board with two different types of bottle caps for pieces."
          source={{
            copyrightYear: 2012,
            originalUrl: "https://www.flickr.com/photos/nagarjun/8237668945",
            author: { given: "Nagarjun", family: "Kandukuru" },
            license: "cc-by-nc-nd",
            licenseVersion: "2.0"
          }}>
          A Sotho-style morabaraba board in Kliptown, Soweto (more examples of this board can be seen on Instagram: <a href="https://www.instagram.com/p/BD-gorsFbjf/">1</a>, <a href="https://www.instagram.com/p/_glPKmNkd5/">2</a>, <a href="https://www.instagram.com/p/-voBcjAFc9/">3</a>, <a href="https://www.instagram.com/p/yPNmJpPNzW/">4</a>).
      </ArticleImage>
      </Section>
      <Section title="Alternate board">
        <ArticleImage
          size="small"
          src={imgLargeMerelsWithFullDiagonals}
          alt="">
          An alternate <span className="game-title" lang="st">Morabaraba</span> board.
        </ArticleImage>
        <p>Another board pattern is also used to play <span className="game-title" lang="st">Morabaraba</span>, with a diagonally crossed central square. I do not know if the rules vary in any way.</p>
        <ArticleImage
          src={imgMenPlaying}
          alt="Two sets of men playing on two different morabaraba boards."
          source={{
            copyrightYear: 2017,
            author: "mk11photography",
            license: "with-permission",
            originalUrl: "https://www.facebook.com/mosqk11photography/photos/a.138455416598153/261924027584624"
          }}>
          Men playing on a different <span className="game-title" lang="st">Morabaraba</span> board. More examples of this board can be found on Instagram: <a href="https://www.instagram.com/p/-lij8bskZZ/">1</a>, <a href="https://www.instagram.com/p/Xh1mSsnw0H/">2</a>.
        </ArticleImage>
      </Section>
    </Section>
  </>);


export default Morabaraba;
