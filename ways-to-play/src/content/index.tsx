import * as React from 'react';
import { Switch, Route } from 'react-router';

import { About } from './About';
import { Home } from './Home';
import { Games } from './games';
import { Bibliography } from './Bibliography';

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about/" exact component={About} />
            <Route path="/games/" component={Games} />
            <Route path="/bibliography/" exact component={Bibliography} />
        </Switch>
    );
}