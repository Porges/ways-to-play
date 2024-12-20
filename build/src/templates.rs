use maud::{html, Markup, DOCTYPE};

fn base() -> Markup {
    html! {
        (DOCTYPE)
        head {
            title { "Ways to Play" }
        }
        body {
            p { "hi!" }
        }
    }
}
