'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestaurantSchema extends Schema {
  up () {
    this.create('restaurants', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name')
      table.string('description')
      table.string('city')
      table.string('state')
      table.string('longitude')
      table.string('latitude')
      table.integer('type_of_food_id').unsigned().references('id').inTable('type_of_foods')
      table.timestamps()
    })
  }

  down () {
    this.drop('restaurants')
  }
}

module.exports = RestaurantSchema
