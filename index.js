var through = require('through2');
var istanbul = require('istanbul');
var multimatch = require('multimatch');
var gutil = require('gulp-util');

const PLUGIN_NAME = "gulp-petrus";

var options;

function verifyCoverageFor(summary, subject) {
  var difference = Math.max(options.thresholds[subject] - summary[subject].pct, 0);

  var color = difference === 0 ? 'green' : (difference <= 10) ? 'yellow' : 'red';
  var result = difference == 0 ? '\u2714' : '\u2718';
  var capitalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1);
  gutil.log(gutil.colors[color](result) + ' ' + capitalizedSubject + ': ' + gutil.colors[color](summary[subject].pct + '%') + ' (' + options.thresholds[subject] + '%)');

  return difference > 0;
}

function coverage(file) {
  if (multimatch(file.relative, options.pattern).length !== 1) {
    return;
  };

  gutil.log('Verifying code coverage.');

  var collector = new istanbul.Collector();
  collector.add(JSON.parse(file.contents));

  var summary = istanbul.utils.summarizeCoverage(collector.getFinalCoverage());

  var subjects = ['lines', 'statements', 'functions', 'branches'];
  var isBelowThreshold = subjects.reduce(function(belowThreshold, subject) {
    return verifyCoverageFor(summary, subject) || belowThreshold;
  }, false);

  if (isBelowThreshold) {
    throw new gutil.PluginError(PLUGIN_NAME, 'Coverage threshold(s) exceeded.');
  }
}

module.exports = function(_options) {
  options = _options;
  return through.obj(coverage)
};