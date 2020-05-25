import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Person, License } from './ui';
import { Routes } from './content';
import { Helmet } from 'react-helmet-async';

const App: React.FC = () => {
  return (
    <>
    <Helmet defaultTitle="Ways To Play" titleTemplate="%s · Ways To Play" />
    <header>
      <Navbar bg="darker" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Ways to Play</Navbar.Brand>
        <Nav as="ul">
          <li><Nav.Link as={Link} to="/articles"><span role="img" aria-label="">🧾</span>&#8239;Articles</Nav.Link></li>
          <li><Nav.Link as={Link} to="/games"><span role="img" aria-label="">🎲</span>&#8239;Games</Nav.Link></li>
        </Nav>
        </Container>
      </Navbar>
    </header>

    <Container as="main">
      <Routes/>
    </Container>

    <footer className="navbar navbar-expand navbar-dark bg-darker">
      <Navbar.Text className="ml-auto">
      ©
      {' '}
      <Person
        name={{given: "George", family: "Pollard"}}
        url="https://porg.es"
        sameAs="https://twitter.com/porges"
        itemProp="copyrightHolder author publisher"
        id="author" />
      <License leading rel="license" license="cc-by-nc-sa" version="4.0" />
      {' '}
      · Feedback? Let <a href="https://twitter.com/porges">@porges</a> know or <a href="https://github.com/Porges/ways-to-play/issues/new">open an issue</a>.
      </Navbar.Text>
    </footer>
    </>
  );
}

export default App;
