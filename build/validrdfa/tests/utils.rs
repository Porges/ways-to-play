use std::collections::HashSet;

use itertools::Itertools;
use oxrdf::{Graph, graph::CanonicalizationAlgorithm};

pub fn serialize_graph(mut graph: Graph, base: &str) -> String {
    graph.canonicalize(CanonicalizationAlgorithm::Unstable);

    let mut output = Vec::new();
    let mut ttl = oxttl::TurtleSerializer::new().with_base_iri(base).unwrap();

    // slow but makes test output nicer
    let mut prefixes_to_use = HashSet::new();
    let mut add_prefix = |full_iri: &str| {
        if let Some((known_prefix, iri)) = validrdfa::initial_context()
            .mappings()
            .find(|(prefix, iri)| !prefix.is_empty() && full_iri.starts_with(*iri))
        {
            prefixes_to_use.insert((known_prefix, iri));
        }
    };

    for triple in graph.iter() {
        if let oxrdf::SubjectRef::NamedNode(n) = triple.subject {
            add_prefix(n.as_str());
        }

        add_prefix(triple.predicate.as_str());

        if let oxrdf::TermRef::NamedNode(n) = triple.object {
            add_prefix(n.as_str());
        }
    }

    for (prefix, iri) in prefixes_to_use {
        ttl = ttl.with_prefix(prefix, iri).unwrap();
    }

    let mut ttl = ttl.for_writer(&mut output);
    for triple in graph.iter().sorted_by_cached_key(|t| {
        (
            t.subject.to_string(),
            if t.predicate.as_str() == "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" {
                // make "a" come first
                None
            } else {
                Some(t.predicate.to_string())
            },
            t.object.to_string(),
        )
    }) {
        ttl.serialize_triple(triple).unwrap();
    }

    ttl.finish().unwrap();

    String::from_utf8_lossy(&output).into_owned()
}
