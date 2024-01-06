export type Name =
  string |
  { name: string, lang?: string } |
  { given: string, family: string, familyFirst?: boolean, lang?: string }

export type Organization = { orgName: string, orgAbbr?: string, orgLang?: string, orgUrl?: string }

export type LicenseName
  = "cc0"
  | "cc-by"
  | "cc-by-sa"
  | "cc-by-nd"
  | "cc-by-nc"
  | "cc-by-nc-sa"
  | "cc-by-nc-nd"
  | "with-permission"
  | "us-fair-use"
  | "terms"

export type LicenseVersion = "2.0" | "2.5" | "3.0" | "4.0"


type CommonInfo = {
  identifier?: string,
  originalUrl?: string,
  copyrightYear?: number,
  author?: Name,
  organization?: Organization,
  licenseVersion?: LicenseVersion,
  license: LicenseName,
  termsUrl?: string,
  hidden?: boolean, // don’t render this?
}

// this just requires Organization for stock-image license
type StockInfo = {
  identifier?: string,
  originalUrl?: string,
  copyrightYear?: number,
  author?: Name,
  organization: Organization,
  licenseVersion?: LicenseVersion,
  license: "stock-image",
  hidden?: boolean,
}

export type SourceInfo = CommonInfo | StockInfo
export type SizePosition
  = { size: "wide", position?: "aside" }
  | { size?: "small", position?: "left" | "right" | "aside" }
  | { size: "extra-wide", position?: "aside" };


export type Author = {
  readonly family?: string,
  readonly given: (readonly string[] | string),
  readonly lang?: string,
  readonly alt?: string,
  readonly ["alt-lang"]?: string
}

export type Date
    = number
    | ({ year: number }
    | { year: number, month: number }
    | { year: number, month: number, day: number }
    | { year: number, season: string }) & { OS?: boolean }; // OS = old-style date

//11ty types

export type Article<D=Data> = {
  draft?: boolean,
  title: string,
  titleLang?: string,
  url: string,
  children: readonly Article[],
  data: D,
  date: any,
  content: string,
};

export type Context = {
  eleventyNavigation(this: Context, collection: any): Article[];
  asAttr(name: string, value: string | undefined): string;
};

export type Players = 
  | 'banking'
  | 'any'
  | number
  | number[]
  | { min: number, max?: number };

export type GameData = Data & {
  players: Players|undefined,
  equipment: string|undefined,
  variant?: boolean;
  countries: string|undefined,
  subgames: {
    title: string,
    titleLang?: string
    originalTitle?: string,
    players: Players|undefined,
    equipment: string|undefined,
    countries: string|undefined,
    slug?: string,
  }[]
};

export type Data = {
  title: string,
  titleLang?: string,
  originalTitle?: string,
  draft?: boolean,
  collections: {
    all: any;
    article: Article[],
    game: Article<GameData>[],
  },
  // from _data/site.json
  site: {
    url: string,
  }
};
