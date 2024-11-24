import { IS_PRODUCTION } from "../../helpers";

export default {
    layout: "article",
    tags: "game",
    date: "git Last Modified",
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
