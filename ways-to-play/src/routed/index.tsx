import * as React from 'react';
import { Switch, Route } from 'react-router';

import { Home } from './Home';
import { Games } from './games';

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/games/" component={Games} />
        </Switch>
    );
}