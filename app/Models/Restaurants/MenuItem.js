'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MenuItem extends Model {

  Menu(){
    return this.hasOne('App/Models/Restaurants/Menu','menu_id','id');
  }
}

module.exports = MenuItem
