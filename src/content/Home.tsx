import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (<>
    <Helmet>
      <body itemScope itemType="http://schema.org/WebSite" />
    </Helmet>

    <h1>Ways to Play</h1>
    <p>
      There are a few things here:
    </p>
    <ul>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/articles">Articles</Link></li>
      <li><Link to="/games">Games</Link></li>
      <li><Link to="/bibliography">Bibliography</Link></li>
    </ul>
  </>);
}