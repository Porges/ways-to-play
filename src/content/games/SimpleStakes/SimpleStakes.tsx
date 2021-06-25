import * as React from 'react';
import { Link } from 'react-router-dom';

import { Cite, Noun, Cards, Footnote, ArticleImage, Section, Description } from 'ui';
import { ChikiCards, TheBabas, GatewayToOldSchoolGames, GamblingGamesOfMalaya } from "References/bibliography.json";
import { Table } from 'react-bootstrap';

import imgHHH1 from './shutterstock_1350321158.jpg';
import imgHHH2 from './shutterstock_1350321164.jpg';

const Content: React.FC = () => <>
  <p>In this page I collect all simple staking games. These are games entirely of luck where players place bets (stakes) on a random outcome such as a dice roll.</p>
  <Section title="Crown & Anchor">
    <p>Crown & Anchor games involve simple bets on the outcome of rolling three six-sided dice, which usually have a collection of symbols on them instead of pips. Players place their stakes on a layout containing six symbols, and win if any of the dice show their chosen symbol, paying out 1× for each die that shows the symbol.</p>
    <p>Crown & Anchor itself seems to date from the late 19th or early 20th century. It was especially popular amongst British soldiers during World War I.</p>
    <p>In Chinese communities the game is called <span lang="nan-Latn">hû hê hāu</span> <span lang="nan">魚蝦鱟</span>,<Cite r={GamblingGamesOfMalaya} page={109} /> usually romanized as “Hoo Hey How”. In India it is Jhandi Munda (झंडी मुंडा) or Khora Khore (खोर खोरे), while in Nepal it is <span lang="ne-Latn">langur burja</span> (<span lang="ne">लंगूर or लङ्गुर बुर्जा</span>). Lago Lago in Bhutan?</p>
    <p>Symbols used are:</p>
    <dl>
      <dt>Crown & Anchor</dt>
      <dd>👑&#xfe0e; Crown, ⚓&#xfe0e; Anchor, <Cards>s</Cards> Spade, <Cards>c</Cards> Club, <Cards>d</Cards> Diamond, <Cards>h</Cards> Heart.</dd>
      <dt>Langur Burja (??) or Jhandi Munda (Munda flag?)</dt>
      <dd>Jhandi झंडी (flag), munda or burja or mukut मुकुट (crown), surath सुरथ (spade), chid चीड (‘pine’ = club), itta इँट (‘brick’ = diamond), pana पान (‘betel leaf’ = heart)</dd>
      <dt>Balinese</dt>
      <dd>Basir, Robin, Rare (baby), Ikan Barong (fish Barong), Kepiting (crab), Ayam (chicken)<br/>or:
        Basir, Bayi Ajaib (magic baby), [???], [a duck], Macan (Tiger), Elang (Javan hawk-eagle)</dd>
    </dl>
    <div className="multi extra-wide">
      <ArticleImage src={imgHHH1} alt="" source={{
          license: "stock-image",
          organization: { orgName: "Shutterstock.com" },
          author: "Novie Charleen Magne",
          identifier: "1350321158",
          copyrightYear: 2013,
          originalUrl: "https://www.shutterstock.com/image-photo/karangasem-bali-indonesia-26-july-2013-1350321158"
      }}>
        A game being played in Bali: bets are placed…
      </ArticleImage>
      <ArticleImage src={imgHHH2} alt="" source={{
          license: "stock-image",
          organization: { orgName: "Shutterstock.com" },
          author: "Novie Charleen Magne",
          identifier: "1350321164",
          copyrightYear: 2013,
          originalUrl: "https://www.shutterstock.com/image-photo/karangasem-bali-indonesia-26-july-2013-1350321164"
      }}>
        …and the dice are revealed.
      </ArticleImage>
    </div>
  </Section>
</>;


export default Content;
