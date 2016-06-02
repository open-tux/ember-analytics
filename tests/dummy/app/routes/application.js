import Ember from 'ember';

const {
  Route,
  inject,
  get
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  analytics: service(),

  actions: {
    didTransition() {
      this._super(...arguments);
      get(this, 'analytics').trackPage();
    }  
  }
});
