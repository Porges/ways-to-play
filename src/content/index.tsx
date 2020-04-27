import * as React from 'react';
import { Switch, Route } from 'react-router';

import { About } from './About';
import { Home } from './Home';
import { Games } from './games';
import { Articles } from './articles';
import { Helmet } from 'react-helmet-async';

const Bibliography = React.lazy(() => import(/* webpackChunkName: 'bibliography' */ './Bibliography'))

const FourOhFour: React.FC = () => (<>
    <Helmet>
        <title>404 Not Found</title>
    </Helmet>
    <h1>404 Not Found</h1>
    <p>Nothing was found at this location.</p>
</>);

export const Routes: React.FC = () => {
    return (
        <React.Suspense fallback={<p>Loading...</p>}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/games" component={Games} />
                <Route path="/articles" component={Articles} />
                <Route path="/bibliography" exact component={Bibliography} />
                <Route component={FourOhFour}/>
            </Switch>
        </React.Suspense>
    );
}