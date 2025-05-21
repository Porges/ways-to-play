use std::path::PathBuf;

use oxrdf::Graph;
use rstest::*;

mod utils;

#[rstest]
pub fn ttl_equality(
    #[base_dir = "tests/rdfa.github.io/test-suite/test-cases/"]
    #[files("rdfa1.1*/html5/*.html")]
    // exclude vocabulary expansion tests
    // - 0240, 0241, 0242 are also vocab tests
    // - 0313, 0235-0239 are processor-graph tests
    #[exclude("(rdfa1\\.1-vocab|024[0-2]|0313|023[5-9])")]
    path: PathBuf,
) {
    let relpath = path
        .as_path()
        .to_string_lossy()
        .replace("\\", "/")
        .split_once("rdfa.github.io/test-suite/test-cases/")
        .unwrap()
        .1
        .to_string();

    // construct the base to match the website version
    let base =
        oxiri::Iri::parse(format!("http://rdfa.info/test-suite/test-cases/{relpath}")).unwrap();

    let input = std::fs::read_to_string(&path).unwrap();
    let mut output_graph = Graph::new();
    let mut processor_graph = Graph::new();
    html2rdf::process(
        &input,
        base.clone(),
        &mut output_graph,
        &mut processor_graph,
    )
    .unwrap();

    let mut ttl_graph = Graph::new();
    {
        let ttl_content = path.with_extension("ttl");
        let ttl = std::fs::read_to_string(ttl_content).unwrap();
        let ttl = ttl.replace("\r\n", "\n");
        let ttl_rdf = oxttl::TurtleParser::new().for_slice(ttl.as_bytes());
        for triple in ttl_rdf {
            ttl_graph.insert(&triple.unwrap());
        }
    }

    let serialized = utils::serialize_graph(output_graph, base.as_str());
    let ttl_serialized = utils::serialize_graph(ttl_graph, base.as_str());

    pretty_assertions::assert_eq!(
        serialized,
        ttl_serialized,
        "The output graph does not match the test-suite Turtle."
    );

    if !processor_graph.is_empty() {
        insta::assert_snapshot!(
            format!("{relpath}_processor_graph"),
            utils::serialize_graph(processor_graph, base.as_str(),)
        );
    }
}
