import * as React from 'react';

import Table from 'react-bootstrap/Table';

import { Noun, ArticleImage, Section, Cite, Footnote } from 'ui';

import imgGunjinShogi from './gunjin_shogi.jpg';
import imgGunjinShogiBox1 from './gunjin_shogi_box_1.jpg';
import imgGunjinShogiBox2 from './gunjin_shogi_box_2.jpg';

const Kakkuri: React.FC = () => {
  return (<>
    <p><Noun lang="ja-Latn">Gunjin Shogi</Noun> (<span lang="ja">軍人将棋</span> ‘soldier chess’) is a Japanese game of hidden ranked combat, like the game Stratego. However, unlike Stratego, the game is usually played with a third person acting as referee, so that the identity of pieces does not need to be revealed at any stage.</p>
    <Section title="Pieces and Powers">
      <p>There exist many different versions of <Noun lang="ja-Latn">Gunjin Shogi</Noun>, with between 15 and 35 pieces, and with different ranks or powers given to the pieces. I present two versions that I have access to here.</p>
      <Section title="15-piece version">
        <ArticleImage
          size="small"
          alt="A board game box with an image of a soldier riding a white horse and carrying the flag of the Japanese army. On the side of the image are depicted two aeroplanes and a mushroom cloud."
          src={imgGunjinShogiBox1}>
          The box for <span lang="ja">新行軍将棋</span>. This was probably produced some time between 1945–55.<Cite r="HironoriGunjin" />
        </ArticleImage>
        <p>This version was sold as <span lang="ja">新行軍将棋</span> (<span lang="ja-Latn">shinkōgunshōgi</span> ‘new marching chess’). There are fourteen pieces: the first eleven are soldiers ranking from <span lang="ja">元帥</span><Footnote>In the game this is mistakenly spelled “<span lang="ja">元師</span>” both on the piece and in the rules.</Footnote> ‘marshal’ down to <span lang="ja">少尉</span> ‘second lieutenant’; the rest are special pieces <a href="https://en.wikipedia.org/wiki/Military_police"><span lang="ja">ＭＰ</span></a>, <span lang="ja">ヒコーキ</span> ‘aeroplane’, <span lang="ja">原子爆弾</span> ‘atomic bomb’, and <span lang="ja">スパイ</span> ‘spy’.</p>
        <p>The ordinary soldier pieces capture by rank: each can capture any other soldier piece ranked lower than itself. In general, if two pieces of the same rank meet, both are removed from the board. My interpretation of the ranking of each piece is as follows:</p>
        <ArticleImage src={imgGunjinShogi} alt="TODO" position="aside" size="wide">
          The board for the 14-piece version, printed on thin paper.
        </ArticleImage>
        {/*TODO: this table is a best-guess at the moment */}
      <Table variant="sm" lang="ja" style={{clear:"none"}}>
        <thead>
          <tr>
            <th></th>
            <th><span className="vertical-rl">元帥</span></th>
            <th><span className="vertical-rl">大将</span></th>
            <th><span className="vertical-rl">中将</span></th>
            <th><span className="vertical-rl">少将</span></th>
            <th><span className="vertical-rl">代将</span></th>
            <th><span className="vertical-rl">大佐</span></th>
            <th><span className="vertical-rl">中佐</span></th>
            <th><span className="vertical-rl">少佐</span></th>
            <th><span className="vertical-rl">大尉</span></th>
            <th><span className="vertical-rl">中尉</span></th>
            <th><span className="vertical-rl">少尉</span></th>
            <th><span className="vertical-rl">ＭＰ</span></th>
            <th><span className="vertical-rl">ヒコーキ</span></th>
            <th><span className="vertical-rl">原子爆弾</span></th>
            <th><span className="vertical-rl">スパイ</span></th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <th scope="row" className="text-right">元帥</th>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
          </tr><tr>
            <th scope="row" className="text-right">大将</th>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">中将</th>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">少将</th>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">代将</th>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">大佐</th>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">中佐</th>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">少佐</th>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">大尉</th>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">中尉</th>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">少尉</th>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">ＭＰ</th>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">ヒコーキ</th>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">原子爆弾</th>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
            <td>○</td>
          </tr><tr>
            <th scope="row" className="text-right">スパイ</th>
            <td>○</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>×</td>
            <td>△</td>
          </tr>
        </tbody>
      </Table>
      </Section>
      <Section title="31-piece version">
        <ArticleImage
          size="small"
          alt="A board game box with an image of a soldier riding a white horse and carrying the flag of the Japanese army. On the side of the image are depicted two aeroplanes and a tank."
          src={imgGunjinShogiBox2}>
          The box for <span lang="ja">大型行軍将棋</span>.
        </ArticleImage>
        <p>This version was sold as <span lang="ja">大型行軍将棋</span> (<span lang="ja-Latn">ōgatakōgunshōgi</span> ‘large marching chess’).</p>
      </Section>
    </Section>
  </>);
}

export default Kakkuri;
