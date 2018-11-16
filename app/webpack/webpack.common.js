const path = require("path");
const resolve = require("./resolve");
const rules = require("./rules");
const plugins = require("./plugins.js");

const config = {
    entry: path.resolve(__dirname, "../src"),
    context: path.resolve(__dirname, "../src"),
    output: {
        path: path.resolve(__dirname, "../public/"),
        filename: "[name]-react.js",
        publicPath: "/",
    },
    resolve,
    module: {
        rules,
    },
    plugins,
};

module.exports = config;