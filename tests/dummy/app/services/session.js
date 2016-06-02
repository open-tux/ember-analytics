import Ember from 'ember';

const {
  Service
} = Ember;

export default Service.extend({
  authenticated: false,
  userName: undefined
});
