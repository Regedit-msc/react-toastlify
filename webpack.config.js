/* eslint
    @typescript-eslint/no-var-requires: 0,
    import/no-extraneous-dependencies: 0,
    @typescript-eslint/no-unsafe-assignment: 0,
    @typescript-eslint/restrict-template-expressions: 0,
    @typescript-eslint/no-unsafe-call: 0,
    @typescript-eslint/no-unsafe-member-access: 0
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    filename: 'main.bundle.js',
    chunkFilename: '[contenthash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css', '.sass'],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      process: false,
    },
  },
  context: __dirname,
  node: {
    __filename: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[contenthash].[ext]',
              outputPath: 'images/',
              limit: false,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[contenthash].[ext]',
              outputPath: 'fonts/',
              limit: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|es|ar|pt|fr|it|pl|de/),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  devtool: 'source-map',
};
