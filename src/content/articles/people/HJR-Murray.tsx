import * as React from 'react';
import { Cite, Footnote, Section } from 'ui';

const HJRMurray: React.FC = () => {
    return <>
        <p><a href="https://en.wikipedia.org/wiki/H._J._R._Murray">H. J. R. Murray</a><Footnote>Son of <a href="https://en.wikipedia.org/wiki/James_Murray_(lexicographer)">James Murray</a>, the first editor of the Oxford English Dictionary.</Footnote> (1868–1955) is a very important figure in games history. He published two key works: <Cite r="Murray" inline /> in 1913 and <Cite r="Murray2" inline /> in 1951.</p>
        <p><cite>A History of Chess</cite> took 13 years to complete, and Murray taught himself German and Arabic in order to finish the book! <cite>A History of Board-Games Other Than Chess</cite> was published when he was 83, being nearly 40 years in the making.</p>
        <Section title={<>Errata for <cite>…Other Than Chess</cite></>}>
            <p>The following are my own notes on what I believe to be incorrect in the book. They are listed in book order, with section number first; the list is incomplete:</p>
            <p><strong>3.1.6</strong> (p. 39): <strong>Tre-guti</strong> is not equivalent to three-men’s-morris but is a capturing game; also the citation <del>Games from the Punjab</del> should be named <ins>A Few Types of Sedentary Games prevalent in the Punjab</ins>.</p>
            <p><strong>3.3.2</strong> (p. 41): <span lang="es">alquerque de tres</span> is listed as equivalent to three-men’s-morris; it is actually equivalent to noughts & crosses (3.2).</p>
            <p><strong>3.3.11</strong> (p. 41): <strong>Tin-guti pait pait</strong> is not in the reference cited,<Cite r="Humphries"/> but it is in <Cite r="Datta" inline />.</p>
            <p><strong>3.3.13</strong> (p. 42): Hyde<Cite r="Hyde" page={211} /> writes <ins>Che-lo</ins>, not <del>lo che</del>.</p>
            <p><strong>3.5</strong> (p. 45): <del>a3, b1, c3, and b3, b6 being empty</del> should read (something like) <ins>b1, c2, b3, and a2, b2 being empty</ins>, as the pieces should form a cross shape with an empty middle; <del>vangjamylna</del> should read <ins>vængjamylna</ins>; also, <i>charri</i> or <i>saddeh</i> refer to simple mills, not the ‘running mill’ formation.</p>
            <p><strong>3.5.13</strong> (p. 47): al-Fīrūzābādī shows board <ins>G</ins>, not <del>B</del>.</p>
            {/*
            <p><strong>3.5.32</strong> (p. 48): citation could be misleading there are two articles by Goddard, <Cite r="Goddard1901" inline /> has no reference to Trique.</p>
            */}
            <Section title="“Books and articles consulted”">
                <p>pg. 244: All of Hem Chandra Das-Gupta’s articles have incorrect titles.</p>
            </Section>
        </Section>
    </>;
};

export default HJRMurray;
