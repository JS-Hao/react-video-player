const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
  	loaders: [
  		{
  			test: /\.js$/,
  			exclude: /node_modules/,
  			loader: 'babel-loader',
  			query: {
  				presets: ['es2015', 'react', 'stage-1']
  			}
  		},
  		{
  			test: /\.css$/,
  			loader: 'style-loader!css-loader'
  		},
  		{
  			test: /\.(png|jpg)$/,
  			loader: 'url-loader?limit=8192'
  		}
  	]
  }
};
