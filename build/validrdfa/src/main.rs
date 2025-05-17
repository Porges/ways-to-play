use std::{borrow::Cow, cell::Cell, io::stdin, str::FromStr};

use html5ever::{
    QualName,
    interface::TreeSink,
    tendril::{StrTendril, TendrilSink},
};
use icu::locale::LanguageIdentifier;

#[derive(Clone)]
enum SubjectNode {
    Url(url::Url),
    Blank(String),
}

#[derive(Clone)]
enum ObjectNode {
    Url(url::Url),
    Blank(String),
    Literal(Literal),
}

#[derive(Clone)]
struct Literal {
    datatype: Option<String>,
    language: Option<LanguageIdentifier>,
    value: String,
}

struct Triple {
    subject: SubjectNode,
    predicate: String,
    object: ObjectNode,
}

type Handle = usize;

#[derive(
    derive_more::FromStr, derive_more::Display, Clone, Copy, PartialEq, PartialOrd, Eq, Ord,
)]
enum RDFaAttributes {
    Vocab,
    Typeof,
    Property,
    Resource,
    Prefix,
    Content,
    About,
    Rel,
    Rev,
    Datatype,
    Inlist,
    Href,
    Src,
    Datetime,
    Lang,
}

enum HTMLNode {
    Document {
        root: Cell<Option<html5ever::interface::NodeOrText<Handle>>>,
    },
    Element {
        name: QualName,
        attrs: elsa::FrozenBTreeMap<RDFaAttributes, Box<StrTendril>>,
        children: elsa::FrozenVec<Box<html5ever::interface::NodeOrText<Handle>>>,
    },
}

struct RDFaTree {
    nodes: elsa::FrozenVec<Box<HTMLNode>>,
    errors: elsa::FrozenVec<Box<Cow<'static, str>>>,
}

impl RDFaTree {
    fn new() -> Self {
        let doc = Box::new(HTMLNode::Document { root: None.into() });
        Self {
            nodes: vec![doc].into(),
            errors: elsa::FrozenVec::default(),
        }
    }
}

impl TreeSink for RDFaTree {
    type Handle = Handle;

    type Output = Self;

    type ElemName<'a> = &'a QualName;

    fn finish(self) -> Self::Output {
        self
    }

    fn parse_error(&self, msg: Cow<'static, str>) {
        self.errors.push(Box::new(msg));
    }

    fn get_document(&self) -> Self::Handle {
        0
    }

    fn elem_name<'a>(&'a self, target: &'a Self::Handle) -> Self::ElemName<'a> {
        match &self.nodes[*target] {
            HTMLNode::Element { name, .. } => name,
            _ => unreachable!(),
        }
    }

    fn create_element(
        &self,
        name: html5ever::QualName,
        attrs: Vec<html5ever::Attribute>,
        flags: html5ever::interface::ElementFlags,
    ) -> Self::Handle {
        let el = Box::new(HTMLNode::Element {
            name,
            attrs: attrs
                .into_iter()
                .filter_map(|attr| {
                    if attr.name.ns.is_empty() {
                        Some((
                            RDFaAttributes::from_str(&attr.name.local).ok()?,
                            Box::new(attr.value),
                        ))
                    } else {
                        None
                    }
                })
                .collect(),
            children: Default::default(),
        });
        let handle = self.nodes.len();
        self.nodes.push(el);
        handle
    }

    fn create_comment(&self, text: html5ever::tendril::StrTendril) -> Self::Handle {
        // ignored
        usize::MAX
    }

    fn create_pi(
        &self,
        target: html5ever::tendril::StrTendril,
        data: html5ever::tendril::StrTendril,
    ) -> Self::Handle {
        // ignored
        usize::MAX
    }

    fn append(&self, parent: &Self::Handle, child: html5ever::interface::NodeOrText<Self::Handle>) {
        match &self.nodes[*parent] {
            HTMLNode::Element { children, .. } => {
                children.push(Box::new(child));
            }
            HTMLNode::Document { root } => {
                let old = root.replace(Some(child));
                if old.is_some() {
                    unreachable!()
                }
            }
            _ => unreachable!(),
        }
    }

    fn append_based_on_parent_node(
        &self,
        element: &Self::Handle,
        prev_element: &Self::Handle,
        child: html5ever::interface::NodeOrText<Self::Handle>,
    ) {
        unimplemented!()
    }

    fn append_doctype_to_document(
        &self,
        name: html5ever::tendril::StrTendril,
        public_id: html5ever::tendril::StrTendril,
        system_id: html5ever::tendril::StrTendril,
    ) {
        unreachable!()
    }

    fn get_template_contents(&self, target: &Self::Handle) -> Self::Handle {
        unreachable!()
    }

    fn same_node(&self, x: &Self::Handle, y: &Self::Handle) -> bool {
        x == y
    }

    fn set_quirks_mode(&self, mode: html5ever::interface::QuirksMode) {
        // do nothing
    }

    fn append_before_sibling(
        &self,
        sibling: &Self::Handle,
        new_node: html5ever::interface::NodeOrText<Self::Handle>,
    ) {
        unimplemented!()
    }

    fn add_attrs_if_missing(&self, target: &Self::Handle, attrs: Vec<html5ever::Attribute>) {
        match &self.nodes[*target] {
            HTMLNode::Element {
                attrs: existing_attrs,
                ..
            } => {
                for attr in attrs {
                    if !attr.name.ns.is_empty() {
                        continue;
                    }

                    let Some(attr_name) = RDFaAttributes::from_str(&attr.name.local).ok() else {
                        continue;
                    };

                    existing_attrs.insert(attr_name, Box::new(attr.value));
                }
            }
            _ => unreachable!(),
        }
    }

    fn remove_from_parent(&self, target: &Self::Handle) {
        unimplemented!()
    }

    fn reparent_children(&self, node: &Self::Handle, new_parent: &Self::Handle) {
        unimplemented!()
    }
}

#[derive(Clone)]
struct RDFaContext {
    base: url::Url,
    parent_subject: Option<SubjectNode>,
    parent_object: Option<ObjectNode>,
    mappings: elsa::FrozenBTreeMap<String, String>,
    // incomplete_triples
    // list mapping
    language: Option<LanguageIdentifier>,
    default_vocab: Option<url::Url>,
}

impl RDFaContext {
    fn new(base: url::Url) -> Self {
        Self {
            base: base.clone(),
            parent_subject: Some(SubjectNode::Url(base)),
            parent_object: None,
            mappings: Default::default(),
            language: None,
            default_vocab: None,
        }
    }
}

fn main() {
    let sink = RDFaTree::new();
    let opts = html5ever::ParseOpts {
        tree_builder: html5ever::tree_builder::TreeBuilderOpts {
            drop_doctype: true,
            ..Default::default()
        },
        ..Default::default()
    };

    let parse = html5ever::parse_document(sink, opts);
    let result = parse.from_utf8().read_from(&mut stdin().lock()).unwrap();
    if !result.errors.is_empty() {
        for err in result.errors.iter() {
            println!("Error: {}", err);
        }
    } else {
        println!("No errors found: {} nodes", result.nodes.len());
        let doc = result.nodes.first().unwrap();
        let mut stack = vec![(0, doc)];
        while let Some((depth, node)) = stack.pop() {
            match node {
                HTMLNode::Document { root } => {
                    if let Some(app) = root.take() {
                        match app {
                            html5ever::interface::NodeOrText::AppendNode(h) => {
                                stack.push((0, &result.nodes[h]))
                            }
                            html5ever::interface::NodeOrText::AppendText(tendril) => {}
                        }
                    }
                }
                HTMLNode::Element {
                    name,
                    attrs,
                    children,
                } => {
                    print!("{}<{}>", " ".repeat(depth), name.local);
                    for (name, value) in attrs.clone().into_map() {
                        print!(" {}='{}'", name, value);
                    }
                    println!();
                    for ix in (0..children.len()).rev() {
                        match &children[ix] {
                            html5ever::interface::NodeOrText::AppendNode(h) => {
                                stack.push((depth + 1, &result.nodes[*h]));
                            }
                            html5ever::interface::NodeOrText::AppendText(tendril) => {}
                        }
                    }
                }
            }
        }
    }
}
