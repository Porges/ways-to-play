use html5ever::tendril::StrTendril;
use itertools::Itertools;
use oxiri::Iri;
use oxrdf::{Graph, graph::CanonicalizationAlgorithm};
use validrdfa::parse;

fn serialize_graph(mut graph: Graph) -> String {
    graph.canonicalize(CanonicalizationAlgorithm::Unstable);

    let mut output = Vec::new();
    let mut ttl = oxttl::TurtleSerializer::new()
        .with_base_iri(base().as_str())
        .unwrap();

    for (prefix, iri) in validrdfa::initial_context().mappings().sorted() {
        if prefix == "rdfa" || prefix == "rdf" {
            ttl = ttl.with_prefix(prefix, iri).unwrap();
        }
    }

    ttl = ttl.with_prefix("schema", "http://schema.org/").unwrap();

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

fn base() -> Iri<StrTendril> {
    Iri::parse("http://rdfa.invalid/".into()).unwrap()
}

#[test]
fn basic_test() {
    let input =
        r#"<html><head><title>foo</title></head><body vocab="http://schema.org/"></body></html>"#;

    let mut output_graph = Graph::new();
    let mut processor_graph = Graph::new();
    parse(input, base(), &mut output_graph, &mut processor_graph).unwrap();

    insta::assert_snapshot!(serialize_graph(output_graph), @r##"
    @base <http://rdfa.invalid/> .
    @prefix schema: <//schema.org/> .
    @prefix rdf: <//www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfa: <//www.w3.org/ns/rdfa#> .
    <> rdfa:usesVocabulary schema: .
    "##);

    insta::assert_snapshot!(serialize_graph(processor_graph), @"");
}

#[test]
fn property_test() {
    let input = r#"
        <html>
        <head><title>foo</title></head>
        <body vocab="http://schema.org/">
            <p typeof="Book"><span property="name" content="bar">foo</span></p>
        </body>
        </html>
        "#;

    let mut output_graph = Graph::new();
    let mut processor_graph = Graph::new();
    parse(input, base(), &mut output_graph, &mut processor_graph).unwrap();

    insta::assert_snapshot!(serialize_graph(output_graph), @r##"
    @base <http://rdfa.invalid/> .
    @prefix schema: <//schema.org/> .
    @prefix rdf: <//www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfa: <//www.w3.org/ns/rdfa#> .
    <> rdfa:usesVocabulary schema: .
    _:8980d83310720900 a schema:Book ;
    	schema:name "bar" .
    "##);

    insta::assert_snapshot!(serialize_graph(processor_graph), @"");
}
