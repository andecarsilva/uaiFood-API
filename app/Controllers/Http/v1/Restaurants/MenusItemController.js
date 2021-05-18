'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MenuItem = use('App/Models/Restaurants/MenuItem');
const {checkMyRestaurant} = use('App/Helpers/User');

/**
 * Resourceful controller for interacting with menusitems
 */
class MenusItemController {
  /**
   * Show a list of all menusitems.
   * GET menusitems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new menusitem.
   * POST menusitems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth }) {
    const payload = request.only([
      'menu_id',
      'name',
      'description',
      'price',
      'promotion',
    ]);
    const user = auth.user;

    try{
      const MenuItemObj = await MenuItem.create(payload);

      const verify = await MenuItem.query().where('id',MenuItemObj.id).with('Menu').first();
      const restaurantId = verify.$relations.Menu.restaurant_id;

      const check =  await checkMyRestaurant(user,restaurantId);

      if(!check){
        return response.status(422).send('Você não pode alterar um item que não seja no seu restaurante');
      }

      await response.json(MenuItemObj);
    }catch (error) {
      console.log(error)
      return response.status(422).send(error);
    }
  }

  /**
   * Display a single menusitem.
   * GET menusitems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const MenuItemId = params.id;

    try{
      const MenuItemObj = await MenuItem.query().where('id',MenuItemId).first();
      return response.json(MenuItemObj);
    }catch (error) {
      console.log(error)
      return response.status(422).send(error);
    }
  }

  /**
   * Update menusitem details.
   * PUT or PATCH menusitems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response,auth }) {
    const MenuItemId = params.id;
    const payload = request.only([
      'name',
      'description',
      'price',
      'promotion',
    ]);
    const user = auth.user;

    try{
      const MenuItemObj = await MenuItem.query().where('id',MenuItemId).with('Menu').first();
      const restaurantId = MenuItemObj.$relations.Menu.restaurant_id;

      const check =  await checkMyRestaurant(user,restaurantId);

      if(!check){
        return response.status(422).send('Você não pode alterar um item que não seja no seu restaurante');
      }

      MenuItemObj.merge(payload);
      await MenuItemObj.save()
      return response.json(MenuItemObj);
    }catch (error) {
      return response.status(422).send(error);
    }
  }

  /**
   * Delete a menusitem with id.
   * DELETE menusitems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,auth }) {
    const MenuItemId = params.id;
    const user = auth.user;

    try{
      const MenuItemObj = await MenuItem.query().where('id',MenuItemId).with('Menu').first();
      const restaurantId = MenuItemObj.$relations.Menu.restaurant_id;

      const check =  await checkMyRestaurant(user,restaurantId);

      if(!check){
        return response.status(422).send('Você não pode alterar um item que não seja no seu restaurante');
      }
      await MenuItemObj.delete()
      return response.send('Ok');
    }catch (error) {
      return response.status(422).send(error);
    }
  }

}

module.exports = MenusItemController
