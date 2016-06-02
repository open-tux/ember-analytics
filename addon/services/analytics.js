import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

const {
  A: emberArray,
  String: { dasherize },
  Service,
  getWithDefault,
  setProperties,
  get,
  set
} = Ember;

const {
  keys
} = Object;

export default Service.extend({
  /**
   * Cache the adapters
   *
   * @property adapters
   * @private
   * @type Object
   * @default undefined
   */
  adapters: undefined,

  /**
   * Cache the analytics datas
   *
   * @property adapters
   * @private
   * @type Object
   * @default undefined
   */
  data: undefined,

  /**
   * Cache the analytics config
   *
   * @property adapters
   * @private
   * @type Object
   * @default undefined
   */
  adapterConfig: undefined,

  /**
   * Called when service is initailized.
   * Read the adapters defined in `environment` file and initialize them.
   * Properties defined in `environment` file are injected into service under property `config`.
   *
   * @method init
   * @param {Void}
   * @return {Void}
   */
  init() {
    const config = get(this, 'config');
    const adapters = getWithDefault(config, 'analyticsAdapters', []);
    const owner = getOwner(this);

    owner.registerOptionsForType('ember-track-analytics@analytic', { instantiate: false });
    owner.registerOptionsForType('analytic', { instantiate: false });

    owner.registerOptionsForType('ember-track-analytics@analytics-param', { instantiate: false });
    owner.registerOptionsForType('analytics-param', { instantiate: false });

    setProperties(this, {
      adapters: {},
      data: {},
      adapterConfig: {}
    });
    this.initializeAdapters(adapters);
    this._super(...arguments);
  },


  /**
   * Filters out the adapters that are not disabled, initailize them and cache them to avoid further lookup.
   *
   * @method initializeAdapters
   * @param {Array} Adapters in environment config
   * @return {Void}
   */
  initializeAdapters(adapters=[]) {
    const _adapters = emberArray(adapters);
    const cache = get(this, 'adapters');
    const dataCache = get(this, 'data');
    const configCache = get(this, 'adapterConfig');

    _adapters
      .filter((adapter) => !get(adapter, 'disabled')) // Use the adapters only if it is not disabled
      .forEach((adapter) => {
        const {
          name
        } = adapter;

        set(configCache, name, adapter);

        // Check if adapter is avaliable in cache, if not initalize the adapter.
        if (!get(cache, name)) {
          set(cache, name, this.lookup(name));
        }

        if (!get(dataCache, name)) {
          set(dataCache, name, this.lookup(name, 'analytics-param'));
        }
      });
  },


  /**
   * Looks up the adapter from the container. Prioritizes the consuming app's
   * adapters over the addon's adapters.
   *
   * @method lookupAdapter
   * @param {String} name
   * @private
   * @return {AnalyticsAdapter} local or remote adapter
   */
  lookup(name, blueprint='analytic') {
    const container = getOwner(this);
    const dashedName = dasherize(name);
    const remote = container.lookup(`ember-track-analytics@${blueprint}:${dashedName}`);
    const local = getOwner(this).lookup(`${blueprint}:${dashedName}`);

    return local ? local : remote;
  },

  trigger(method, ...args) {
    const adapters = getWithDefault(this, 'adapters', {});
    const adapterConfig = getWithDefault(this, 'adapterConfig', {});
    const data = getWithDefault(this, 'data', {});
    const names = keys(adapters);
    const router = get(this, 'router');
    let _adapter;
    let _data;
    let config;

    names
      .map((name) => {
        return { name, adapter: get(adapters, name) }
      })
      .forEach((options) => {
        const { adapter, name } = options;

        config = adapterConfig[name];
        _data = data[name].create();
        _adapter = adapter.create({ router, config, data: _data });
        _adapter[method](...args);
      });

    _adapter = undefined;
    _data = undefined;
  },

  triggerNamed(myadapter, method, ...args) {
    const adapters = getWithDefault(this, 'adapters', {});
    const adapterConfig = getWithDefault(this, 'adapterConfig', {});
    const data = getWithDefault(this, 'data', {});
    const names = keys(adapters);
    const router = get(this, 'router');
    let _adapter;
    let _data;
    let config;

    names
      .map((name) => {
        return { name, adapter: get(adapters, name) }
      })
      .forEach((options) => {
        const { adapter, name } = options;

        if (name === myadapter) {
          config = adapterConfig[name];
          _data = data[name].create();
          _adapter = adapter.create({ router, config, data: _data });
          _adapter[method](...args);
        }
      });

    _adapter = undefined;
    _data = undefined;
  },

  trackEvent(id, options={}) {
    this.trigger('trackEvent', id, options);
  },

  trackPage(options={}) {
    this.trigger('trackPage', options);
  },

  trackNamedEvent(name, id, options={}) {
    this.triggerNamed('trackEvent', name, id, options);
  },

  trackNamedPage(name, options={}) {
    this.triggerNamed('trackPage', name, options);
  }

});
