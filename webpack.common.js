const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDir = "docs";
module.exports = {
    entry: [
        "./src/index.tsx",
    ],
    output: {
        path: path.join(__dirname, outputDir),
        filename: "bundle.js",
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'Unibeautify Playground',
            chunksSortMode: 'dependency',
            template: path.resolve(__dirname, './src/index.ejs')
        }),
        new CleanWebpackPlugin([outputDir])
    ],

    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    plugins: ["react-hot-loader/babel"],
                  },
                },
                "awesome-typescript-loader",
              ],
              exclude: path.resolve(__dirname, 'node_modules'),
              include: path.resolve(__dirname, "src"),
            },
            {
                enforce: "pre",
                test: /\.js$/,
                use: ["source-map-loader"],
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            }
        ]
    }
};