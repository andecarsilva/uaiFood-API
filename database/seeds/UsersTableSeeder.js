'use strict';

/*
|--------------------------------------------------------------------------
| UsersTableSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Persona = use('Persona');

class UsersTableSeeder {
  async run() {
    console.log('UsersTableSeeder');

    await Persona.register(
      {
        username             : 'BOT',
        email                : 'bot@atest.com',
        password             : 'szWAT5TdU34vkm74!lI$J$%BaXK4O7R4',
        password_confirmation: 'szWAT5TdU34vkm74!lI$J$%BaXK4O7R4',
      },
    );

  }
}

module.exports = UsersTableSeeder;
