'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const TypeOfFood = use('App/Models/Types/TypeOfFood');

/**
 * Resourceful controller for interacting with typeoffoods
 */
class TypeOfFoodController {
  /**
   * Show a list of all typeoffoods.
   * GET typeoffoods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const { page, per_page, filter_by, order_by, direction } = request.all()

    const filter_by_json = filter_by ? JSON.parse(filter_by || '{}') : undefined;

    const query = TypeOfFood.query();

    if (filter_by_json) {
      for (var [key, value] of Object.entries(filter_by_json)) {
        query.where(key, 'like', '%' + value + '%')
      }
    }

    const TypeOfFoodObj = await query
      .orderBy(order_by || 'id', direction || 'asc')
      .paginate(page || 1, per_page || 5);

    return response.json(TypeOfFoodObj.toJSON());

  }

  /**
   * Create/save a new typeoffood.
   * POST typeoffoods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const payload = request.only([
      'type',
      'description'
    ]);

    try{
      const TypeOfFoodObj = await TypeOfFood.create(payload);
      await response.json(TypeOfFoodObj);
    }catch (error) {
      return response.status(422).send(error);
    }
  }

  /**
   * Display a single typeoffood.
   * GET typeoffoods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const TypeOfFoodId = params.id;
    try{
      const TypeOfFoodObj = await TypeOfFood.findByOrFail('id',TypeOfFoodId);
      return response.json(TypeOfFoodObj);
    }catch (error) {
      return response.status(422).send(error);
    }
  }

  /**
   * Update typeoffood details.
   * PUT or PATCH typeoffoods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const TypeOfFoodId = params.id;
    const payload = request.only([
      'type',
      'description'
    ]);

    try{
      const TypeOfFoodObj = await TypeOfFood.findByOrFail('id',TypeOfFoodId);
      TypeOfFoodObj.merge(payload);
      await TypeOfFoodObj.save()
      return response.json(TypeOfFoodObj);
    }catch (error) {
      return response.status(422).send(error);
    }

  }

  /**
   * Delete a typeoffood with id.
   * DELETE typeoffoods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const TypeOfFoodId = params.id;
    try{
      const TypeOfFoodObj = await TypeOfFood.findByOrFail('id',TypeOfFoodId);
      await TypeOfFoodObj.delete()
      return response.send('Ok');
    }catch (error) {
      return response.status(422).send(error);
    }
  }
}

module.exports = TypeOfFoodController
