const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const entry = require('webpack-glob-entry')
const _ = require('lodash');

const outputDir = "docs";
module.exports = {
    entry: {
       app: "./src/index.tsx",
       samples: _.values(entry("./node_modules/ugly-samples/samples/**/*.txt")),
    },
    output: {
        path: path.join(__dirname, outputDir),
        filename: "[name].bundle.js",
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'Unibeautify Assistant',
            chunksSortMode: 'dependency',
            template: path.resolve(__dirname, './src/index.ejs')
        }),
        new CleanWebpackPlugin()
    ],

    externals: [
         "child_process",
         "requireg",
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
            },
            {
                test: /\.(txt)$/,
                use: 'raw-loader',
                include: path.resolve(__dirname, "node_modules"),
              }
        ]
    }
};
