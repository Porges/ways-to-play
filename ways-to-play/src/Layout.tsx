import React from 'react';
import { Link } from 'react-router-dom';

import './Layout.css';
import { Person, Licence } from './ui';
import { Routes } from './routed';

const App: React.FC = () => {
  return (
    <>
    <header>
      <div className="logo">
        <Link to="/"><img src="/images/favicon.png" height="16" width="16" alt=""/> Ways to Play</Link>
      </div>
      <nav>
        <Link to="/games/">Games</Link>
      </nav>
    </header>

    <main>
      <Routes />
    </main>

    <footer>
      ©
      {' '}
      <Person
        name={{given: "George", family: "Pollard"}}
        url="https://porg.es"
        sameAs="https://twitter.com/porges"
        itemProp="coprightHolder author publisher"
        id="author" />
      {' '}
      <Licence rel="license" license="cc-by-nc-sa" version="4.0" />
      {' '}
      · Feedback? Let <a href="https://twitter.com/porges">@porges</a> know on Twitter.
    </footer>
    </>
  );
}

export default App;
