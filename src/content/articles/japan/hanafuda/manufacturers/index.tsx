import * as React from 'react';

import { ArticleContentProps, ArticleImage, Noun } from 'ui';
import { ModernJapaneseWrappers, SalterJapanese } from 'References/bibliography.json';

import imgMarks from '../manufacturer-marks.jpg';

const Manufacturers: React.FC<ArticleContentProps> = ({cite}) => {
    return (
        <section id="manufacturers">
        <h3>Brands</h3>
        <p>The branding system of traditional <Noun lang="ja-Latn">hanafuda</Noun> manufacturers can be confusing. Generally the brand (indicated by the artwork on the box) indicates the quality of the cards, and the <em>type</em> of cards is written on the side. So a box of Nintendo cards with Napoleon on the front indicates their highest-quality card, but can contain either <Noun lang="ja-Latn">hanafuda</Noun> or <Noun lang="ja-Latn">kabufuda</Noun> cards.</p>
        <p>Within the deck, the manufacturer’s mark is nowadays always on one of the Paulownia junk cards, but on older decks it is often on the Peony, or another card entirely.</p>
        <ArticleImage
            position="small"
            src={imgMarks}
            alt="TODO">
            Manufacturer’s marks from <Noun lang="ja-Latn">Nintendo</Noun>, Angel, and <Noun lang="ja-Latn">Maruē</Noun>.
        </ArticleImage>
        <h2>Established Manufacturers</h2>
        <p>All current Japanese manufacturers that I know of are based in <Noun lang="ja-Latn">Kyōto</Noun> prefecture.</p>
        <h3><Noun lang="ja-Latn">Nintendō</Noun></h3>
        <p>Based in <Noun lang="jp-Latn">Kyōto</Noun>, Nintendo is the most prominent company producing <Noun lang="jp-Latn">hanafuda</Noun> cards today. They still produce both <Noun lang="ja-Latn">hanafuda</Noun> and <Noun lang="ja-Latn">kabufuda</Noun>, with brands <span lang="ja-Latn">Daitōryō</span> <span lang="ja">大統領</span> ‘president’ (featuring a picture of Napoleon); <span lang="ja-Latn">Marufuku Tengu</span> <span lang="ja">丸福天狗</span> (<Noun lang="ja-Latn">Marufuku</Noun> was the original name of <Noun lang="ja-Latn">Nintendo</Noun>); and <span lang="ja-Latn">Miyako no Hana</span> <span lang="ja">都の花</span> ‘flowers of the city’.</p>
        <h3><a href="https://www.tengudo.jp/" className="proper-noun" lang="ja-Latn">Ōishi Tengudō</a> (<span lang="ja">大石天狗堂</span>)</h3>
        <p>Also based in <Noun lang="ja-Latn">Kyōto</Noun>, <Noun lang="ja-Latn">Ōishi Tengudō</Noun> produces a wide variety of traditional Japanese card games.</p>
        <h3><a href="http://www.angelplayingcards.com/product/hana.php">Angel</a> (<span lang="ja">エンゼル</span> <span lang="ja-Latn">enzeru</span>)</h3>
        <p>Originally based in Yōkaichi, Shiga Ken, now based in Kyōto. They currently produce <Noun lang="ja-Latn">hanafuda</Noun> and <Noun lang="ja-Latn">kabufuda</Noun> in two brands: <span lang="ja">千鳥</span> (<span lang="ja-Latn">chidori</span> ‘numerous birds’) and <span lang="ja">元禄</span> (<span lang="ja-Latn">genroku</span>, an era name).</p>
        <p>Angel also produces cardboard novelty <Noun lang="ja-Latn">hanafuda</Noun> for brands like Disney and Hello Kitty, and both <Noun lang="ja-Latn">Hyakunin Isshu</Noun> and <Noun lang="ja-Latn">Iroha Karuta</Noun>.</p>
        <h3><a href="http://www.shogundo.co.jp/" className="proper-noun" lang="ja-Latn">Tamura Shōgundō</a> (<span lang="ja">田村將軍堂</span>)</h3>
        <p>A small manufacturer, founded in 1921. They produce <Noun lang="ja-Latn">Hyakunin Isshu</Noun>, <Noun lang="ja-Latn">Manyo Karuta</Noun>, and <Noun lang="ja-Latn">Hanafuda</Noun>.</p>
        <h2>New Brands</h2>
        <p>Here are some internet-era brands that are produced on a small scale (they aren’t manufacturers themselves):</p>
        <h3><a href="https://blankproject.kr/">Blank Project</a></h3>
        <p>Blank Project have created several Hwatu decks with custom art: Pebble, Pebble (Film Edition), and Golden Toad. They have also created custom promotional decks for Jeju beer.</p>
        <h3><a href="http://www.hanafudahawaii.com/">Hanafuda Hawaii</a></h3>
        <p>Produces two different decks: Hanafuda Hawai‘i Style, and Hanafuda Nā Pua Hawai‘i.</p>
        <h3><a href="http://www.indianwolfstudios.com/hanami.html">Indianwolf Studios</a></h3>
        <p>Produces Hanami Hanafuda and Sensu Hanafuda.</p>
        <h3><a href="https://www.instagram.com/jamaistore/"><span lang="ko">자매상점</span> (jamaistore)</a></h3>
        <p>Produces ridiculously-cute cat &amp; dog themed <span lang="ko-Latn">hwatu</span> decks.</p>
        <h3>Nishiki Fuda</h3>
        <p>Produces the only 3-way Western/<Noun lang="ja-Latn">Hanafuda</Noun>/<Noun lang="ja-Latn">Kabufuda</Noun> deck that I know of.</p>
        <p>by Hanako: https://profile.ameba.jp/ameba/estudio-artes</p>
        <h3><a href="http://www.hatoo.net/"><span lang="ko">용쟁화투</span> (<Noun lang="ko-Latn">Yongjaeng Hwatoo</Noun>)</a></h3>
        <p>Style</p>
        <h2>Past Manufacturers</h2>
        <p>These are manufacturers that do not exist any more. The information here is mostly taken from {cite(ModernJapaneseWrappers, undefined, {inline: true})}. Matsui Tengudō appears to have been the last manufacturer making cards by hand.{cite(SalterJapanese)}</p>
        <ul>
        <li>Ace (<span lang="ja">エース</span> <span lang="ja-Latn">ēsu</span>), Kyōto. Brands include <span lang="ja">大公爵</span> ‘grand duke’.</li>
        <li>Dai Nippon, Yōkaichi, Shiga Ken</li>
        <li>Heibon (<span lang="ja">平凡</span>), Tōkyō {/*<!--
        https://www.ebay.com/itm/Heibon-Playing-Cards-Vintage-New-Old-Stock-Hanafuda-Kintoki-Zakura-Red-/271168560044
        -->*/}</li>
        <li>Iwata (cards made by Tamura Shōgun)</li>
        <li>Kawakita (cards made by Yamashiro)</li>
        <li>Kohara, Ōsaka</li>
        <li>Kyōto Karuta, Kyōto</li>
        <li><Noun lang="ja-Latn">Maruē</Noun> (<span lang="ja">マルエー</span>), Minoshi, Gifu Ken</li>
        <li>Matsui Tengudō, Kyōto</li>
        <li>Nihon Karuta Seizō, Kyōto</li>
        <li><a href="http://www.nichiyu.net/en" className="proper-noun" lang="ja-Latn">Nippon Yūgi Gangu</a> (<span lang="ja">日本遊戯玩具</span>), Tōkyō (1946). No longer appears to produce <Noun lang="ja-Latn">hanafuda</Noun> cards, specializes in tarot.</li>
        <li>Nishimura, Tōkyō</li>
        <li>Tanaka Gyokusuidō</li>
        <li>Universal, Ōsaka</li>
        <li>Yamashiro</li>
        </ul>
        </section>
    );
};

export default Manufacturers;