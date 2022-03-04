export type Name =
  string |
  { name: string, lang?: string } |
  { given: string, family: string, familyFirst?: boolean, lang?: string }

export type Organization = { orgName: string, orgAbbr?: string, orgLang?: string, orgURL?: string }

export type LicenseName
  = "cc0"
  | "cc-by"
  | "cc-by-sa"
  | "cc-by-nd"
  | "cc-by-nc"
  | "cc-by-nc-sa"
  | "cc-by-nc-nd"
  | "gpl"
  | "with-permission"
  | "us-fair-use"

export type LicenseVersion = "2.0" | "2.5" | "3.0" | "4.0"


type CommonInfo = {
  identifier?: string,
  originalUrl?: string,
  copyrightYear?: number,
  author?: Name,
  organization?: Organization,
  licenseVersion?: LicenseVersion,
  license: LicenseName,
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
}

export type SourceInfo = CommonInfo | StockInfo
export type SizePosition
  = { size: "wide", position?: "aside" }
  | { size?: "small", position?: "left" | "right" | "aside" }
  | { size: "extra-wide", position?: "aside" };
