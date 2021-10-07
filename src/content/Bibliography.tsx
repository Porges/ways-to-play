import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import references from '../References/bibliography.json';
import { renderReference, Reference } from '../References';

import { Container, Row } from 'react-bootstrap';

const comparer = new Intl.Collator('en');

const Bibliography: React.FC = () => {

  const sortKey = (r: Reference): string =>
    `${r.author ? (r.author[0].family || '') : (r.publisher || '')}
        ${r.author ? (r.author[0].given === 'string' ? r.author[0].given : r.author[0].given[0]) : ''}
        ${r.issued ? r.issued.year : ''}
        ${r.title}`;

  const typedReferences: Record<string, Omit<Reference, 'id'>> = references;

  return (<>
    <Helmet>
      <title>Bibliography</title>
    </Helmet>
    <Container>
      <h1>Bibliography</h1>
      <Row>
        <ul className="reference-list list-unstyled col-8 offset-2">
          {Object.entries(typedReferences)
            .concat()
            .map(([id, r]): [string, Reference] => [id, {...r, id}])
            .sort(([_1, r1], [_2, r2]) => comparer.compare(sortKey(r1), sortKey(r2)))
            .map(([id, r]) => <li key={id}>{renderReference(r)}</li>)}
        </ul>
      </Row>
    </Container>
  </>);
}

export default Bibliography;
