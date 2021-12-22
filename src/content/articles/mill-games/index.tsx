import * as React from 'react';

import { Cite, ArticleImage, Noun, Section, Pronounce } from 'ui';
import { GameRef } from 'content/games/Game';

import imgGameInProgress from './shutterstock_120413827.jpg';
import small_merels from './small_merels.svg';
import large_merels from './large_merels.svg';
import large_merels_with_diagonals from './large_merels_with_diagonals.svg';

import pronSaddex from './pronunciation_so_saddex.mp3';
import pronIsibhamu from './pronunciation_zu_isibhamu.mp3';
import pronAfar from './pronunciation_so_afar.mp3';
import pronKreuzmühle from './pronunciation_de_kreuzmühle.mp3';
import pronZwickmühle from './pronunciation_de_zwickmühle.mp3';
import pronDiporto from './pronunciation_el_δίπορτο.mp3';
import pronRennihestur from './pronunciation_is_rennihestur.mp3';
import pronFiggi from './pronunciation_gsw_figgi.mp3';

const MillGames: React.FC = () => {
  return (<>
    <p>Mill games are a family of boardgames also known as <i>Morris</i> or <i>Merels</i> games. The main aim of any mill game is to try to form a row of three pieces, which is called a ‘mill’, and which usually allows the player to remove one of the opponent’s pieces from the board (usually not from another mill).</p>
    <p>Most mill games are split into two phases of <i>placement</i> and <i>movement</i>, so that all pieces are placed on the board before any pieces are moved.</p>
    <ArticleImage src={imgGameInProgress} alt="A Nine Men’s Morris game, just after all pieces have been placed"
      size="wide"
      source={{
        organization: { orgName: "Shutterstock.com" },
        author: "FooTToo",
        license: "stock-image",
        originalUrl: "https://www.shutterstock.com/image-photo/old-nine-mens-morris-board-on-120413827"
      }}>
      A game in progress, just after the <i>placement</i> phase has been finished, and all 18 pieces are on the board.
    </ArticleImage>
    <Section title="Games">
      <p>Many of the games overlap so much that they could be considered to be the same game. For example, <GameRef id="morabaraba" /> as standardized by Mind Sports South Africa has only two small differences from <GameRef id='nine-mens-morris' fragment="#twelve-mens-morris">Twelve Men’s Morris</GameRef> as standardized by the <Noun lang="de">Weltmühlespiel Dachverband</Noun>. However, I have chosen to describe it separately due to the interesting history and cultural context around the game.</p>
      <p>The most important representative of the type is <GameRef id='nine-mens-morris' />, and it is a good place to start if you have never played this type of game before.</p>
      <Section title="Large mill Board">
        <ArticleImage
          size="small"
          src={
            [[large_merels, "The large mill board of three nested squares."]
              , [large_merels_with_diagonals, "The large mill board of three nested squares, with diagonal lines."]
            ]}>
          Two different large mill boards, one without diagonals, and one with diagonals.
        </ArticleImage>
        <ul>
          <li><GameRef id="morabaraba" /> is a mill game played competitively in South Africa. It differs slightly from Twelve Men’s Morris.</li>
          <li><GameRef id='nine-mens-morris' /> is the most well-known, and can be viewed as the stereotypical mill game. Many variants are described on this page.</li>
          <li><GameRef id='nine-mens-morris' fragment="#twelve-mens-morris">Twelve Men’s Morris</GameRef> is the most common form in the United States. Eleven Men’s Morris is a variant with one fewer piece per player.</li>
          <li><GameRef id="shax" /> is a mill game from Somalia. It is distinguished by not permitting capturing during the placement phase.</li>
        </ul>
      </Section>
      <Section title="Medium mill board">
        <ul>
          <li><GameRef id="achi" /> is a game from West Africa that features an additional way to form a mill.</li>
          <li>[Five Men’s Morris] or [Six Men’s Morris] is a mid-sized version that is less common than the bigger or smaller games.</li>
        </ul>
      </Section>
      <Section title="Small mill board ">
        <ArticleImage size="small" src={small_merels} alt="The small mill board of a single square.">
          The small mill board.
        </ArticleImage>
        <ul>
          <li><GameRef id="three-mens-morris" /> is a simple mill game that is known around the world.</li>
          <li><GameRef id="tic-tac-toe" /> can be viewed as a degenerate mill game (and could derive from Three Men’s Morris?)</li>
        </ul>
      </Section>
    </Section>
    <Section title="Terminology">
      <p>The general name for the game family:</p>
      <ul>
        <li>Danish <span lang="da">mölle</span>, ‘mill’.<Cite r="Fiske" page={134} /></li>
        <li>Dutch <span lang="nl">molenspel</span>, ‘mill game’.<Cite r="Fiske" page={133} /></li>
        <li>French <span lang="fr">mérelles</span>, ‘merels’.<Cite r="Fiske" page={133} /></li>
        <li>Hungarian <span lang="hu">malomjáték</span>, ‘mill game’, or <span lang="hu">malmosdi</span>.<Cite r="Fiske" page={133} /></li>
        <li>Russian <span lang="ru">мельница</span> (<span lang="ru-Latn">melniza</span>), ‘mill’.<Cite r="Fiske" page={133} /></li>
        <li>Swedish <span lang="sv">qvarnspel</span>, ‘mill game’.<Cite r="Fiske" page={135} /></li>.
      </ul>
      <p><b>Pieces</b>: names for the pieces.</p>
      <ul>
        <li>Galloway, Scotland: “flitchers”. <Cite r="Gallovidian" page={142} /></li>
      </ul>
      <p><b>Mill</b>: three pieces in a row.</p>
      <ul>
        <li>Icelandic <span lang="is">mylna</span>, ‘mill’.<Cite r="Fiske" page={138} /></li>
        <li>Sotho <span lang="st">molamu</span> ‘staff’.<Cite r="BasothoChildren" page={35} /></li>
        <li>Somali <span lang="so">charri</span> ‘halter’,<Cite r="SomaliGames" page={504} /><Cite r="BritishSomaliland" page={130} /> <Pronounce file={pronSaddex} lang="so" word="saddex" pronouncer="ahmed_aw_abdi" /> ‘three’,<Cite r="BritishSomaliland" page={130} /> or <span lang="so">jare</span> ‘cut’.<Cite r="IntroductionToShax" page={4} /></li>
        <li>Zulu <Pronounce pronouncer="Lungii" word="isibhamu" file={pronIsibhamu} lang="zu" /> ‘gun’ – this is used to “shoot” the pieces (cows).</li>
      </ul>
      <p><b>Cross-mill</b>: a position where a mill can be formed every other move, with pieces in a cross shape (with one empty square between).</p>
      <ul>
        <li>German <Pronounce file={pronKreuzmühle} lang="de" word="Kreuzmühle" pronouncer='Bartleby' /> ‘cross mill’.</li>
        <li>Icelandic <span lang="is">krossmylna</span> ‘cross mill’ or <span lang="is">vængjamylna</span> ‘winged mill’ <Cite r="Fiske" page={139} />.</li>
        <li>Somali <Pronounce file={pronAfar} lang="so" word="afar" pronouncer='ahmed_aw_abdi' /> ‘four’.<Cite r="SomaliGames" page={505} /><Cite r="BritishSomaliland" page={130} /><Cite r="IntroductionToShax" page={5} /></li>
      </ul>
      <p><b>Running mill</b>: a position where a mill can be formed on every move.</p>
      <ul>
        <li>Danish <span lang="da">rendemölle</span>, ‘running mill’.<Cite r="Fiske" page={134} /></li>
        <li>English:
          <ul>
            <li>In Hargrave: “see-saw mill”.<Cite r="PegMeryll" page={133} /></li>
            <li>In Yorkshire: “running Jenny”.<Cite r="Murray2" /*['section', 3.5],*/ page={45} /></li>
          </ul>
        </li>
        <li>German <Pronounce file={pronZwickmühle} lang="de" word="Zwickmühle" pronouncer='Thonatas' /> ‘double mill’.</li>
        <li>Greek <Pronounce lang="el" file={pronDiporto} word="δίπορτο" pronouncer='jpapa' /> ‘double door’.<Cite r="MacedonianFolklore" page={295} /></li>
        <li>Icelandic <span lang="is">svikamylna</span> ‘mill of treachery’.<Cite r="Fiske" page={139} /></li>
        <li>Sotho <span lang="st">kgutla</span>/<span lang="st">khutla</span> ‘to return’.<Cite r="MkeleMorabaraba" page={134} /></li>
        <li>Somali <span lang="so">irmaan</span> ‘milch’ (i.e. milk-cow).<Cite r="SomaliGames" page={505} /><Cite r="BritishSomaliland" page={210} /><Cite r="IntroductionToShax" /></li>
        <li>Swiss <Pronounce lang="gsw" word="figgi" pronouncer="kuusikuusta" file={pronFiggi} /> or <span lang="gsw">figge</span> (there is a saying that one has one’s <span lang="gsw">«Figgi und Müli»</span>, meaning “to have two options open”).<Cite r="FiggiUndMuliHaa" /></li>
      </ul>
      <p><b>Corner</b>: a position with three pieces in a corner, which cannot be prevented from forming a mill upon the next turn.</p>
      <ul>
        <li>Somali <span lang="so">charrisoron</span> ‘crooked halter’,<Cite r="SomaliGames" page={505} /><Cite r="BritishSomaliland" page={130} /> or simply <span lang="so">suran</span>.<Cite r="IntroductionToShax" page={5} /></li>
      </ul>
      <p><b>Other positions</b>: unknown positions.</p>
      <ul>
        <li>Icelandic <Pronounce file={pronRennihestur} lang="is" word="rennihestur" pronouncer="wertxi" /> ‘sliding horse’ possibly refers to a “triple mill” position.<Cite r="Fiske" page={139} /></li>
      </ul>
    </Section>
  </>);
};

export default MillGames;
