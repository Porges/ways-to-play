import * as React from 'react';

import { Link } from 'react-router-dom';
import { GameRef } from 'content/games/Game';
import { Pronounce } from 'ui';

import pronPai from './pronunciation_zh_牌.mp3';
import pronBie from './pronunciation_km_បៀ.mp3';
import pronPaiThai from './pronunciation_th_ไพ.mp3';

const Introduction: React.FC = () => 
  <section>
    <p>As the probable country of origin of playing cards, China has a long history of card-playing and many different varieties.</p>
    <p>The pan-Chinese word for playing cards, <span lang="zh">牌</span> (Standard Chinese: <Pronounce lang="zh-Latn" word="pái" pronouncer="LofZRules" file={pronPai} />), does not distinguish between different forms of card-like games and equally applies to paper or cardboard cards, bamboo sticks, or bone, ivory, or plastic Mahjong tiles. In many adjacent countries the term has been adopted to into the local language:</p>
    <ul>
      <li>Burmese: <span lang="my">ဖဲ</span> (<span lang="my-Latn">hpai</span>)</li>
      <li>Khmer: <span lang="km">បៀ</span> (<Pronounce lang="km-Latn" word="bie" file={pronBie} pronouncer="chetanachey" />)</li>
      <li>Thai: <span lang="th">ไพ่</span> (<Pronounce lang="th-Latn" word="pâi" file={pronPaiThai} pronouncer="Ghee" />)</li>
    </ul>
    <p>The many types of Chinese and Chinese-derived cards can be broken down into several broad categories:</p>
    <ul>
      <li>those derived from <GameRef id="xianqi" /> (Chinese chess):
        <ul>
          <li>Four-Colour Cards</li>
          <li>
            Two-Suited chess cards, including:
            <ul>
              <li>Chrysanthemum cards (Vietnam)</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>those derived from dice (dominoes):
        <ul>
          <li>15 Point Cards</li>
        </ul>
      </li>
      <li>those derived from paper money:
        <ul>
          <li>Four-Suited money cards
          </li>
          <li>
            Three-Suited money cards, also including:
            <ul>
              <li><Link to="/articles/cards/ceki/">Ceki cards</Link> (Indonesia & Malaysia)</li>
              <li>Mahjong</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>those that are numbered:
        <ul>
          <li>3–5–7 cards</li>
          <li>Big Two cards</li>
        </ul>
      </li>
      <li>those named with Chinese characters:
        <ul>
          <li>Zhi Pai</li>
        </ul>
      </li>
    </ul>
  </section>;

export default Introduction;
