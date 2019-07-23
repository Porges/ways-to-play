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
      <Navbar bg="darker" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src="/images/favicon.png" height="16" width="16" alt=""/> Ways to Play</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav as="ul" className="ml-auto">
            <li><Nav.Link as={Link} to="/about/">About</Nav.Link></li>
            <li><Nav.Link as={Link} to="/games/">Games</Nav.Link></li>
            <li><Nav.Link as={Link} to="/bibliography/">Bibliography</Nav.Link></li>
          </Nav>
        </Navbar.Collapse>
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
      {' '}
      <License rel="license" license="cc-by-nc-sa" version="4.0" />
      {' '}
      · Feedback? Let <a href="https://twitter.com/porges">@porges</a> know on Twitter.
      </Navbar.Text>
    </footer>
    </>
  );
}

export default App;
