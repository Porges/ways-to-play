import * as React from 'react';
import * as Server from 'react-dom/server';
import { Helmet } from 'react-helmet-async';

export const Description: React.FC = ({ children }) => {
  const desc = Server.renderToStaticMarkup(<>{children}</>)
    .replaceAll(tagStripper, "")
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
const tagStripper = /<[^>]*?>/g;
