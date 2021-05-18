'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Menu extends Model {

  MenuItems(){
    return this.hasMany('App/Models/Restaurants/MenuItem','id','menu_id');
  }

}

module.exports = Menu
