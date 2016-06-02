/*jshint node:true*/
module.exports = {
  description: 'Generates an ember-cli-analytics params object.',

  locals: function(options) {
    var importStatement = "import BaseParam from 'ember-cli-analytics/analytics-params/base';";
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
