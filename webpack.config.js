const path = require('path')

module.exports = env => {
  const production = env === 'production'

  return {
    mode: production ? 'production' : 'development',

    entry: {
      background: './src/background',
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
  }
}
