import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export const Home: React.FC = () => {
    return (
        <>
            <Helmet>
                <body itemScope itemType="http://schema.org/WebSite" />
            </Helmet>
            <p>Home</p>
        </>
    );
}