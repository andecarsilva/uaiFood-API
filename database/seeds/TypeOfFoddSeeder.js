'use strict'

/*
|--------------------------------------------------------------------------
| TypeOfFoddSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const TypeOfFood = use('App/Models/Types/TypeOfFood');


const typeOfFoods = [
  'Árabe',
  'Brasileira',
  'Chinesa',
  'Francesa',
 ' Frutos do mar',
  'Vegetariana',
  'Italiana',
]

class TypeOfFoddSeeder {
  async run () {
    for(let i in typeOfFoods){
      let saveData = await TypeOfFood.query().insert({
        type: typeOfFoods[i],
        description: `Comida - ${typeOfFoods[i]}`,
      })
    }
  }
}

module.exports = TypeOfFoddSeeder
