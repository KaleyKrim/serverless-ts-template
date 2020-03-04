const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
	entry: slsw.lib.entries,
	devtool: 'source-map',
	// ForkTsCheckerWebpackPlugin runs type checker on a separate process. necessary when ts-loader's transpileOnly is set to true
	plugins: [
		new ForkTsCheckerWebpackPlugin({ eslint: true })
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
	target: 'node',
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
					loader: 'ts-loader',
					// transpileOnly disables semantic checker and cancels declaration file output to minimize compilation time
					options: { transpileOnly: true } }
				]
			},
		],
	},
};
