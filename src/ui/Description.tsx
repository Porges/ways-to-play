import * as React from 'react';
import * as Server from 'react-dom/server';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

export const Description: React.FC = ({ children }) => {
  const desc = Server.renderToStaticMarkup(<><BrowserRouter>{children}</BrowserRouter></>)
    .replaceAll(tagStripper, "")
    .replaceAll(bracketStripper, "")
    .replaceAll(parenStripper, "");

  return (
    <>
      <Helmet>
        <meta property="og:description" content={desc} />
      </Helmet>
      <p className="lead">{children}</p>
    </>
  );
}

const parenStripper = / \([^)]*?\)/g;
const bracketStripper = /\[[^\]]*?\]/g;
const tagStripper = /<[^>]*?>/g;
