const _ = require('lodash');
const webpack = require('webpack');
const path = require('path');
const isServer = process.env.__SRV__;
/*
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const packageSort = (a, b) => {
    switch (a.names[0]) {
        case 'main':
            return 1;
        case 'vendor':
            return -1;
        default:
            return 1;
    }
}

const FE = {
    debug: true,

    context: path.join(__dirname, 'src/client'),

    entry: {
        'vendor': './src/vendor.js',
        'browser': './src/index.js',
    },

    modulesDirectories: ['node_modules'],

    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        path: path.join(__dirname, 'dist'),
        chunkFilename: '[name].chunk.js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: [
            '', '.js', '.jsx', '.sass'
        ]
    },

    module: {
        loaders: [
            {
              test: /\.(js|jsx)$/,
              loaders: [`babel-loader?presets[]=react,presets[]=es2015,passPerPreset=true`],
              include: path.join(__dirname, 'src', 'client'),

            },
            /*
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {
              test: /\.json$/,
              loader: 'json-loader'
            },

            /*
             * Raw loader support for *.css files
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
              test: /\.s(a|c)ss$/,
              loader: ExtractTextPlugin.extract('style', 'css!sass')
            },

            /* Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
              test: /\.html$/,
              loader: 'html-loader',
              exclude: []
            },


            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                loader: 'file-loader',
                exclude: []
            }
        ]
    },

    sassLoader: {
        includePaths: [path.resolve(__dirname, 'src/client/assets')]
    },

    plugins: [
        new ExtractTextPlugin("style.css"),

        new webpack.HotModuleReplacementPlugin(),
        /*
         * Plugin: OccurenceOrderPlugin
         * Description: Varies the distribution of the ids to get the smallest id length
         * for often used ids.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
         * See: https://github.com/webpack/docs/wiki/optimization#minimize
         */
        new webpack.optimize.OccurenceOrderPlugin(true),

        /*
         * Plugin: CommonsChunkPlugin
         * Description: Shares common code between the pages.
         * It identifies common modules and put them into a commons chunk.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
         * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
         */
        new webpack.optimize.CommonsChunkPlugin({
          name: ['vendor']
        }),


        /*
         * Plugin: HtmlWebpackPlugin
         * Description: Simplifies creation of HTML files to serve your webpack bundles.
         * This is especially useful for webpack bundles that include a hash in the filename
         * which changes every compilation.
         *
         * See: https://github.com/ampedandwired/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
          title: 'Discoverio',
          showErrors: true,
          chunksSortMode: packageSort,
          template: './index.html'
        })


    ],

    devServer: {
        port: '8080',
        host: '127.0.0.1',
        historyApiFallback: true,
        proxy: {'/graphql': `http://localhost:3000`},
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: './dist',
        contentBase: path.join(__dirname, 'src/client/src')
    }
};

var Serv = {
    entry: './src/server/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    target: 'node',
    // do not include polyfills or mocks for node stuff
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    },
    // all non-relative modules are external
    // abc -> require('abc')
    externals: /^[a-z\-0-9]+$/,

    plugins: [
        new webpack.ProvidePlugin({
            'Promise': 'bluebird',
        }),
        // enable source-map-support by installing at the head of every chunk
        new webpack.BannerPlugin('require("source-map-support").install();',
            {raw: true, entryOnly: false})
    ],

    module: {
        loaders: [
            {
                // transpile all .js files using babel
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }
        ]
    }
}

module.exports = Object.assign({}, isServer ? Serv : FE);
