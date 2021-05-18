'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenuItemsSchema extends Schema {
  up () {
    this.create('menu_items', (table) => {
      table.increments()
      table.integer('menu_id').unsigned().references('id').inTable('menus')
      table.string('name')
      table.string('description')
      table.float('price')
      table.boolean('promotion')
      table.timestamps()
    })
  }

  down () {
    this.drop('menu_items')
  }
}

module.exports = MenuItemsSchema
