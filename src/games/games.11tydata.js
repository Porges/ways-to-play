const { IS_PRODUCTION } = require("../../helpers");

let data = {
    "layout": "article",
    "tags": "game"
};

//if (IS_PRODUCTION) {
    data.date = "git Last Modified";
//}

module.exports = data;
