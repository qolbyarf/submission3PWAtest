import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async restaurantLists() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async restaurantDetail(id) {
    const url = `https://restaurant-api.dicoding.dev/detail/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json();
  }
}

export default RestaurantSource;