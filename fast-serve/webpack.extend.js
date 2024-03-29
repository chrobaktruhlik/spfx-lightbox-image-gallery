/*
* User webpack settings file. You can add your own settings here.
* Changes from this file will be merged into the base webpack configuration file.
* This file will not be overwritten by the subsequent spfx-fast-serve calls.
*/

// you can add your project related webpack configuration here, it will be merged using webpack-merge module
// i.e. plugins: [new webpack.Plugin()]
const webpackConfig = {
    module: {
        rules: [
            {
                exclude: /(node_modules)/,
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
                options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
            }
        ]
    }
}

// for even more fine-grained control, you can apply custom webpack settings using below function
const transformConfig = function (initialWebpackConfig) {
    // transform the initial webpack config here, i.e.
    // initialWebpackConfig.plugins.push(new webpack.Plugin()); etc.

    return initialWebpackConfig;
}

module.exports = {
    webpackConfig,
    transformConfig
}
