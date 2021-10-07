import * as React from 'react';

import { Noun } from 'ui';
import { Link } from 'react-router-dom';

const Introduction: React.FC = () => 
<section>
    <p>Japan developed many different kinds of cards, in isolation from most of the rest of the world. There are two main families of cards, and a third probably derived from both of these:</p>
    <ul>
        <li>
            Cards derived from Portuguese patterns, with suits and ranks. In order of appearance these are:
            <ul>
                <li><Noun lang="ja-Latn">Tenshō Karuta</Noun> (<span lang="ja">天正カルタ</span>, ‘<Noun lang="ja-Latn">Tenshō</Noun> cards’)</li>
                <li><Noun lang="ja-Latn">Unsun Karuta</Noun> (<span lang="ja">うんすんかるた</span>, ‘<Noun lang="ja-Latn">Un-Sun</Noun> cards’)</li>
                <li><Noun lang="ja-Latn">Sunkun Karuta</Noun> (<span lang="ja">すんくんかるた</span>, ‘<Noun lang="ja-Latn">Sun-Kun</Noun> cards’)</li>
                <li><Noun lang="ja-Latn">Mekuri Karuta</Noun> (<span lang="ja">捲りかるた</span>, ‘turning cards’) were an alteration of the <Noun lang="ja-Latn">Tenshō</Noun> pattern cards, probably to evade bans on those cards. The structure of the deck remains the same, but there are many different regional artwork patterns.</li>
                <li><Noun lang="ja-Latn">Kabu Karuta</Noun> (<span lang="ja">株かるた</span>) were a further simplification of <span lang="ja-Latn">mekuri</span> cards, eliminating all suits except for one, which is replicated four times. Like <span lang="ja-Latn">mekuri</span> cards, there are many regional varieties, but <span lang="ja-Latn">kabufuda</span> is the only one still in mass production.</li>
            </ul>
        </li>
        <li>
            Cards used for simpler matching games, not organized into suits or ranks:
            <ul>
                <li><Noun lang="ja-Latn">Uta-garuta</Noun> (<span lang="ja">歌かるた</span>, ‘poetry cards’)</li>
                <li><Noun lang="ja-Latn">Iroha-garuta</Noun> (<span lang="ja">いろはかるた</span>, ‘alphabet cards’)</li>
            </ul>
        </li>
        <li><Link to="/articles/cards/japan/hanafuda/"><Noun lang="ja-Latn">Hanafuda</Noun></Link> (<span lang="ja">花札</span>, ‘flower cards’) are derived from a combination of both the Portuguese and the matching-type cards.</li>
    </ul>
</section>;

export default Introduction;
