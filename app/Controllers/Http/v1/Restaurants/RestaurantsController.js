'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Restaurant = use('App/Models/Restaurants/Restaurant');
/**
 * Resourceful controller for interacting with restaurants
 */
class RestaurantsController {
  /**
   * Show a list of all restaurants.
   * GET restaurants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { page, per_page, include, filter_by, order_by, direction, latitude, longitude } = request.all()

    const filter_by_json = filter_by ? JSON.parse(filter_by || '{}') : undefined;

    const query = Restaurant.query();

    if(include){
      include.forEach(element => {
        query.with(element)
      })
    }

    if(latitude && longitude){
      query.nearBy(latitude, longitude, 10)
    }

    if (filter_by_json) {
      for (var [key, value] of Object.entries(filter_by_json)) {
        const keys = key.split('.');

        if (keys.length == 1) {
          query.where(key, 'like', '%' + value + '%')
        } else if (keys.length == 2) {

          query
            .with(keys[0], (builder) => {
              builder.where(keys[1], 'like', `%${value}%`)
            })
            .whereHas(keys[0], (builder) => {
              builder.where(keys[1], 'like', `%${value}%`)
            }, '>=', 1)
        }
      }
    }

    const UsersObj = await query
      .orderBy(order_by || 'id', direction || 'asc')
      .paginate(page || 1, per_page || 5);

    return response.json(UsersObj.toJSON());
  }

  /**
   * Create/save a new restaurant.
   * POST restaurants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth }) {
    const payload = request.only([
      'name',
      'description',
      'type_of_food_id',
      'city',
      'state',
      'longitude',
      'latitude',
    ]);

    const user = auth.user

    try{
      const RestaurantObj = await user.Restaurant().create(payload);
      await response.json(RestaurantObj);
    }catch (error) {
      console.log(error)
      return response.status(422).send(error);
    }

  }

  /**
   * Display a single restaurant.
   * GET restaurants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const RestaurantId = params.id;
    try{
      const RestaurantObj = await Restaurant.query().where('id',RestaurantId)
        .with('typeOfFood')
        .with('Menu.MenuItems')
        .first();

      return response.json(RestaurantObj);
    }catch (error) {
      console.log(error)
      return response.status(422).send(error);
    }
  }

  /**
   * Update restaurant details.
   * PUT or PATCH restaurants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response ,auth}) {
    const RestaurantId = params.id;
    const payload = request.only([
      'name',
      'description',
      'type_of_food_id',
      'city',
      'state',
      'longitude',
      'latitude',
    ]);

    try{
      const RestaurantObj = await Restaurant.findByOrFail('id',RestaurantId);

      if(RestaurantObj.user_id !== auth.user.id){
        return response.status(422).send('Você não pode alterar esse restaurante');

      }
      RestaurantObj.merge(payload);
      await RestaurantObj.save()
      return response.json(RestaurantObj);
    }catch (error) {
      return response.status(422).send(error);
    }

  }

  /**
   * Delete a restaurant with id.
   * DELETE restaurants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,auth }) {
    const RestaurantId = params.id;
    try{
      const RestaurantObj = await Restaurant.findByOrFail('id',RestaurantId);
      if(RestaurantObj.user_id !== auth.user.id){
        return response.status(422).send('Você não pode alterar esse restaurante');
      }
      await RestaurantObj.delete()
      return response.send('Ok');
    }catch (error) {
      return response.status(422).send(error);
    }
  }

  /**
   * Show a restaurant the user.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {auth} ctx.auth
   */
  async myRestaurants({ params, request, response,auth }){

    const myRestaurant = await Restaurant.query().where('user_id',auth.user.id).fetch();
    return response.json(myRestaurant);

  }
}

module.exports = RestaurantsController
