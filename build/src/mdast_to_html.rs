use std::collections::BTreeMap;

use markdown::mdast::Node;
use maud::{html, Markup};

pub fn locate_defs(node: &Node) -> (BTreeMap<String, Vec<Node>>, BTreeMap<String, String>) {
    let mut fndefs = BTreeMap::new();
    let mut linkdefs = BTreeMap::new();
    match node {
        Node::Definition(def) => _ = linkdefs.insert(def.identifier.clone(), def.url.clone()),
        Node::FootnoteDefinition(def) => {
            _ = fndefs.insert(def.identifier.clone(), def.children.clone())
        }
        n => {
            if let Some(children) = n.children() {
                for child in children {
                    let (mut fndefs2, mut linkdefs2) = locate_defs(child);
                    fndefs.append(&mut fndefs2);
                    linkdefs.append(&mut linkdefs2);
                }
            }
        }
    }

    (fndefs, linkdefs)
}

pub fn to_html(node: Node) -> Markup {
    mdast_to_html(false, node)
}

fn expand(n: Vec<Node>) -> Markup {
    html! {
        @for child in n {
            (mdast_to_html(false, child))
        }
    }
}

fn mdast_to_html(table_head: bool, node: Node) -> Markup {
    let (fndefs, linkdefs) = locate_defs(&node);
    html! {
        @match node {
            Node::Root(root) => {
                (expand(root.children))
            },
            Node::Break(_) => { br; },
            Node::ThematicBreak(_) => { hr; },
            Node::Blockquote(blockquote) => {
                blockquote {
                    (expand(blockquote.children))
                }
            },
            Node::List(list) => {
                @if list.ordered {
                    ol start=[list.start] { (expand(list.children)) }
                } @else {
                    ul { (expand(list.children)) }
                }
            }
            Node::InlineCode(inline_code) => {
                code { (inline_code.value) }
            },
            Node::InlineMath(inline_math) => {
                code{ (inline_math.value) }
            },
            Node::Delete(delete) => { del { (expand(delete.children)) } },
            Node::Emphasis(emphasis) => { em { (expand(emphasis.children)) } },
            Node::Strong(strong) => { strong { (expand(strong.children)) } },
            Node::Html(html) => {},
            Node::Image(image) => {
                img src=(image.url) alt=(image.alt) title=[image.title];
            },
            Node::ImageReference(image_reference) => {},
            Node::MdxJsxTextElement(mdx_jsx_text_element) => {},
            Node::Link(link) => {
                a href=(link.url) title=[link.title] {
                    (expand(link.children))
                }
            },
            Node::LinkReference(link_reference) => {
            },
            Node::Text(text) => { (text.value) },
            Node::Code(code) => {
                pre {
                    code {
                        (code.value)
                    }
                }
            },
            Node::Math(math) => {},
            Node::Heading(heading) => {
                @let children = (expand(heading.children));
                @match heading.depth {
                    1 => { h1 { (children) } },
                    2 => { h2 { (children) } },
                    3 => { h3 { (children) } },
                    4 => { h4 { (children) } },
                    5 => { h5 { (children) } },
                    6 => { h6 { (children) } },
                    _ => {}
                }
            },
            Node::Table(table) => {
                @let mut children = table.children.into_iter();
                table {
                    thead {
                        @if let Some(c) = children.next() {
                            (mdast_to_html(true, c))
                        }
                    }
                    tbody {
                        @while let Some(c) = children.next() {
                            (mdast_to_html(false, c))
                        }
                    }
                }
            },
            Node::TableRow(table_row) => {
                tr {
                    @for child in table_row.children {
                        (mdast_to_html(table_head, child))
                    }
                }
            },
            Node::TableCell(table_cell) => {
                @if table_head {
                    th { (expand(table_cell.children)) }
                } @else {
                    td { (expand(table_cell.children)) }
                }
            },
            Node::ListItem(list_item) => { li { (expand(list_item.children)) } },
            Node::Paragraph(paragraph) => { p { (expand(paragraph.children)) } },
            Node::MdxJsxFlowElement(mdx_jsx_flow_element) => {}
            Node::MdxTextExpression(mdx_text_expression) => {},
            Node::MdxFlowExpression(mdx_flow_expression) => {},
            Node::MdxjsEsm(mdxjs_esm) => {},
            Node::Definition(_) => {}, // already handled
            Node::FootnoteDefinition(_) => {} // already handled
            Node::FootnoteReference(footnote_reference) => {
                @if let Some(children) = fndefs.get(&footnote_reference.identifier) {
                    span.fn { (expand(children.clone())) }
                } @else {
                    (panic!("unknown footnote reference: {}", footnote_reference.identifier))
                }
            },
            Node::Toml(toml) => {},
            Node::Yaml(yaml) => {},
        }
    }
}
