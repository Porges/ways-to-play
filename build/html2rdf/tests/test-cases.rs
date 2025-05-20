use oxrdf::Graph;

mod utils;

#[test]
pub fn test_cases() {
    insta::glob!(
        "rdfa.github.io/test-suite/test-cases/rdfa1.1*/html5/*.html",
        |path| {
            let relpath = path.file_name().unwrap().to_string_lossy();
            let base = oxiri::Iri::parse(format!("file:///{relpath}")).unwrap();
            let input = std::fs::read_to_string(path).unwrap();
            let mut output_graph = Graph::new();
            let mut processor_graph = Graph::new();
            validrdfa::parse(
                &input,
                base.clone(),
                &mut output_graph,
                &mut processor_graph,
            )
            .unwrap();

            insta::assert_snapshot!(utils::serialize_graph(output_graph, base.as_str(),));
            insta::assert_snapshot!(utils::serialize_graph(processor_graph, base.as_str(),));
        }
    )
}
