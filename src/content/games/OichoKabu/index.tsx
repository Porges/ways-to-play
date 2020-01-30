import * as React from 'react';
import Table from 'react-bootstrap/Table';

import { ArticleContentProps, Noun, Cards, Footnote } from 'ui';

import { CardGamesAroundTheWorld, NoteOnAMissingLink, CardGamesAmongAborigines } from 'References/bibliography.json';

const OichoKabu: React.FC<ArticleContentProps> = ({cite, pronounce}) => {
    return (<>
  <p><Noun lang="ja-Latn">Oicho-Kabu</Noun> (<span lang="ja">おいちょかぶ</span> ‘eight nine’) is a Japanese gambling game in the style of Baccarat.</p>
  <Footnote>
    There are also <span lang="ja-Latn">hanafuda</span> decks with only 10 months, called <span lang="ja-Latn">mushifuda</span>.
  </Footnote>
  <p>It is played with special cards called <span lang="ja-Latn">kabufuda</span> (<span lang="ja">株札</span>, ‘<span lang="ja-Latn">kabu</span> cards’). It can also be played with <span lang="ja-Latn">hanafuda</span> cards (by dropping two months), or with the <Cards>A–9</Cards> from a standard deck of playing cards.</p>
  <Footnote>
    A <Noun lang="ja-Latn">Nintendō</Noun> advertising poster from 19XX also indicates that their cards were being exported to Australia.
  </Footnote>
  <p>The game originated in Japan, but has surprisingly also been spotted in the northern parts of Australia amongst aboriginal communities; apparently having been transferred there by Japanese sailors working in the pearl industry.{cite(NoteOnAMissingLink)}{cite(CardGamesAmongAborigines)}</p>
  <h3>Terminology</h3>
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>Standard</th>
        <th>Gambling</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1 <span lang="ja">一</span></td>
        <td><span lang="ja-Latn">ichi</span></td>
        <td><span lang="ja-Latn">pin</span></td>
      </tr>
      <tr>
        <td>2 <span lang="ja">二</span></td>
        <td><span lang="ja-Latn">ni</span></td>
        <td><span lang="ja-Latn">nizou</span></td>
      </tr>
      <tr>
        <td>3 <span lang="ja">三</span></td>
        <td><span lang="ja-Latn">san</span></td>
        <td><span lang="ja-Latn">santa/sanzun</span></td>
      </tr>
      <tr>
        <td>4 <span lang="ja">四</span></td>
        <td><span lang="ja-Latn">shi/yon</span></td>
        <td><span lang="ja-Latn">yotsuya</span></td>
      </tr>
      <tr>
        <td>5 <span lang="ja">五</span></td>
        <td><span lang="ja-Latn">go</span></td>
        <td><span lang="ja-Latn">goke/gosu</span></td>
      </tr>
      <tr>
        <td>6 <span lang="ja">六</span></td>
        <td><span lang="ja-Latn">roku</span></td>
        <td><span lang="ja-Latn">roppou</span></td>
      </tr>
      <tr>
        <td>7 <span lang="ja">七</span></td>
        <td><span lang="ja-Latn">nana/shichi</span></td>
        <td><span lang="ja-Latn">naki/shichiken</span></td>
      </tr>
      <tr>
        <td>8 <span lang="ja">八</span></td>
        <td><span lang="ja-Latn">hachi</span></td>
        <td><span lang="ja-Latn">oicho</span></td>
      </tr>
      <tr>
        <td>9 <span lang="ja">九</span></td>
        <td><span lang="ja-Latn">kyū</span></td>
        <td><span lang="ja-Latn">kabu</span></td>
      </tr>
      <tr>
        <td>10 <span lang="ja">十</span></td>
        <td><span lang="ja-Latn">jū</span></td>
        <td><span lang="ja-Latn">buta</span> (i.e. ‘zero’)</td>
      </tr>
    </tbody>
  </Table>
  <section id="variants">
    <h2>Variants</h2>
    <section id="kabu">
      <h3>Kabu</h3>
      <p>This is a simplified variant by Sid Sackson.{cite(CardGamesAroundTheWorld, [12])}</p>
    </section>
  </section>
</>);
}

export default OichoKabu;