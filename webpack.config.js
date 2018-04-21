const webpack = require('webpack');
const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: {
		index: path.join(__dirname, 'src', 'client.js')
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
			},
			{
	            test: /\.less$/,
	            use: [{
	                loader: "style-loader" // creates style nodes from JS strings
	            }, {
	                loader: "css-loader" // translates CSS into CommonJS
	            }, {
	                loader: "less-loader", options: {
	                    strictMath: true,
	                    noIeCompat: true
	                }
	            }]
	        }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				APP_ENV: JSON.stringify('browser')
			}
		})
	],
	optimization: {
		splitChunks: {
			name: "commons"
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
	// node: {
	// 	fs: "empty"
	// }
};

module.exports.serve = {
  content: path.join(__dirname, 'static'),
  port: 1337,
  add: (app, middleware, options) => {
    const historyOptions = {
      	index: 'index.html'
    };

    app.use(convert(history(historyOptions)));
  }
};
