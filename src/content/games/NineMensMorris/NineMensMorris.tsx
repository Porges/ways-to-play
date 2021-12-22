import * as React from 'react';

import { GameRef } from 'content/games/Game';
import { ArticleImage, Cite, Section, Noun, Footnote, Description, Isolate } from 'ui';

import imgWall from './P1130411a.jpg';
import imgLargeMerels from 'content/articles/mill-games/large_merels.svg';
import imgCerne from './O.2.45_010_O.2.45_p002-p003.jpg';
import imgAgora from './DSCF0525.jpg';
import imgBonus from './Nicolas_de_btv1b6000238t_361.jpg';
import imgPeasant from './82-001079.jpg';
import imgPentagon1 from './merel-pentagon.svg';
import imgPentagon2 from './merel-pentagon2.svg';
import imgPentagon3 from './merel-pentagon3.svg';
import imgSunmill from './windmill.svg';
import imgCube1 from './merel-cube1.svg';
import imgCube2 from './merel-cube2.svg';
import imgMobius from './merel-mobius.svg';
import imgHexagon from './merel-hexagon.svg';
import imgMozogPublished from './mozog-published.svg';
import imgMozog from './mozog.svg';
import imgTrencho from './trencho.svg';
import imgTrenchoBoard from './nma_149016_ma45226671_trencho_board_game.jpg';
import imgTwelveMensMorris from './shutterstock_235028281.jpg';
import imgWithDice from "./Nine_Mens_Morris_with_dice_in_Libro_de_los_juegos.jpg";
import imgTemplarRule from "./templar-rule.jpg";

const TakeItAway: React.FC = () => <>
  <Description><span id="index-nine-mens-morris" className="game-title">Nine Men’s Morris</span> is an ancient <a href="/articles/mill-games">mill game</a>, dating at least from Roman times. It is the most prominent of all the mill games, played all around the world, but particularly in central European countries. Other variations of the game — such as Shax or <GameRef id="morabaraba" /> — are also played in several African countries.</Description>
  <p>In addition to being a game, the board was used as some kind of talisman or symbol; <Cite r="MerylsBoardEnigma" inline page={330} /> collects nearly a thousand examples of inscribed mill boards from around the world. Many of these are in vertical positions on walls where they could not possibly have been used for games, and their purpose is at the moment not well understood.</p>
  {/*
Other general references include [@OxfordBG; @NineMensDice; @Zaslavsky, p. 12; @Bell, p. 93; @Murray2,
§3.5.4, p. 43; @Goddard1901; @NotesAndQueriesS8V12, pp. 28, 89–90, 173, 333;
@PlayedAtThePub, p. 150].
  */}
  <Section title="Play">
    <ArticleImage
      position="right"
      alt="TODO"
      src={imgLargeMerels}>
      Nine Men’s Morris is played on the large mill board.
    </ArticleImage>
    <p>The game (as most mill games) is split into two phases. During the first (placement) phase, the players take turns placing a single piece at a time onto one of the vacant points on the board. Once all the pieces have been placed, the movement phase begins. In this part of the game, players take turns moving a single piece along a line to another vacant point. Once a player is reduced to three pieces, their pieces can ‘fly’ and move to any empty point on the board. </p>
    <p>Throughout the game, each time a player forms a mill they remove any piece of their opponent’s that is not part of a mill. If all their opponent’s pieces are in mills, no piece may be removed.</p>
    <p>During the movement phase, it is possible to form two mills simultaneously. In this case the player may remove two of the opponent’s pieces from the board.</p>
    <p>A player loses the game when they are reduced to fewer than three pieces, or if they are unable to make a valid move on their turn.</p>
  </Section>
  <Section title="History">
    <ArticleImage
      size="wide"
      alt="A weathered Nine Men’s Morris board scratched into a rock."
      src={imgAgora}>
      A Nine Men’s Morris board of unknown age in the Roman Agora, Athens.
    </ArticleImage>
    <p>The game dates from at least the late Roman Empire or Byzantine period, and at the moment we do not have evidence for an earlier date.<Cite r="GamesGreekAndRoman" page={3} /><Footnote><Cite r="RamatHanadiv" page={227} inline /> describes a board found in a Byzantine villa in <span lang="he">חורבת עקב</span> (<Noun lang="he-Latn">Ḥorvat ʿAqav</Noun>), dated 400–600&nbsp;CE, while a cache of gaming boards found in a Roman fort at <Noun lang="ar-Latn">Abu Sha’ar</Noun> that was abandoned in the late 4th century contained no mills boards.<Cite r="RomanGameBoards" /></Footnote> Earlier dates have often been proposed based upon the existence of boards carved on ancient monuments such as the Ramesseum<Cite r="AncientEgyptiansAtPlay" page={144} /> and the Mortuary Temple of Seti I at Qurna,<Cite r="AncientCeylon" page={644} /> but these are not able to be dated definitively—the monument only provides an <em>earliest possible</em> date.</p>
    <p>The game spread throughout Europe quickly: a double-sided game board with a Nine Men’s Morris layout on one side was found as part of the 9th-century <a href="https://en.wikipedia.org/wiki/Gokstad_ship">Gokstad Viking ship burial</a> discovered in Norway.<Cite r="TheVikingShipFromGokstad" page={[44, 99]} /></p>
    <p>One of the earliest written references to the game is in the 10th century <a href="https://en.wikipedia.org/wiki/Kitab_al-Aghani"><cite lang="ar-Latn">Kitāb al-Aghānī</cite></a> (<cite lang="ar"><Isolate>كتاب الأغاني</Isolate></cite>, ‘book of songs’), a large collection of poems and stories assembled by <a href="https://en.wikipedia.org/wiki/Abu_al-Faraj_al-Isfahani"><Noun lang="ar-Latn">ʾAbū l-Faraj al-Iṣfahānī</Noun></a> (<Isolate><span lang="ar">أبو الفرج الأصفهاني</span></Isolate>, 897–967). One story describes a club from the time of the poet <Noun lang="ar-Latn">al-Aḥwaṣ</Noun> (<Isolate><span lang="ar">الأحوص</span></Isolate>, 660–724), along with the board games it held for the use of its members. According to the book, they could play <span lang="ar-Latn">shiṭranj</span> (<Isolate><span lang="ar">شطرنج</span></Isolate>, chess), <span lang="ar-Latn">nard</span> (<span lang="ar">نرد</span>), or — most importantly here — <span lang="ar-Latn">qirq</span> (<Isolate><span lang="ar">قرق</span></Isolate>, morris).<Cite r="GamblingInIslam" page={481} /> The derivation of the name <span lang="ar-Latn">qirq</span> is uncertain, but it is apparently not originally an Arabic word.<Cite r="Murray2" page={37} />
    <Footnote>The Imam <Noun lang="ar-Latn">ʾAbū al-Qāsim al-Rāfiʿī al-Qazwīnī</Noun> (<Isolate><span lang="ar">أبو القاسم الرافعي القزويني</span></Isolate>, 1160–1226) would later describe <span lang="ar-Latn">qirq</span> as the “chess of the <a href="https://en.wikipedia.org/wiki/Maghrebis">Maghrebis</a>”.<Cite r="GamblingInIslam" page={381} /> Similarly, <GameRef id="shax"/> is sometimes referred to as “Somali chess”.</Footnote></p>
    <p>Later, <Noun lang="fa-Latn">Faīrūzābādī</Noun> (of whom, more below) would identify <span lang="ar-Latn">qirq</span> with <span lang="ar-Latn">suddar</span> (<span lang="ar">سُدَّر</span>), apparently derived from the Persian <span lang="fa-Latn">se darre</span> (<span lang="fa">سِهْ دَرَهْ</span>), meaning ‘three valleys’.<Cite r="Hyde" page={[[207, 209]]} /> However, in other dictionaries <span lang="ar-Latn">suddar</span> is identified with other games such as <span lang="ar-Latn">aṭ-ṭabanu</span> (<span lang="ar">الطَّبَنُ</span>), which is known as a different game today (modern name <span lang="ar-Latn">aṭ-ṭāb</span> <span lang="ar">الطاب</span>).<Cite r="LaneTab" /> It is probable that in the past, names of games were more fluid, and often referred to families of games. Even in modern Arabic the name <span lang="ar-Latn">ʾidrīs</span> (<span lang="ar">ادريس</span>) is used to refer to mill games, but also refers to loosely related games such as <a href="https://boardgamegeek.com/boardgame/286295/quantik">Quantik</a>. With that said, a Persian origin for the game does seem likely, given the number of ways that <span lang="ar-Latn">suddar</span> is rendered in Arabic dictionaries.<Footnote>Other versions of the name are given as <span lang="ar">سِهْ بَرَهٌ</span> (<span lang="ar-Latn">sih barahun</span>), <span lang="ar">سِيدَرَهِ</span> (<span lang="ar-Latn">sīdarahi</span>), <span lang="ar">سِدْرَه</span> (<span lang="ar-Latn">sidrah</span>), <span lang="ar">سَذْ مَرَهْ</span> (<span lang="ar-Latn">saḏ marah</span>), or <span lang="ar">سِدْ مَزْه</span> (<span lang="ar-Latn">sid mazh</span>).<Cite r="LaneTab" /></Footnote></p>
    <p>From the Arabic-speaking world the game entered Spain, where <span lang="ar-Latn">al-qirq</span> became <span lang="es">alquerque</span>, which has remained the Spanish name for this family of games until the present day.</p>
    <ArticleImage
      position="aside"
      alt="A section of a manuscript written in a calligraphic hand"
      src={imgTemplarRule}
      source={{
        originalUrl: "https://gallica.bnf.fr/ark:/12148/btv1b9058924p/f58.item.zoom",
        license: "cc0",
        organization: { orgName: 'Bibliothèque nationale de France', orgLang: "fr", orgAbbr: 'BnF' }
      }}>
      Text of the French Templar rule from an early 14th-century manuscript edition (with quoted passage highlighted).
    </ArticleImage>
    <p>In the early 12th century, the game was mentioned in the French Rule of the Templar order (probably written between 1139 and 1147&nbsp;CE<Cite r="TheRuleOfTheTemplars" page={12} />), as the only board game allowed to be played by Templar brothers. It is possible that the order picked up the game through their contact with the Arabic-speaking world:<Footnote>Indeed, a board has been found inscribed upon a stone in <a href="https://en.wikipedia.org/wiki/Ch%C3%A2teau_P%C3%A8lerin"><Noun lang="fr">Château Pèrelin</Noun></a>, a fortress constructed by the Templars in what is now Israel — although it could have been placed there any time since the fortress was built.<Cite r="AtlitCastle" page={60} /></Footnote></p>
    <div className="multi">
      <p lang="fr">Et sachies que a nul autre jeu frere dou Temple ne doit joer, fors qu’a marelles as queles chascun puet juer se il veaut por desduit sans metre gajeures. As eschas ni a tables nul frere dou Temple ne doit juer, ne as eschaçons.<Cite r="LaRegleDuTemple" page={185} /></p>
      <p>And let it be known that a brother of the Temple should play no other game except <span lang="fr">marelles</span>, which each may play if he wishes, for pleasure without placing wagers. No brother should play chess, backgammon, or <span lang="fr">eschaçons</span> [an unknown game].<Cite r="TheRuleOfTheTemplars" page={90} /></p>
    </div>
    <p>It is unclear <em>why</em> mill games were permitted by the Templars<Footnote>TODO: it has been suggested (?) that the tripartite board was taken as supportive of the trinity, or remniscent of the First Temple of Jerusalem.</Footnote>, but, reading the rest of the passage (not quoted above), the intent of the Rule seems to be to prevent playing games for money — bets were allowed to be placed on games, but only with worthless items such as wooden tent pegs. Viewed in this light, perhaps mill games were considered less susceptible to gambling, and therefore permissible.</p>
    <ArticleImage 
      position="aside"
      src={require('./Alfonso_NMM.jpg')}
      source={{license: 'cc0'}}>
      From Alfonso’s <cite>Book of Games</cite>.
    </ArticleImage>
    <p>In 1283 it appeared in Alfonso X’s <cite lang="es">Libro de los Juegos</cite> (<cite>Book of Games</cite>), where in addition to the standard game, rules for playing with dice are given (<a href="#with-dice">see below</a>).</p>
    <ArticleImage
      src={imgBonus}
      position="aside"
      alt="Page from a manuscript with a Nine Men’s Morris board on it."
      source={{
        organization: {
          orgName: "Bibliothèque nationale de France",
          orgLang: "fr",
        },
        originalUrl: "https://gallica.bnf.fr/ark:/12148/btv1b6000238t/f359.item",
        license: "cc0"
      }}>
      The first problem in one of the <cite>Bonus Socius</cite> manuscripts written in Picardy (MS Latin 10286). The different shapes of the pieces in the diagram are used to identify particular pieces in the accompanying text.
    </ArticleImage>
    <p>In the same century the <cite lang="la">Bonus Socius</cite> series of manuscripts contained problems for the game, alongside other problems for chess and various table games.<Cite r="Murray" page={619} /></p>
    <ArticleImage
      src={imgCerne}
      alt="Page from a manuscript with a Nine Men’s Morris board on it."
      source={{
        organization: { orgName: "Trinity College" },
        license: "cc-by-nc",
        originalUrl: "http://trin-sites-pub.trin.cam.ac.uk/james/viewpage.php?index=668"
      }}
    >
      A 13th-century English manuscript (MS O.2.45) from Cerne Abbey shows a Nine Men’s Morris board alongside an Alquerque board and another unidentified board (possibly <GameRef id="daldos"/>).
    </ArticleImage>
    <ArticleImage
      size="wide"
      src={require('./Alexander_Morris.jpg')}
      alt="A man and woman sitting either side of a morris board."
      source={{
        organization: {orgName: "Bodleian Libraries, University of Oxford"},
        license: "cc-by-nc",
        licenseVersion: '4.0',
        copyrightYear: 2015,
        identifier: "SC: 2464",
        originalUrl: "https://digital.bodleian.ox.ac.uk/objects/60834383-7146-41ab-bfe1-48ee97bc04be/surfaces/8975ddf1-8759-443e-94e8-0b1b0a9712a5/"
      }}>
      A woman and a man playing Nine Men’s Morris together, miniature from a copy of the <cite>Romance of Alexander</cite> (produced 1338–44).
    </ArticleImage>
    {/*
    <ArticleImage position="aside" src={imgLargeMerelsWithDiagonals} alt="">
    </ArticleImage>
    */}
    <p>The board with diagonals seems to appear first in Arabic sources;<Cite r="Murray2" page={43} /> it is shown — as the only drawing — in the famous <Noun lang="ar-Latn">al-Qamūs al-Muḥīṭ</Noun> dictionary (<span lang="ar">القاموس المحيط</span>, ‘the surrounding ocean’) of <a href="https://en.wikipedia.org/wiki/Fairuzabadi"><Noun lang="fa-Latn">Fairūzābādī</Noun></a> (<span lang="fa">فیروزآبادی</span>, 1329–1414), published at the start of the 15th century.<Cite r="alQamus" /></p>
    <ArticleImage
      src={require('./Fairuzabadi.jpg')}
      size="wide"
      alt="A page from an illuminated Arabic dictionary with a digram of a Nine Men's Morris board with diagonals."
      source={{
        license: "cc-by",
        licenseVersion: "4.0",
        organization: {
          orgName: "University of Pennsylvania, Kislak Center for Special Collections"
        },
        originalUrl: "https://openn.library.upenn.edu/Data/0001/html/ljs387.html#a328r"
      }}>
      The entry for “<span lang="ar">القَرْقُ</span>” in the <Noun lang="ar-Latn">Qamūs</Noun>. In here, the game is identified with <span lang="ar-Latn">suddar</span>.
    </ArticleImage>
    <p>In later English history the game developed an association with rusticity, often mentioned as a game played by shepherds. It can be traced in English history through <a href="https://en.wikipedia.org/wiki/Canonical_visitation">visitation</a> records; one instance from the parish of Bitteswell records that in 1634 a certain Robert Lord the Younger was “admonished and dismissed” for “playing at nine men’s morris in the churchyard on Sunday”.<Cite r="MetropoliticalVisitation" page={497} /></p>
    <div className="multi">
      <ArticleImage
       src={require('../Daldos/maryrose_daldos.jpg')}
       alt=""
       source={{license: "with-permission", organization: {orgName: "The Mary Rose Museum"}}}>
      A Nine Men’s Morris board alongside what seems to be a <GameRef id="daldos" /> board, on a barrel-end from the wreck of the Mary Rose (1545).
    </ArticleImage>
    <ArticleImage
      src={imgPeasant}
      alt="A peasant boy holding a Nine Men’s Morris board."
      source={{
        author: {
          given: "Jean",
          family: "Schormans",
        },
        organization: {
          orgName: "RMN-Grand Palais (musée du Louvre)",
          orgLang: "fr",
        },
        originalUrl: "https://art.rmngp.fr/fr/library/artworks/suite-des-nobles-pastorales-jeu-de-marelle-et-cueillette-des-fruits_fil-de-soie_tapisserie-technique_laine-textile",
        license: "cc0"
      }}>
      Detail from the 16th-century tapestry <cite lang="fr">Suite des Nobles Pastorales</cite>.
    </ArticleImage>
    </div>
  </Section>
  <Section title="Nomenclature">
    <p>Other English names for the game have included:</p>
    <ul className="columnar">
      <li>Blind Men’s Morris (Leicestershire<Cite r="PegMeryll" page={130}/>)</li>
      <li>Bushels<Cite r="Hyde" page={204} /></li>
      <li>Figmill (in Clarence, New York, USA)<Cite r="Figmill" /> (This name derives from an American manufacturer of equipment, but originally might derive from <a href="/articles/mill-games#terminology">the Swiss term <span lang="gsw">«Figgi und Müli»</span></a>.)</li>
      <li>Morris (Cornwall<Cite r="PegMeryll" page={130}/>)</li>
      <li>Madell or Medal<Cite r="NotesAndQueriesS8V12" page={333} /></li>
      <li>Marl (Wiltshire<Cite r="PegMeryll" page={130}/>)</li>
      <li>Marlin<Cite r="Hyde" page={204} /></li>
      <li>Marrel(’s)<Cite r="GommeI" page={416} /> or Marrells<Cite r="NotesAndQueriesS8V12" page={173} /></li>
      <li>Marnull<Cite r="NotesAndQueriesS8V12" page={28} /></li>
      <li>Maurice or Morrice (Norfolk<Cite r="PegMeryll" page={130}/>)</li>
      <li>Mill (Devon<Cite r="PegMeryll" page={130}/>)</li>
      <li>Meg Merry-legs (Lincolnshire<Cite r="PegMeryll" page={130}/>)</li>
      <li>Merils (Essex <Cite r="PegMeryll" page={130}/>), Merrils<Cite r="GommeI" page={414} />, or Merrills<Cite r="NotesAndQueriesS8V12" page={173} /></li>
      <li>Merelles<Cite r="GommeI" page={415} /><Cite r="NotesAndQueriesS8V12" page={90} /><Cite r="PegMeryll" page={130} /> or Merell(s)<Cite r="GommeI" page={416} /></li>
      <li>Merls (in Cleveland, England)<Cite r="GommeI" page={419} /></li>
      <li>Merry Hole (Northamptonshire<Cite r="PegMeryll" page={130}/>)</li>
      <li>Merry Peg (Oxfordshire<Cite r="PegMeryll" page={130}/>)</li>
      <li>Morels<Cite r="PegMeryll" page={130}/></li>
      <li>Murrells (Cambridgeshire<Cite r="PegMeryll" page={130}/>)</li>
      <li>Ninepenny<Cite r="PegMeryll" page={130}/> or Ninepenny Morris (in Gloucestershire – but played with 12 men)<Cite r="GommeI" page={416} /></li>
      <li>Nine Holes (North of England<Cite r="PegMeryll" page={130}/>)</li>
      <li>Nine Mens Morals<Cite r="Hyde" page={204} /></li>
      <li>Nine Men’s Morrice (in Hampshire or Holderness<Cite r="GommeI" page={419} />)</li>
      <li>Nine Men o’ Morris<Cite r="NotesAndQueriesS8V12" page={89} /></li>
      <li>Nine Men’s Welcome<Cite r="PubGamesOfEngland" page={103} /></li>
      <li>Nine Peg O Merryal (North Lincolnshire<Cite r="PegMeryll" page={130}/>)</li>
      <li>Nine Pin/Penny Miracle<Cite r="Hyde" page={204} /><Cite r="PegMeryll" page={130}/></li>
      <li>Nine Pin/Penny Moris<Cite r="Hyde" page={204} /></li>
      <li>Nine Pin Merells<Cite r="Hyde" page={204} /></li>
      <li>(Nine) Peg Morris (by John Clare, a rustic English poet)<Cite r="GommeI" page={416} /></li>
      <li>Nine Stone Morris<Cite r="NotesAndQueriesS8V12" page={89} /></li>
      <li>Peg Meryll (played in Hargrave with 11 men, and ‘flying’ at 5 men<Cite r="PegMeryll" page={133} />) or Merrilpeg<Cite r="GommeI" page={416} /></li>
      <li>Puzzle-Pound<Cite r="NotesAndQueriesS8V12" page={333} /></li>
    </ul>
    <p>In other languages it is called:</p>
    <ul>
      <li>Bengali: <span lang="bn">ন গুটি</span> (<span lang="bn-Latn">nô guṭi</span>) ‘nine beads’</li>
      <li>French: <span lang="fr">le jeu du moulin</span> ‘the mill game’</li>
      <li>Greek: <span lang="grc">τὸ τριόδι</span> ‘trio’<Cite r="MacedonianFolklore" page={295} />, or <span lang="grc">τριώδιον</span> ‘triodium’.<Cite r="Hyde" page={205} /></li>
      <li>German: <span lang="de">Neunstein</span> ‘nine stone’ or simply <span lang="de">Mühlespiel</span> ‘mill game’. Germany runs a ‘world’ league, the “<Noun lang="de"><a href="http://www.muehlespiel.eu/">Weltmühlespiel Dachverband</a></Noun>”.</li>
      {/* Persian: دوز نه تایی
dvz noh tʾyi
flat 9 triads */}
      <li>Ottoman Turkish: <span lang="ota">طقوز طاش</span> (<span lang="ota-Latn">dokuz taş</span>) ‘nine stone’<Cite r="Hyde" page={206} /></li>
      <li>Swiss: <span lang="gsw">Nüünischtei</span>.<Cite r="MundartLexikon" /></li>
      <li>Urdu: <span lang="ur">نو گوٹی</span> (<span lang="ur-Latn">nau guṭī</span>) ‘nine pieces’<Cite r="GuptaD" page={145} /></li>
    </ul>
    <ArticleImage
      alt="A Morris board in a brick wall, made out of black and red bricks"
      src={imgWall}
      size="wide"
      source={{
        author: { given: "Ken", family: "Broadhurst" },
        copyrightYear: 2016,
        license: "with-permission",
        originalUrl: "https://ckenb.blogspot.com/2016/07/details-chateau-du-moulin.html"
      }}>
      A <span lang="fr">jeu du moulin</span> in the south-west wall of the <Noun lang="fr">Château du Moulin</Noun> (<Noun lang="fr">Loir-et-Cher</Noun>, France). Built between 1480–1501, this is a punny reference to the name of the original owner, <Noun lang="fr">Philippe du Moulin</Noun>. There is another Three Men’s Morris board on the eastern wall, and the nearby <Noun lang="fr">Château de Gien</Noun> has a similar motif.<Cite r="MerylsBoardEnigma" page={103} />
    </ArticleImage>
  </Section>
  <Section title="Analysis">
    <p>With perfect play, the game is a draw.<Cite r="UltraStrongMorris" /></p>
  </Section>
  <Section title="Variants">
    <Section title="Alternate boards">
      <p>The standard rules can be adapted to play on many different boards. As in standard Nine Men’s Morris, mills must always be in a straight line and may not turn corners.</p>
      <ArticleImage
        src={[
          [imgSunmill, ""],
          [imgPentagon1, "A board constructed from three nested pentagons with corners and side-middles connected."],
          [imgPentagon2, "A board constructed from five nested pentagons in alternating orientations."],
        ]}>
        Alternate boards of German origin:<Cite r="KlassischeSpiele" page={58} /> a ‘sun-mill’ (played with 12 pieces each), and two boards constructed from nested pentagons. The first pentagonal board is played with 11 pieces each, the second is designed to be played by two or more players: for two players use 12 pieces; for three, 8; for four, 6; and for five, 5.
      </ArticleImage>
      <ArticleImage
        src={[
          [imgCube2, ""],
          [imgCube1, ""],
        ]}>
        Two variations of a ‘cube’ board by David Parlett.<Cite r="OxfordBG" page={122} /> On the coloured board, a mill may not cross between differently-coloured regions, and the middle point may only be taken to complete a mill or prevent completion of a mill on the next turn.
      </ArticleImage>
      <ArticleImage
        src={[
          [imgMobius, ""],
          [imgPentagon3, ""],
          [imgHexagon, ""],
        ]}>
        The Möbius board (invented by <Noun lang="de">Ingo Althöfer</Noun>), another pentagonal board (without joined corners), and a hexagonal board.
      </ArticleImage>
    </Section>
    <Section title="Twelve Men’s Morris">
      <p>This is played with twelve pieces per player, on a board that has diagonals.<Cite r="Zaslavsky" page={7} /><Cite r="Murray2" page={48} /> In all other respects, the game is the same.</p>
      <ArticleImage
        alt="An old man’s hand reaches towards a worn morris board to move a piece."
        src={imgTwelveMensMorris}
        source={{
          organization: { orgName: "Shutterstock.com" },
          author: "Delpixel",
          identifier: "235028281",
          originalUrl: "https://www.shutterstock.com/image-photo/close-on-hand-old-man-playing-235028281",
          license: "stock-image"
        }}>
        A Twelve Men’s Morris game being played.
      </ArticleImage>
      <Section title="Nomenclature">
        <p>In other countries or languages it is known as:</p>
        <ul>
          <li>Bengali: <span lang="bn">বারো গুটি (পাইত পাইত)</span> (<span lang="bn-Latn">bārō-guṭi (pāit-pāit)</span>) ‘twelve bead (unsure)’<Cite r="GuptaD" page={145} /></li>
          <li>Sri Lanka (Sinhala): <span lang="si">නෙරෙංචි</span> or <span lang="si">නෙරිංචි</span> (<span lang="si-Latn">nereṁci</span><Footnote>Also transcribed as <span lang="si-Latn">Nerenchi</span> or <span lang="si-Latn">Niranchy</span>.</Footnote> or <span lang="si-Latn">neriṁci</span>), possibly named after a plant that has very thorny seeds<Cite r="Zaslavsky" page={16} /><Cite r="SportsAndGamesOfSinghalese" page={34} /><Cite r="AncientCeylon" page={577} /></li>
          <li>Urdu: <span lang="ur">بارہ گوٹی</span> (<span lang="ur-Latn">bārā guṭī</span>) ‘twelve pieces’</li>
        </ul>
      </Section>
    </Section>
    <Section title="With Dice">
      <ArticleImage
        alt="A manuscript drawing of two men sitting beside a morris board with pieces and dice on it, while their attendants hold their spears."
        src={imgWithDice}
        source={{license: 'cc0'}}>
        A game being played with dice, from Alfonso X’s <cite>Book of Games</cite>.
      </ArticleImage>
      <p>Alfonso X’s book of games describes a variant played with dice.<Cite r="AlfonsoGames" /> While it is unclear from the manuscript what the exact rules are, there are two suggested versions:</p>
      <p>TODO</p>
    </Section>
    <Section title="Lasker Morris">
      <p>This variant was developed by <Noun lang="de">Emanuel Lasker</Noun>, who was World Chess Champion from 1894 to 1921. It unifies the two phases of the game into one.</p>
      <p>Play is as in the standard game, except that each player has 10 pieces instead of 9, and on a player’s turn they may <em>either</em> place a new piece or move a piece that is already on the board.</p>
      <p>With perfect play the game is a draw.<Cite r="SolvingLaskerMorris" /><Cite r="UltraStrongMorris" /></p>
    </Section>
  </Section>
  <Section title="Commercial Variants">
    <Section title="Mozog">
      <Footnote standalone>
        <p>The game was originally patented (US
          <a href="https://patents.google.com/patent/US4579347A">4,579,347</a>) in a slightly different form, with a more complex board. In this version each player had 14 pieces.</p>
        <ArticleImage
          alt=""
          src={imgMozog}>
          The board from the patent was of a more complex construction, but with fewer squares.
        </ArticleImage>
      </Footnote>
      <ArticleImage
        alt=""
        src={imgMozogPublished}>
        The Mozog board as published has 7 nested squares, giving 56 points.
      </ArticleImage>
      <p><a href="https://boardgamegeek.com/boardgame/22075/mozog">Mozog</a> is a variant created in 1984 by Wilhelm Reman, and it is played on a custom board. Each player has 20 pieces, and play is as in Nine Men’s Morris except that mills may not be made along the dotted lines on the board. The game is over when one player is reduced to two pieces.</p>
    </Section>
    <Section title="Trencho">
      <p>Trencho was a variant published by Chad Valley in 1916 that was billed as “An Australian War-Game as Played in the Camps & Trenches”.</p>
      <ArticleImage
        alt=""
        position="aside"
        src={imgTrencho}>
        Trencho is played on a modified large mill board. The game was published with (at least) two different configurations.
      </ArticleImage>
      <p>Trencho is played on a modified mill board where only two shortened diagonals are present. Mills are called “trenches”.</p>
      <p>The game is played as usual except:</p>
      <ul>
        <li>Upon forming a trench, a player may either remove an opponent’s piece or restore one of their own. If they replace a piece it may not complete a trench.</li>
        <li>A trench may not be formed again in the same position by the same three pieces.</li>
      </ul>
      <ArticleImage
        alt=""
        size="wide"
        src={imgTrenchoBoard}
        source={{
          organization: { orgName: "National Museum of Australia" },
          license: "cc-by-sa",
          originalUrl: "http://collectionsearch.nma.gov.au/object/149016",
        }}>
        Trencho board and pieces. A board with a different configuration can be seen <a href="https://www.flickr.com/photos/communityhistorysa/15513283420/in/photolist-sZrx-4ymJZ6-nHnS3U-qtBtX5-bWfoc7-dMYNfX-pCRCFN-JQvGw-f5ZAxg-83Djx-Je3MXg/ ">here</a>.
      </ArticleImage>
    </Section>
  </Section>
</>;

export default TakeItAway;
