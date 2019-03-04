const path = require('path');

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
    }
);
