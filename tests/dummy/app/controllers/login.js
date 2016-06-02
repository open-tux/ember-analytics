import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

const {
  service
} = inject;

export default Controller.extend({
  session: service(),

  actions: {
    login() {
      const model               = this.get('model');
      const userName            = model.get('userName');
      const password            = model.get('password');
      const session             = this.get('session');
      const previousTransition  = session.get('previousTransition');

      // Instead of if and else invoke API call to validate user name and password
      if (userName === 'anand' && password === 'anand') {
        // Validation successful so user gets authenticated here.
        // Set user name and authenticated status as true in session service.
        session.setProperties({
          userName,
          authenticated: true
        });

        // Check if the autheticated URL is been bookmarked and launched
        if (previousTransition) {
          session.set('previousTransition', undefined);
          // If it is bookmarked URL then goto corresponding route.
          previousTransition.retry();
        } else {
          // If it is not a bookmarked URL then goto dashboard.
          this.transitionToRoute('dashboard');
        }
      } else {
        // Invalid user name and password.
        alert('Please enter valid username and password');
      }
    }
  }
});
