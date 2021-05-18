'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Restaurant extends Model {
  static get table () {
    return 'restaurants'
  }

  typeOfFood(){
    return this.hasOne('App/Models/Types/TypeOfFood', 'type_of_food_id','id');
  }

  user(){
    return this.hasMany('App/Models/User', 'user_id','id');
  }

  Menu() {
    return this.hasOne('App/Models/Restaurants/Menu', 'id', 'restaurant_id');
  }

  static scopeNearBy (query, latitude, longitude, distance) {
    const haversine = `(6371 * acos(cos(radians(${latitude}))
    * cos(radians(latitude))
    * cos(radians(longitude)
    - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(latitude))))`

    return query
      .select('*', Database.raw(`${haversine} as distance`))
      .whereRaw(`${haversine} < ${distance}`)
  }

}

module.exports = Restaurant
