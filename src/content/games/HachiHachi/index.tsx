import * as React from 'react';

import { ArticleContentProps, Noun } from 'ui';

import { } from 'References/bibliography.json';

const HachiHachi: React.FC<ArticleContentProps> = ({cite, pronounce}) => {
    return (<>
    <p><Noun lang="ja-Latn">Hachi-Hachi</Noun> (<span lang="ja">八八</span>, ‘88’) is the preëminent <Noun lang="ja-Latn">Hanafuda</Noun> gambling game. In many old English sources it is considered synonymous with ‘<Noun lang="ja-Latn">hanafuda</Noun>’ or ‘<Noun lang="ja-Latn">hana-awase</Noun>’ and isn’t called by a more-specific name.</p>
    <p>Despite being the most important <Noun lang="ja-Latn">Hanafuda</Noun> gambling game, it is also the most complex. There are two sets of <span lang="ja-Latn">yaku</span>, unusual point-tracking rules, and also specialized equipment that was commonly used with the game.</p>
    <p>The name derives from the objective of the game; the standard version of the game is for three players, and there are 264 total points available, so the goal for each player is to obtain at least 264 ÷ 3 = <strong>88</strong> points.</p>
</>);
}

export default HachiHachi;