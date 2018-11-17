const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const hasNodeModules = (module) => (
    module.context && module.context.includes("node_modules")
);

const plugins = [
    new ExtractTextPlugin("./react-styles.css"),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: "react",
    //     filename: "[name]-source.js",
    //     minChunks: (module) => hasNodeModules(module),
    // })
];

module.exports = plugins;