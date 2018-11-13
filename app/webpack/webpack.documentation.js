const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    entry: [
        "babel-polyfill",
        path.join(__dirname, "../src/lib/documentation")
    ],
});