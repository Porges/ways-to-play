import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Home: React.FC = () => {
  return (<>
    <Helmet>
      <body itemScope itemType="http://schema.org/WebSite" />
    </Helmet>
    <h1>Welcome</h1>
    <Row>
      <Col/>
      <Col xs="10" lg="6">
        <p className="text-center">
            Welcome to <cite>Ways to Play</cite>. 
            This is a site about games, traditional and modern, that are played around the world. There are two main areas on this site, of <Link to="/articles"><span role="img" aria-label="">🧾</span>&nbsp;Articles</Link> about games or families of games, and <Link to="/games"><span role="img" aria-label="">🎲</span>&nbsp;Games</Link> for rules of the games themselves.
        </p>
        <p className="text-center">
          You might also be interested in the <Link to="/about"><span role="img" aria-label="">📣</span>&nbsp;About</Link> page or perhaps the site-wide <Link to="/bibliography"><span role="img" aria-label="">📚</span>&nbsp;Bibliography</Link>.
        </p>
      </Col>
      <Col/>
    </Row>
  </>);
}