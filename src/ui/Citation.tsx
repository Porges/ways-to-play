import * as React from 'react';
import { Reference } from 'References';

export const CitationContext = React.createContext<{ references: Reference[], addReference: (ref: Reference) => number}>({ references: [], addReference: () => 0});
export const CitationProvider: React.FC = ({children}) => {

  const [references, setReferences] = React.useState<Reference[]>([]);

  const addReference = React.useCallback((ref: Reference) => {
    let index = references.findIndex(x => x.id === ref.id);
    if (index === -1) {
      index = references.length;
      // this will trigger re-render but next time around we won't
      setReferences(s => {
        // need to re-check so it doesn't get added twice - 
        // this can be called "in parallel"
        if (s.find(x => x === ref)) return s;
        return [ ...s,  ref];
      });
    }

    return index;
  }, [references]);

  return (
    <CitationContext.Provider value={{references, addReference}}>
      {children}
    </CitationContext.Provider>
  );
}

type CiteProps = {
  r: Reference,
  page?: number | (number | [number, number])[],
  pageType?: string,
  inline?: boolean,
}

const indexToString = (index: number): string => {
  index += 1;

  let result = "";
  
  while (index > 0) {
    const num = (index - 1) % 26;
    result = String.fromCodePoint('a'.charCodeAt(0) + num) + result
    index = Math.floor((index - num) / 26);
  }

  return result;
};

const formatRange = (start: number, end: number): string => {

  const startS = start.toString();
  const endS = end.toString();

  if (endS.length > startS.length) {
    return startS + "–" + endS;
  }

  if (endS.length < startS.length) {
    throw new Error("bad range");
  }

  let trimmedEnd = '';
  for (let i = 0; i < endS.length; ++i) {
    if (startS[i] !== endS[i]) {
      trimmedEnd = endS.substring(i);
      break;
    }
  }

  return startS + "–" + trimmedEnd;
}

export const Cite: React.FC<CiteProps> = ({pageType, page, inline, r}) => {

  const { addReference }  = React.useContext(CitationContext);

  const [index, setIndex] = React.useState(-1);

  React.useEffect(() => setIndex(addReference(r)), [r, addReference]);

  const suffix =
    page === undefined
      ? null
      : typeof page === 'number'
        ? page
        : page.map(p => typeof p === 'number' ? p : formatRange(p[0], p[1])).join(', ');
      
  const indicator = indexToString(index);

  const pageTypeS = pageType ? pageType + ' ' : '';
  if (inline) {
    switch (r.type) {
      case 'book':
        return <><a href={`#ref-${r.id}`}><cite lang={r["title-lang"]} dangerouslySetInnerHTML={{__html:r.title}} /></a>{suffix && <> ({pageTypeS}{suffix})</>}</>;
      case 'article-journal':
        return <><a href={`#ref-${r.id}`}>{r.author && r.author[0].family}</a> ({r.issued && r.issued.year}{suffix && <>, {pageTypeS}{suffix}</>})</>;
      default:
        return <span className="citation">[<a href={`#ref-${r.id}`}>{indicator}</a>]{suffix && <> ({pageTypeS}{suffix})</>}</span>
    }
  } else {
    return <sup className="citation"><a href={`#ref-${r.id}`}>{indicator}</a>{suffix && <>[{pageTypeS}{suffix}]</>}</sup>;
  }
};
