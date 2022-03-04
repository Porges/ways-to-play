exports.data = {
    title: "Games",
    layout: "columned"
};

exports.render = function(data) {
    return `<ul>
    ${data.collections.game.map(post => {
        // console.log(post);
        return `<li><a href="${post.url}"${this.asAttr("lang", post.data.titleLang)}>${post.data.title}</a></li>`;
    }).join("\n")}
    </ul>`;
}
