use std::{
    collections::BTreeMap,
    sync::{LazyLock, Mutex},
};

use icu::{
    experimental::displaynames::LanguageDisplayNames,
    locid::{
        locale,
        subtags::{language, Language},
        Locale,
    },
};

pub struct Intl {
    english_display_names: LanguageDisplayNames,
    other_display_names: Mutex<BTreeMap<Language, Option<String>>>,
}

impl Intl {
    pub fn new() -> Self {
        let locale = locale!("en-GB").into();
        let options = Default::default();
        let english_display_names = LanguageDisplayNames::try_new(&locale, options).unwrap();

        let mut other_display_names = BTreeMap::new();
        // backfill missing values
        other_display_names.insert(language!("cmn"), Some("官话".into()));
        other_display_names.insert(language!("ewe"), Some("Eʋegbe".into()));
        other_display_names.insert(language!("gez"), Some("ግዕዝ".into()));
        other_display_names.insert(language!("kxd"), Some("Bahasa Melayu Brunei".into()));
        other_display_names.insert(language!("mak"), Some("ᨅᨔ ᨆᨀᨔᨑ".into()));
        other_display_names.insert(language!("mcm"), Some("Papia Kristang".into()));
        other_display_names.insert(language!("nan"), Some("閩南語".into()));
        other_display_names.insert(language!("rng"), Some("XiRonga".into()));
        other_display_names.insert(language!("tws"), Some("潮州話".into()));
        other_display_names.insert(language!("wuu"), Some("吳語".into()));

        Self {
            english_display_names,
            other_display_names: Mutex::new(other_display_names),
        }
    }

    pub fn english_name(&self, language: Language) -> Option<&str> {
        self.english_display_names.of(language).or_else(|| {
            match language.as_str() {
                "cmn" => "Mandarin Chinese",
                "kew" => "Kewa",
                "kxd" => "Brunei Malay",
                "mbw" => "Maring",
                "mcm" => "Kristang",
                "mnk" => "Mandinka",
                "mnr" => "Mono",
                "rng" => "Ronga",
                "stv" => "Siltʼe",
                "tws" => "Teochew",
                "urh" => "Urhobo",
                _ => return None,
            }
            .into()
        })
    }

    pub fn autonym(&self, language: Language) -> Option<String> {
        self.other_display_names
            .lock()
            .unwrap()
            .entry(language)
            .or_insert_with_key(|key| {
                let locale = Locale::from(*key).into();
                let options = Default::default();
                LanguageDisplayNames::try_new(&locale, options)
                    .ok()
                    .and_then(|display_names| display_names.of(*key).map(str::to_string))
            })
            .clone()
    }
}

pub static INTL: LazyLock<Intl> = LazyLock::new(Intl::new);
