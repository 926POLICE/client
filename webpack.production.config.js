const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		index: path.join(__dirname, 'src', 'client.js'),
		adminui: path.join(__dirname, 'src', 'packages', 'gsp-adminui-main', 'client.js')
	},
    context: path.join(__dirname, 'src'),
	output: {
		path: path.join(__dirname, 'static', 'js'),
		chunkFilename: '[name].chunk.js',
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
			    test: /\.js?$/,
			    exclude: /(node_modules\/)/,
			    loader: "babel-loader",
			    options: {
					cacheDirectory: 'babel_cache',
					presets: ['react', ["env", { modules: false }]],
					plugins: ["transform-object-rest-spread"]
				}
			}
		]
	},
	devtool: 'cheap-module-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				APP_ENV: JSON.stringify('browser')
			}
		}),
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new CompressionPlugin({
			include: path.join(__dirname, 'static'),
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		})
	],
	optimization: {
		splitChunks: {
			name: "commons",
		}
	},
	resolve: {
		modules: ['node_modules'],
        alias: { },
        extensions: ['.js', '.jsx']
	},
	externals: {
        fs: '{}',
        tls: '{}',
        net: '{}',
        console: '{}'
    }
};
