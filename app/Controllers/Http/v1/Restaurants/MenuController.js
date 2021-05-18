'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Menu = use('App/Models/Restaurants/Menu');
const {checkMyRestaurant} = use('App/Helpers/User');


/**
 * Resourceful controller for interacting with menus
 */
class MenuController {
  /**
   * Show a list of all menus.
   * GET menus
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

  }

  /**
   * Create/save a new menu.
   * POST menus
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth }) {
    const payload = request.only([
      'restaurant_id',
      'description'
    ]);

    const user = auth.user;
    const check =  await checkMyRestaurant(user,payload.restaurant_id);

    if(!check){
      return response.status(422).send('Você não pode cadastrar um cárdapio que não seja no seu restaurante');
    }

    try{
      const MenuObj = await Menu.create(payload);
      await response.json(MenuObj);
    }catch (error) {
      console.log(error)
      return response.status(422).send(error);
    }

  }

  /**
   * Display a single menu.
   * GET menus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const MenuId = params.id;
    try{
      const MenuObj = await Menu.query().where('id',MenuId).with('MenuItems').first();
      return response.json(MenuObj);
    }catch (error) {
      console.log(error)
      return response.status(422).send(error);
    }

  }

  /**
   * Update menu details.
   * PUT or PATCH menus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response,auth }) {
    const MenuId = params.id;
    const payload = request.only([
      'description'
    ]);
    const user = auth.user;


    try{
      const MenuObj = await Menu.findByOrFail('id',MenuId);
      const check =  await checkMyRestaurant(user,MenuObj.restaurant_id);

      if(!check){
        return response.status(422).send('Você não pode alterar um cárdapio que não seja no seu restaurante');
      }

      MenuObj.merge(payload);
      await MenuObj.save()
      return response.json(MenuObj);
    }catch (error) {
      return response.status(422).send(error);
    }
  }

  /**
   * Delete a menu with id.
   * DELETE menus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,auth }) {
    const MenuId = params.id;
    const user = auth.user;

    try{
      const MenuObj = await Menu.findByOrFail('id',MenuId);
      const check =  await checkMyRestaurant(user,MenuObj.restaurant_id);

      if(!check){
        return response.status(422).send('Você não pode alterar um cárdapio que não seja no seu restaurante');
      }

      await MenuObj.delete()
      return response.send('Ok');
    }catch (error) {
      return response.status(422).send(error);
    }
  }
}

module.exports = MenuController
