
const webpack = require('webpack');
const path = require("path");
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sortCSSmq = require('sort-css-media-queries');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
    const isProd = process.env.production;

    return {
        entry: "./index.js",
        context: path.resolve(__dirname, "src"),
        mode: isProd ? "production" : "development",
        devtool: 'inline-source-map',
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.css$/, use: 'css-loader'
                },
                {
                    test:/\.ejs/, use: "ejs-loader"
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.scss/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    mqpacker({
                                        sort: sortCSSmq
                                    }),
                                    autoprefixer({
                                        overrideBrowserslist: ['last 2 versions']
                                    })
                                ],
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                prependData: `$prod: ${isProd};`,
                            }
                        },
                    ]
                },
                {
                    test: /\.(png|jpe?g|svg)$/,
                    use: [
                        'file-loader',
                        {
                            loader: "image-webpack-loader", 
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 100
                                }
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            contentBase: './dist',
            // host: "0.0.0.0",
            compress: true,
            port: 8080,
            watchContentBase: true,
            progress: true,
            overlay: true,
            setup: function (app) {
                app.post('*', (req, res) => {
                    res.redirect(req.originalUrl);
                });
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new HtmlWebpackPlugin({
                inject: false,
                hash: true,
                template: "index.html",
                filename: isProd ? "index.php" : "index.html"
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                _: "underscope",
            }),
            new CopyWebpackPlugin([
                {from:'images',to:'../dist/images'},
                {from:'fonts',to:'../dist/fonts'}
            ]),
        ]
    }
}