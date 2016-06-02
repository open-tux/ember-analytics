# ember-cli-analytics

Common framework for triggering analytics.
1. Site Catalyst
2. DTM

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Configuration

* Configure the analytics tool in the `config/environment`
```
module.exports = function(environment) {
  var ENV = {
    analyticsAdapters: [
      {
        name: 'sitecatalyst',
        disabled: false // Set this to true if you want to disable site catalyst tracking.
      },
      {
        name: 'dtm',
        disabled: false
      }
    ]
  }

```
* Add the corresponding `vendor scripts` in `vendor` directory and import them in `ember-cli-build`

```
  // For Site catalyst
  app.import('vendor/xyz.js');

```

## Define analytics params

* Define params related to your analytics tool in `app/analytics-params/<tool name>.js`
* For Site catalyst this file will be `app/analytics-params/site-catalyst.js`
* To create this file run the command `ember g analytics-param site-catalyst`.
* This will create a blueprint file.

* Define `global` parameters that are not related to your route under `global`.
* Define route related parameter in the way your router is defined under `application`
* Properties defined under `_` will be combined with all the other custom events defined within the route.

```
// app/analytics-params/site-catalyst.js

  import Ember from 'ember';

  const {
    Object: EmberObject
  } = Ember;

  export default EmberObject.extend({
    global: {
      myglobalparam: { prop1: 'value1', prop2: 'value2' }
    },

    application: {
      login: {
        _: { section: 'mylogin' },
        submit: { prop3: 'value3' }
      },

      authenticated: {
        _: { section: 'secured' }
        profile: {
          _: { section: 'profile' },
          customevent(options) {
            return { myprop: options.value }
          }
        }
      }
    }
  });

```

## How to use?

* If you want to track event whenever `action` is invoked then create a initializer with below content

```
// app/initializers/action-handler.js

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
```

* If you want to track event whenever `route` transition occurs then, override `didTransition` action in your application route.

```
// app/routes/application.js

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

```

## Trigger custom events

* trackEvent
    Invoke this action with with properties that you need to pass to analytics.
    1st argument is an identifier and last argument is additional properties.

```

actions: {
  performlogin() {
    get(this, 'analytics').trackEvent('trackLogin', { prop1: 'myusername' });
  }
}

```

* trackNamedEvent
    If you have multiple analytics tool configured and you want to trigger event for one of the tool then use this function.

```

  actions: {
    performlogin() {
      get(this, 'analytics').trackNamedEvent('siteCatalyst', 'trackLogin', { prop1: 'myusername' });
    }
  }

```

# Create a custom analytics

* Run the command `ember g analytic mycustom-tool`
* Override `trackEvent` and `trackPage`
