exports.data = {
  layout: "layout.11ty.js",
};

exports.render = function (data) {
    return `<div class="container">
  <h1>${data.title}</h1>
  <div class="row">
    <div class="col"></div>
    <div class="col-10 col-lg-8">
      ${data.content}
    </div>
    <div class="col"></div>
  </div>
</div>`;
}
