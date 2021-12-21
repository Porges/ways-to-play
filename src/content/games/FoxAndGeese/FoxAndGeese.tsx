import * as React from 'react';
import { Cite, Section } from 'ui';
import { GameRef } from '../Game';

const FoxAndGeese: React.FC = () => {
    return <>
        <Section title="Terminology">
            <p>In other languages and countries it is known as:</p>
            <ul>
                <li>Icelandic: <span lang="is">refskák</span>, ‘fox chess’.<Cite r="Fiske" page={146} /></li>
                <li>French: <span lang="fr">jeu de renard</span>, ‘game of the fox’.<Cite r="Fiske" page={148} /></li>
                <li>German: <span lang="de">der fuchs und die gänse</span> ‘fox and geese’, or <span lang="de">fush- und hühnerspiel</span> ‘fox and hens game’, or <span lang="de">fuchs im hühnerhof</span> ‘fox in the chicken yard’.<Cite r="Fiske" page={[146, 152]} /></li>
                <li>Italian: <span lang="it">lupo e pecore</span>, ‘wolf and sheep’, or <span lang="it">giuoco della volpe</span> ‘game of the fox’.<Cite r="Fiske" page={148} /></li>
            </ul>
        </Section>
        <Section title="See also">
            <p><GameRef id="assault" /> is also played on the same board.</p>
        </Section>
    </>;
}

export default FoxAndGeese;
