const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/js/index.js",
    output: {
        "path": __dirname + '/dist',
        "filename": "[name].js"
    },

    plugins: [
        new CopyPlugin([{
            from: './src/static',
            to: ''
        }, ]),
    ]
}