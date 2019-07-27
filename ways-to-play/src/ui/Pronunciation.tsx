import * as React from 'react'

type OwnProps = {
    src: string,
    children: string,
    lang?: string,
}

export const Pronunciation: React.FC<OwnProps> = ({src, lang, children}) => {
    const audioRef = React.useRef(null as HTMLAudioElement | null);

    return (<>
        <audio src={src} ref={audioRef} />
        <span className="pronunciation" lang={lang} onClick={() => audioRef.current && audioRef.current.play()}>
            {children}
        </span>
    </>);
}