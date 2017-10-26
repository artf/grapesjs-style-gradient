var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');
var webpack = require('webpack');
var pkg = require('./package.json');
var name = pkg.name;
var plugins = [];

if (process.env.WEBPACK_ENV !== 'dev') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }));
  plugins.push(new webpack.BannerPlugin(name + ' - ' + pkg.version));
} else {
  var index = 'index.html';
  plugins.push(new HtmlWebpackPlugin({
    template: fs.existsSync(index) ? index : '_' + index
  }));
}

module.exports = {
  entry: './src',
  output: {
      filename: './dist/' + name + '.min.js',
      libraryTarget: 'umd',
      library: name
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: /src/,
    }],
  },
  plugins: plugins
};
