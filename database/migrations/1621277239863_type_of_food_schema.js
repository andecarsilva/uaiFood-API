'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypeOfFoodSchema extends Schema {
  up () {
    this.create('type_of_foods', (table) => {
      table.increments()
      table.string('type')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('type_of_foods')
  }
}

module.exports = TypeOfFoodSchema
