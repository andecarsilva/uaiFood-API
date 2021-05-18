'use strict';


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserVerify {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   * @param {Function} next
   * @param properties
   */
  async handle({request, response, auth}, next, properties) {
    // call next to advance the request
    if (request.match('/api/v1/auth/users/:id') && request.method() !== 'GET') {
      const url    = request.url();
      const userId = /.*\/users\/(\d{0,})/.exec(url)[1];
      const user   = auth.user;

      console.log(userId);
      console.log(user.id);

      if (userId == 1) {
        return response.status(422).send('Usuário BOT não pode ser deletado ou alterado');
      } else if (userId == 2) {
        return response.status(422).send('Usuário Super Admin não pode ser deletado ou alterado');
      }

      if (request.method() == 'DELETE' && userId == user.id) {
        return response.status(422).send('Você não pode se deletar...');
      }
    }
    await next();
  }
}

module.exports = UserVerify;
