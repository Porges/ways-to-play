use std::collections::BTreeMap;

use markdown::mdast::{Blockquote, MdxJsxFlowElement, MdxJsxTextElement, Node, Text, Yaml};
use maud::{html, Markup};

pub fn get_header(node: &Node) -> Option<Yaml> {
    match node {
        Node::Yaml(yaml) => Some(yaml.clone()),
        n => n
            .children()
            .and_then(|c| c.iter().filter_map(get_header).next()),
    }
}

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
    let (fndefs, linkdefs) = locate_defs(&node);
    Converter { fndefs, linkdefs }.convert(false, node)
}

struct Converter {
    fndefs: BTreeMap<String, Vec<Node>>,
    linkdefs: BTreeMap<String, String>,
}

impl Converter {
    fn expand(&self, n: Vec<Node>) -> Markup {
        html! {
            @for child in n {
                (self.convert(false, child))
            }
        }
    }

    fn convert(&self, table_head: bool, node: Node) -> Markup {
        html! {
            @match node {
                Node::Root(root) => {
                    (self.expand(root.children))
                },
                Node::Break(_) => { br; },
                Node::ThematicBreak(_) => { hr; },
                Node::Blockquote(blockquote) => {
                    (self.handle_blockquote(blockquote))
                },
                Node::List(list) => {
                    @if list.ordered {
                        ol start=[list.start] { (self.expand(list.children)) }
                    } @else {
                        ul { (self.expand(list.children)) }
                    }
                }
                Node::InlineCode(inline_code) => {
                    code { (inline_code.value) }
                },
                Node::InlineMath(inline_math) => {
                    code{ (inline_math.value) }
                },
                Node::Delete(delete) => { del { (self.expand(delete.children)) } },
                Node::Emphasis(emphasis) => { em { (self.expand(emphasis.children)) } },
                Node::Strong(strong) => { strong { (self.expand(strong.children)) } },
                Node::Html(html) => {
                    (maud::PreEscaped(html.value))
                },
                Node::Image(image) => {
                    img src=(image.url) alt=(image.alt) title=[image.title];
                },
                Node::ImageReference(image_reference) => {},
                Node::Link(link) => {
                    a href=(link.url) title=[link.title] {
                        (self.expand(link.children))
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
                    @let children = (self.expand(heading.children));
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
                                (self.convert(true, c))
                            }
                        }
                        tbody {
                            @while let Some(c) = children.next() {
                                (self.convert(false, c))
                            }
                        }
                    }
                },
                Node::TableRow(table_row) => {
                    tr {
                        @for child in table_row.children {
                            (self.convert(table_head, child))
                        }
                    }
                },
                Node::TableCell(table_cell) => {
                    @if table_head {
                        th { (self.expand(table_cell.children)) }
                    } @else {
                        td { (self.expand(table_cell.children)) }
                    }
                },
                Node::ListItem(list_item) => { li { (self.expand(list_item.children)) } },
                Node::Paragraph(paragraph) => { p { (self.expand(paragraph.children)) } },
                Node::MdxJsxFlowElement(mdx_jsx_flow_element) => {
                    (self.handle_component(mdx_jsx_flow_element))
                }
                Node::MdxJsxTextElement(mdx_jsx_text_element) => {
                    (self.handle_component_text(mdx_jsx_text_element))
                },
                Node::MdxTextExpression(mdx_text_expression) => {},
                Node::MdxFlowExpression(mdx_flow_expression) => {},
                Node::MdxjsEsm(mdxjs_esm) => {},
                Node::Definition(_) => {}, // already handled
                Node::FootnoteDefinition(_) => {} // already handled
                Node::FootnoteReference(footnote_reference) => {
                    @if let Some(children) = self.fndefs.get(&footnote_reference.identifier) {
                        span.footnote { (self.expand(children.clone())) }
                    } @else {
                        (panic!("unknown footnote reference: {}", footnote_reference.identifier))
                    }
                },
                Node::Toml(toml) => {},
                Node::Yaml(yaml) => {},
            }
        }
    }

    fn handle_component_text(&self, flow: MdxJsxTextElement) -> Markup {
        // Some preloaded abbreviations for ease of use
        if flow.name.as_deref() == Some("abbr") {
            if let [Node::Text(t)] = flow.children.as_slice() {
                if let Some(known) = match t.value.as_str() {
                    "BCE" => Some("before common era"),
                    "CE" => Some("common era"),
                    "c." => Some("circa"),
                    _ => None,
                } {
                    let class = if t.value.chars().all(|c| c.is_ascii_uppercase()) {
                        Some("initialism")
                    } else {
                        None
                    };

                    return html! {
                        abbr class=[class] title=(known) { (t.value) }
                    };
                }
            }
        }

        match flow.name.as_deref() {
            Some(x) if x.chars().next().unwrap().is_ascii_lowercase() => {
                // TODO: ugly
                html! {
                    @if let Some(name) = &flow.name {
                        (maud::PreEscaped(format!("<{}", name)))
                    }
                    @for attr in flow.attributes {
                        @match attr {
                            markdown::mdast::AttributeContent::Expression(mdx_jsx_expression_attribute) => (todo!()),
                            markdown::mdast::AttributeContent::Property(mdx_jsx_attribute) =>  {
                                (maud::PreEscaped(format!(" {}", mdx_jsx_attribute.name)))
                                @if let Some(value) = mdx_jsx_attribute.value {
                                    @match value {
                                        markdown::mdast::AttributeValue::Expression(attribute_value_expression) => (todo!("{}", attribute_value_expression.value)),
                                        markdown::mdast::AttributeValue::Literal(s) => (maud::PreEscaped(format!("=\"{}\"", s))),
                                    }
                                }
                            },

                        }
                    }
                    (maud::PreEscaped(">"))
                    (self.expand(flow.children))
                    @if let Some(name) = flow.name {
                        (maud::PreEscaped(format!("</{}>", name)))
                    }
                }
            }
            Some("Image") => {
                html! {
                    "An image would go here"
                }
            }
            _ => panic!("unknown component: {:?}", flow.name),
        }
    }

    fn handle_component(&self, flow: MdxJsxFlowElement) -> Markup {
        match flow.name.as_deref() {
            Some(x) if x.chars().next().unwrap().is_ascii_lowercase() => {
                // TODO: ugly
                html! {
                    @if let Some(name) = &flow.name {
                        (maud::PreEscaped(format!("<{}", name)))
                    }
                    @for attr in flow.attributes {
                        @match attr {
                            markdown::mdast::AttributeContent::Expression(mdx_jsx_expression_attribute) => (todo!()),
                            markdown::mdast::AttributeContent::Property(mdx_jsx_attribute) =>  {
                                (maud::PreEscaped(format!(" {}", mdx_jsx_attribute.name)))
                                @if let Some(value) = mdx_jsx_attribute.value {
                                    @match value {
                                        markdown::mdast::AttributeValue::Expression(attribute_value_expression) => (todo!()),
                                        markdown::mdast::AttributeValue::Literal(s) => (maud::PreEscaped(format!("=\"{}\"", s))),
                                    }
                                }
                            },

                        }
                    }
                    (maud::PreEscaped(">"))
                    (self.expand(flow.children))
                    @if let Some(name) = flow.name {
                        (maud::PreEscaped(format!("</{}>", name)))
                    }
                }
            }
            Some("Image") => {
                html! {
                    "An image would go here"
                }
            }
            _ => panic!("unknown component: {:?}", flow.name),
        }
    }

    fn handle_blockquote(&self, blockquote: Blockquote) -> Markup {
        if let Some(Node::Paragraph(p)) = blockquote.children.first() {
            if let Some(Node::Text(t)) = p.children.first() {
                let trimmed = t.value.trim();
                if trimmed == "[!aside]" {
                    return html! {
                        aside role="note" class="footnote" {
                            (self.expand(blockquote.children.into_iter().skip(1).collect()))
                        }
                    };
                } else if trimmed.starts_with("[!todo]") {
                    // not rendered
                    return Markup::default();
                } else if trimmed == "[!figure]" {
                    todo!()
                } else if trimmed == "[!multi]" {
                    return html! {
                        div.multi {
                            (self.expand(blockquote.children.into_iter().skip(1).collect()))
                        }
                    };
                } else if trimmed == "[!multi-wide]" {
                    return html! {
                        div.multi.wide {
                            (self.expand(blockquote.children.into_iter().skip(1).collect()))
                        }
                    };
                } else if trimmed == "[!multi-extra-wide]" {
                    return html! {
                        div.multi.extra-wide {
                            (self.expand(blockquote.children.into_iter().skip(1).collect()))
                        }
                    };
                } else if trimmed.starts_with("[!") {
                    panic!("unknown callout: {}", trimmed.split_once("]").unwrap().0)
                }
            }
        }

        html! {
            blockquote {
                (self.expand(blockquote.children))
            }
        }
    }
}
