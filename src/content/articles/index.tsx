import * as React from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { Article, ArticleContent } from 'ui';

type List = { title: string, titleLang?: string, articles: ListEntries }
type ListEntries = Map<string, ArticleContent|List>

const articles: List = {
    title: "Articles",
    articles: new Map([
        ['mill-games', {
          title: "Mill Games",
          draft: true,
          import: React.lazy(() => import(/* webpackChunkName: 'mill-games' */ './mill-games'))
        } ],
        ['japan', {
            title: "Japanese Cards",
            articles: new Map([
                ['introduction', {
                    title: 'Japanese Cards',
                    draft: true,
                    import: React.lazy(() => import(/* webpackChunkName: 'japanese-cards' */ './japan/introduction'))
                }],
                ['hanafuda', {
                    title: 'Hanafuda',
                    titleLang: 'ja-Latn',
                    articles: new Map([
                        ['basics', {
                            title: "Hanafuda Basics",
                            draft: true,
                            import: React.lazy(() => import(/* webpackChunkName: 'hanafuda-basics' */ './japan/hanafuda/basics'))
                        }],
                        ['art', {
                            title: "The History & Art of Hanafuda",
                            draft: true,
                            import: React.lazy(() => import(/* webpackChunkName: 'hanafuda-art' */ './japan/hanafuda/art'))
                        }],
                        ['manufacturers', {
                            title: "Hanafuda Manufacturers & Brands",
                            draft: true,
                            import: React.lazy(() => import(/* webpackChunkName: 'hanafuda-manufacturers' */ './japan/hanafuda/manufacturers'))
                        }]
                    ])
                }]
            ])
        }]
    ])
};

const renderArticleList = (list: ListEntries, pathSoFar: string) => {
    while (pathSoFar.endsWith('/')) {
        pathSoFar = pathSoFar.substr(0, pathSoFar.length - 1);
    }

    return (
        <ul>
            { [...list.entries()].map(([path, obj]) => (
                <li key={path}>
                {
                    'articles' in obj
                    ? <><b>{obj.title}</b>{renderArticleList(obj.articles, `${pathSoFar}/${path}`)}</>
                    : <Link to={`${pathSoFar}/${path}`} lang={obj.titleLang}>
                        {obj.title}
                        {' '}
                        {obj.draft && <Badge variant="warning">Draft</Badge>}
                      </Link>
                }
                </li> )) }
        </ul>
    );
};

const ArticleList: React.FC<{list: List, route: RouteComponentProps}> = ({list, route}) => {
    const { match } = route;
    return (<>
        <h1>{list.title}</h1>
        { renderArticleList(list.articles, match.url) }
    </>);
}

const Lookup: React.FC<RouteComponentProps<{id: string}>> = (props) => {

    const { match } = props;
    const idParts = match.params.id.split('/');

    let found: ArticleContent|List|null = null;
    let at: ListEntries|null = articles.articles;

    const crumbs: {title: string, link: string, titleLang?: string}[] = []
    let crumbLink = '/articles';
    crumbs.push({title: articles.title, link: crumbLink});

    for (let ix = 0; ix < idParts.length; ++ix) {
        if (at === null) {
            found = null;
            break;
        }

        const part = idParts[ix];
        const next: List|ArticleContent|undefined = at.get(part);
        if (next) {
            crumbLink += '/' + part;
            crumbs.push({title: next.title, titleLang: next.titleLang, link: crumbLink});
            found = next;

            if ('articles' in next) {
                at = next.articles;
            } else {
                at = null;
            }
        } else {
            found = null;
            break;
        }
    }

    if (!found) {
        return null;
    }

    const breadCrumbs = 
        <Breadcrumb>
            { crumbs.map(({title, link, titleLang}, ix) => 
                <li key={ix} className="breadcrumb-item"><Link to={link} lang={titleLang}>{title} {}</Link></li>) }
        </Breadcrumb>;

    if ('import' in found) {
        return <>{breadCrumbs}<Article url={match.url} content={found} /></>;
    } else {
        return <>{breadCrumbs}<ArticleList route={props} list={found} /></>;
    }
}

export const Articles: React.FC<RouteComponentProps> = ({match}) => {
    return (
        <Switch>
            <Route path={match.path} exact render={route => <ArticleList route={route} list={articles} />} />;
            <Route path={`${match.path}/:id+`} component={Lookup} />
        </Switch>
    );
};
