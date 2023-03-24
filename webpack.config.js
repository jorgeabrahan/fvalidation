const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  entry: './src/validateIntegration.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    publicPath: './',
    filename: 'fvalidation.js',
    path: path.resolve(__dirname, 'public'),
    libraryTarget: 'umd',
    library: 'fvalidation',
    umdNamedDefine: true
  }
}
