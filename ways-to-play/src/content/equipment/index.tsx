import * as React from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import { Article } from '../../ui';
import { Link } from 'react-router-dom';

const equipment = {
    hanafuda: {
        title: 'Hanafuda',
        titleLang: 'ja',
        draft: true,
        import: React.lazy(() => /* webpackChunkName: hanafuda */ import('./hanafuda'))
    }
} as const;

const EquipmentList: React.FC = () => {
    return (<>
        <h1>Equipment list</h1>
        <ul>
            { Object.entries(equipment).map(([path, game]) => (
                <Link to={`/equipment/${path}`} lang={game.titleLang}>{game.title}</Link>
            ))}
        </ul>
    </>);
}

const hasKey = <T extends Object>(o: T, k: keyof any): k is keyof T => o.hasOwnProperty(k);

const EquipmentArticle: React.FC<RouteComponentProps<{id: string}>> = ({match}) => {

    if (!hasKey(equipment, match.params.id)) {
        return null;
    }

    return <Article url={match.url} content={equipment[match.params.id]} />;
}

export const Equipment: React.FC<RouteComponentProps> = ({match}) => {
    return (
        <Switch>
            <Route path={match.path} exact component={EquipmentList} />
            <Route path={`${match.path}/:id`} component={EquipmentArticle} />
        </Switch>
    );
};
