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
    logout() {
      // Reseting the application by reploading the URL by removing hash portion.
      window.location = document.location.href.replace(location.hash , '');
    }
  }
});
