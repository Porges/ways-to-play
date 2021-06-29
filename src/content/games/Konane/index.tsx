import * as React from 'react';
import { GameRef } from '../Game';

import { ArticleImage, Footnote, Noun, Cite, Section } from 'ui';

import imgKonane_960 from './konane_960.jpg';
import img61_611 from './61-511high.png';
import img_3365 from './33654775226_96814ca128_o.jpg';
import img_2441 from './24417651849_e661252c66_o.jpg';
import img_Z009 from './Z0092008.jpg';

const Konane: React.FC = () => {
  return (<>
    <p><span id="index-konane" className="game-title" lang="haw">Kōnane</span> (sometimes also called <span lang="haw">mū</span>, which is also used to refer to draughts) is a traditional Hawaiian abstract game for two players. While it looks similar to checkers at first glance, the object of the game is different, and the strategy is very deep.</p>
    <ArticleImage
      src={imgKonane_960}
      alt="A child playing kōnane."
      source={{
        author: { given: "Janice", family: "Wei" },
        organization: { orgName: "National Park Service", orgAbbr: "NPS" },
        copyrightYear: 2018,
        license: "cc0",
        originalUrl: "https://www.nps.gov/havo/learn/news/20180315_pr_april_events.htm"
      }}>
      A game of <span lang="haw">kōnane</span> in action.
    </ArticleImage>
    <Section title="History">
      <p><Noun lang="haw">Kōnane</Noun> stands alone as a purely-abstract game in Hawaiian culture.<Footnote>John F. G. Stokes (1875–1960, an Australian archæologist on <Noun lang="haw">Hawaiʻi</Noun>) suggested at one point—with only a sliver of linguistic evidence—that <Noun lang="haw">Kōnane</Noun> could be a distant descendant of Go, which had been transmitted by the survivors of Japanese shipwrecks.<Cite r="Stokes"/></Footnote>  However, it definitely existed before European contact, as it was described by Captain Cook’s voyage, which was the first of its kind to reach the islands (see below).</p>
      <p>The game dates at least from the early 18th century, as it was played by Kahekili II (c. 1737–1794), who was high chief (<span lang="haw">aliʻi nui</span>) of Maui. Kahekili and his advisers possibly used the board, or at least the pieces, to plan battles:</p>
      <blockquote>
        <p>[T]here was no other king so genuinely accomplished in making war as King Kahekili of Maui and the actions on the battlefield plainly showed his knowledge of the checkers game of war. […] It was also said that at the house of Kahekili the heaps of little stones were maneuvered for battle strategy so that his generals need only fulfill their movements.<Cite r="KamehamehaAndHisWarrior" page={41} /></p>
      </blockquote>
      <blockquote>
        <p>Not only were [the old <span lang="haw">kāhuna</span> of this land] seers, but some of them used the <span lang="haw">papa kōnane hoʻoneʻe ʻiliʻili</span> [<span lang="haw">kōnane</span> stones] to guide them in understanding the movements on the battlefield.<Cite r="KamehamehaAndHisWarrior" page={123} /></p>
      </blockquote>
      <p>The gods were also rumoured to enjoy <span lang="haw">kōnane</span>: the volcano goddess <Noun lang="haw">Pele</Noun> was said to play it at her home in <Noun lang="haw">Hale-maʻumaʻu</Noun> crater.<Cite r="Ellis17" page={183} /></p>
      <p>The earliest written record we have of the game is from James King,<Footnote>At the time of the entry quoted, Captain Cook himself had been killed. James King completed the official account of the voyage upon returning to England.</Footnote> who was an officer that sailed on board Captain Cook’s third voyage to the Pacific.  In an entry dated March 1779, he wrote:</p>
      <blockquote>
        <p>It is very remarkable, that the people of theſe iſlands are great gamblers. They have a game very much like our draughts; but, if one may judge from the number of ſquares, it is much more intricate. The board is about two feet long, and it is divided into two hundred and thirty-eight ſquares, of which there are fourteen in a row, and they make uſe of black and white pebbles, which they move from ſquare to ſquare.<Cite r="VoyageToPacific" page={144} /></p>
      </blockquote>
      <p>Another early witness was Archibald Campbell,<Footnote>
        Campbell arrived in <Noun lang="haw">Hawaiʻi</Noun> aboard the <em>Neva</em>, the first Russian ship to circumnavigate the world, on the 29th of January 1809, and left aboard the <em>Duke of Portland</em>, a whaler, on the 4th of March 1810. The <em>Duke of Portland</em> also carried a letter from King Kamehameha to King George III, see <Cite r="Hackler86" inline />. More information about the ships is available in <Cite r="Jackson92" inline/>.
      </Footnote> a Scottish sailor who visited Oʻahu from 1809–1810. In his book, he described the game:</p>
      <blockquote>
        <p>They have a game somewhat resembling draughts, but more complicated. It is played upon a board about twenty-two inches by fourteen, painted black, with white spots, on which the men are placed; these consist of black and white pebbles, eighteen upon each side, and the game is won by the capture of the adversary’s pieces.</p>
        <p>Tamaahmaah [King Kamehameha I, rumoured to be the son of Kahekili II] excels at this game. I have seen him sit for hours playing with his chiefs, giving an occasional smile, but without uttering a word. I could not play, but William Moxely [Campbell’s interpreter], who understood it well, told me that he had seen none who could beat the king.</p>
        <p>The game of draughts is now introduced, and the natives play it uncommonly well.<Cite r="AVoyageRoundTheWorld" page={145} /></p>
      </blockquote>
      <p>The area around where Kamehameha lived was called Kou, and was famous as being a location for playing <span lang="haw">kōnane</span>.<Cite r="LegendsOfHonolulu" page={8} /> A large stone <span lang="haw">kōnane</span> board<Footnote>
        <Cite r="LegendsOfHonolulu" inline /> indicates that the site of the large stone board was the “Spreckels Building”, which was on Fort Street between Merchant St and Queen St, and that the smaller boards mentioned were near <Noun lang="haw">Kekūanāoʻa</Noun>’s house, which was on the corner of King and Richards Streets.
      </Footnote> was reported to be opposite the temple (marked “Hale o Lono” in the map below), in the current location of the Hawaii Community Foundation. Smaller boards were near what is now Iolani Palace.</p>
      <ArticleImage
        size="wide"
        src={img61_611}
        alt="A map of Honolulu as it was in 1810.">
        A reconstruction of Honolulu as it was in 1810. Kamehameha lived in the large compound on the point at the bottom centre. Kou is the area around there, bordered by the yam field at the top. Archibald Campbell stayed for some time with Isaac Davis, who lived in the rightmost of the three houses on the left. (Map from the <a href="https://digicoll.manoa.hawaii.edu/savedmaps/Pages/viewtext.php?s=browse&amp;tid=61&amp;route=browseby.php&amp;by=newest">University of <Noun lang="haw">Hawaiʻi</Noun></a>.)
    </ArticleImage>
      <p>The game continued to be popular throughout the 19th century; William Brigham (first director of Hawaii’s state museum) reported that King Kalākaua (1836–1891) and his wife Queen Kapiʻolani (1834–1899) were “experts at konane”.<Cite r="Brigham08" page={378} /></p>
      <p>In current times, it is a popular game during the Makahiki (new year) festival.<Cite r="MolokaiDispatch"/></p>
    </Section>
    <Section title="Equipment">
      <Section title="The board">
        <p>The board (<span lang="haw">papakōnane</span> or <span lang="haw">papamū</span>) is a square or rectangular grid of pits (<span lang="haw">lua</span>). Traditionally, boards were carved out of wood and raised slightly off the ground for ease of play, or were made by scraping holes into a slab of volcanic rock. Games could also be played on the squares of a woven <span lang="haw">lauhala</span> mat.<Cite r="Emory24" page={85} /></p>
        <p>Stone boards<Footnote>
          Peter Faris’ ‘Rock Art Blog’ has <a href="https://rockartblog.blogspot.com/2013/01/hawaiian-rock-art-konane-game-boards.html">pictures of several stone boards</a>.
        </Footnote> can be found all over the islands of Hawaii, whereas traditional wooden boards are now hard to find, and are mostly restricted to museums.<Footnote>
          An image of a traditional carved board from <span className="proper-noun" lang="haw">Iolani</span> Palace can be seen in <a href="https://www.hawaiimagazine.com/content/see-iolani-palaces-hidden-relics-once-belonged-hawaiian-royalty">this Hawaiʻi Magazine article</a>.
          In November 2017, an antique wooden board with shell inlay <a href="https://www.christies.com/lotfinder/lot_details.aspx?intObjectID=6105340&amp;lid=1">sold at auction</a> for €150 000.
        </Footnote>  Wooden boards sometimes had a human molar inset in the central hole (<span lang="haw">piko</span>, ‘navel’), or in some cases in all the holes of the board.<Cite r="PeterBuck"/></p>
        <p>Historical board sizes vary greatly, and there is no standard size. King’s account implies a board of 14×17 squares, while Campbell’s account implies a 6×6 board. An archæological survey on the island of Lanai<Cite r="Emory24" page={84} /> found 14 boards, with sizes ranging from 8×8 to 13×20.<Footnote>
          The complete list of sizes found by Emory’s team was: 8×8, 8×11, 8×13, 9×10 (2 boards), 9×13 (2), 10×10, 11×11, 11×13, 13×13, 13×15, 13×20, and 15×15.
        </Footnote> Peter Buck shows two 12×15 boards<Footnote>
          One of the boards shown by Peter Buck is also shown by Culin.<Cite r="CulinHawaiian"/>
        </Footnote> from the Bishop Museum.<Cite r="PeterBuck"/></p>
        <p>Peter Buck also describes another board in the Bishop Museum which has 10 rows that alternate in length between 6 &amp; 7 holes.<Cite r="PeterBuck"/> This seems to be the same board described by Emory, where the pits are set quincuncially.<Cite r="Emory24" page={84} /> This is probably not a board for playing <span lang="haw">kōnane</span>, but for playing a game similar to <span lang="es">damas</span> (‘Spanish draughts’), which is known in Hawaii as <span lang="haw">mū</span>. However, it could also be used to play <span lang="haw">kōnane</span> by playing the game on the diagonal.</p>
        <ArticleImage
          size="wide"
          src={img_3365}
          alt="A photograph of a kōnane board set up for play on a beach, with two chairs carved from tree trunks."
          source={{
            author: { given: "Deb", family: "Nystrom" },
            copyrightYear: 2017,
            license: 'cc-by',
            licenseVersion: '2.0',
            originalUrl: "https://www.flickr.com/photos/stella12/33654775226/"
          }}>
          A <span lang="haw">kōnane</span> board at Alahaka Bay.
    </ArticleImage>
      </Section>
      <Section title="The pieces">
        <p>The game is played with black &amp; white pebbles (<span lang="haw">ʻiliʻili</span>); often the black pieces (<span lang="haw">ʻiliʻili ʻeloʻelo</span>) were basalt and the white pieces (<span lang="haw">ʻiliʻili keʻokeʻo</span> or <span lang="haw">kea</span>) made of branch coral.<Cite r="Ellis17" page={159} /> One <span lang="haw">wahi pana</span> (celebrated location) for stones was Kōloa,<Footnote>
          <Noun lang="haw">Kōloa</Noun> was also famous for its reproducing stones (<span lang="haw">ʻiliʻili hānau</span>). For more about these, see <Cite r="ClarkBeaches" inline /> or <Cite r="MajesticKau" inline/>.
        </Footnote> a beach situated between Nīnole and Punaluʻu in Kaʻū on Hawaiʻi.<Cite r="Ellis17" page={258} /> Unfortunately most of this beach has been stripped of its stones for commercial purposes.<Cite r="ClarkBeaches" page={62} /> </p>
      </Section>
      <Section title="Acquiring a set">
        <p>Commercially produced boards are readily available in Hawaii or online. They are often wooden, with black &amp; white glass pieces. You could also play the game on a beach, using rocks &amp; shells.</p>
      </Section>
    </Section>
    <Section title="Play">
      <p>The board is set up by filling it with black and white pieces in a checkerboard pattern.</p>
      <ArticleImage
        src={img_2441}
        alt="A kōnane board set up for play with pieces in a checkerboard pattern."
        source={{
          copyrightYear: 2016,
          author: { given: "Kris", family: "Arnold" },
          license: "cc-by",
          licenseVersion: "2.0",
          originalUrl: "https://www.flickr.com/photos/43675529@N00/24417651849"
        }}>
        A <span lang="haw">kōnane</span> board ready to play.
</ArticleImage>
      <p>To begin, the first player removes a piece from the centre of the board (or one of the squares adjacent to that, on an even-sized board), or from any corner. The second player removes a piece adjacent to the first, and play commences with each player moving the pieces of the colour that they removed.</p>
      <p>On their turn, a player must move a single piece by jumping it over an orthogonally-adjacent enemy piece into an empty hole, thereby capturing the enemy piece and removing it from the board. A piece may also make multiple captures in the same direction by jumping multiple times – this is called <span lang="haw">kāholo</span>, ‘to move quickly’.</p>
      <p>The first player that cannot move any piece on their turn loses; draws are not possible.</p>
      <ArticleImage
        src={img_Z009}
        alt="TODO"
        source={{
          copyrightYear: 2008,
          organization: { orgName: "The Strong National Museum of Play" },
          originalUrl: "https://web.archive.org/web/20150912083503/http://www.museumofplay.org/online-collections/3/48/112.7273",
          license: 'cc-by-nc-nd',
          licenseVersion: '4.0',
        }}>
        A commercial version of <span lang="haw">kōnane</span>. The board can be seen on the top of the box.
</ArticleImage>
    </Section>
    <Section title="Analysis">
      <p>Michael Ernst has performed game-theoretic analysis of various board positions.<Cite r="Ernst95"/></p>
    </Section>
    <Section title="See also">
      <p><GameRef id="take-it-away" /> and <GameRef id="leap-frog" /> play similarly but have different winning conditions.</p>
      {/* <!-- https://totakeresponsibility.blogspot.com/search/label/Konane --> */}
    </Section>
  </>);
}

export default Konane;
