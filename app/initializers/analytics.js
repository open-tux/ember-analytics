import config from '../config/environment';

export function initialize(/* application */) {
  const application = arguments[1] || arguments[0];

  // Inject environment config object into analytics service
  application.register('config:analytics', config, { instantiate: false });
  application.inject('service:analytics', 'config', 'config:analytics');

  // Inject router object into analytics service
  application.inject('service:analytics', 'router', 'router:main');
}

export default {
  name: 'analytics',
  initialize
};
