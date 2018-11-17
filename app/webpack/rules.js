const ExtractTextPlugin = require("extract-text-webpack-plugin");

const rules = [
    { test: /\.js/, use: "babel-loader", exclude: /node_modules/, },
    {
        test: /\.css$/,
        include: /_datepicker\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader?sourceMap"
            ,
        }),
    },{
        test: /\.(css|scss)$/,
        exclude: [
            /_datepicker\.css$/,
            /node_modules/
        ],
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                "css-loader?localIdentName=[name]__[local]&modules=true&sourceMap",
                "postcss-loader?sourceMap"
            ],
        }),
    },{
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        loader: "file-loader",
    }, {
        test: /\.(svg)$/,
        exclude: /node_modules/,
        loader: "svg-react-loader",
    }
];

module.exports = rules; 