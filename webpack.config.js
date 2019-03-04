const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (
    {
        module: {
            rules: [
                {
                    include: [path.resolve(__dirname, 'resources/assets/js')],
                    loader: 'babel-loader',

                    options: {
                        presets: [['@babel/preset-env', {
                            'modules': false
                        }]]
                    },

                    test: /\.js$/
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|vendor)/,
                    loader: [
                        'babel-loader'
                    ],
                },
                {
                    test: /\.sass$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
            ]
        },

        entry: {
            application: path.resolve('./resources/js/app.jsx'),
        },

        output: {
            path: path.resolve('./public'),
            filename: 'js/app.js'
        },

        resolve: {
            extensions: ['.js', '.jsx', '.sass']
        },

        devtool: 'source-map',

        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/app.css",
            })
        ],
    }
);
