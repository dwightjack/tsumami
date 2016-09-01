/*eslint-env node, mocha */
/*eslint one-var: 0, no-new: 0, func-names: 0, strict: 0 */

module.exports = function (options) {

    var path = require('path'),
        webpack = require('webpack'),
        plugins = [];

    plugins.push(
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'PRODUCTION': options.production,
            'process.env': {
                'NODE_ENV': JSON.stringify(options.production ? 'production' : 'development')
            }
        })
    );

    if (options.production) {
        plugins.push(
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin()
        );
    }

    return {
        output: {
            path: path.join(__dirname, 'lib'),
            libraryTarget: 'commonjs2',
            library: ['domUtils', '[name]'],
            filename: '[name].js'
        },
        externals: [{
            'desandro-classie': {
                root: 'classie',
                commonjs2: 'desandro-classie',
                commonjs: 'desandro-classie',
                amd: 'classie'
            }
        }],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: [path.join(__dirname, 'src'), path.join(__dirname, 'test')],
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true
                    }
                }
            ]
        }
    };

};

