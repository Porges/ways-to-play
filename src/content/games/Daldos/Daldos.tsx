
import * as React from 'react';

import { ArticleImage } from 'ui';

import imgMaryRose from './maryrose_daldos.jpg';

const Content: React.FC = () => <>
  <p>Daldøs!</p>
  <ArticleImage src={imgMaryRose} alt="TODO" source={{license: "with-permission", organization: {orgName: "The Mary Rose Museum"}}}>
    Daldøs board(?) on a barrel-end from the wreck of the Mary Rose (1545).
  </ArticleImage>
  </>;

export default Content;
