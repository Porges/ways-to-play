const { IS_PRODUCTION } = require("../../helpers");

let data = {
    "layout": "article",
    "tags": "game",
    eleventyComputed: {
        permalink: data => {
            if (IS_PRODUCTION && data.draft === true) {
                return false;
            } else {
                return undefined;
            }
        },
    },
};

//if (IS_PRODUCTION) {
    data.date = "git Last Modified";
//}

module.exports = data;
