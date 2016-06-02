import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  session: service(),

  beforeModel(transition) {
    const session = this.get('session');
    // This is the first route that will get launched.
    // Check user authentication status.
    if (!session.get('authenticated')) {
      // If user is not authenticated.

      // Check if the user launched the bookmarked URL of an authenticated page.
      if (transition.targetName.indexOf('authenticated.index') === -1) {
        // If it is bookmarked URL then save the state of the route transition
        session.set('previousTransition', transition);
      }

      // Goto Login
      this.transitionTo('login');
    }
  }
});
