import * as React from 'react';

type Props = {
  standalone?: boolean
}

export const Footnote: React.FC<Props> = ({children, standalone}) => {
  if (standalone) {
    return <aside role="note" className="footnote">{children}</aside>;
  }

  return <><span className="footnote-indicator"/><span role="note" className="footnote">{children}</span></>;
}
