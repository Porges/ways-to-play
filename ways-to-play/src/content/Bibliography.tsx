import * as React from 'react';

import { references, renderActualReference } from '../References';

export const Bibliography: React.FC = () =>
    <section>
        <h1>Bibliography</h1>
        <ul className="reference-list list-unstyled">{references.map((r, ix) => <li key={ix}>{renderActualReference(r)}</li>)}</ul>
    </section>;
