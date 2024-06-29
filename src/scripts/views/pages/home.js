import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
            <div class="restaurant-list"></div>
        `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.restaurantLists();
    const restaurantsContainer = document.querySelector('.restaurant-list');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
