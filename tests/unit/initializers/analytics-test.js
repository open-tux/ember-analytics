import Ember from 'ember';
import AnalyticsInitializer from 'dummy/initializers/analytics';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | analytics', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  AnalyticsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
