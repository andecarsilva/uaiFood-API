'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RefMenuItemsSchema extends Schema {
  up () {
    this.create('ref_menu_items', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('menu_id').unsigned().references('id').inTable('menus')
      table.integer('menu_item_id').unsigned().references('id').inTable('menu_items')
      table.timestamps()
    })
  }

  down () {
    this.drop('ref_menu_items')
  }
}

module.exports = RefMenuItemsSchema
