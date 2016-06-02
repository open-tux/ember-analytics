import Ember from 'ember';

const {
  Mixin,
  get,
  inject,
  on
} = Ember;

export default Mixin.create({
  analytics: inject.service(),

  /*
   * Track events whenever page transition happens
   *
   * @method trackRouteTransition
   * @on didTransition
   */
  trackRouteTransition: on('didTransition', function() {
    const analytics = get(this, 'analytics');
    analytics.trackPage();
  })
});
