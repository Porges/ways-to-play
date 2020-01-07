import * as React from 'react'

type OwnProps = {
    src: string,
    children: string,
    lang?: string,
    noun?: boolean,
}

export const Pronunciation: React.FC<OwnProps> = ({src, lang, children, noun}) => {
    const audioRef = React.useRef(null as HTMLAudioElement | null);

    let className = "pronunciation";
    if (noun) {
        className += " proper-noun"
    }

    return (<>
        <audio src={src} ref={audioRef} />
        <span className={className} lang={lang} onClick={() => audioRef.current && audioRef.current.play()}>
            {children}
        </span>
    </>);
}