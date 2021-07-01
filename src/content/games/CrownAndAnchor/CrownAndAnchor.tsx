import * as React from 'react';

import { Cite, Cards, ArticleImage, Section } from 'ui';
import { GameRef } from '../Game';

import imgHHH1 from './shutterstock_1350321158.jpg';
import imgHHH2 from './shutterstock_1350321164.jpg';
import imgBaliDice from './shutterstock_1398460952.jpg';

const Content: React.FC = () => <>
  <Section title="Crown & Anchor and related games">
    <p>Crown & Anchor itself seems to date from the late 19th or early 20th century. The game play is exactly equivalent to that in <GameRef id="chuck-a-luck"/>, but the pips on the dice and the numbers on the staking-table are replaced by pictures: 👑&#xfe0e; crown, ⚓&#xfe0e; anchor, <Cards>s</Cards> spade, <Cards>c</Cards> club, <Cards>d</Cards> diamond, <Cards>h</Cards> heart.</p>
    <Section title="">
      <p>The earliest references I have found to the game centre on the Boer War, where British and American troops fought alongside each other. The earliest mention refers to returning British soldiers being swindled at the game,<Cite r="RobbingTommyAtkins" /> while another is an interview with an American volunteer who played the game with English troops.<Cite r="FromTombsBaker" /> Possibly a game like Chuck-A-Luck (or Mustang) was transmitted to English troops who “Britishized” the game by inserting a crown. The next set of mentions in the </p>
    </Section>
    <p>It was especially popular amongst British soldiers during World War I, but there are many equivalent versions from around the world.</p>
    <p>In Chinese communities the game is called <span lang="nan-Latn">hû hê hāu</span> <span lang="nan">魚蝦鱟</span>,<Cite r="GamblingGamesOfMalaya" page={109} /> usually romanized as “Hoo Hey How”. In India it is Jhandi Munda (झंडी मुंडा) or Khora Khore (खोर खोरे), while in Nepal it is <span lang="ne-Latn">langur burja</span> (<span lang="ne">लंगूर or लङ्गुर बुर्जा</span>). Lago Lago in Bhutan?</p>
    <p>Symbols used are:</p>
    <dl>
      <dt>Crown & Anchor</dt>
      <dt>Langur Burja (??) or Jhandi Munda (Munda flag?)</dt>
      <dd>Jhandi झंडी (flag), munda or burja or mukut मुकुट (crown), surath सुरथ (spade), chid चीड (‘pine’ = club), itta इँट (‘brick’ = diamond), pana पान (‘betel leaf’ = heart)</dd>
      <dt>Balinese</dt>
      <dd>Basir, Robin, Rare (baby), Ikan Barong (fish Barong), Kepiting (crab), Ayam (chicken)<br />or:
        Basir, Bayi Ajaib (magic baby), [???], [a duck], Macan (Tiger), Elang (Javan hawk-eagle)<br />or:
        (??) Tua (old man), Elang, Cewek (girl), Singa (lion), Ikan (fish), Kodok (frog)</dd>
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
    <p>An equivalent (perhaps older) game can be played with three standard six-sided dice. It does not need to be played with a layout board but it can be. In this form it can be known as <span lang="nan-Latn">io jī sam</span> <span lang="nan">么二三</span>  (‘ace, two, three’, often romanized “Yew Yee Sam”).<Cite r="GamblingGamesOfMalaya" page={95} /></p>
    <Section title="Balinese dice game">
      <p>TODO: need to identify this</p>
      <ArticleImage src={imgBaliDice} alt="" source={{
        license: "stock-image",
        organization: { orgName: "Shutterstock.com" },
        author: "Nomad1988",
        identifier: "1398460952",
        copyrightYear: 2017,
        originalUrl: "https://www.shutterstock.com/image-photo/baliindonesia2009-on-weekeds-bali-1398460952"
      }}>
        A Balinese game of <span lang="id">koprok</span> or <span lang="id">kolok</span> or <span lang="id">kopyok</span>.
      </ArticleImage>
    </Section>
  </Section>
</>;


export default Content;
