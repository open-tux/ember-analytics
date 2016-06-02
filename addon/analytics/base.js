import Ember from 'ember';

const {
  Object: EmberObject,
  A: emberArray,
  K,
  computed,
  getWithDefault,
  get,
  setProperties,
  typeOf,
  isEmpty
} = Ember;

const { keys } = Object;

const assign = Ember.assign || Ember.merge;

export default EmberObject.extend({
  router: undefined,
  data: undefined,
  trackEvent: K,
  trackPage: K,

  path: computed('router.{router,currentHandlerInfos.[]}', function() {
    const childrouter = get(this, 'router.router');
    const router = get(this, 'router');
    let handler = getWithDefault(childrouter || router, 'currentHandlerInfos', []);

    return emberArray(handler).getEach('name').join('.').replace('.index', '');
  }),

  getParam(options, id) {
    const path = get(this, 'path');
    const data = getWithDefault(this, 'data', {});
    const global = getWithDefault(data, 'global', {});
    let param = {};
    let tempParam = {};
    let globalParam;
    let routeParam;
    let properties;

    assign(param, get(data, '_'));
    assign(param, get(data, `${path}._`));

    if (id) {
      globalParam = get(global, id);
      routeParam = get(data, `${path}.${id}`);
      properties = globalParam || routeParam;

      if (typeOf(properties) === 'function') {
        properties = properties.call(this, options);
      }

      if (properties) {
        assign(tempParam, properties);
        assign(param, tempParam);
      }

      if (isEmpty(keys(tempParam))) {
        param = {};
      }
    }

    return param;
  }
});
