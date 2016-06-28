'use strict';

var test = require('ava');
var webpack = require('webpack');
var path = require('path');
var MemoryFS = require("memory-fs");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SriStatsPlugin = require("sri-stats-webpack-plugin");
var SprocketsStatsPlugin = require("../../");

var config = require('./scenarios/simple/webpack.config');

test.cb('generated sprockets manifest matches expected', function(t) {
  // var tmpDir = tmp.dirSync();
  var fs = new MemoryFS();
  var tmpDir = { name: path.resolve(__dirname, '../../tmp/01-test') };
  var webpackDir = '/home/mike/code/github/sprockets-stats-webpack-plugin/tmp/01-test';

  var compilier = webpack(config(tmpDir.name));
  compilier.outputFileSystem = fs;

  compilier.run(function(err, stats) {
    if (err) {
      t.fail(err);
    }

    var jsonStats = stats.toJson();

    if(jsonStats.errors.length > 0) {
      return t.fail(jsonStats.errors);
    }

    if(jsonStats.warnings.length > 0) {
        return t.fail(jsonStats.warnings)
    };

    t.end();
  });
});