const {hooks} = require('@adonisjs/ignitor');

/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/framework/src/Config')} Config */

hooks.after.providersBooted(() => {

  /** @type {View} */
  const View   = use('View');

  /** @type {Config} */
  const Config = use('Config');

  View.global('config', function (key) {
    return Config.get(key);
  });
});
