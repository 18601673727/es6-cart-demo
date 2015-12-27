'use strict';

module.exports = {
  entry: __dirname + "/src/es6/main.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {stage: 0} },
      { test: /\.json$/, loader: "json-loader" }
    ]
  }
};
