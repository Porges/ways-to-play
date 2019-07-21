import * as React from 'react';
import { Switch, Route } from 'react-router';

import { About } from './About';
import { Home } from './Home';
import { Games } from './games';

const Bibliography = React.lazy(() => import(/* webpackChunkName: 'bibliography' */ './Bibliography'))

export const Routes: React.FC = () => {
    return (
        <React.Suspense fallback={<p>Loading...</p>}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/games" component={Games} />
                <Route path="/bibliography" exact component={Bibliography} />
            </Switch>
        </React.Suspense>
    );
}