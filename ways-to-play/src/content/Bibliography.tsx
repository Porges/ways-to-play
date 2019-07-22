import * as React from 'react';
import Helmet from 'react-helmet';

import references from '../References/bibliography.json';
import { renderReference } from '../References';

const Bibliography: React.FC = () => {

    return (<>
        <Helmet>
            <title>Bibliography</title>
        </Helmet>
        <section>
            <h1>Bibliography</h1>
            <ul className="reference-list list-unstyled">
                {Object.entries(references).map(([id, r]) => <li key={id}>{renderReference(r)}</li>)}
            </ul>
        </section>
    </>);
}

export default Bibliography;