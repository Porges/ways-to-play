
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Cite, Noun, Cards, Footnote, ArticleImage, Section } from 'ui';

const Content: React.FC = () => <>
  <p><Noun lang="ms">Cholek Tiga</Noun> (‘draw three’) is a game played with <Link to="/articles/cards/ceki/">Ceki cards</Link>.</p>
</>;

export default Content;
