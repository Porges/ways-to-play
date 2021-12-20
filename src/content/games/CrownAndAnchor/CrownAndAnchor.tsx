import * as React from 'react';

import { Cite, Cards, ArticleImage, Description, Section, Footnote, Noun } from 'ui';
import { GameRef } from '../Game';

import imgHHH1 from './shutterstock_1350321158.jpg';
import imgHHH2 from './shutterstock_1350321164.jpg';
import imgBaliDice from './shutterstock_1398460952.jpg';
import imgJMlayout from './shutterstock_1958829937.svg';
import imgChineseBoard from './chinese_board.svg';

const Content: React.FC = () => <>
  <Description>Crown & Anchor is a dice game that is probably most famous as being popular with British and “Colonial” servicemen in the early 20th century, but today it is played in many locations around the world. The game play is equivalent to that of <GameRef id="chuck-a-luck" />, but the pips on the dice and the numbers on the staking-table are replaced by symbols: the titular 👑&#xfe0e; crown and ⚓&#xfe0e; anchor, and the playing-card suits: <Cards>s</Cards> spade, <Cards>c</Cards> club, <Cards>d</Cards> diamond, and <Cards>h</Cards> heart.</Description>
  <Section title="History">
    <p>Please note that the following is (necessarily, for me) biased toward English-language sources. It is entirely possible the game has a longer history elsewhere; for the moment, at least, I cannot say.</p>
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
      A Crown & Anchor mat purchased in Colombo (Sri Lanka) in 1915 and used by Australian troops while in transport.
    </ArticleImage>
    <p>Many gaming histories cite a 17th or 18th century origin for the game, but based on textual evidence it seems to date from the late 19th century (at least in the version played with the Crown and Anchor symbols), possibly derived from pictorial versions of Chuck-A-Luck such as “Mustang”. In England there are certainly many old references to “dice boards” or “gaming tables”, but they are not described in detail very often.</p>
    <p>At first, the game was played with symbols other than the crown and anchor. The earliest reference I have found is to a version played with “anchors, stars, clubs, spades, hearts, and diamonds” at the coronation fair of George IV in Hyde Park in 1821.<Footnote>This is clearly the same game as six outcomes are listed and the operator announces “three to win, three to lose” — a classically misleading claim!</Footnote><Cite r="DissolutionOfCoronationFair" /></p>
    <p>Other variants were developed through the 19th century: In 1842, the <cite>Punch</cite> character Mr. Muff “mistrust[s] the chances of the ‘Dimunt, Star, Hanker, Crown, Club, and Feather’” being played at the (fictional) “Clodpole races”.<Cite r="CuriositiesOfMedicalExperience" /> In 1859 a game involving “anchor, heart, etc” is described at a fair,<Cite r="GamblingAtFairs" /> and in 1860 “clubs, spades, &c.” at a game at the races.<Cite r="GamblingAtTheRaces" /> An 1864 newspaper article claims that <a href="https://en.wikipedia.org/wiki/William_Brodie">Deacon Brodie</a> played a game of “anchor, club, star, feather, heart, [and] spade” in his youth, but this may be anachronistic — in any case, it is still an early reference.<Cite r="TheMysteriesOfEdinburgh" /> In 1875 there is reference to a game of “feather, star, and anchor” being played in Epping Forest.<Cite r="EasterMondayInTheForest" /> In 1889, chuck-a-luck (as the “three dice game”) is reported in <a href="https://en.wikipedia.org/wiki/Middlesbrough">Middlesbrough</a>.<Cite r="GamblingInMiddlesbrough" /></p>
    <p>Early references to the game under the name <span lang="nl">anker en zon</span> (“anchor and sun”) appear in Flanders in 1880,<Cite r="Aldenardiana" /> and finally as “the crown and anchor game” in Melbourne, Australia in 1882.<Cite r="CrownAndAnchorAustralia" /><Footnote>The game under the name of <GameRef id="chuck-a-luck" /> or “old sweat” is known in Melbourne from at least 1866.<Cite r="LayOfAMelbourneVagrant" /></Footnote> An equivalent game is recorded as being played in British-controlled Hong Kong in 1884.<Cite r="HongKongCrownAnchor" /></p>
    <p>Information from the people who actually ran the games is hard to find. One notable exception is that of Arthur Harding, whose memoir details his life growing up in <a href="https://en.wikipedia.org/wiki/Boundary_Estate">The Nichol</a>,<Footnote>The Nichol was a slum in East London, also called the “Jago”, which was torn down in the 1890s.</Footnote> in the late 19th and early 20th centuries.<Cite r="EastEndUnderworld" /> Harding states that “some of the first pennies [he] earned was holding up the boards for ‘Crown and Anchor’”, and describes how the board would be held by a person at each end, with a cloth on which the staking layout was painted placed on top. The entire setup was designed to make it as easy as possible to disappear when the police arrived, although in many cases the games were tolerated by police as the income the games provided prevented the operators from resorting to harder crimes.<Footnote>Such as “snide-pitching” (passing false money), and “shoot-flying” (stealing pocket watches by grabbing their chains)!</Footnote><Cite r="EastEndUnderworld" page={[[175, 178]]} /></p>
    <Footnote standalone>Another curious patent for a game using Crown & Anchor dice was filed in 1891<Cite r="PatentLudoCrownAnchor" /> and eventually granted in modified form in 1905;<Cite r="PatentLudoCrownAnchor2" /> this one combined the dice with the game of Ludo, but is mechanically unrelated.</Footnote>
    <p>An interesting patent lodged in England in 1895 (see image) indicates that the crown-and-anchor version of the game must have been known at that time, but I have yet to find any other references to it this early on, and the patent does not mention Crown & Anchor by name.<Cite r="GB189504141A" /></p>
    <ArticleImage
      noborder
      src={require('./StarsAndStripes.png')}
      alt=""
      source={{ license: "cc0" }}>
      An image from the patent for the game “Stars and Stripes”.
    </ArticleImage>
    <p>The game has also at times been called “bubble and buck”,<Cite r="BubbleBuck1911" /> “bumble and buck”,<Cite r="APrivateInTheGuards" page={189} /> “diddlum buck”<Cite r="SmallerSlangDictionary" page={44} />  or “toodlum buck(s)”.<Footnote>This name was also used in Australia to refer to a children’s game played with a teetotum; perhaps the version on sale here is Crown & Anchor played with a teetotum.</Footnote><Cite r="ToodlumBucks" /></p>
    <Section title="Boer War">
      <p>The game seems to have first became popular with British soldiers during the <a href="https://en.wikipedia.org/wiki/Second_Boer_War">Second Boer War</a> (1899–1902), when British and Australian troops fought alongside American volunteers. It was possibly transmitted from American troops at this time. In 1900, the game is recorded as having been played by English <abbr className="initialism" title="prisoners of war">POW</abbr>s at the Waterval prison camp, under both the names of “chuck-a-luck”<Cite r="AGlimpseAtWaterval" /> and “crown and anchor”.<Cite r="TrooperMilverton" /> British soldiers’ diaries also record the game being played in military camps at <a href="https://en.wikipedia.org/wiki/De_Aar">De Aar</a><Cite r="AutobiographyOfAMilitaryGreatCoat" page={391} /> and on transport ships.<Cite r="DukeOfLancastersOwn" page={157} /></p>
      <p>In 1902, the game was described in London as “a new game from South Africa”,<Cite r="ANewGameFromSouthAfrica" /> and a syndicated article from 1914 also discusses the game as having been played in the army “since the first South African campaign”.<Cite r="GamblingInTheArmy" /></p>
      <p>References from the end of the Boer War period refer to returning British soldiers being swindled at the game,<Cite r="RobbingTommyAtkins" /> returning Australian troops playing it aboard transport ships (including the last troopship the <cite>Drayton Grange</cite>,<Cite r="DraytonGrange" /> which returned over-crowded and disease-ridden), and a report by an American who played the game with English troops.<Cite r="FromTombsBaker" /></p>
    </Section>
    <Section title="World War I">
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
          I found a long line of improvised desks, a space of several yards between each of them. A couple of candles on each desk illuminated the Crown And Anchor board — actually a leatherette sheet, easily folded up and pocketed in an emergency, with the six symbols of the game printed on it. The operator sat on a box and called out his line of persuasion or temptation, such as “Come on, me lucky lads! The more you put down the more you pick up. Who’ll have a bet on the old mudhook?”<Footnote>i.e. anchor, see below.</Footnote>
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
      <p>As seen in the last quote, each symbol had its own nickname. The crown could also be termed the “sergeant-major” or “<a href="https://en.wikipedia.org/wiki/Edward_VII">Teddy’s</a> hat”, the spade the “shovel” or “pioneer’s tool”, the diamond the “curse” or “<a href="https://en.wikipedia.org/wiki/Kimberley,_Northern_Cape">Kimberley</a>”, the heart the “jam tart”, the club the “shamrock”, and the anchor the “mud-hook”, “mud-rake”, or “meat-hook”.<Cite r="APrivateInTheGuards" page={[[187, 188]]} /><Cite r="TheLongTrail" /></p>
      <p>According to several observers, the game was even played on the frontlines, in trenches. An anecdote from the <a href="https://en.wikipedia.org/wiki/Ypres_Salient">Ypres Salient</a> in 1916, by a soldier of the <a href="https://en.wikipedia.org/wiki/King%27s_Royal_Rifle_Corps">King’s Royal Rifle Corps</a>:<Cite r="JerryWinsABet" /></p>
      <blockquote>
        <p>Alf, who owned a Crown and Anchor board of great antiquity, had it spread out on two petrol cans at the bottom of a shell-hole.</p>
        <p>Around it four of us squatted and began to deposit thereon our dirty half- and one-franc notes, with occasional coins of lesser value. The constant whistle of passing fragments was punctuated by the voice of Alf calling upon the company to “’ave a bit on the ’eart” or alternately to “’ave a dig in the grave”, when a spent bullet crashed on his tin hat and fell with a thud into the crown square.</p>
        <p>“’struth,” gasped Alf, “old squarehead wants to back the sergeant-major.” He gave a final shake to the cup and exposed the dice — one heart and two crowns. “Blimey,” exclaimed Alf, “would yer blinkin’ well believe it? Jerry’s backed a winner. ’Arf a mo,” and picking up the spent bullet, he threw it with all his might towards the German lines, exclaiming, “’Ere’s yer blinking bet back, Jerry, and ’ere’s yer winnings.” He cautiously fired two rounds.</p>
      </blockquote>
      <p>Another report from Gallipoli in 1916 also mentions it being played in trenches, and indicates that it was associated with “colonials” (Australians and New Zealanders):<Cite r='AnInterestingNarrative' /></p>
      <blockquote>
        I am satisifed there is as much chance of stopping colonials gambling as old Canute had of stopping the tide rising. I have see them playing “crown and anchor,” a great game with them (don’t know if you ever saw it) in all sorts of unlikely places, even on the fire step in first line trenches. It was funny on the Ionian, going back to Egypt, when there was a church parade. The padre paused in the sermon, and in the middle of the silence came a yell from behind the deck-house, “Who’s going to put a bob on the lucky old mud hook?” whilst straight on the bridge, and absolutely the nearest to the parson, was a ring of men gambling all the time, and too straight under the parson for him to see them. It did look comical…
      </blockquote>
      <p>In 1917 it was described as being played by “colonial” New Zealanders at an English <abbr title="non-commissioned officer">NCO</abbr> school:<Cite r="AtAnEnglishNCOSchool" /></p>
      <blockquote>
        Colonial slang appears strange to the “Tommy,” […] an invitation to a game of “pounds, coins, or browns” lets one know that the popoular gambling game of “crown and anchor,” for anything from a £1 note to a penny, is in progress.
      </blockquote>
      <p>In 1919, it was reported to be played on the ill-fated Australian transport Sardinia.<Cite r="LifeOnTransportSardinia" /></p>
    </Section>
    <Section title="World War II">
      <p>In 1940, it was reported that <a href="https://en.wikipedia.org/wiki/Second_Australian_Imperial_Force">Australian Imperial Force</a> troops stationed in Mandatory Palestine had figured out how to play the game without dice: several <a href="https://en.wikipedia.org/wiki/Woodlouse">slaters</a> were placed under an upturned ashtray which had indentations for resting cigarettes; the holes from which the slaters emerged determined the winning numbers.<Cite r="AIFSlaters" /></p>
      <ArticleImage
        size="wide"
        src={require('./CA_StGeorge.jpg')}
        alt="A creased cloth Crown & Anchor board">
        A “St. George Series” Crown & Anchor board.
      </ArticleImage>
    </Section>
    <Section title="Post-War">
      <p>After the first and second World Wars, mentions of the game become much more common, as the game diffused from returning soldiery back into the wider population.</p>
      <p>A version of the game played by workers constructing Scotland’s hydro-electric dams in the middle of the 20th century was played with six dice, but two matches were required to win anything.<Cite r="TheDamBuilders" page={[[162, 163]]} /> This version of the game has a much higher house edge of 13.865%.</p>
    </Section>
  </Section>
  <Section title="Around the World">
    <p>The game is played in many locations around the world, some of which are described below. Note that American-style games including casino versions are discussed in the <GameRef id='chuck-a-luck' /> article.</p>
    <Section title="China and amongst Peranakans">
      <p>In English the Chinese name is usually given as “Hoo Hey How”; this appears to derive from the Hokkien <span lang="nan-Latn">hû hê hāu</span> <span lang="nan">魚蝦鱟</span>.<Cite r="GamblingGamesOfMalaya" page={109} /> The modern Chinese name is <span lang="zh-Hant">魚蝦蟹</span>/<span lang="zh-Hans">鱼虾鲎</span> ‘fish prawn crab’; these are several of the symbols that commonly appear on the staking layout.</p>
      <ArticleImage src={imgChineseBoard} alt="">
        Example of a Chinese-style staking layout. At the top is the manufacturer’s name <span lang="zh">高慶坊</span> <Noun lang="zh-Latn">Gāo Qìng Fāng</Noun>, followed by <span lang="zh">翹骰不算</span> “cocked dice don’t count”.
      </ArticleImage>
      <p>An equivalent (perhaps older) game can be played with three standard six-sided dice. It does not need to be played with a layout board but it can be. In this form it can be called <span lang="nan">么二三</span> <span lang="nan-Latn">io jī sam</span> (‘ace, two, three’, romanized “Yew Yee Sam” in older texts).<Cite r="GamblingGamesOfMalaya" page={95} /></p>
    </Section>
    <Section title="Indochina">
      <p>The game is widely played across the countries of the Indochinese peninsula, despite gambling being illegal in most of them. The presentation of the game is very similar in all regions.</p>
      <Section title="Vietnam">
        <p>The Vietnamese game has a similar æsthetic to the Chinese version, including the name: <span lang="vi">bầu cua tôm cá</span> (‘gourd crab prawn fish’).</p>
        <div className="multi">
          <ArticleImage
            alt="Three dice, showing a deer, crab, and gourd."
            src={require('./shutterstock_541065082.jpg')}
            source={{
              author: { family: "Shark", given: "Marie" },
              license: 'stock-image',
              organization: { orgName: "Shutterstock.com" },
              originalUrl: 'https://www.shutterstock.com/image-photo/traditional-vietnamese-game-bau-cua-tom-541065277',
              identifier: '541065082'
            }}>
            Three dice as used in the Vietnamese game.
          </ArticleImage>
        </div>
      </Section>
      <Section title="Thailand">
        <p>I have little information about the game in Thailand other than that the paraphernalia for playing exists; gambling is illegal in Thailand.</p>
        <p>From what little I have seen, the game is called <span lang="th">(น้ำ)เต้า ปู ปลา</span> (<span lang="th-Latn">(nam)tao pu pla</span>, ‘(water)gourd crab fish’). Some of the images game is played with are: <span lang="th">ปลาทอง</span> (<span lang="th-Latn">pla-thong</span>, ‘goldfish’), <span lang="th">ไก่</span> (<span lang="th-Latn">kai</span>, ‘chicken’), <span lang="th">ปู</span> (<span lang="th-Latn">pu</span>, ‘crab’), <span lang="th">เต้า</span> (<span lang="th-Latn">tao</span>, ‘gourd’), <span lang="th">เสือ</span> (<span lang="th-Latn">suea</span>, ‘tiger’), and <span lang="th">กุ้ง</span> (<span lang="th-Latn">kung</span>, ‘shrimp’).</p>
        <ArticleImage
          alt="Two dice with images of goldfish, crab, and chicken."
          src={require('./shutterstock_319181276.jpg')}
          source={{
            license: 'stock-image',
            organization: { orgName: "Shutterstock.com" },
            author: "jointstar",
            identifier: "319181276",
            originalUrl: "https://www.shutterstock.com/image-photo/animal-picture-on-dice-319181276"
          }}>
          Dice with Thai names.
        </ArticleImage>
      </Section>
      <Section title="Laos">
        <p>Some images of the game being played in Laos. Interestingly, both photos show a board with Thai names.</p>
        <div className="multi wide">
          <ArticleImage
            alt="Children crowded around a table, staking money on the spaces."
            src={require('./8373019722_76fabf1dfc_o.jpg')}
            source={{
              license: "cc-by",
              licenseVersion: "2.0",
              copyrightYear: 2013,
              author: "PhotAsia",
              originalUrl: "https://www.flickr.com/photos/photasia/8373019722/"
            }}>
            Children playing with a Thai-produced board in Laos.
          </ArticleImage>
          <ArticleImage
            alt="A man places a large die into a dice tower above a staking table."
            src={require('./14740162634_e123789f25_o.jpg')}
            source={{
              license: "cc-by-nc",
              licenseVersion: "2.0",
              author: {
                given: "Jodie",
                family: "Gallagher",
              },
              originalUrl: "https://www.flickr.com/photos/126412580@N04/14740162634/"
            }}>
            Playing with a dice tower in Laos; the board has names in Thai.
          </ArticleImage>
        </div>
      </Section>
      {/*
      <Section title="Myanmar">

      </Section>
      */}
    </Section>
    <Section title="India & Nepal">
      <p>The game was known in Mumbai and Pune<Footnote>Then called Bombay and Poona.</Footnote> as early as 1905, as indicated by court cases from the time,<Cite r="ABookmakerAndThePolice" /><Cite r="HeartAnchorAndCrown" /> but it may have been in India for a long time prior to that.</p>
      <p>In current times, the game is called <span lang="hi">झंडी मुंडा</span> <Noun lang="hi-Latn">Jhaṇḍī Muṇḍā</Noun> (“flag crown”?), or <span lang="hi">खोर खोरे</span> <Noun lang="hi-Latn">Khor Khore</Noun>.</p>
      <p>Gambling remains illegal in most of India but the game is commonly played during <a href="https://en.wikipedia.org/wiki/Diwali"><Noun lang="hi-Latn">Diwali</Noun></a> (<span lang="hi">दीपावली</span>).</p>
      <ArticleImage src={imgJMlayout} alt="" source={{
        license: "stock-image",
        organization: { orgName: "Shutterstock.com" },
        author: "rajanpy",
        identifier: "1958829937",
        originalUrl: "https://www.shutterstock.com/image-vector/langur-burja-jhandi-munda-dice-local-1958829937"
      }}>
        An example of a staking layout for <Noun lang="hi-Latn">Jhaṇḍī Muṇḍā</Noun>. Note that the heart is presented with the same orientation as the spade; this appears to be a typical feature (see more examples: <a href="https://www.alamy.com/stock-photo-traditional-gambling-in-indian-village-on-a-festival-132646298.html">1</a>, <a href="https://www.alamy.com/stock-photo-children-playing-gambling-game-bahundanda-village-lamjung-district-27979377.html">2</a>).
      </ArticleImage>
      <p>The names of the symbols are (in Hindi):</p>
      <ul>
        <li>flag: <span lang="hi">झंडी</span> <span lang="hi-Latn">jhaṇḍī</span> (flag, specifically a triangular flag associated with Hinduism)</li>
        <li>crown: <span lang="hi">मुंडा</span> <span lang="hi-Latn">muṇḍā</span> (“shaven”?)/<span lang="hi">बुर्जा</span> <span lang="hi-Latn">burjā</span> (tower?)/<span lang="hi">मुकुट</span> mukuṭ (crown)</li>
        <li>spade: <span lang="hi">हुकुम</span> <span lang="hi-Latn">hukum</span></li>
        <li>club: <span lang="hi">चिड़ी</span> <span lang="hi-Latn">ciṛī</span></li>
        <li>diamond: <span lang="hi">ईंट</span> <span lang="hi-Latn">ī̃ṭ</span> (literally ‘brick’)</li>
        <li>heart: <span lang="hi">पान</span>  <span lang="hi-Latn">pān</span> (‘betel leaf’)</li>
      </ul>
      <ArticleImage
        size="wide"
        src={require('./shutterstock_1035142783.jpg')} alt=""
        source={{
          license: "stock-image",
          organization: { orgName: "Shutterstock.com" },
          author: "Kondoruk",
          identifier: "1035142783",
          copyrightYear: 2017,
          originalUrl: "https://www.shutterstock.com/image-photo/pokhara-nepal-sept-24-2017-unidentified-1035142783"
        }}>
        The game being played with 6 dice in <a href="https://en.wikipedia.org/wiki/Pokhara">Pokhara</a>, Nepal.
      </ArticleImage>
      <p>In Nepal the game is called <span lang="ne-Latn">langur burja</span> (<span lang="ne">लंगूर or लङ्गुर बुर्जा</span>).<Footnote><span lang="ne-Latn">Langur</span> would seem to derive from the Hindi <span lang="hi">लंगर</span> <span lang="hi-Latn">langar</span>, “anchor”, but the association has been lost in Nepal as the anchor symbol was replaced by a flag.</Footnote> It is commonly played during the festivals of <a href="https://en.wikipedia.org/wiki/Dashain"><Noun lang="ne-Latn">Dashain</Noun></a> (<span lang="ne">दशैं</span>) and <a href="https://en.wikipedia.org/wiki/Tihar_(festival)"><Noun lang="ne-Latn">Tihar</Noun></a> (<span lang="ne">तिहार</span>), and it is usually played with six dice (requiring a minimum of two matches to pay out).</p>
      <p>The Nepali names for the playing-card symbols are:</p>
      <ul>
        <li>spade: <span lang="ne">सुरथ</span> <span lang="ne-Latn">surath</span></li>
        <li>club: <span lang="ne">चीड</span> <span lang="ne-Latn">chid</span> (‘pine’)</li>
        <li>diamond <span lang="ne">इँट</span> <span lang="ne-Latn">itta</span> (‘brick’)</li>
        <li>heart: <span lang="ne">पान</span> <span lang="ne-Latn">pana</span> (‘betel leaf’)</li>
      </ul>
    </Section>
    <Section title="Malaysia and Brunei">
      <p>In Malaysia the game can be known as <span lang="ms">ikan, udang, dan ketam</span> (‘fish, shrimp, and crab’), <span lang="ms">ketam-ketam</span> (‘crabs’), or <span lang="ms">yu ha hai</span> (derived from a non-Mandarin pronunciation of the Chinese name). Chinese-style staking layouts are often used.</p>
      <p>The game is very popular amongst the <a href="https://en.wikipedia.org/wiki/Kadazan-Dusun">Kadazan–Dusun</a> people of Sabah (Northern Borneo), where it is known as <span lang="dtp">katam-katam</span> (‘crabs’). It is played during the festive season and also at funerals.</p>
      <p>In Brunei the game is also known as <span lang="kxd">katam-katam</span>.<Cite r="HuaHuiBrunei" /></p>
    </Section>
    <Section title="Bali">
      <p>In Bali the game is played in many forms and known under many names: <span lang="id">mong-mongan</span> (the name of a set of three small gongs used in Sumatra), or one of a variety of similar names such as <span lang="id">kocok(an)</span> (‘shake’/‘shaking’, as of the dice), <span lang="id">koprok</span>, <span lang="id">kolok</span>, or <span lang="id">kopyok(an)</span> (also ‘shake’/‘shaker’; used also for lotteries).<Cite r="SEAlangBalinese"/></p>
      <p>Bali is (based on appearances on the internet) possibly the part of the world where the game is currently the most popular; this despite all gambling being illegal in the country.</p>
      <p>As in many cultures, gambling is often associated with religious festivals. While other Balinese gambling activities such as the <a href="https://en.wikipedia.org/wiki/Cockfight#Indonesia">cock-fight</a> are restricted to men, the game can be played by anyone, including young children.</p>
      <ArticleImage src={require('./15100534169_2721b8ae84_o.jpg')} alt="" source={{
        license: "cc-by-nc-nd",
        licenseVersion: "2.0",
        author: "Walther Tjon Pian Gi",
        copyrightYear: 2011,
        originalUrl: "https://www.flickr.com/photos/wtpg/15100534169/"
      }}>
        A game being played with 6 dice and 12 squares (including one featuring the <a href="https://en.wikipedia.org/wiki/Teletubbies">Teletubbies</a>!) at <Noun lang="id">Pura Samuan Tiga</Noun> temple; note the men wearing traditional Balinese dress including <a href="https://en.wikipedia.org/wiki/National_costume_of_Indonesia#:~:text=Malay%20men%27s%20headgear-,Udeng,-%2C%20Balinese%20men%27s%20headgear"><span lang="ban">udeng</span></a>.
      </ArticleImage>
      <p>In the Balinese game, bets can be placed spanning two symbols.</p>
      <p>Some of the sets of symbols used are:</p>
      <ul>
        <li><span lang="ban">basir</span>, robin, <span lang="ban">rare</span> (baby), <span lang="ban">ikan barong</span> (fish <a href="https://en.wikipedia.org/wiki/Barong_(mythology)">Barong</a>), <span lang="ban">kepiting</span> (crab), <span lang="ban">ayam</span> (chicken); see images below</li>
        <li><span lang="ban">basir</span>, <span lang="ban">bayi ajaib</span> (magic baby), [???], [a duck], <span lang="ban">macan</span> (tiger), <span lang="ban">elang</span> (<a href="https://en.wikipedia.org/wiki/Javan_hawk-eagle">Javan hawk-eagle</a>)<Footnote>Seen <a href="https://www.alamy.com/stock-photo-bali-indonesia-gambling-with-dice-dlod-blungbang-village-71850399.html">here</a>.</Footnote></li>
        <li><span lang="ban">kak tua</span> (grandfather), <span lang="ban">elang</span>, <span lang="ban">cewek</span> (girl), <span lang="ban">singa</span> (lion), <span lang="ban">ikan</span> (fish), <span lang="ban">kodok</span> (frog)<Footnote>Seen <a href="https://www.alamy.com/balinese-traditional-street-gambling-the-game-called-kocok-or-mong-mongan-with-fields-saying-eagle-old-man-girl-fish-frog-and-lion-in-indonesian-image261042011.html">here</a>.</Footnote></li>
      </ul>
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
      <p>The game can also be played without symbols, but the dice used are still very highly stylized.</p>
      <ArticleImage src={imgBaliDice} alt="" source={{
        license: "stock-image",
        organization: { orgName: "Shutterstock.com" },
        author: "Nomad1988",
        identifier: "1398460952",
        copyrightYear: 2017,
        originalUrl: "https://www.shutterstock.com/image-photo/baliindonesia2009-on-weekeds-bali-1398460952"
      }}>
        A Balinese game played without imagery.
      </ArticleImage>
    </Section>
    <Section title="West Indies">
      <p>The game was probably played throughout the British West Indies; there are records of it from Trinidad,<Cite r="SportsAndPastimesInTheWestIndies" page={692} />, Antigua, Jamaica, and Bermuda.<Cite r="CelebratingCricket" page={[[622, 623]]} /></p>
      <ArticleImage
        alt="A Crown & Anchor table scattered with money and weights and surrounded by a large crowd."
        src={require('./207971457_ed644c66ab_o.jpg')}
        source={{
          originalUrl: "https://www.flickr.com/photos/ekkaia/207971457",
          license: 'cc-by-nd',
          licenseVersion: '2.0',
          author: "Lisa",
          copyrightYear: 2006,
        }}>
        A busy game being played during the Cup Match in Bermuda.
      </ArticleImage>
      <p>The game is still played today in Jamaica. In Bermuda, the game is legal during the weekend of the Cup Match (a cricket tournament), and played in large tents known as the “stock market”.<Cite r="CupMatchAndCarnival" page={267} /> The game is also called Hook and Hat.<Cite r="AScapeToBermuda" page={123} /></p>
    </Section>
    {/* TODO: Lago Lago in Bhutan? */}
  </Section>
  <Section title="Fairground variants">
    <p>As with <GameRef id="chuck-a-luck" />, the game has been adapted for mass play at fairgrounds and carnivals. As noted on that article, the modified games usually have worse odds for the players.</p>
    <ArticleImage
      size="wide"
      alt="A Crown-and-Anchor wheel and staking board with proprieters."
      src={require('./3891195907_1d9ce6774a_o.jpg')}
      source={{
        originalUrl: "https://www.flickr.com/photos/tsarkasim/3891195907/",
        author: "Damien D.",
        copyrightYear: 2009,
        licenseVersion: "2.0",
        license: "cc-by-sa",
      }}>
      A Crown & Anchor wheel in Toronto.
    </ArticleImage>
  </Section>
  <Section title="See also">
    <p>The French game of <GameRef id="tribord-et-babord" /> appears to be similar to Crown & Anchor, but the rules are very different.</p>
  </Section>
</>;


export default Content;
