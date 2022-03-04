exports.data = {
  layout: "layout.11ty.js",
};

exports.render = function(data) {
    console.log(data);
    return `<article itemScope itemType="http://schema.org/Article" itemProp="mainEntity" itemRef="author-outer">
    <div class="jumbotron jumbotron-fluid ${data.hero ? 'hero' : ''}" style="${data.hero ? `background-image: url('${data.hero}')` : ''}">
        <div class="container">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-10">
                    <h1 itemProp="headline"${this.asAttr('lang', data.titleLang)}>
                        <a href="${data.page.url}" itemprop="mainEntityOfPage">${data.title}</a>
                        ${ data.draft ? ' DRAFT' : '' }
                    </h1>
                </div>
                <div class="col-lg-1" style="z-index: -1"></div>
            </div>
        </div>
        <!-- TODO: HERO SOURCING -->
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-7">
                ${data.content}
            </div>
            <div class="col-lg-1" style="z-index: -1"></div>
        </div>
    </div>
</article>`;
}
