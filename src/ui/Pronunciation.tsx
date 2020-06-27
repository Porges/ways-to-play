import * as React from 'react'

import * as Server from 'react-dom/server';

// For a Forvo pronunciation
type Pronunciation = { pronouncer: string, word: string, lang: string }
export const PronunciationContext = React.createContext<{ pronunciations: Pronunciation[], addPronunciation: (p: Pronunciation) => void}>({ pronunciations: [], addPronunciation: () => {} });
export const PronunciationProvider: React.FC = ({children}) => {
  const [pronunciations, setPronunciations] = React.useState<Pronunciation[]>([]);
  const addPronunciation = React.useCallback((p: Pronunciation) => {
    setPronunciations(s => {
      if (s.find(x => x.word === p.word)) return s;
      return [...s, p];
    });
  }, []);

  return (
    <PronunciationContext.Provider value={{pronunciations, addPronunciation}}>
      {children}
    </PronunciationContext.Provider>
  );
};

type PronounceProps = Pronunciation & { file: string, noun?: boolean }
export const Pronounce: React.FC<PronounceProps> = ({pronouncer, word, lang, file, noun}) => {
  const { addPronunciation } = React.useContext(PronunciationContext);
  React.useEffect(() => addPronunciation({word, pronouncer, lang}), [word, pronouncer, lang, addPronunciation])
  return <RenderPronunciation src={file} lang={lang} noun={noun}>{word}</RenderPronunciation>;
};

type RenderPronunciationProps = {
    src: string,
    children: string,
    lang?: string,
    noun?: boolean,
}

const RenderPronunciation: React.FC<RenderPronunciationProps> = ({src, lang, children, noun}) => {

    let className = "pronunciation";
    if (noun) {
        className += " proper-noun"
    }

    // render HTML directly as we will strip React scripts from built site:
    const result = `<audio preload="none" src="${src}"></audio><span class="${className}" lang="${lang}" onclick="this.previousSibling.play()">${Server.renderToStaticMarkup(<>{children}</>)}</span>`;
    return <span dangerouslySetInnerHTML={{__html: result}} />;
}
