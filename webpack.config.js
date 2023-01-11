const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const svgToMiniDataURI = require('mini-svg-data-uri')
const StylelintPlugin = require('stylelint-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const devMode = process.env.NODE_ENV !== 'production'
const plugins = []

if (!devMode) {
    plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].bundle.css',
        }),
        new HtmlWebpackInjectPreload({
            files: [
                {
                    match: /.*\.woff2$/,
                    attributes: {as: 'font', type: 'font/woff2', crossorigin: true },
                },
            ]
        }),
    )
}

plugins.push(
    new StylelintPlugin({
        context: './src/',
        failOnError: false,
        failOnWarning: false
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
        template: './src/html/index.html',
        chunks: ['main'],
        inject: true,
        filename: './index.html'
    }),
    new HtmlWebpackPlugin({
        template: './src/html/page.html',
        chunks: ['main'],
        inject: true,
        filename: './page.html'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
        patterns: [
            {from: 'src/html/robots.txt', to: 'robots.txt'}
        ]
    })
)

module.exports = {
    entry: {
		main: './src/js/main.js',
	},
	output: {
		filename: (devMode) ? '[name].js' : '[name].[contenthash:8].js',
		path: path.resolve(__dirname, './dist'),
	},
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.scss'],
    },
    target: ['web', 'es5'],
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? 'eval-cheap-module-source-map' : 'source-map',
    optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false
			}),
			new CssMinimizerPlugin()
		],
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
        cacheDirectory: path.resolve(__dirname, './.cache'),
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: (devMode) ? 'images/[name][ext]' : 'images/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /\.svg/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                },
                generator: {
                    dataUrl: content => {
                        content = content.toString()
                        return svgToMiniDataURI(content)
                    },
                    filename: (devMode) ? 'images/[name][ext]' : 'images/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: (devMode) ? 'fonts/[name][ext]' : 'fonts/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.html/i,
                use: [
                    'html-loader'
                ]
            },
        ],
    },
    watchOptions: {
		ignored: /node_modules/
	},
    devServer: {
        watchFiles: ['./src/**/*.html'],
		host: '0.0.0.0',
		port: 8989,
	},
    plugins: plugins
}
