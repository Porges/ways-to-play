import * as React from 'react';
import { Section, Cite } from 'ui';
import { GameRef } from '../Game';

const Assault: React.FC = () => {
    return <>
        <Section title="Terminology">
            <p>In other languages and countries it is known as:</p>
            <ul>
                <li>Danish: <span lang="da">belejringsspel</span> ‘siege game’.<Cite r="Fiske" page={147}/></li>
                <li>Italian: <span lang="it">assalto</span> ‘assault’.<Cite r="Fiske" page={147}/></li>
                <li>French: <span lang="fr">assaut</span> ‘assault’.<Cite r="Fiske" page={147}/></li>
                <li>German: <span lang="de">das festungs- und belagerungsspiel</span> ‘fortress and siege game’.<Cite r="Fiske" page={152}/></li>
                <li>Spanish: <span lang="es">asalto</span> ‘assault’.<Cite r="Fiske" page={147}/></li>
                <li>Swedish: <span lang="sv">belägringsspel</span> ‘siege game’, or <span lang="sv">fästningsspel</span> ‘fortress game’.<Cite r="Fiske" page={147}/></li>
            </ul>
        </Section>
        <Section title="See also">
            <p><GameRef id="fox-and-geese"/> is also played on the same board.</p>
        </Section>
    </>;
}

export default Assault;
