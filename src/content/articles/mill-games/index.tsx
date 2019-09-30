import * as React from 'react';

import { ArticleContentProps, ArticleImage, Noun, Pronunciation } from 'ui';
import { Murray2, MkeleMorabaraba, FiggiUndMuliHaa, MacedonianFolklore, Gallovidian, IntroductionToShax, Fiske, BasothoChildren, SomaliGames, BritishSomaliland } from 'References/bibliography.json';
import { GameRef } from 'content/games/Game';

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

const MillGames: React.FC<ArticleContentProps> = ({ cite }) => {
  return (<section id="mill-games">
    <p>Mill games are also known as <i>Morris</i> or <i>Merels</i> games. The main aim of any mill game is to try to form a row of three pieces, which is called a ‘mill’. In most games this allows the player to remove one of the opponent’s pieces from the board (usually not from another mill).</p>
    <p>Most mill games are split into two phases of <i>placement</i> and <i>movement</i>.</p>
    <ArticleImage
      src={
        [[small_merels, "The small mill board of a single square."]
          , [large_merels, "The large mill board of three nested squares."]
          , [large_merels_with_diagonals, "The large mill board of three nested squares, with diagonal lines."]
        ]}>
      Some different mill boards.
      </ArticleImage>
    <h2>Games</h2>
    <p>Many of the games overlap so much that they could be considered to be the same game.</p>
    <p>For example, <GameRef id="morabaraba" /> as standardized by Mind Sports South Africa has only two small differences from [Twelve Men’s Morris] as standardized by the <Noun lang="de">Weltmühlespiel Dachverband</Noun>.</p>
    <p>The ‘base games’ are [Nine Men’s Morris], [Three Men’s Morris], and [Twelve Men’s Morris]. Games that are minor variations on these are listed as variants in those pages. Games that are larger variations, that have an interesting/distinct history, or that are otherwise standardized (like <GameRef id="morabaraba" />) are listed separately. (Although some ‘large variations’ like [Lasker Morris] are listed in the main pages if they don’t have significant history or cultural background around them.)</p>
    <p>If you are looking for somewhere to start, [Nine Men’s Morris] is probably the “classic” game.</p>
    <h3>Large mill board</h3>
    <ul>
      <li>[Nine Men’s Morris] is the most well-known, and can be viewed as the stereotypical mill game.</li>
      <li>[Twelve Men’s Morris] is common in the USA. [Eleven Men’s Morris] is a variant with one fewer piece per player.</li>
      <li><GameRef id="morabaraba" /> is a mill game played competitively in South Africa. It differs slightly from [Twelve Men’s Morris]. </li>
      <li>[Shax] is a mill game played in Somalia. It is distinguished by not permitting capturing during the placement phase.</li>
    </ul>
    <h3>Medium mill board</h3>
    <ul><li>[Five Men’s Morris] or [Six Men’s Morris] is a mid-sized version that is less common than the bigger or smaller games.</li></ul>
    <h3>Small mill board </h3>
    <ul>
      <li>[Three Men’s Morris] is a simple mill game that is known around the world.</li>
      <li>[Tic-Tac-Toe] can be viewed as a degenerate mill game (and could derive from Three Men’s Morris?)</li>
    </ul>
    <h2>Terminology</h2>
    <p><b>Pieces</b>: names for the pieces.</p>
    <ul>
      <li>Galloway, Scotland: “flitchers”. {cite(Gallovidian, [142])}</li>
    </ul>
    <p><b>Mill</b>: three pieces in a row.</p>
    <ul>
      <li>Icelandic <span lang="is">mylna</span>, ‘mill’.{cite(Fiske, [138])}</li>
      <li>SeSotho <span lang="st">molamu</span> ‘staff’.{cite(BasothoChildren, [35])}</li>
      <li>Somali <span lang="so">charri</span> ‘halter’,{cite(SomaliGames, [504])}{cite(BritishSomaliland, [130])} <Pronunciation src={pronSaddex} lang="so">saddex</Pronunciation> ‘three’,{cite(BritishSomaliland, [130])} or <span lang="so">jare</span> ‘cut’.{cite(IntroductionToShax, [4])}</li>
      <li>Zulu <Pronunciation src={pronIsibhamu} lang="zu">isibhamu</Pronunciation> ‘gun’ – this is used to “shoot” the pieces (cows).</li>
    </ul>
    <p><b>Cross-mill</b>: a position where a mill can be formed every other move, with pieces in a cross shape (with one empty square between).</p>
    <ul>
      <li>German <Pronunciation src={pronKreuzmühle} lang="de">Kreuzmühle</Pronunciation> ‘cross mill’.</li>
      <li>Icelandic <span lang="is">krossmylna</span> ‘cross mill’ or <span lang="is">vængjamylna</span> ‘winged mill’ {cite(Fiske, [139])}.</li>
      <li>Somali <Pronunciation src={pronAfar} lang="so">afar</Pronunciation> ‘four’.{cite(SomaliGames, [505])}{cite(BritishSomaliland, [130])}{cite(IntroductionToShax, [5])}</li>
    </ul>
    <p><b>Running mill</b>: a position where a mill can be formed on every move.</p>
    <ul>
      <li>In Yorkshire: “running Jenny”.{cite(Murray2, /*['section', 3.5],*/[45])}</li>
      <li>German <Pronunciation src={pronZwickmühle} lang="de">Zwickmühle</Pronunciation> ‘double mill’.</li>
      <li>Greek <Pronunciation src={pronDiporto}>δίπορτο</Pronunciation> ‘double door’.{cite(MacedonianFolklore, [295])}</li>
      <li>Icelandic <span lang="is">svikamylna</span> ‘mill of treachery’.{cite(Fiske, [139])}</li>
      <li>seSotho <span lang="st">khutla</span> ‘the return’.{cite(MkeleMorabaraba, [134])}</li>
      <li>Somali <span lang="so">irmaan</span> ‘milch’ (i.e. milk-cow).{cite(SomaliGames, [505])}{cite(BritishSomaliland, [210])}{cite(IntroductionToShax)}</li>
      <li>Swiss <span lang="gsw">figgi</span> or <span lang="gsw">figge</span> (there is a saying that one has one’s <span lang="gsw">«Figgi und Müli»</span>, meaning “to have two options open”).{cite(FiggiUndMuliHaa)}</li>
    </ul>
    <p><b>Corner</b>: a position with three pieces in a corner, which cannot be prevented from forming a mill upon the next turn.</p>
    <ul>
      <li>Somali <span lang="so">charrisoron</span> ‘crooked halter’,{cite(SomaliGames, [505])}{cite(BritishSomaliland, [130])} or simply <span lang="so">suran</span>.{cite(IntroductionToShax, [5])}</li>
    </ul>
    <p><b>Other positions</b>: unknown positions.</p>
    <ul>
      <li>Icelandic <Pronunciation src={pronRennihestur} lang="is">rennihestur</Pronunciation> ‘sliding horse’ possibly refers to a “triple mill” position.{cite(Fiske, [139])}</li>
    </ul>
    <h2>Audio Credits</h2>
    <p>All audio is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">CC-BY-NC-SA 3.0</a>. Pronunciations are by:</p>
    <ul>
      <li><span lang="so">afar</span> and <span lang="so">saddex</span> &copy;2013 <a href="https://forvo.com/user/ahmed_aw_abdi/">ahmed_aw_abdi</a>.</li>
      <li><span lang="el">δίπορτο</span> &copy; <a href="https://forvo.com/user/jpapa/">jpapa</a>.</li>
      <li><span lang="zu">isibhamu</span> &copy; <a href="https://forvo.com/user/Lungii/">Lungii</a>.</li>
      <li><span lang="de">Kreuzmühle</span> &copy; <a href="https://forvo.com/user/Bartleby/">Bartleby</a>.</li>
      <li><span lang="is">rennihestur</span> &copy; <a href="https://forvo.com/user/wertxi/">wertxi</a>.</li>
      <li><span lang="de">Zwickmühle</span> &copy; <a href="https://forvo.com/user/Thonatas/">Thonatas</a>.</li>
    </ul>
  </section>);
};

export default MillGames;