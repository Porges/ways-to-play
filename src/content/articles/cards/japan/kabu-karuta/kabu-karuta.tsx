import * as React from 'react';

import { ArticleImage, Section, Noun } from 'ui';

const Introduction: React.FC = () => 
<Section title="The Cards">
  <ArticleImage 
    size="wide"
    src={require('./Shogundo_cards.jpg')}
    alt="">
    <Noun lang="ja-Latn">Kabu</Noun> cards produced by <a href="/articles/cards/japan/hanafuda/traditional-manufacturers/#tamura-shogundo"><Noun lang="ja-Latn">Tamura Shōgundō</Noun></a>.
  </ArticleImage>
</Section>;

export default Introduction;
