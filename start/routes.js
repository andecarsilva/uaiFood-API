'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', 'v1/WelcomeController.index').middleware(['guest']).as('welcome');

// Grouped Auth
Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly().middleware(['userVerify']);
  Route.get('teste', 'TesteController.teste').as('teste');
})
  .as('auth')
  .namespace('v1/Auth')
  .middleware(['auth'])
  .prefix('api/v1/auth');

// Grouped Auth Guest
Route.group(() => {
  Route.post('login', 'UsersController.login').as('users.login');
  Route.post('register', 'UsersController.store').as('users.register').middleware('throttle:90');
  Route.post('forgot_password', 'UsersController.forgotPassword').as('users.forgotPassword');
  Route.post('update_password_by_token/:token', 'UsersController.updatePasswordByToken').as('users.updatePasswordByToken');
})
  .as('auth')
  .namespace('v1/Auth')
  .middleware(['guest'])
  .prefix('api/v1/auth');

// Grouped Types
Route.group( () => {
  Route.resource( 'type_of_food', 'TypeOfFoodController' )
    .apiOnly()
    .validator(
      new Map( [
        [ [ 'type_of_food.index' ], [ 'Types/View' ] ],
        [ [ 'type_of_food.show' ],  [ 'Types/View' ] ],
        [ [ 'type_of_food.store' ], [ 'Types/Store' ] ],
        [ [ 'type_of_food.update' ],[ 'Types/Update' ] ],
        [ [ 'type_of_food.destroy'],[ 'Types/Destroy' ] ],
      ] ),
    );


} )
  .as( 'types' )
  .namespace( 'v1/Types' )
  .middleware( [ 'auth' ] )
  .prefix( 'api/v1/types' );



// Grouped Restaurants
Route.group( () => {
  Route.resource( 'restaurants', 'RestaurantsController' )
    .apiOnly()
    .validator(
      new Map( [
        [ [ 'restaurants.index' ], [ 'Restaurants/Restaurant/View' ] ],
        [ [ 'restaurants.show' ],  [ 'Restaurants/Restaurant/View' ] ],
        [ [ 'restaurants.store' ], [ 'Restaurants/Restaurant/Store' ] ],
        [ [ 'restaurants.update' ],[ 'Restaurants/Restaurant/Update' ] ],
        [ [ 'restaurants.destroy'],[ 'Restaurants/Restaurant/Destroy' ] ],
      ] ),
    );

  Route.resource( 'menus', 'MenuController' )
    .apiOnly()
    .validator(
      new Map( [
        [ [ 'menus.index' ], [ 'Restaurants/Menus/View' ] ],
        [ [ 'menus.show' ],  [ 'Restaurants/Menus/View' ] ],
        [ [ 'menus.store' ], [ 'Restaurants/Menus/Store' ] ],
        [ [ 'menus.update' ],[ 'Restaurants/Menus/Update' ] ],
        [ [ 'menus.destroy'],[ 'Restaurants/Menus/Destroy' ] ],
      ] ),
    );

  Route.resource( 'menu_items', 'MenusItemController' )
    .apiOnly()
    .validator(
      new Map( [
        [ [ 'menu_items.index' ], [ 'Restaurants/MenuItems/View' ] ],
        [ [ 'menu_items.show' ],  [ 'Restaurants/MenuItems/View' ] ],
        [ [ 'menu_items.store' ], [ 'Restaurants/MenuItems/Store' ] ],
        [ [ 'menu_items.update' ],[ 'Restaurants/MenuItems/Update' ] ],
        [ [ 'menu_items.destroy'],[ 'Restaurants/MenuItems/Destroy' ] ],
      ] ),
    );

  Route.get('my_restaurants' , 'RestaurantsController.myRestaurants')

} )
  .as( 'restaurants' )
  .namespace( 'v1/Restaurants' )
  .middleware( [ 'auth' ] )
  .prefix( 'api/v1/restaurants' );
