import { readdir, readFile } from 'node:fs/promises';


async function go() {
    const chars = new Map<string, number>();
    const files = await readdir("src", { recursive: true });
    for (const file of files) {
        if (!file.endsWith(".md")) {
            continue;
        }
        
        const content: String = await readFile(`src/${file}`, { encoding: 'utf8' });
        for (const c of [...content]) {
            const current = chars.get(c) || 0;
            chars.set(c, current + 1);
        }
    }
    
    const sorted = [...chars.entries()].sort((a, b) => b[1] - a[1]);
    const is_printable = /[\p{Letter}\p{Number}\p{Punctuation}\p{Symbol}]/u;
    for (const [char, count] of sorted) {
        if (char.match(is_printable)) {
            console.log(`${char}: ${count}`);
        } else {
            console.log(`U+${char.codePointAt(0)?.toString(16).padStart(4, '0')}: ${count}`);
        }
    }
}

go();
