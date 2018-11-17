const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pathToPublic = path.resolve(__dirname, "../../Assets/");
const dotEnv = require("dotenv-webpack");

module.exports = merge(common, {
    entry: [
        "babel-polyfill",
        path.resolve(__dirname, "./dev-server/")
    ],
    devtool: "source-map",
    devServer: {
        contentBase: pathToPublic,
        compress: true,
        port: 3333,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(
                __dirname,
                "../src/template/index.html"
            ),
        }),
        new dotEnv({
            path: path.resolve(__dirname, "./environments/.env"),
        })
    ],
});