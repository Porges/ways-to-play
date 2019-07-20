import * as React from 'react';

import { GameProps } from '../Game';
import { ArticleImage, Footnote, Noun } from '../../../ui';

import imgKliptown from "./8237668945_878d81116c_o.jpg";

const Morabaraba: React.FC<GameProps> = ({cite}) => (
    <>
        <p><Noun lang="st">Morabaraba</Noun> is a <a href="/families/mill-games.html">mill game</a> from south-eastern Africa. The gameplay of the standardized version is very similar to <a href="/games/twelve-mens-morris.html" className="game-title">Twelve Men’s Morris</a> (with a few minor differences), but the version played in Lesotho has a unique board.</p>
        <ArticleImage
            src={imgKliptown}
            alt="A well-used morabaraba board with two different types of bottle caps for pieces."
            source={{
                copyrightYear: 2012,
                originalUrl: "https://www.flickr.com/photos/nagarjun/8237668945",
                author: {given:"Nagarjun", family:"Kandukuru"},
                license: "cc-by-nc-nd",
                licenseVersion: "2.0"}}>
            A Sotho-style morabaraba board in Kliptown, Soweto
        </ArticleImage>
        <p><Noun lang="st">Morabaraba</Noun> is played as a competitive sport in South Africa, administered by <a href="http://mindsportsa.co.za/">Mind Sports South Africa</a>. It is widely played throughout the country; a poll conducted by <cite>The Sowetan</cite> in 1996 indicated that 40% of South Africans played the game.{cite("MorabarabaGetOnBoard")}</p>
        <Footnote>
            <p><span className="footnote-marker">*</span> Sometimes also referred to as Cazalis, upon his return to France he wrote about his experiences in <cite lang="fr">Les Bassoutos: Vingt-Trois Années de Séjour et D’Observations au Sud de L’Afrique</cite> (Paris, 1859) (later published in English as <cite>The Basutos: or Twenty-Three Years in South Africa</cite> (London: Nisbet, 1861)), but the book contains no mention of any board games. There is now <a href="https://goo.gl/maps/jymZMMft3fB2">a roundabout</a> in his home town, <Noun lang="fr">Orthez</Noun>, <a href="http://www.larepubliquedespyrenees.fr/2013/02/16/un-nom-pour-les-ronds-points-la-gare-routiere-et-la-rocade,1118172.php">named after him</a>.</p>

            <p>Surprisingly, we know precisely who imported the game from Europe:{cite("MkeleMorabaraba", 134)}{cite("FromBearnToSouthernAfrica", 79)} it was introduced to Lesotho—then called Basutoland—some time between 1832 and 1855 by Eugène Casalis, a French protestant missionary.<span className="footnote-marker">*</span>  The introduction of the game had unintended consequences for the mission: young men preferred to play the game rather than attend mass.{cite("FromBearnToSouthernAfrica", 79)} Obsession with the game also led herders to neglect their flocks,{cite("FromBearnToSouthernAfrica", 79)} so it became known by the epithet <span lang="st">sethetsabadisana</span> ‘deceiver of the herd-boys’:‌{cite("BasothoChildren", 41)} “for when you play it, old or young, you forget your herds, and they wander into the corn…”‌{cite( "TheWorldAndCattle", 56)}</p>
        </Footnote>
        <p>The name <span lang="st">morabaraba</span> comes from the Sotho language, and is related to the verb <span lang="st">ho raba raba</span> ‘to roam/fly about in small circles’, as of a bird around its nest.‌{cite("SeSothoDictionary", 304)} In Nguni languages (isiZulu, isiXhosa), it is known as <Noun lang="zu">(Um)labalaba</Noun>, with similar meaning,‌{cite("GamesBasotho", [247, 250])} and in Ronga, spoken in Mozambique, it is called <Noun lang="rng">Muravarava</Noun>.</p>
        <p>There are other names which are probably derived from the European name of ‘mill’:‌{cite("MkeleMorabaraba", 134)} an alternate Sotho name is <span lang="st">mmila</span>/<span lang="st">’mila</span>, ‘road’.‌{cite("UsingGamesToPromote", 283)} In Botswana, the game is called <span lang="tn">mhele</span> (‘reedbuck’, a type of antelope‌{cite("OldTswana", 350)}), and the name <span lang="tn">morabaraba</span> refers solely to a mancala game.</p>
        <p>A distinctive feature of this game is its bovine theme: in each language, the pieces are called ‘cows’. In Sotho this is <span lang="st">dikgomo</span>/<span lang="st">likhomo</span> (singular <span lang="st">kgomo</span>/<span lang="st">khomo</span>);‌{cite("UseOfMorabara", 588)} in isiZulu it is <span lang="zu">izinkomo</span> (singular <span lang="zu">inkomo</span>). Forming a mill (‘gun’) allows you to “shoot” an opponent’s cow.</p>
        <section id="play">
            <h2>Play</h2>
            <p>The following description is based on Mind Sports South Africa’s “Generally Accepted Rules”. As with all traditional board games, local rules can vary.</p>
            <Footnote>
                <p><span className="footnote-marker">†</span> This is so common that even <a href="https://www.instagram.com/p/BMBbRAzBg1z/">commercial sets use bottle caps</a>, and it shows up in <a href="https://www.instagram.com/p/Bf-isgxnIPF/">computerized versions</a> as a skeuomorphic feature.</p>

                <p>Each player has 12 pieces. Commonly, plastic or metal bottle caps are used in two contrasting colours.<span className="footnote-marker">†</span> </p>
            </Footnote>
            <ArticleImage
                position="right"
                src="/images/large_merels_with_diagonals.svg"
                alt="">
                Standard <span className="game-title" lang="st">Morabaraba</span> is played on the large mill board with diagonals.
            </ArticleImage>
            <p>During the placement phase, players must place a single piece on any vacant point of the board. Once all their pieces are placed, players can move a single piece to another vacant point, along one of the lines.</p>
            <p>If a player places or moves a piece to form a new mill, they remove one of the opponent’s pieces. The removed piece may not be from a mill unless there are no other pieces that can be removed.</p>
            <p>During the placement phase it is possible to form two mills at once. In <span className="game-title" lang="st">Morabaraba</span> this only allows a player to remove one piece.</p>
            <p>When a player is reduced to three pieces, their pieces can ‘fly’ and move to any vacant point on the board, ignoring the lines.</p>
            <p>A player loses the game when they are reduced to fewer than three pieces, or if they are unable to make a valid move on their turn.</p>
            <p>In tournament play, Mind Sports adopted an additional rule: During the movement phase, a piece that is moved from one mill to form another mill may not move back to form a mill again at the original point on the next turn. Instead, a different move must be taken before doing so. This rule prevents a player from moving backwards and forwards between two mills quickly. This rule seems to me to be unlikely to be used in casual play.</p>
        </section>
        <section id="variants">
            <h2>Variants</h2>
            <section id="sotho-version">
                <h3>Sotho version</h3>
                <ArticleImage
                    position="right"
                    src="/images/large_merels_with_diagonals_and_centre.svg"
                    alt="">
                    The Sotho version of the game is played on a board with a central cross.
                </ArticleImage>
                <p>The Sotho version of the game is played on a special board or flat stone (<span lang="st">letlapa</span>){cite("BasothoChildren", 35)} where the centre square is also crossed, and the inner diagonals are missing, giving 25 points that can be played on.‌{cite("IndigenousGamesRuleBook")}{cite("MkeleMorabaraba", 133)} This means that there is no possibility of a deadlock after the placement phase.</p>
                <p>Some rulesets{cite("BlacUmlabalaba")} state that a piece on the central point can only be the middle piece of a mill. Other lines of three formed with the central point do not count as mills.</p>
                <p>Note that it is not possible to form a diagonal mill on this board.</p>
                <ArticleImage
                    position="wide"
                    src="https://www.instagram.com/p/_glPKmNkd5/media?size=l"
                    alt="" 
                    source={{
                        copyrightYear: 2015,
                        originalUrl: "https://www.instagram.com/p/_glPKmNkd5/",
                        author: "lebophoo",
                        license: "instagram"}}>
                    A Sotho-style <span className="game-title" lang="st">Morabaraba</span> board (more examples of this board can be seen on Instagram: <a href="https://www.instagram.com/p/BD-gorsFbjf/">1</a>, <a href="https://www.instagram.com/p/_glPKmNkd5/">2</a>, <a href="https://www.instagram.com/p/-voBcjAFc9/">3</a>, <a href="https://www.instagram.com/p/yPNmJpPNzW/">4</a>)<br/>
                </ArticleImage>
            </section>
            <section id="alternate-board">
                <h3>Alternate board</h3>
                <ArticleImage
                    position="small"
                    src="/images/large_merels_with_full_diagonals.svg"
                    alt="">
                    An alternate <span className="game-title" lang="st">Morabaraba</span> board.
                </ArticleImage>
                <p>Another board pattern is also used to play <span className="game-title" lang="st">Morabaraba</span>, with a diagonally crossed central square. I do not know if the rules vary in any way.</p>
                <ArticleImage
                    position="wide"
                    src="https://www.instagram.com/p/BQ-F9JHhjXa/media?size=l"
                    alt=""
                    source={{
                        copyrightYear: 2017,
                        originalUrl: "https://www.instagram.com/p/BQ-F9JHhjXa/",
                        author: "mosqkenpachi_photography",
                        license: "instagram"}}>
                    An unknown <span className="game-title" lang="st">Morabaraba</span> board (at left), in Mahwelereng, Limpopo, South Africa (more examples can be seen on Instagram: <a href="https://www.instagram.com/p/-lij8bskZZ/">1</a>, <a href="https://www.instagram.com/p/Xh1mSsnw0H/">2</a>, <a href="https://www.instagram.com/p/BQ-F9JHhjXa/">3</a>)
                </ArticleImage>
            </section>
        </section>
    </>
);


export default Morabaraba;