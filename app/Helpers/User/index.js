const Helpers = use( 'Helpers' );
const Restaurant = use('App/Models/Restaurants/Restaurant');

const checkMyRestaurant = async(user,restaurant_id) =>{

  const restaurantObj = await  Restaurant.find(restaurant_id);

  return restaurantObj.user_id === user.id;


}
module.exports = {
  checkMyRestaurant
}
