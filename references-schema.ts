import * as fs from 'node:fs';
import * as path from 'path';
import Ajv, { JSONSchemaType } from 'ajv';
import { parse } from 'yaml';

export type Author = {
    readonly family?: string,
    readonly given: (readonly string[] | string),
    readonly lang?: string,
    readonly alt?: LStr,
    readonly suffix?: string,
}

type Pagination = string

export type Date
    = number
    | (({ year: number }
        | { year: number, month: number }
        | { year: number, month: number, day: number }
        | { year: number, season: string })
        & { circa?: boolean });


const dateSchema: JSONSchemaType<Date> = {
    type: ['integer', 'object'],
    anyOf: [
        { type: 'integer' },
        {
            type: 'object', properties: {
                year: { type: 'integer' },
                month: { type: 'integer' },
                day: { type: 'integer' },
                circa: { type: 'boolean', nullable: true },
            },
            required: ['year', 'month', 'day'],
            additionalProperties: false
        },
        {
            type: 'object', properties: {
                year: { type: 'integer' },
                month: { type: 'integer' },
                circa: { type: 'boolean', nullable: true },
            },
            required: ['year', 'month'],
            additionalProperties: false
        },
        {
            type: 'object', properties: {
                year: { type: 'integer' },
                season: { type: 'string' },
                circa: { type: 'boolean', nullable: true },
            },
            required: ['year', 'season'],
            additionalProperties: false
        },
        {
            type: 'object', properties: {
                year: { type: 'integer' },
                circa: { type: 'boolean', nullable: true },
            },
            required: ['year'],
            additionalProperties: false
        },
    ]
};

export type LStr = string | {
    value: string,
    lang?: string,
    alt?: string
}

const lstrSchema: JSONSchemaType<LStr> = {
    type: ['string', 'object'],
    oneOf: [
        { type: "string" },
        {
            type: "object",
            properties: {
                value: { type: "string" },
                lang: { type: "string", nullable: true },
                alt: { type: "string", nullable: true },
            },
            required: ["value"],
            additionalProperties: false
        }
    ],
};

const authorSchema: JSONSchemaType<Author> = {
    type: "object",
    properties: {
        given: { type: "string" },
        family: { type: "string", nullable: true },
        lang: { type: "string", nullable: true },
        alt: { ...lstrSchema, nullable: true },
        suffix: { type: "string", nullable: true },
    },
    required: ["given"],
    additionalProperties: false,
};

type CommonProps = {
    author?: Author[]
    translator?: Author[]
    title: LStr,
    URL?: string,
    ['archive-URL']?: string,

    notes?: string,
    warnings?: string,
}

const commonProps = {
    title: lstrSchema,
    author: { type: "array", nullable: true, items: authorSchema },
    translator: { type: "array", nullable: true, items: authorSchema },
    URL: { type: "string", nullable: true },
    "archive-URL": { type: "string", nullable: true },
    notes: { type: "string", nullable: true },
    warnings: { type: "string", nullable: true },
} as const;

type Series = {
    title: LStr,
    volume?: number,
    number?: number,
    URL?: string,
    ISSN?: string,
}

const seriesSchema: JSONSchemaType<Series> = {
    type: "object",
    properties: {
        title: lstrSchema,
        volume: { type: "integer", nullable: true },
        number: { type: "integer", nullable: true },
        URL: { type: "string", nullable: true },
        ISSN: { type: "string", nullable: true },
    },
    required: ['title'],
    additionalProperties: false
}

export type Book = CommonProps & {
    type: "book",
    ISBN?: string,
    issued?: Date,
    publisher?: LStr,
    ["publisher-place"]?: string,
    volume?: string,
    ["volume-title"]?: LStr,
    editor?: Author[],
    edition?: number,
    series?: Series,

    ['original-publisher']?: string,
    ['original-date']?: Date,
    ['original-title']?: string,
}

const bookSchema: JSONSchemaType<Book> = {
    type: "object",
    properties: {
        type: { const: "book", type: "string", default: "book" },
        ...commonProps,
        ISBN: { type: "string", nullable: true },
        issued: { ...dateSchema, nullable: true },
        volume: { type: "string", nullable: true },
        "volume-title": { ...lstrSchema, nullable: true },
        edition: { type: "integer", nullable: true },
        publisher: { ...lstrSchema, nullable: true },
        editor: { type: "array", items: authorSchema, nullable: true },
        series: { ...seriesSchema, nullable: true },
        "publisher-place": { type: "string", nullable: true },
        "original-date": { ...dateSchema, nullable: true },
        "original-publisher": { type: "string", nullable: true },
        "original-title": { type: "string", nullable: true },
    },
    required: ['title'],
    additionalProperties: false
};

type Chapter = CommonProps & {
    type: "chapter",
    in: Book,
    page?: Pagination
}

const chapterSchema: JSONSchemaType<Chapter> = {
    type: "object",
    properties: {
        type: { const: "chapter", type: "string" },
        ...commonProps,
        page: { type: "string", nullable: true },
        in: bookSchema,
    },
    required: ['type', 'title', 'in'],
    additionalProperties: false
};

type Document = CommonProps & {
    type: "document"
    issued: Date,
    publisher?: LStr,
    ["publisher-place"]?: string,
}

const documentSchema: JSONSchemaType<Document> = {
    type: "object",
    properties: {
        type: { const: "document", type: "string" },
        ...commonProps,
        issued: dateSchema,
        publisher: { ...lstrSchema, nullable: true },
        "publisher-place": { type: "string", nullable: true },
    },
    required: ['title'],
    additionalProperties: false
};

type ConferencePaper = CommonProps & {
    type: "paper-conference"
    page?: Pagination,
    in: Book
    // TODO: conference date?
}

const conferencePaperSchema: JSONSchemaType<ConferencePaper> = {
    type: "object",
    properties: {
        type: { const: "paper-conference", type: "string" },
        ...commonProps,
        in: bookSchema,
        page: { type: "string", nullable: true },
    },
    required: ['title'],
    additionalProperties: false
}

type Thesis = CommonProps & {
    type: "thesis",
    genre: string,
    publisher?: string,
    ["publisher-place"]?: string,
    issued: Date,
    volume?: number,
};

const thesisSchema: JSONSchemaType<Thesis> = {
    type: "object",
    properties: {
        type: { const: "thesis", type: "string" },
        ...commonProps,
        issued: dateSchema,
        genre: { type: "string", default: "Thesis" },
        publisher: { type: "string", nullable: true },
        volume: { type: "integer", nullable: true },
        "publisher-place": { type: "string", nullable: true },
    },
    required: ['title'],
    additionalProperties: false
};

type Patent = CommonProps & {
    type: "patent",
    filed: Date,
    issued: Date,
    patentNumber?: string,
    applicationNumber?: string,
}

const patentSchema: JSONSchemaType<Patent> = {
    "type": "object",
    properties: {
        type: { const: "patent", type: "string" },
        ...commonProps,
        filed: dateSchema,
        issued: dateSchema,
        patentNumber: { type: "string", nullable: true },
        applicationNumber: { type: "string", nullable: true }
    },
    required: ['title']
}

type WebPage = CommonProps & {
    type: "webpage",
    editor?: Author[],
    ["container-title"]?: LStr,
    edition?: number,
    issued: Date,
    publisher?: LStr,
    ['publisher-place']?: string,
}

const webpageSchema: JSONSchemaType<WebPage> = {
    type: "object",
    properties: {
        type: { const: "webpage", type: "string" },
        ...commonProps,
        editor: { type: "array", items: authorSchema, nullable: true },
        issued: dateSchema,
        edition: { type: "integer", nullable: true },
        "container-title": { ...lstrSchema, nullable: true },
        "publisher-place": { type: "string", nullable: true },
        publisher: { ...lstrSchema, nullable: true },
    },
    required: ['title'],
    additionalProperties: false
};

export type Periodical = {
    title: LStr
    volume?: number,
    issue?: number,
    issued: Date,
    ISSN?: string,
    editor?: Author[],
    publisher?: LStr,
    ['publisher-place']?: string,
}

const periodicalSchema: JSONSchemaType<Periodical> = {
    type: "object",
    properties: {
        title: lstrSchema,
        issued: dateSchema,
        volume: { type: "integer", nullable: true },
        issue: { type: "integer", nullable: true },
        ISSN: { type: "string", nullable: true },
        publisher: { ...lstrSchema, nullable: true },
        editor: { type: "array", items: authorSchema, nullable: true },
        'publisher-place': { type: "string", nullable: true },
    },
    required: ['title', 'issued'],
    additionalProperties: false
}

type MagazineArticle = CommonProps & {
    type: "article-magazine",
    page?: Pagination,
    in: Periodical
}

const magazineArticleSchema: JSONSchemaType<MagazineArticle> = {
    type: "object",
    properties: {
        type: { const: "article-magazine", type: "string" },
        ...commonProps,
        page: { type: "string", nullable: true },
        in: periodicalSchema,
    },
    required: ['title', 'in'],
    additionalProperties: false
}

type NewspaperArticle = CommonProps & {
    type: "article-newspaper",
    page?: Pagination,
    in: Periodical
}

const newspaperArticleSchema: JSONSchemaType<NewspaperArticle> = {
    type: "object",
    properties: {
        type: { const: "article-newspaper", type: "string" },
        ...commonProps,
        page: { type: "string", nullable: true },
        in: periodicalSchema,
    },
    required: ['title', 'in'],
    additionalProperties: false
}

type JournalArticle = CommonProps & {
    type: "article-journal",
    page?: Pagination,
    in: Periodical
}

const journalArticleSchema: JSONSchemaType<JournalArticle> = {
    type: "object",
    properties: {
        type: { const: "article-journal", type: "string" },
        ...commonProps,
        page: { type: "string", nullable: true },
        in: periodicalSchema,
    },
    required: ['title', 'in'],
    additionalProperties: false
};

export type Reference
    = Book
    | Chapter
    | JournalArticle
    | Document
    | WebPage
    | ConferencePaper
    | NewspaperArticle
    | Thesis
    | MagazineArticle
    | Patent

export type BiblioRef = { id: string } & Reference

const referenceSchema: JSONSchemaType<Reference> = {
    type: "object",
    discriminator: {
        propertyName: "type"
    },
    required: ["type"],
    oneOf: [
        bookSchema,
        chapterSchema,
        journalArticleSchema,
        documentSchema,
        webpageSchema,
        conferencePaperSchema,
        newspaperArticleSchema,
        thesisSchema,
        magazineArticleSchema,
        patentSchema,
    ]
};

export type Bibliography = Record<string, Reference>;

const bibliographySchema: JSONSchemaType<Bibliography> = {
    type: "object",
    additionalProperties: referenceSchema,
    required: []
};

const ajv = new Ajv({ discriminator: true, allowUnionTypes: true, coerceTypes: "array", useDefaults: true });
export const referenceValidator = ajv.compile(bibliographySchema);

export function publicationYear(r: Reference) {
    const issued =
        'issued' in r && r.issued
            ? r.issued
            : 'in' in r && r.in.issued
                ? r.in.issued
                : 'filed' in r && r.filed
                    ? r.filed
                    : undefined;

    if (!issued) {
        return 'n.d.';
    }

    return typeof issued === 'number' ? issued : issued.year;
}
