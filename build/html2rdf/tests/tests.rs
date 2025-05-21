use html2rdf::parse;
use oxiri::Iri;
use oxrdf::Graph;

mod utils;

fn base() -> Iri<String> {
    Iri::parse("http://rdfa.invalid/".to_string()).unwrap()
}

#[test]
fn basic_test() {
    let input =
        r#"<html><head><title>foo</title></head><body vocab="http://schema.org/"></body></html>"#;

    let mut output_graph = Graph::new();
    let mut processor_graph = Graph::new();
    parse(input, base(), &mut output_graph, &mut processor_graph).unwrap();

    insta::assert_snapshot!(utils::serialize_graph(output_graph, &base()), @r##"
    @base <http://rdfa.invalid/> .
    @prefix schema: <//schema.org/> .
    @prefix rdfa: <//www.w3.org/ns/rdfa#> .
    <> rdfa:usesVocabulary schema: .
    "##);

    insta::assert_snapshot!(utils::serialize_graph(processor_graph, &base()), @"");
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

    insta::assert_snapshot!(utils::serialize_graph(processor_graph, &base()), @"");

    insta::assert_snapshot!(utils::serialize_graph(output_graph, &base()), @r##"
    @base <http://rdfa.invalid/> .
    @prefix schema: <//schema.org/> .
    @prefix rdf: <//www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfa: <//www.w3.org/ns/rdfa#> .
    <> rdfa:usesVocabulary schema: .
    _:c14n0 a schema:Book ;
    	schema:name "bar" .
    "##);
}
