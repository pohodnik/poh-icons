const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const isDevelopment = false;
module.exports = {
    devtool: 'source-map',
    entry: './src/demo.js',
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'demo.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/demo.html",
        }),
    ],
};
