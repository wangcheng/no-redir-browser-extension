const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const production = env === 'production'

  return {
    mode: production ? 'production' : 'development',

    entry: {
      background: './src/background',
      options: './src/options',
    },

    devServer: {
      stats: 'minimal',
    },

    output: {
      path: path.resolve(__dirname, 'dist/assets'),
    },

    devtool: 'sourcemap',

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Options',
        filename: 'options.html',
        chunks: ['options'],
      }),
    ],
  }
}
