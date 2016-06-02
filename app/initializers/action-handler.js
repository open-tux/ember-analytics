import Ember from 'ember';

const {
  ActionHandler,
  inject: { service },
  get
} = Ember;

export function initialize(/* application */) {
  ActionHandler.reopen({
    analytics: service(),

    send(actionName) {
      get(this, 'analytics').trackEvent(actionName);
      this._super(...arguments);
    }
  });
}

export default {
  name: 'action-handler',
  after: 'analytics',
  initialize
};
