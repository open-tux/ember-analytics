/*jshint node:true*/
module.exports = {
  description: 'Generates an ember-cli-analytics adapter.',

  locals: function(options) {
    var importStatement = "import BaseAdapter from 'ember-cli-analytics/analytics/base';";
    var baseClass = 'BaseAdapter';
    var toStringExtension = 'return ' + "'" + options.entity.name + "';";
    // Return custom template variables here.
    return {
      importStatement: importStatement,
      baseClass: baseClass,
      toStringExtension: toStringExtension
    };
  }
};
