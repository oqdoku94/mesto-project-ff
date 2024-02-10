const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/scripts/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080,
        open: {
            app: {
                name: 'Google Chrome'
            }
        }
    },
    module: {
        rules: [ // Правила
            {
                test: /\.js$/, // ищем все js файлы
                use: 'babel-loader', // при обработке нудных файлов используем лоадер
                exclude: '/node_modules/' // папка - исключение
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html'
            }
        ),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
};