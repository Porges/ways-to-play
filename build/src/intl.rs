use std::{
    borrow::Cow,
    collections::HashMap,
    sync::{LazyLock, Mutex},
};

use eyre::Result;
use icu::{
    casemap::{TitlecaseMapper, TitlecaseMapperBorrowed},
    collator::{
        options::{CollatorOptions, Strength},
        preferences::CollationNumericOrdering,
        Collator, CollatorBorrowed, CollatorPreferences,
    },
    decimal::{input::Decimal, DecimalFormatter, DecimalFormatterPreferences},
    experimental::displaynames::{
        DisplayNamesPreferences, LanguageDisplayNames, RegionDisplayNames,
    },
    locale::{
        langid, locale,
        subtags::{variant, Language, Region, Variants},
        LanguageIdentifier, Locale,
    },
};

pub struct Intl {
    english_region_names: RegionDisplayNames,
    english_collator: CollatorBorrowed<'static>,
    titlecase_mapper: TitlecaseMapperBorrowed<'static>,
    english_display_names: LanguageDisplayNames,
    english_specific_names: HashMap<LanguageIdentifier, &'static str>,
    autonym_display_names: Mutex<HashMap<LanguageIdentifier, Option<String>>>,
    number_formatter: DecimalFormatter,
}

impl Intl {
    pub fn new() -> Self {
        let locale: Locale = locale!("en-GB");
        let options = Default::default();

        let display_names_prefs = DisplayNamesPreferences::from(&locale);

        let english_display_names =
            LanguageDisplayNames::try_new(display_names_prefs, options).unwrap();

        let mut english_specific_names = HashMap::new();
        // add some missing values as well as extensions/overrides
        english_specific_names.insert(langid!("cmn"), "Mandarin Chinese");
        english_specific_names.insert(langid!("gup"), "Kunwinjku"); // other dialects as well but this is the only one used so far
        english_specific_names.insert(langid!("kew"), "Kewa");
        english_specific_names.insert(langid!("kxd"), "Brunei Malay");
        english_specific_names.insert(langid!("mbw"), "Maring");
        english_specific_names.insert(langid!("mcm"), "Kristang");
        english_specific_names.insert(langid!("mfa"), "Kelantan–Pattani Malay");
        english_specific_names.insert(langid!("mnk"), "Mandinka");
        english_specific_names.insert(langid!("mnr"), "Mono");
        english_specific_names.insert(langid!("nan"), "Hokkien");
        english_specific_names.insert(langid!("nan-TW"), "Taiwanese Hokkien");
        english_specific_names.insert(langid!("nan-teochew"), "Teochew");
        english_specific_names.insert(langid!("nl-BE"), "Flemish");
        english_specific_names.insert(langid!("rng"), "Ronga");
        english_specific_names.insert(langid!("stv"), "Siltʼe");
        english_specific_names.insert(langid!("urh"), "Urhobo");
        english_specific_names.insert(langid!("wni"), "Comorian (Ndzwani)");

        let mut autonym_display_names = HashMap::new();
        // backfill some missing values
        autonym_display_names.insert(langid!("cmn"), Some("官话".into()));
        autonym_display_names.insert(langid!("es-CU"), Some("español cubano".into()));
        autonym_display_names.insert(langid!("ewe"), Some("Eʋegbe".into()));
        autonym_display_names.insert(langid!("gez"), Some("ግዕዝ".into()));
        autonym_display_names.insert(langid!("grc"), Some("Ἑλληνική".into()));
        autonym_display_names.insert(langid!("gsw"), Some("Schwiizerdütsch".into()));
        autonym_display_names.insert(langid!("kxd"), Some("Bahasa Melayu Brunei".into()));
        autonym_display_names.insert(langid!("mak"), Some("ᨅᨔ ᨆᨀᨔᨑ".into()));
        autonym_display_names.insert(langid!("mcm"), Some("Papia Kristang".into()));
        autonym_display_names.insert(langid!("nan"), Some("閩南語".into()));
        autonym_display_names.insert(langid!("nan-TW"), Some("臺語".into()));
        autonym_display_names.insert(langid!("nan-teochew"), Some("潮州話".into()));
        autonym_display_names.insert(langid!("nl-BE"), Some("Vlaams".into()));
        autonym_display_names.insert(langid!("rng"), Some("XiRonga".into()));
        autonym_display_names.insert(langid!("st"), Some("Sesotho".into()));
        autonym_display_names.insert(langid!("wuu"), Some("吳語".into()));

        let mut collator_options = CollatorOptions::default();
        collator_options.strength = Some(Strength::Primary);
        let mut collator_prefs = CollatorPreferences::from(&locale);
        collator_prefs.numeric_ordering = Some(CollationNumericOrdering::True);
        let english_collator = Collator::try_new(collator_prefs, collator_options).unwrap();

        let region_options = Default::default();
        let english_region_names =
            RegionDisplayNames::try_new(display_names_prefs, region_options).unwrap();

        let number_options = Default::default();
        let dec_formatter_prefs = DecimalFormatterPreferences::from(&locale);
        let number_formatter =
            DecimalFormatter::try_new(dec_formatter_prefs, number_options).unwrap();

        Self {
            english_collator,
            english_display_names,
            english_specific_names,
            english_region_names,
            autonym_display_names: Mutex::new(autonym_display_names),
            titlecase_mapper: TitlecaseMapper::new(),
            number_formatter,
        }
    }

    pub fn english_name(&self, language: &LanguageIdentifier) -> Option<Cow<str>> {
        if let Some(&name) = self.english_specific_names.get(language) {
            return Some(name.into());
        }

        let mut result: Cow<str> = self.english_display_names.of(language.language)?.into();

        if let Some(region) = language.region {
            result = format!("{} ({})", result, self.region_name(region).unwrap()).into();
        }

        Some(result)
    }

    pub fn region_name(&self, region: Region) -> Option<&str> {
        self.english_region_names.of(region)
    }

    pub fn language_without_script(&self, language: &LanguageIdentifier) -> LanguageIdentifier {
        // keep known variants
        // note that nan-Latn-pengim and nan-teochew should both normalize to "nan-teochew"
        let teochew = variant!("teochew");
        let pengim = variant!("pengim");

        // TODO: check that we aren't dropping anything we don't know about
        let mut variants = Vec::new();
        if language.variants.contains(&teochew) || language.variants.contains(&pengim) {
            variants.push(teochew);
        }

        variants.sort();

        LanguageIdentifier {
            script: None,
            variants: Variants::from_vec_unchecked(variants),
            language: language.language,
            region: language.region,
        }
    }

    pub fn autonym(&self, language: &LanguageIdentifier) -> Option<String> {
        let language = self.language_without_script(language);
        self.autonym_display_names
            .lock()
            .unwrap()
            .entry(language)
            .or_insert_with_key(|key| {
                let locale = Locale::from(key.language).into();
                let options = Default::default();
                LanguageDisplayNames::try_new(locale, options)
                    .ok()
                    .and_then(|display_names| display_names.of(key.language).map(str::to_string))
            })
            .clone()
    }

    pub fn collator_english(&self) -> &CollatorBorrowed<'static> {
        &self.english_collator
    }

    pub fn collator_for(&self, language: Language) -> CollatorBorrowed<'static> {
        let mut opts = CollatorOptions::default();
        opts.strength = Some(Strength::Primary);
        let mut prefs: CollatorPreferences = Locale::from(language).into();
        prefs.numeric_ordering = Some(CollationNumericOrdering::True);
        Collator::try_new(prefs, opts).ok().unwrap_or_else(|| {
            let mut def: CollatorPreferences = Default::default();
            def.numeric_ordering = Some(CollationNumericOrdering::True);
            Collator::try_new(def, opts).unwrap()
        })
    }

    pub fn titlecase(&self, language: Language, text: &str) -> String {
        let locale = Locale::from(language).into();
        let options = Default::default();
        self.titlecase_mapper
            .titlecase_segment_to_string(text, &locale, options)
    }

    pub fn parse_lang_tag(&self, input: &str) -> Result<LanguageIdentifier> {
        LanguageIdentifier::try_from_utf8(input.as_bytes())
            .map_err(|e| eyre::eyre!("invalid language tag `{input}`: {e}"))
    }

    pub fn format_number(&self, num: impl Into<Decimal>) -> String {
        self.number_formatter.format_to_string(&num.into())
    }
}

pub static INTL: LazyLock<Intl> = LazyLock::new(Intl::new);
