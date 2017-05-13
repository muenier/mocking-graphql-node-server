var webpack = require('webpack');
var path = require('path');
var _ = require('lodash');

module.exports = {
   entry: __dirname + "/server.jsx",
   target: 'node',
   output: {
      filename: "server.js",
      path: __dirname
   },
   devtool: "source-map",
   resolve: {
      extensions: ['.js', '.jsx']
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader'
            }
         },
         {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use: {
               loader: 'graphql-tag/loader'
            }
         }
      ]
   },
   plugins: [
      new webpack.ProvidePlugin({
         "lodash": "_",
      })
   ]
};
