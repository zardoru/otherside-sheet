const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReplacePlugin = require('webpack-plugin-replace');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		'build/bundle': ['./src/main.ts'],
		'build/gm': ['./src/gmwindow.ts']
	},
	resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json'))
		},
		extensions: ['.mjs', '.js', '.ts', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'ts-loader',
					exclude: /node_modules/
				},
				{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod,
							preprocess: sveltePreprocess({ sourceMap: !prod })
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
		// ,
		// new ReplacePlugin({
		// 	exclude: /node_modules/,
		// 	values: {
		// 		'API_ENDPOINT': prod ? '' : 'http://localhost:3000/',
		// 	}
		// })
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		hot: true
	}
};
