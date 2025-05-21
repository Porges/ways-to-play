// Samples from: https://www.w3.org/TR/html-rdfa/
mod utils;

#[test]
pub fn example1_2() {
    let html = r#"<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Example Document</title>
      </head>
      <body vocab="http://schema.org/">
        <p typeof="Blog">
          Welcome to my <a property="url" href="http://example.org/">blog</a>.
        </p>
      </body>
    </html>"#;

    // note: base/usesVocabulary added
    let ttl = r#"
    @base <http://example.org/> .
    @prefix rdfa: <http://www.w3.org/ns/rdfa#> .
    <> rdfa:usesVocabulary <http://schema.org/> .
    [] a <http://schema.org/Blog>;
    <http://schema.org/url> <http://example.org/> .
    "#;

    utils::assert_graph(html, ttl);
}
