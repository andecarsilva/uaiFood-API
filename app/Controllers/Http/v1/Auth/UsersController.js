'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */
/** @typedef {import('@adonisjs/persona/src/Persona')} Persona */

const User = use('App/Models/User');

/** @type {Persona} */
const Persona = use('Persona');

const querystring = require('querystring');

/**
 * Resourceful controller for interacting with users
 */
class UsersController {

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   * @returns {Promise<void|*>}
   */
  async login({ request, auth, response }) {
    let token = null;

    console.log('Login');

    const { type, email, password, refresh_token } = request.all();

    try {
      // validate the user credentials and generate a JWT token
      token = await auth.withRefreshToken().attempt(email, password);

      return response.json({
        status: 'success',
        data  : token,
      });

    } catch (error) {
      response.status(400).json({
        status : 'error',
        message: error.message,
      });
    }
  }


  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @returns {Promise<void|*>}
   */
  async forgotPassword({ request, response }) {
    const email  = request.input('email');
    await Persona.forgotPassword(email);

    await response.json({ error: 0, message: 'Um email foi enviado com as instruções para fazer o resete da sua senha.' });
  }


  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   * @returns {Promise<void|*>}
   */
  async updatePassword({ request, auth }) {
    const payload = request.only(['old_password', 'password', 'password_confirmation']);
    const UserObj = auth.user;
    await Persona.updatePassword(UserObj, payload);
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @returns {Promise<void|*>}
   */
  async updatePasswordByToken({ request, response, params }) {
    const token   = querystring.unescape(params.token);
    const payload = request.only(['password', 'password_confirmation']);

    const UserObj = await Persona.updatePasswordByToken(token, payload);

    await response.json({ error: 0, message: 'Sua senha foi redefinida faça o login para continuar.' });
  }

  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const UsersObj = await User.query().paginate(1);

    await response.json(UsersObj.toJSON());
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const payload = request.only(['username', 'email', 'password', 'password_confirmation']);

    try {
      const UserObj = await Persona.register(payload);
      return response.json(UserObj);
    } catch (error) {
      return response.status(400).json(error);
    }

  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view, auth }) {

    try {
      const UserObj = await User.findByOrFail('id', auth.user.id);
      return response.json(UserObj);
    } catch (error) {
      return response.status(422).send(error);
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update({ params, request, response, auth }) {
    const userId  = params.id;
    const payload = request.only(['username', 'email']);
    try {
      const UserObj     = await User.findByOrFail('id', userId);
      const userUpdated = await Persona.updateProfile(UserObj, payload);
      return response.send(userUpdated);
    } catch (error) {
      return response.status(400).send(error);
    }

  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const userId = params.id;
    try {
      const UserObj = await User.findByOrFail('id', userId);
      await UserObj.delete();
      return response.send('OK');
    } catch (error) {
      return response.status(422).send(error);
    }

  }
}

module.exports = UsersController;
