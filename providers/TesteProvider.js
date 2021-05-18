'use strict';

/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
/** @typedef {import('@adonisjs/framework/src/Env')} Env */
/** @typedef {import('@adonisjs/lucid/src/Factory')} Factory */
/** @typedef {import('@adonisjs/framework/src/Hash')} Hash */
/** @typedef {import('@adonisjs/ignitor/src/Helpers')} Helpers */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/lucid/src/Schema')} Schema */
/** @typedef {import('@adonisjs/framework/src/Server')} Server */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const {ServiceProvider} = require('@adonisjs/fold');

class TesteProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    //
  }
}

module.exports = TesteProvider;
