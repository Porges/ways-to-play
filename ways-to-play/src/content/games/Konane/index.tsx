import * as React from 'react';
import { GameProps, GameRef } from '../Game';
import { ArticleImage, Footnote, Noun } from '../../../ui';

import 
    { Stokes, KamehamehaAndHisWarrior, Ellis17, VoyageToPacific
    , Hackler86, Jackson92, LegendsOfHonolulu, AVoyageRoundTheWorld
    , Brigham08, Emory24, MolokaiDispatch, CulinHawaiian, PeterBuck
    , ClarkBeaches, MajesticKau, Ernst95 }
    from '../../../References/bibliography.json';

import imgKonane_960 from './konane_960.jpg';
import img61_611 from './61-511high.gif';
import img_3365 from './33654775226_96814ca128_o.jpg';
import img_2441 from './24417651849_e661252c66_o.jpg';
import img_Z009 from './Z0092008.jpg';

const Konane: React.FC<GameProps> = ({cite}) => {
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
<section id="history" className="level2">
<h2>History</h2>
<Footnote>
<p><span className="footnote-marker">*</span> John F. G. Stokes (1875–1960, an Australian archæologist on Hawaii) suggested—with only a sliver of linguistic evidence—that it could be a distant descendant of Go, which had been transmitted by the survivors of Japanese shipwrecks.{cite(Stokes)}</p>

<p><span lang="haw">Kōnane</span> stands alone as a purely-abstract game in Hawaiian culture.<span className="footnote-marker">*</span>  However, it definitely existed before European contact, as it was described by Captain Cook’s voyage, which was the first to reach the islands (see below).</p>
</Footnote>
<p>The game dates at least from the early 18th century, as it was played by Kahekili II (c. 1737–1794), who was high chief (<span lang="haw">aliʻi nui</span>) of Maui. Kahekili and his advisers possibly used the board, or at least the pieces, to plan battles:</p>
<blockquote>
<p>[T]here was no other king so genuinely accomplished in making war as King Kahekili of Maui and the actions on the battlefield plainly showed his knowledge of the checkers game of war. […] It was also said that at the house of Kahekili the heaps of little stones were maneuvered for battle strategy so that his generals need only fulfill their movements.{cite(KamehamehaAndHisWarrior, 41)}</p>
</blockquote>
<blockquote>
<p>Not only were [the old <span lang="haw">kāhuna</span> of this land] seers, but some of them used the <span lang="haw">papa kōnane hoʻoneʻe ʻiliʻili</span> [<span lang="haw">kōnane</span> stones] to guide them in understanding the movements on the battlefield.{cite(KamehamehaAndHisWarrior, 123)}</p>
</blockquote>
<p>The gods were also rumoured to enjoy <span lang="haw">kōnane</span>: the volcano goddess <Noun lang="haw">Pele</Noun> was said to play it at her home in <Noun lang="haw">Hale-maʻumaʻu</Noun> crater.{cite(Ellis17, 183)}</p>
<div className="asided">
<aside role="note">
<p><span className="footnote-marker">†</span> At the time of the entry quoted, Captain Cook himself had been killed. Upon returning to England, James King was the one who completed the official account of the voyage.</p>
</aside>
<p>The earliest written record we have of the game is from James King, who was an officer that sailed on board Captain Cook’s third voyage to the Pacific.<span className="footnote-marker">†</span>  In an entry dated March 1779, he wrote:</p>
</div>
<blockquote>
<p>It is very remarkable, that the people of theſe iſlands are great gamblers. They have a game very much like our draughts; but, if one may judge from the number of ſquares, it is much more intricate. The board is about two feet long, and it is divided into two hundred and thirty-eight ſquares, of which there are fourteen in a row, and they make uſe of black and white pebbles, which they move from ſquare to ſquare.{cite(VoyageToPacific, 144)}</p>
</blockquote>
<div className="asided">
<aside role="note">
<p><span className="footnote-marker">‡</span> Campbell arrived aboard the <em>Neva</em>, the first Russian ship to circumnavigate the world, on the 29th of January 1809, and left aboard the <em>Duke of Portland</em>, a whaler, on the 4th of March 1810. The <em>Duke of Portland</em> also carried a letter from King Kamehameha to King George III, see {cite(Hackler86)}. More information about the ships is available in {cite(Jackson92)}.</p>
</aside>
<p>Another early witness was Archibald Campbell, a Scottish sailor who visited Oʻahu from 1809–1810.<span className="footnote-marker">‡</span>  In his book, he described the game:</p>
</div>
<blockquote>
<p>They have a game somewhat resembling draughts, but more complicated. It is played upon a board about twenty-two inches by fourteen, painted black, with white spots, on which the men are placed; these consist of black and white pebbles, eighteen upon each side, and the game is won by the capture of the adversary’s pieces.</p>
<p>Tamaahmaah [King Kamehameha I, rumoured to be the son of Kahekili II] excels at this game. I have seen him sit for hours playing with his chiefs, giving an occasional smile, but without uttering a word. I could not play, but William Moxely [Campbell’s interpreter], who understood it well, told me that he had seen none who could beat the king.</p>
<p>The game of draughts is now introduced, and the natives play it uncommonly well.{cite(AVoyageRoundTheWorld, 145)}</p>
</blockquote>
<div className="asided">
<aside role="note">
<p><span className="footnote-marker">§</span> {cite(LegendsOfHonolulu)} indicates that the site was the “Spreckels Building”, which was on Fort Street between Merchant St and Queen St.</p>
<p><span className="footnote-marker">‖</span> Specifically, {cite(LegendsOfHonolulu)} states that they were near Kekūanāoʻa’s house, which was on the corner of King and Richards Streets.</p>
</aside>
<p>The area around where Kamehameha lived was called Kou, and was famous as being a location for playing <span lang="haw">kōnane</span>.{cite(LegendsOfHonolulu, 8)} A large stone <span lang="haw">kōnane</span> board was reported to be opposite the temple (marked “Hale o Lono” in the map below), in the current location of the Hawaii Community Foundation.<span className="footnote-marker">§</span>  Smaller boards were near what is now Iolani Palace.<span className="footnote-marker">‖</span> </p>
</div>
<ArticleImage
    position="wide"
    src={img61_611}
    alt="A map of Honolulu as it was in 1810.">
    A reconstruction of Honolulu as it was in 1810. Kamehameha lived in the large compound on the point at the bottom centre. Kou is the area around there, bordered by the yam field at the top. Archibald Campbell stayed for some time with Isaac Davis, who lived in the rightmost of the three houses on the left. (Map from the <a href="https://digicoll.manoa.hawaii.edu/savedmaps/Pages/viewtext.php?s=browse&amp;tid=61&amp;route=browseby.php&amp;by=newest">University of Hawaiʻi</a>.)
    </ArticleImage>
<p>The game continued to be popular throughout the 19th century; William Brigham (first director of Hawaii’s state museum) reported that King Kalākaua (1836–1891) and his wife Queen Kapiʻolani (1834–1899) were “experts at konane”.{cite(Brigham08, 378)}</p>
<p>In current times, it is a popular game during the Makahiki (new year) festival.{cite(MolokaiDispatch)}</p>
</section>
<section id="equipment" className="level2">
<h2>Equipment</h2>
<section id="the-board" className="level3">
<h3>The board</h3>
<p>The board (<span lang="haw">papakōnane</span> or <span lang="haw">papamū</span>) is a square or rectangular grid of pits (<span lang="haw">lua</span>). Traditionally, boards were carved out of wood and raised slightly off the ground for ease of play, or were made by scraping holes into a slab of volcanic rock. Games could also be played on the squares of a woven <span lang="haw">lauhala</span> mat.{cite(Emory24, 85)}</p>
<p>Stone boards can be found all over the islands of Hawaii. Peter Faris’ ‘Rock Art Blog’ has <a href="https://rockartblog.blogspot.com/2013/01/hawaiian-rock-art-konane-game-boards.html">pictures of several of these boards</a>.</p>
<p>Traditional wooden boards are now hard to find. An image of a traditional carved board from <span className="proper-noun" lang="haw">Iolani</span> Palace can be seen in <a href="https://www.hawaiimagazine.com/content/see-iolani-palaces-hidden-relics-once-belonged-hawaiian-royalty">this Hawaiʻi Magazine article</a>. Wooden boards sometimes had a human molar inset in the central hole (<span lang="haw">piko</span>, ‘navel’), or in some cases in all the holes of the board.{cite(PeterBuck)} In November 2017, an antique wooden board with shell inlay <a href="https://www.christies.com/lotfinder/lot_details.aspx?intObjectID=6105340&amp;lid=1">sold at auction</a> for €150 000.</p>
<div className="asided">
<aside role="note">
<p><span className="footnote-marker">¶</span> The complete list of sizes found was: 8×8, 8×11, 8×13, 9×10 (2 boards), 9×13 (2), 10×10, 11×11, 11×13, 13×13, 13×15, 13×20, and 15×15.</p>
<p><span className="footnote-marker">*</span> One of these is also shown by Culin.{cite(CulinHawaiian)}</p>
</aside>
<p>Historical board sizes vary greatly, and there is no standard size. King’s account implies a board of 14×17 squares, while Campbell’s account implies a 6×6 board. An archæological survey on the island of Lanai{cite(Emory24, 84)} found 14 boards, with sizes ranging from 8×8 to 13×20.<span className="footnote-marker">¶</span>  Peter Buck shows two 12×15 boards from the Bishop Museum.{cite(PeterBuck)}<span className="footnote-marker">*</span> </p>
</div>
<p>Peter Buck also describes another board in the Bishop Museum which has 10 rows that alternate in length between 6 &amp; 7 holes.{cite(PeterBuck)} This seems to be the same board described by Emory, where the pits are set quincuncially.{cite(Emory24, 84)} This is probably not a board for playing <span lang="haw">kōnane</span>, but for playing a game similar to <span lang="es">damas</span> (‘Spanish draughts’), which is known in Hawaii as <span lang="haw">mū</span>. However, it could also be used to play <span lang="haw">kōnane</span> by playing the game on the diagonal.</p>
<ArticleImage
    position="wide"
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
</section>
<section id="the-pieces" className="level3">
<h3>The pieces</h3>
<div className="asided">
<aside role="note">
<p><span className="footnote-marker">†</span> Kōloa was also famous for its reproducing stones (<span lang="haw">ʻiliʻili hānau</span>). For more about these, see {cite(ClarkBeaches)} or {cite(MajesticKau)}.</p>
</aside>
<p>The game is played with black &amp; white pebbles (<span lang="haw">ʻiliʻili</span>); often the black pieces (<span lang="haw">ʻiliʻili ʻeloʻelo</span>) were basalt and the white pieces (<span lang="haw">ʻiliʻili keʻokeʻo</span> or <span lang="haw">kea</span>) made of branch coral.{cite(Ellis17, 159)} One <span lang="haw">wahi pana</span> (celebrated location) for stones was Kōloa, a beach situated between Nīnole and Punaluʻu in Kaʻū on Hawaiʻi.{cite(Ellis17, 258)} Unfortunately most of this beach has been stripped of its stones for commercial purposes.{cite(ClarkBeaches, 62)}<span className="footnote-marker">†</span> </p>
</div>
</section>
<section id="acquiring-a-set" className="level3">
<h3>Acquiring a set</h3>
<p>Commercially produced boards are readily available in Hawaii or online. They are often wooden, with black &amp; white glass pieces. You could also play the game on a beach, using rocks &amp; shells.</p>
</section>
</section>
<section id="play" className="level2">
<h2>Play</h2>
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
        organization: {orgName: "The Strong National Museum of Play"},
        originalUrl: "https://web.archive.org/web/20150912083503/http://www.museumofplay.org/online-collections/3/48/112.7273",
        license: 'cc-by-nc-nd',
        licenseVersion: '4.0',
    }}>
    A commercial version of <span lang="haw">kōnane</span>. The board can be seen on the top of the box.
</ArticleImage>
</section>
<section id="analysis" className="level2">
<h2>Analysis</h2>
<p>Michael Ernst has performed game-theoretic analysis of various board positions.{cite(Ernst95)}</p>
</section>
<section id="see-also" className="level2">
<h2>See also</h2>
<p><GameRef id="take-it-away"/> and <GameRef id="leap-frog" /> play similarly but have different winning conditions.</p>
{/* <!-- https://totakeresponsibility.blogspot.com/search/label/Konane --> */}
</section>
</>);
}

export default Konane;