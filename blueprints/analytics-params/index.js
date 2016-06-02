/*jshint node:true*/
module.exports = {
  description: 'Generates an ember-track-analytics params object.',

  locals: function(options) {
    var importStatement = "import BaseParam from 'ember-track-analytics/analytics-params/base';";
    var baseClass = 'BaseParam';
    var toStringExtension = 'return ' + "'" + options.entity.name + "';";
    // Return custom template variables here.
    return {
      importStatement: importStatement,
      baseClass: baseClass,
      toStringExtension: toStringExtension
    };
  }
};
