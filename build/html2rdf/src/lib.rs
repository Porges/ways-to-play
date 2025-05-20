use std::cell::RefCell;
use std::collections::HashSet;
use std::rc::Rc;
use std::{borrow::Cow, str::FromStr};

use curie::{Curie, ExpansionError, PrefixMapping};
use icu::locale::LanguageIdentifier;
use itertools::Itertools;
use oxiri::Iri;
use oxrdf::{Graph, NamedOrBlankNode, TripleRef};
use scraper::{ElementRef, Html};

pub fn parse(
    input: &str,
    mut base: Iri<String>,
    output_graph: &mut Graph,
    processor_graph: &mut Graph,
) -> Result<(), Error> {
    let get_err = || -> Result<(), Error> {
        let doc = Html::parse_document(input);
        if !doc.errors.is_empty() {
            for err in doc.errors.iter() {
                println!("Error: {}", err);
            }
        }
        let mut proc = RDFaProcessor::new(output_graph, processor_graph);

        let base_sel = scraper::selector::Selector::parse("html>head>base").unwrap();

        if let Some(base_el) = doc.select(&base_sel).next() {
            if let Some(base_href) = base_el.attr("href") {
                base =
                    Iri::parse(base_href.to_string()).map_err(|source| Error::IriParseError {
                        source,
                        iri: base_href.to_string(),
                    })?;
            }
        }

        let eval_context = EvaluationContext::new(base);
        proc.run(eval_context, doc)?;
        Ok(())
    }();

    if let Err(e) = get_err {
        emit_processor(processor_graph, PGType::DocumentError, &e.to_string());
    }

    Ok(())
}

#[derive(Clone)]
// “During processing, each rule is applied using information provided by an evaluation context.
//  An initial context is created when processing begins. That context has the following members:
struct EvaluationContext {
    // “The base. This will usually be the IRI of the document being processed,
    //  but it could be some other IRI, set by some other mechanism, such as the (X)HTML base element.
    //  The important thing is that it establishes an IRI against which relative paths can be resolved.
    base: Iri<String>,

    // “The parent subject. The initial value will be the same as the initial value of base,
    //  but it will usually change during the course of processing.
    parent_subject: Option<Rc<oxrdf::Subject>>,

    // “The parent object. In some situations the object of a statement becomes the subject
    //  of any nested statements, and this member is used to convey this value. Note that this
    //  value may be a bnode, since in some situations a number of nested statements are grouped
    //  together on one bnode. This means that the bnode must be set in the containing statement and passed down.
    parent_object: Option<Rc<oxrdf::Subject>>, // note that this is a subject, not an object, but the parent object cannot be a term

    // “A list of current, in-scope IRI mappings.
    iri_mappings: Rc<curie::PrefixMapping>,

    // “A list of incomplete triples. A triple can be incomplete when no object resource is provided
    //  alongside a predicate that requires a resource (i.e., @rel or @rev). The triples can be completed
    //  when a resource becomes available, which will be when the next subject is specified
    //  (part of the process called chaining).
    incomplete_triples: HashSet<IncompleteTriple>,

    // “A list mapping that associates IRIs with lists.
    list_mapping: indexmap::IndexMap<oxrdf::NamedNode, Rc<RefCell<Vec<Rc<oxrdf::Subject>>>>>,

    // “The language. Note that there is no default language.
    language: Option<Rc<LanguageIdentifier>>,

    // “The term mappings, a list of terms and their associated IRIs.
    //  This specification does not define an initial list. Host Languages MAY define an initial list.
    term_mappings: indexmap::IndexMap<String, oxrdf::NamedNode>,

    // “The default vocabulary, a value to use as the prefix IRI when a term unknown to the RDFa Processor
    //  is used. This specification does not define an initial setting for the default vocabulary.
    //  Host Languages MAY define an initial setting.
    default_vocab: Option<oxrdf::NamedNode>,
}

// “During the course of processing a number of locally scoped values are needed, as follows:
struct LocalScope<'a> {
    emit_warning: &'a dyn Fn(PGType, String),
    eval_context: &'a EvaluationContext,
    // “An initially empty list of IRI mappings, called the local list of IRI mappings.
    iri_mappings: Rc<curie::PrefixMapping>,
    // “An initially empty list of incomplete triples, called the local list of incomplete triples.
    incomplete_triples: HashSet<IncompleteTriple>,
    // “An initially empty language value.
    current_language: Option<Rc<LanguageIdentifier>>,
    // “A skip element flag, which indicates whether the current element can safely be ignored
    //  since it has no relevant RDFa attributes. Note that descendant elements will still be processed.
    skip_element: bool,
    // “A new subject value, which once calculated will set the parent subject in an evaluation context,
    //  as well as being used to complete any incomplete triples, as described in the next section.
    new_subject: Option<Rc<oxrdf::Subject>>,
    // “A value for the current object resource, the resource to use when creating triples that have a resource object.
    current_object_resource: Option<Rc<oxrdf::Subject>>,
    // “A value for the typed resource, the source for creating rdf:type relationships to types specified in @typeof.
    // NB: we store the 'types' alongside
    typed_resource: Option<Rc<oxrdf::Subject>>,
    // “The local term mappings, a list of terms and their associated IRIs.
    term_mappings: indexmap::IndexMap<String, oxrdf::NamedNode>,
    // “The local list mapping, mapping IRIs to lists
    list_mapping: indexmap::IndexMap<oxrdf::NamedNode, Rc<RefCell<Vec<Rc<oxrdf::Subject>>>>>,
    // “A local default vocabulary, an IRI to use as a prefix mapping when a term is used.
    default_vocab: Option<oxrdf::NamedNode>,
}

impl<'b> LocalScope<'b> {
    fn new(eval_context: &'b EvaluationContext, emit_warning: &'b dyn Fn(PGType, String)) -> Self {
        // “First, the local values are initialized, as follows:
        Self {
            emit_warning,
            eval_context,
            // “the skip element flag is set to 'false';
            skip_element: false,
            // “new subject is set to null;
            new_subject: None,
            // “current object resource is set to null;
            current_object_resource: None,
            // “typed resource is set to null;
            typed_resource: None,
            // “the local list of IRI mappings is set to the list of IRI mappings from the evaluation context;
            iri_mappings: eval_context.iri_mappings.clone(),
            // “the local list of incomplete triples is set to null;
            incomplete_triples: HashSet::new(),
            // “the list mapping is set to (a reference of) the list mapping from the evaluation context;
            list_mapping: eval_context.list_mapping.clone(),
            // “the current language value is set to the language value from the evaluation context.
            current_language: eval_context.language.clone(),
            // “the local term mappings is set to the term mappings from the evaluation context.
            term_mappings: eval_context.term_mappings.clone(),
            // “the local default vocabulary is set to the default vocabulary from the evaluation context.
            default_vocab: eval_context.default_vocab.clone(),
        }
    }

    fn empty_curie(&self) -> oxrdf::NamedNodeRef {
        oxrdf::NamedNodeRef::new_unchecked(self.eval_context.base.as_str())
    }

    fn resolve_curie(&self, value: &str) -> Result<NamedOrBlankNode, curie::ExpansionError> {
        let curie = if let Some((prefix, suffix)) = value.split_once(':') {
            if prefix == "_" {
                if suffix.is_empty() {
                    // _: is not handled correctly by oxrdf yet
                    return Ok(oxrdf::BlankNode::new_unchecked("").into());
                }

                return Ok(oxrdf::BlankNode::new(suffix).expect("TODO").into());
            }

            Curie::new(Some(prefix), suffix)
        } else {
            Curie::new(None, value)
        };

        let iri = self.iri_mappings.expand_curie(&curie)?;
        debug_assert!(Iri::parse(iri.as_str()).is_ok());
        Ok(oxrdf::NamedNode::new_unchecked(Iri::parse_unchecked(iri).into_inner()).into())
    }

    fn safecuri_or_curie_or_iri(&self, value: &str) -> Result<Option<NamedOrBlankNode>, Error> {
        self.curie_or_iri(value, true)
    }

    fn curie_or_iri(
        &self,
        value: &str,
        allow_safecurie_and_relative_iri: bool,
    ) -> Result<Option<NamedOrBlankNode>, Error> {
        // “When the value is surrounded by square brackets,
        if allow_safecurie_and_relative_iri && value.starts_with('[') && value.ends_with(']') {
            // “then the content within the brackets
            let curie = &value[1..value.len() - 1];
            // “is evaluated as a CURIE according to the CURIE Syntax Definition.
            match self.resolve_curie(curie) {
                Ok(r) => Ok(Some(r)),
                // “If it is not a valid CURIE, the value MUST be ignored.
                Err(ExpansionError::Invalid) => {
                    (self.emit_warning)(
                        PGType::UnresolvedCurie,
                        format!("Unresolved CURIE prefix: [{}]", curie),
                    );
                    Ok(None)
                }
                Err(ExpansionError::MissingDefault) => {
                    (self.emit_warning)(
                        PGType::UnresolvedCurie,
                        format!("CURIE uses default prefix but none is defined: [{}]", curie),
                    );
                    Ok(None)
                }
            }
        }
        // “Otherwise, the value is evaluated as a CURIE.
        else {
            match self.resolve_curie(value.as_ref()) {
                // “If it is a valid CURIE, the resulting IRI is used;
                Ok(iri) => Ok(Some(iri)),
                // “otherwise, the value is processed as an IRI.
                Err(curie_err) => {
                    let iri_result = if allow_safecurie_and_relative_iri {
                        self.eval_context.base.resolve(value)
                    } else {
                        Iri::parse(value.to_string())
                    };

                    match iri_result {
                        Ok(iri) => Ok(Some(
                            oxrdf::NamedNode::new_unchecked(iri.into_inner()).into(),
                        )),
                        Err(source) => {
                            // Not an IRI; ignore the value.
                            if value.is_empty() {
                                return Ok(None);
                            }

                            // not an iri, emit the CURIE resolution warning too
                            match curie_err {
                                ExpansionError::Invalid => {
                                    (self.emit_warning)(
                                        PGType::UnresolvedCurie,
                                        format!("Unresolved CURIE prefix: [{}]", value),
                                    );
                                }
                                ExpansionError::MissingDefault => {
                                    (self.emit_warning)(
                                        PGType::UnresolvedCurie,
                                        format!(
                                            "CURIE uses default prefix but none is defined: [{}]",
                                            value
                                        ),
                                    );
                                }
                            }

                            // TODO: we are meant to ignore this if
                            // !allow_safecurie_and_relative_iri
                            //
                            // not sure about the other case? see 7.4
                            Err(Error::IriParseError {
                                source,
                                iri: value.to_string(),
                            })
                        }
                    }
                }
            }
        }
    }

    fn term_or_curie_or_absiri(&self, value: &str) -> Result<Option<NamedOrBlankNode>, Error> {
        // TODO: this is not an accurate implementation
        if value.starts_with(|c: char| c.is_alphabetic())
            && value[1..]
                .chars()
                .all(|c| c.is_alphanumeric() || "/.-".contains(c))
        {
            // “When an RDFa attribute permits the use of a term,
            //  and the value being evaluated matches the production for term above,
            //  it is transformed to an IRI using the following logic:
            //
            // “If there is a local default vocabulary the IRI is obtained
            //  by concatenating that value and the term.
            if let Some(vocab) = &self.default_vocab {
                // TODO: is Iri + Term always a valid IRI?
                let mut iri = vocab.as_str().to_string();
                iri.push_str(value);
                let named_node =
                    oxrdf::NamedNode::new(iri).map_err(|source| Error::IriParseError {
                        source,
                        iri: format!("{vocab}{value}"),
                    })?;

                Ok(Some(named_node.into()))
            }
            // “Otherwise, check if the term matches an item in the list of local term mappings.
            // “First compare against the list case-sensitively,
            else if let Some(term_iri) = self.term_mappings.get(value) {
                Ok(Some(term_iri.clone().into()))
            } else {
                // “and if there is no match then compare case-insensitively.
                // “If there is a match, use the associated IRI.
                Ok(self.term_mappings.iter().find_map(|(key, iri)| {
                    key.eq_ignore_ascii_case(value).then(|| iri.clone().into())
                }))
            }
        } else {
            Ok(self.curie_or_iri(value, false)?)
        }
    }

    fn term_or_curie_or_absiri_s(&self, value: &str) -> Result<Vec<NamedOrBlankNode>, Error> {
        let mut result = Vec::new();
        for value in value.split_ascii_whitespace() {
            if let Some(iri) = self.term_or_curie_or_absiri(value)? {
                result.push(iri);
            }
        }

        Ok(result)
    }
}

#[derive(Hash, Eq, PartialEq, Clone, Copy)]
enum IncompleteTripleDirection {
    None,
    Forward,
    Reverse,
}

#[derive(Hash, Eq, PartialEq, Clone)]
struct IncompleteTriple {
    direction: IncompleteTripleDirection,
    predicate: oxrdf::NamedNode,
}

impl EvaluationContext {
    fn new(base: Iri<String>) -> Self {
        let mut iri_mappings = PrefixMapping::default();
        for (prefix, iri) in initial_context().mappings() {
            iri_mappings.add_prefix(prefix, iri).unwrap()
        }

        Self {
            parent_subject: Some(Rc::new(oxrdf::NamedNodeRef::from(base.as_ref()).into())),
            base,
            parent_object: None,
            language: None,
            default_vocab: None,
            list_mapping: Default::default(),
            term_mappings: Default::default(),
            incomplete_triples: Default::default(),
            iri_mappings: Rc::new(iri_mappings),
        }
    }
}

#[derive(derive_more::Error, derive_more::Display, derive_more::From, Debug)]
pub enum Error {
    #[display("IRI parse error: `{iri}`")]
    IriParseError {
        source: oxiri::IriParseError,
        iri: String,
    },

    #[display("Invalid prefix: the prefix '_' is reserved.")]
    ReservedPrefixError(#[error(not(source))] curie::InvalidPrefixError),

    #[display("Invalid CURIE: {}", match _0 { curie::ExpansionError::Invalid => "the prefix on the CURIE has no valid mapping", ExpansionError::MissingDefault => "The CURIE uses a default prefix, but one has not been set" })]
    CurieError(#[error(not(source))] curie::ExpansionError),

    #[display("@prefix syntax error: prefix must end with ':'.")]
    NoColonPrefix,

    LanguageIdentifierError(icu::locale::ParseError),
}

mod dc_vocab {
    pub static DESCRIPTION: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://purl.org/dc/terms/description");
}

mod rdfa_vocab {
    pub static ERROR: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://www.w3.org/ns/rdfa#Error");

    pub static WARNING: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://www.w3.org/ns/rdfa#Warning");

    pub static DOCUMENT_ERROR: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://www.w3.org/ns/rdfa#DocumentError");

    pub static VOCAB_REFERENCE_ERROR: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://www.w3.org/ns/rdfa#VocabReferenceError");

    pub static UNRESOLVED_CURIE: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://www.w3.org/ns/rdfa#UnresolvedCurie");

    pub static UNRESOLVED_TERM: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://www.w3.org/ns/rdfa#UnresolvedTerm");

    pub static PREFIX_REDEFINITION: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://www.w3.org/ns/rdfa#PrefixRedefinition");

    pub static CONTEXT_PROPERTY: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://www.w3.org/ns/rdfa#context");

    pub static USES_VOCABULARY: oxrdf::NamedNodeRef =
        oxrdf::NamedNodeRef::new_unchecked("http://www.w3.org/ns/rdfa#usesVocabulary");
}

struct RDFaProcessor<'o, 'p> {
    output_graph: RefCell<&'o mut oxrdf::Graph>,
    processor_graph: RefCell<&'p mut oxrdf::Graph>,
}

enum PGType {
    // Bases
    Error,
    Warning,
    // Derived
    DocumentError,
    VocabReferenceError,
    UnresolvedCurie,
    UnresolvedTerm,
    PrefixRedefinition,
}

impl Into<oxrdf::NamedNodeRef<'static>> for PGType {
    fn into(self) -> oxrdf::NamedNodeRef<'static> {
        match self {
            PGType::Error => rdfa_vocab::ERROR,
            PGType::Warning => rdfa_vocab::WARNING,
            PGType::DocumentError => rdfa_vocab::DOCUMENT_ERROR,
            PGType::VocabReferenceError => rdfa_vocab::VOCAB_REFERENCE_ERROR,
            PGType::UnresolvedCurie => rdfa_vocab::UNRESOLVED_CURIE,
            PGType::UnresolvedTerm => rdfa_vocab::UNRESOLVED_TERM,
            PGType::PrefixRedefinition => rdfa_vocab::PREFIX_REDEFINITION,
        }
    }
}

trait HostLanguage {
    fn default_language(&self) -> Option<LanguageIdentifier>;
    fn default_vocabulary(&self) -> Option<oxrdf::NamedNode>;
}

pub fn initial_context() -> &'static PrefixMapping {
    static INITIAL_CONTEXT: std::sync::OnceLock<PrefixMapping> = std::sync::OnceLock::new();
    // https://www.w3.org/2011/rdfa-context/rdfa-1.1
    INITIAL_CONTEXT.get_or_init(|| {
        let mut mapping = PrefixMapping::default();
        for (prefix, iri) in [
            // Defined by RDFa
            ("", "http://www.w3.org/1999/xhtml/vocab#"),
            // W3C documents
            ("as", "https://www.w3.org/ns/activitystreams#"),
            ("cal", "http://www.w3.org/2002/12/cal/icaltzd#"),
            ("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"),
            ("rdfa", "http://www.w3.org/ns/rdfa#"),
            ("xhv", "http://www.w3.org/1999/xhtml/vocab#"),
            ("xml", "http://www.w3.org/XML/1998/namespace"),
            ("xsd", "http://www.w3.org/2001/XMLSchema#"),
            // "widely used"
            ("cc", "http://creativecommons.org/ns#"),
            ("dc", "http://purl.org/dc/terms/"),
            ("dcterms", "http://purl.org/dc/terms/"),
            ("dc11", "http://purl.org/dc/elements/1.1/"),
            ("foaf", "http://xmlns.com/foaf/0.1/"),
            ("schema", "http://schema.org/"),
            ("schemas", "https://schema.org/"),
        ] {
            mapping.add_prefix(prefix, iri).unwrap();
        }
        mapping
    })
}

struct HTMLHost {}

// [HTML-RDFA] 3.1
// “Documents conforming to the rules in this specification are processed
//  according to [rdfa-core] with the following extensions:
impl HostLanguage for &HTMLHost {
    // “The default vocabulary URI is undefined.
    fn default_vocabulary(&self) -> Option<oxrdf::NamedNode> {
        None // TODO
    }

    // “The current language can be set using either the @lang
    //  or @xml:lang attributes. When the @lang attribute and
    //  the @xml:lang attribute are specified on the same element,
    //  the @xml:lang attribute takes precedence. When both @lang
    //  and @xml:lang are specified on the same element, they MUST
    //  have the same value. Further details related to setting the
    //  current language can be found in section 3.3 Specifying the
    //  Language for a Literal.
    fn default_language(&self) -> Option<LanguageIdentifier> {
        None
    }

    // “HTML+RDFa uses an additional initial context by default,
    //  http://www.w3.org/2011/rdfa-context/html-rdfa-1.1, which must
    //  be applied after the initial context for [rdfa-core]
    //  (http://www.w3.org/2011/rdfa-context/rdfa-1.1).
    // NB: note that the "additional initial context" is currently empty.
}

fn emit_processor(pg: &mut Graph, pg_type: PGType, msg: &str) {
    let warning_subj: oxrdf::Subject = oxrdf::BlankNode::default().into();
    let pg_type: oxrdf::NamedNodeRef = pg_type.into();
    // new bnode is-a PGClass
    pg.insert(TripleRef::new(
        &warning_subj,
        oxrdf::vocab::rdf::TYPE,
        pg_type,
    ));
    // add description
    pg.insert(TripleRef::new(
        &warning_subj,
        dc_vocab::DESCRIPTION,
        oxrdf::LiteralRef::new_simple_literal(msg),
    ));
}

impl<'o, 'p> RDFaProcessor<'o, 'p> {
    fn new(output_graph: &'o mut oxrdf::Graph, processor_graph: &'p mut oxrdf::Graph) -> Self {
        Self {
            output_graph: RefCell::new(output_graph),
            processor_graph: RefCell::new(processor_graph),
        }
    }

    fn run(&mut self, eval_context: EvaluationContext, html: Html) -> Result<(), Error> {
        // TODO: we need a marker on the stack to emit list elements
        let mut stack = vec![(0, html.root_element(), Rc::new(eval_context))];

        let host = HTMLHost {};

        while let Some((depth, element, ctx)) = stack.pop() {
            let ctx = Rc::new(self.process_element(&ctx, element, &host)?);
            for child in element.children().rev() {
                if let Some(elref) = ElementRef::wrap(child) {
                    stack.push((depth + 1, elref, ctx.clone()));
                }
            }
        }

        Ok(())
    }

    fn emit_output(&self, tr: TripleRef) {
        self.output_graph.borrow_mut().insert(tr);
    }

    // TOD: implement https://www.w3.org/TR/html-rdfa/#h-additional-rules
    fn process_element(
        &mut self,
        eval_context: &EvaluationContext,
        element: scraper::ElementRef,
        host: impl HostLanguage,
    ) -> Result<EvaluationContext, Error> {
        let emit_warning = |pgtype: PGType, msg: String| {
            let mut pg = self.processor_graph.borrow_mut();
            emit_processor(&mut pg, pgtype, &msg);
        };

        let el = element.value();
        // RDFa + HTML
        let is_root_element = el.name() == "html" || el.name() == "head" || el.name() == "body";

        // 1.
        let mut local = LocalScope::new(eval_context, &emit_warning);
        let handle_iri = |value: Option<&str>| -> Result<Option<oxrdf::NamedNode>, Error> {
            let Some(value) = value else { return Ok(None) };
            let iri = eval_context
                .base
                .resolve(value)
                .map_err(|source| Error::IriParseError {
                    source,
                    iri: value.to_string(),
                })?;
            let node = oxrdf::NamedNode::new_unchecked(iri.into_inner());
            Ok(Some(node))
        };

        // 2.0
        // “Next the current element is examined for any change to the default vocabulary via @vocab.
        if let Some(vocab) = handle_iri(el.attr("vocab"))? {
            // “If @vocab is present and contains a value, the local default vocabulary is updated according
            //  to the section on CURIE and IRI Processing.
            if !vocab.as_str().is_empty() {
                self.emit_output(TripleRef::new(
                    oxrdf::NamedNodeRef::from(eval_context.base.as_ref()),
                    rdfa_vocab::USES_VOCABULARY,
                    vocab.as_ref(),
                ));
                local.default_vocab = Some(vocab);
            } else {
                // “If the value is empty, then the local default vocabulary
                //  MUST be reset to the Host Language defined default (if any).
                local.default_vocab = host.default_vocabulary();
            }
        }

        // 3.
        // “Next, the current element is examined for IRI mappings and these are added to the local list of IRI mappings.
        //  Note that an IRI mapping will simply overwrite any current mapping in the list that has the same name;
        let xmlns_prefixes = el
            .attrs
            .iter()
            .filter(|(qn, _)| qn.prefix.as_deref() == Some("xmlns"))
            .map(|(qn, val)| (qn.local.as_ref(), val.as_ref()))
            .collect::<Vec<_>>();

        let prefixes = el
            .attr("prefix")
            .map(|x| {
                x.split_ascii_whitespace()
                    .tuples()
                    .map(|(prefix, value)| {
                        if let Some(prefix) = prefix.strip_suffix(':') {
                            Ok((prefix, value))
                        } else {
                            Err(Error::NoColonPrefix)
                        }
                    })
                    .collect::<Result<Vec<_>, Error>>()
            })
            .transpose()?
            .unwrap_or_default();

        if !xmlns_prefixes.is_empty() || !prefixes.is_empty() {
            let mut mappings = PrefixMapping::default();

            // note that we do not set_default, this would define a "no prefix" mapping
            // which is MUST NOT in RDFa

            // clone parent
            for (prefix, value) in local.iri_mappings.mappings() {
                mappings.add_prefix(prefix, value).unwrap(); // already checked
            }

            // add XMLNS (must be first)
            for (prefix, iri) in xmlns_prefixes {
                mappings.add_prefix(prefix, iri).expect("TODO");
            }

            // add others (after XMLNS)
            for (prefix, iri) in prefixes {
                mappings.add_prefix(prefix, iri).expect("TODO");
            }

            local.iri_mappings = Rc::new(mappings);
        }

        // 4. Language
        // “The current element is also parsed for any language information,
        //  and if present, current language is set accordingly;
        if let Some(lang) = el.attr("xml:lang").or(el.attr("lang")) {
            // TODO: should come from HostLanguage?
            local.current_language = Some(Rc::new(LanguageIdentifier::from_str(lang)?));
        }

        let handle_safecurie_or_curie_or_iri =
            |value: Option<&str>| -> Result<Option<NamedOrBlankNode>, Error> {
                let Some(value) = value else { return Ok(None) };
                local.safecuri_or_curie_or_iri(value)
            };

        let handle_term_or_curie_or_absiri_s =
            |value: Option<&str>| -> Result<Option<Vec<NamedOrBlankNode>>, Error> {
                let Some(value) = value else { return Ok(None) };
                Ok(Some(local.term_or_curie_or_absiri_s(value)?))
            };

        let handle_term_or_curie_or_absiri =
            |value: Option<&str>| -> Result<Option<NamedOrBlankNode>, Error> {
                let Some(value) = value else { return Ok(None) };
                local.term_or_curie_or_absiri(value)
            };

        let rel: Option<Vec<oxrdf::NamedNode>> = handle_term_or_curie_or_absiri_s(el.attr("rel"))?
            .map(|refs| self.exclude_bnodes("@rel", refs));

        let rev: Option<Vec<oxrdf::NamedNode>> = handle_term_or_curie_or_absiri_s(el.attr("rev"))?
            .map(|refs| self.exclude_bnodes("@rev", refs));

        let property: Option<Vec<oxrdf::NamedNode>> =
            handle_term_or_curie_or_absiri_s(el.attr("property"))?
                .map(|refs| self.exclude_bnodes("@property", refs));

        let datatype = handle_term_or_curie_or_absiri(el.attr("datatype"))?;
        let content = el.attr("content");
        let inlist = el.attr("inlist").is_some();

        let about: Option<Rc<oxrdf::Subject>> =
            handle_safecurie_or_curie_or_iri(el.attr("about"))?.map(|x| Rc::new(x.into()));

        let type_of = handle_term_or_curie_or_absiri_s(el.attr("typeof"))?;

        let resource = handle_safecurie_or_curie_or_iri(el.attr("resource"))?;
        let href = handle_iri(el.attr("href"))?;
        let src = handle_iri(el.attr("src"))?;

        // read from the "resource attributes"
        let resource_iri: Option<Rc<oxrdf::Subject>> = resource
            .or_else(|| href.map(NamedOrBlankNode::from))
            .or_else(|| src.map(NamedOrBlankNode::from))
            .map(|x| Rc::new(oxrdf::Subject::from(x)));

        //5.
        // “If the current element contains no @rel or @rev attribute,
        if rel.is_none() && rev.is_none() {
            // “then the next step is to establish a value for new subject.
            //  This step has two possible alternatives.
            //
            // 5.1
            // “If the current element contains the @property attribute, but does
            //  not contain either the @content or @datatype attributes, then
            if property.is_some() && content.is_none() && datatype.is_none() {
                // "new subject is set to the resource obtained from the first match from the following rule:
                local.new_subject =
                    // “by using the resource from @about, if present,
                    //  obtained according to the section on CURIE and IRI Processing;
                    about.clone()
                    // “otherwise, if the element is the root element of the document,
                    //  then act as if there is an empty @about present,
                    //  and process it according to the rule for @about, above;
                    .or(is_root_element.then(|| Rc::new(local.empty_curie().into())))
                    // “otherwise, if parent object is present, new subject is set to the value of parent object.
                    .or_else(|| eval_context.parent_object.clone());

                // “If @typeof is present then typed resource is set to the resource obtained from
                //  the first match from the following rules:
                if type_of.is_some() {
                    if about.is_some() {
                        // “by using the resource from @about, if present,
                        //  obtained according to the section on CURIE and IRI Processing;
                        local.typed_resource = about
                            .clone()
                            // “otherwise, if the element is the root element of the document,
                            //  then act as if there is an empty @about present
                            //  and process it according to the previous rule;
                            .or(is_root_element.then(|| Rc::new(local.empty_curie().into())));
                    } else {
                        local.typed_resource =
                            // “otherwise by using the resource from @resource, if present, obtained according to the section on CURIE and IRI Processing;
                            // “otherwise, by using the IRI from @href, if present, obtained according to the section on CURIE and IRI Processing;
                            // “otherwise, by using the IRI from @src, if present, obtained according to the section on CURIE and IRI Processing;
                            resource_iri.clone()
                            // “otherwise, the value of typed resource is set to a newly created bnode.
                            // “The value of the current object resource is then set to the value of typed resource.
                            .or_else(|| Some(Rc::new(oxrdf::BlankNode::default().into())));

                        // “The value of the current object resource is then set to the value of typed resource.
                        local.current_object_resource = local.typed_resource.clone();
                    }
                }
            }
            // 5.2: “otherwise:
            else {
                // “If the element contains an @about, @href, @src, or @resource attribute,
                //  new subject is set to the resource obtained as follows:
                if about.is_some() || resource_iri.is_some() {
                    local.new_subject =
                        // “by using the resource from @about, if present,
                        //  obtained according to the section on CURIE and IRI Processing;
                        about.clone()
                        // “otherwise, by using the resource from @resource, if present, obtained according to the section on CURIE and IRI Processing;
                        // “otherwise, by using the IRI from @href, if present, obtained according to the section on CURIE and IRI Processing;
                        // “otherwise, by using the IRI from @src, if present, obtained according to the section on CURIE and IRI Processing.
                        .or_else(|| resource_iri.clone());
                } else {
                    // “otherwise, if no resource is provided by a resource attribute,
                    //  then the first match from the following rules will apply:
                    local.new_subject =
                        //  if the element is the root element of the document,
                        //  then act as if there is an empty @about present,
                        //  and process it according to the rule for @about, above;
                        is_root_element.then(|| Rc::new(local.empty_curie().into()))
                        // “otherwise, if @typeof is present,
                        //  then new subject is set to be a newly created bnode;
                        .or(type_of.is_some().then(|| Rc::new(oxrdf::BlankNode::default().into())))
                        // “otherwise, if parent object is present, new subject is set to the value of parent object.
                        //  Additionally, if @property is not present then the skip element flag is set to 'true'.
                        .or_else(|| {
                            if property.is_none() {
                                local.skip_element = true;
                            }
                            eval_context.parent_object.clone()
                        });
                }

                // “Finally, if @typeof is present, set the typed resource to the value of new subject.
                if type_of.is_some() {
                    local.typed_resource = local.new_subject.clone();
                }
            }
        }
        // 6.
        else {
            debug_assert!(rel.is_some() || rev.is_some());
            // “If the current element does contain a @rel or @rev attribute,
            //  then the next step is to establish both a value for new subject
            //  and a value for current object resource:
            //
            // “new subject is set to the resource obtained from the first match from the following rules:
            //  by using the resource from @about, if present, obtained according to the section on CURIE and IRI Processing;
            if about.is_some() {
                local.new_subject = about.clone();
            }

            // “if the @typeof attribute is present, set typed resource to new subject.
            if type_of.is_some() {
                local.typed_resource = local.new_subject.clone();
            }

            // “If no resource is provided then the first match from the following rules will apply:
            if local.new_subject.is_none() {
                // “if the element is the root element of the document
                if is_root_element {
                    // “then act as if there is an empty @about present,
                    //  and process it according to the rule for @about, above;
                    local.new_subject = Some(Rc::new(local.empty_curie().into()));
                } else {
                    // ”otherwise, if parent object is present, new subject is set to that.
                    local.new_subject = eval_context.parent_object.clone();
                }
            }

            // “Then the current object resource is set to the resource obtained from the first match from the following rules:
            if let Some(resource_iri) = &resource_iri {
                // “by using the resource from @resource, if present, obtained according to the section on CURIE and IRI Processing;
                //  otherwise, by using the IRI from @href, if present, obtained according to the section on CURIE and IRI Processing;
                //  otherwise, by using the IRI from @src, if present, obtained according to the section on CURIE and IRI Processing;
                local.current_object_resource = Some(resource_iri.clone());
            }
            // “otherwise, if @typeof is present and @about is not, use a newly created bnode.
            else if type_of.is_some() && about.is_none() {
                local.current_object_resource = Some(Rc::new(oxrdf::BlankNode::default().into()));
            }

            // “If @typeof is present and @about is not,
            if type_of.is_some() && about.is_none() {
                // “set typed resource to current object resource.
                local.typed_resource = local.current_object_resource.clone();
            }

            // “Note that final value of the current object resource will either be null
            //  (from initialization) or a full IRI or bnode.
        }

        // 7.
        // “If in any of the previous steps a typed resource was set to a non-null value,
        //  it is now used to provide a subject for type values;
        if let Some(typed_resource) = &local.typed_resource {
            // “One or more 'types' for the typed resource can be set by using @typeof.
            //  If present, the attribute may contain one or more IRIs, obtained according
            //  to the section on CURIE and IRI Processing, each of which is used to generate
            //  a triple as follows:
            for type_iri in type_of.as_deref().unwrap_or_default() {
                self.emit_output(TripleRef::new(
                    // subject = typed resource
                    typed_resource.as_ref(),
                    // predicate = http://www.w3.org/1999/02/22-rdf-syntax-ns#type
                    oxrdf::vocab::rdf::TYPE,
                    // object = current full IRI of 'type' from typed resource
                    type_iri.as_ref(),
                ));
            }
        }

        // 8.
        // “If in any of the previous steps a new subject
        //  was set to a non-null value different from the parent object;
        if let Some(ns) = &local.new_subject {
            if Some(ns) != eval_context.parent_object.as_ref() {
                // “The list mapping taken from the evaluation context is set to a new, empty mapping.
                local.list_mapping = Default::default();
            }
        }

        // 9.
        // “If in any of the previous steps a current object resource was set to a non-null value,
        //  it is now used to generate triples and add entries to the local list mapping:
        if rel.is_some() || rev.is_some() {
            if let Some(current_object_resource) = &local.current_object_resource {
                // “If the element contains both the @inlist and the @rel attributes the @rel may contain
                //  one or more resources, obtained according to the section on CURIE and IRI Processing
                //  each of which is used to add an entry to the list mapping as follows:
                if inlist {
                    for iri in rel.unwrap_or_default() {
                        // “if the local list mapping does not contain a list associated with the IRI,
                        //  instantiate a new list and add to local list mappings
                        let list = local.list_mapping.entry(iri).or_default();
                        // “add the current object resource to the list associated with the
                        //  resource in the local list mapping
                        list.borrow_mut().push(current_object_resource.clone());
                    }
                }
                // “Predicates for the current object resource can be set by using one or both of the @rel and the
                //  @rev attributes but, in case of the @rel attribute, only if the @inlist is not present:
                else {
                    // “If present, @rel may contain one or more resources, obtained according to the section on
                    // CURIE and IRI Processing each of which is used to generate a triple as follows:
                    if let Some(sub) = local.new_subject.as_deref() {
                        for full_iri in rel.unwrap_or_default() {
                            self.emit_output(TripleRef::new(
                                //  subject = new subject
                                sub,
                                //  predicate = full IRI
                                full_iri.as_ref(),
                                //  object = current object resource
                                current_object_resource.as_ref(),
                            ));
                        }
                    }
                }

                if let Some(sub) = local.new_subject.as_deref() {
                    for full_iri in rev.unwrap_or_default() {
                        // “If present, @rev may contain one or more resources,
                        //  obtained according to the section on CURIE and IRI Processing
                        // each of which is used to generate a triple as follows:
                        self.emit_output(TripleRef::new(
                            //  subject = current object resource
                            current_object_resource.as_ref(),
                            //  predicate = full IRI
                            full_iri.as_ref(),
                            //  object = new subject
                            sub,
                        ));
                    }
                }
            }
            // 10.
            // “If however current object resource was set to null, but there are predicates present,
            //  then they must be stored as incomplete triples, pending the discovery of a subject
            //  that can be used as the object.
            else {
                debug_assert!(local.current_object_resource.is_none());
                // “Also, current object resource should be set to a newly created bnode
                // (so that the incomplete triples have a subject to connect to if they are ultimately turned into triples);
                local.current_object_resource = Some(Rc::new(oxrdf::BlankNode::default().into()));

                // “Predicates for incomplete triples can be set by using one or both of the @rel and @rev attributes:
                //
                //  If present, @rel must contain one or more resources, obtained according to the section
                //  on CURIE and IRI Processing each of which is added to the local list of incomplete triples as follows:
                if inlist {
                    // “If the element contains the @inlist attribute, then if the local list mapping
                    //  does not contain a list associated with the IRI, instantiate a new list and add to local list mappings.
                    todo!()
                } else {
                    // “Otherwise add:
                    for full_iri in rel.unwrap_or_default() {
                        local.incomplete_triples.insert(IncompleteTriple {
                            // predicate = full IRI
                            predicate: full_iri,
                            // direction = forward
                            direction: IncompleteTripleDirection::Forward,
                        });
                    }
                }

                // “If present, @rev must contain one or more resources, obtained according to the section
                //  on CURIE and IRI Processing, each of which is added to the local list of incomplete triples as follows:
                for full_iri in rev.unwrap_or_default() {
                    local.incomplete_triples.insert(IncompleteTriple {
                        // predicate = full IRI
                        predicate: full_iri,
                        // direction = reverse
                        direction: IncompleteTripleDirection::Reverse,
                    });
                }
            }
        }

        // 11.
        // “The next step of the iteration is to establish any current property value;
        //  Predicates for the current property value can be set by using @property.
        //  If present, one or more resources are obtained according to the section on
        //  CURIE and IRI Processing, and then the actual literal value is obtained as follows:
        if let Some(properties) = property {
            let lang = local.current_language.as_ref().map(|l| l.to_string());
            let content_val = content
                .map(Cow::Borrowed)
                .unwrap_or_else(|| Cow::Owned(element.text().join("")));
            let mut serialized: String = String::new();

            let current_property_value: oxrdf::TermRef = if let Some(datatype) = &datatype {
                match datatype {
                    NamedOrBlankNode::NamedNode(datatype) => {
                        debug_assert_ne!(datatype.as_str(), eval_context.base.as_str());

                        if datatype.as_str().is_empty() {
                            // “otherwise, as a plain literal if @datatype is present but has an empty value
                            //  according to the section on CURIE and IRI Processing. The actual literal is
                            //  either the value of @content (if present) or a string created by concatenating
                            //  the value of all descendant text nodes, of the current element in turn.
                            if let Some(lang) = &lang {
                                oxrdf::LiteralRef::new_language_tagged_literal_unchecked(
                                    &content_val,
                                    lang,
                                )
                                .into()
                            } else {
                                oxrdf::LiteralRef::new_simple_literal(&content_val).into()
                            }
                        } else if datatype.as_str() == oxrdf::vocab::rdf::XML_LITERAL.as_str() {
                            // “otherwise, as an XML literal if @datatype is present and is set to
                            //  XMLLiteral in the vocabulary http://www.w3.org/1999/02/22-rdf-syntax-ns#.
                            // “The value of the XML literal is a string created by serializing to text,
                            //  all nodes that are descendants of the current element, i.e., not including
                            //  the element itself, and giving it a datatype of XMLLiteral in the vocabulary
                            //  http://www.w3.org/1999/02/22-rdf-syntax-ns#. The format of the resulting
                            //  serialized content is as defined in Exclusive XML Canonicalization Version 1.0 [XML-EXC-C14N].
                            serialized = element.inner_html();
                            oxrdf::LiteralRef::new_typed_literal(&serialized, datatype).into()
                            // TODO: incorrect, needs to be c14n'd
                        } else if datatype.as_str()
                            == "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML"
                        {
                            serialized = element.inner_html();
                            oxrdf::LiteralRef::new_typed_literal(&serialized, datatype).into()
                            // TODO: incorrect, needs to be c14n'd
                        } else {
                            // “as a typed literal if @datatype is present, does not have an empty value according
                            //  to the section on CURIE and IRI Processing, and is not set to XMLLiteral in the
                            //  vocabulary http://www.w3.org/1999/02/22-rdf-syntax-ns#.
                            //  The actual literal is either the value of @content (if present) or
                            //  a string created by concatenating the value of all descendant text nodes,
                            //  of the current element in turn. The final string includes the datatype IRI,
                            //  as described in [RDF-SYNTAX-GRAMMAR], which will have been obtained according
                            //  to the section on CURIE and IRI Processing.
                            oxrdf::LiteralRef::new_typed_literal(&content_val, datatype).into()
                        }
                    }
                    NamedOrBlankNode::BlankNode(blank_node) => todo!(),
                }
            } else {
                // “otherwise, as a plain literal using the value of @content if @content is present.
                if let Some(content) = &content {
                    oxrdf::LiteralRef::new_simple_literal(content).into()
                }
                // “otherwise, if the @rel, @rev, and @content attributes are not present,
                //  as a resource obtained from one of the following:
                //  by using the resource from @resource, if present, obtained according to the section on CURIE and IRI Processing;
                // otherwise, by using the IRI from @href, if present, obtained according to the section on CURIE and IRI Processing;
                // otherwise, by using the IRI from @src, if present, obtained according to the section on CURIE and IRI Processing.
                else if let Some(resource) = resource_iri.as_deref() {
                    resource.into()
                } else {
                    // otherwise, if @typeof is present and @about is not, the value of typed resource.
                    if type_of.is_some() && about.is_none() {
                        local.typed_resource.as_ref().unwrap().as_ref().into()
                    }
                    // otherwise as a plain literal.
                    else {
                        oxrdf::LiteralRef::new_simple_literal(&content_val).into()
                    }
                }
            };

            // “The current property value is then used with each predicate as follows:
            //
            // “If the element also includes the @inlist attribute, the current property
            //  value is added to the local list mapping as follows:
            if inlist {
                // “if the local list mapping does not contain a list associated with the predicate IRI, instantiate a new list and add to local list mappings
                // “add the current property value to the list associated with the predicate IRI in the local list mapping
                todo!()
            } else {
                // “Otherwise the current property value is used to generate a triple as follows:
                if let Some(sub) = local.new_subject.as_deref() {
                    for property in properties {
                        self.emit_output(TripleRef::new(
                            // subject = new subject
                            sub,
                            // predicate = full IRI
                            property.as_ref(),
                            // object = current property value
                            current_property_value,
                        ));
                    }
                }
            }
        }

        // 12.
        // “If the skip element flag is 'false', and new subject was set to a non-null value,
        //  then any incomplete triples within the current context should be completed:
        if !local.skip_element {
            if let Some(new_subject) = &local.new_subject {
                // “The list of incomplete triples from the current evaluation context
                //  (not the local list of incomplete triples) will contain zero or more predicate
                //  IRIs. This list is iterated over and each of the predicates is used with parent
                //  subject and new subject to generate a triple or add a new element to the local
                //  list mapping. Note that at each level there are two lists of incomplete triples;
                //  one for the current processing level (which is passed to each child element in
                //  the previous step), and one that was received as part of the evaluation context.
                //  It is the latter that is used in processing during this step.
                for incomplete in eval_context.incomplete_triples.iter() {
                    // “Note that each incomplete triple has a direction value that is used to determine
                    //  what will become the subject, and what will become the object, of each generated triple:
                    match incomplete.direction {
                        // “If direction is 'none',
                        //  the new subject is added to the list from the iterated incomplete triple.
                        IncompleteTripleDirection::None => todo!(),
                        // “If direction is 'forward' then the following triple is generated:
                        IncompleteTripleDirection::Forward => {
                            self.emit_output(TripleRef::new(
                                // subject = parent subject
                                eval_context.parent_subject.as_ref().unwrap().as_ref(),
                                // predicate = the predicate from the iterated incomplete triple
                                incomplete.predicate.as_ref(),
                                // object = new subject
                                new_subject.as_ref(),
                            ));
                        }
                        // “If direction is 'reverse' then this is the triple generated:
                        IncompleteTripleDirection::Reverse => {
                            self.emit_output(TripleRef::new(
                                // subject = new subject
                                new_subject.as_ref(),
                                // predicate = the predicate from the iterated incomplete triple
                                incomplete.predicate.as_ref(),
                                // object = parent subject
                                eval_context.parent_subject.as_ref().unwrap().as_ref(),
                            ));
                        }
                    }
                }
            }
        }

        // 13.
        // “Next, all elements that are children of the current element are processed
        //  using the rules described here, using a new evaluation context, initialized as follows:
        //
        //  If the skip element flag is 'true' then the new evaluation context is a copy of the current
        //  context that was passed in to this level of processing, with the language and list of IRI
        //  mappings values replaced with the local values;
        if local.skip_element {
            Ok(EvaluationContext {
                language: local.current_language,
                iri_mappings: local.iri_mappings,
                // ERRATA: this also needs to be copied
                default_vocab: local.default_vocab,
                ..eval_context.clone()
            })
        } else {
            // “ Otherwise, the values are:
            Ok(EvaluationContext {
                // “ the base is set to the base value of the current evaluation context;
                base: eval_context.base.clone(),
                // “ the parent subject is set to the value of new subject, if non-null,
                //   or the value of the parent subject of the current evaluation context;
                parent_subject: local
                    .new_subject
                    .as_ref()
                    .or(eval_context.parent_subject.as_ref())
                    .cloned(),
                // “ the parent object is set to value of current object resource, if non-null,
                //   or the value of new subject, if non-null, or the value of the parent subject
                //   of the current evaluation context;
                parent_object: local
                    .current_object_resource
                    .as_ref()
                    .or(local.new_subject.as_ref())
                    .or(eval_context.parent_subject.as_ref())
                    .cloned(),
                // “ the list of IRI mappings is set to the local list of IRI mappings;
                iri_mappings: local.iri_mappings,
                // “ the list of incomplete triples is set to the local list of incomplete triples;
                incomplete_triples: local.incomplete_triples,
                // “ the list mapping is set to the local list mapping;
                list_mapping: local.list_mapping,
                // “ language is set to the value of current language.
                language: local.current_language,
                // “ the default vocabulary is set to the value of the local default vocabulary.
                default_vocab: local.default_vocab,
                // ERRATA: undocumented
                term_mappings: Default::default(),
            })
        }

        // 14.
        // “Finally, if there is one or more mapping in the local list mapping, list triples are generated as follows:
    }

    fn exclude_bnodes(&self, name: &str, vec: Vec<NamedOrBlankNode>) -> Vec<oxrdf::NamedNode> {
        let mut pg = self.processor_graph.borrow_mut();
        vec.into_iter()
            .filter_map(|x| match x {
                NamedOrBlankNode::NamedNode(x) => Some(x),
                NamedOrBlankNode::BlankNode(b) => {
                    emit_processor(
                        &mut pg,
                        PGType::Warning,
                        &format!("{} cannot refer to a bnode: [{}]", name, b),
                    );
                    None
                }
            })
            .collect()
    }
}
