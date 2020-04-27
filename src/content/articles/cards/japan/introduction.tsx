import * as React from 'react';

import { Noun } from 'ui';
import { Link } from 'react-router-dom';

const Introduction: React.FC = () => 
<section>
    <p>Japanese card games:</p>
    <ul>
        <li>
            Cards derived from Portuguese patterns:
            <ul>
                <li><Noun lang="ja-Latn">Tenshō Karuta</Noun> (<span lang="ja">天正カルタ</span>, ‘<Noun lang="ja-Latn">Tenshō</Noun> cards’)</li>
                <li><Noun lang="ja-Latn">Unsun Karuta</Noun> (<span lang="ja">うんすんカルタ</span>, ‘<Noun lang="ja-Latn">Un-Sun</Noun> cards’)</li>
                <li><Noun lang="ja-Latn">Sunkun Karuta</Noun> (<span lang="ja">すんくんカルタ</span>, ‘<Noun lang="ja-Latn">Sun-Kun</Noun> cards’)</li>
                <li><Noun lang="ja-Latn">Mekuri Karuta</Noun> (<span lang="ja">捲りカルタ</span>, ‘<Noun lang="ja-Latn">Mekuri</Noun> cards’)</li>
            </ul>
        </li>
        <li>
            Matching cards:
            <ul>
                <li><Noun lang="ja-Latn">Uta-garuta</Noun> (<span lang="ja">歌ガルタ</span>, ‘poetry cards’)</li>
                <li><Noun lang="ja-Latn">Iroha-garuta</Noun> (<span lang="ja">伊呂波ガルタ</span>, ‘alphabetical cards’</li>
            </ul>
        </li>
        <li><Link to="/articles/japan/hanafuda"><Noun lang="ja-Latn">Hanafuda</Noun></Link> (<span lang="ja">花札</span>, ‘flower cards’)</li>
    </ul>
</section>;

export default Introduction;