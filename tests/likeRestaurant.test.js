// likeRestaurant.test.js

import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  beforeEach(async () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
    await FavoriteRestaurantIdb.deleteAllRestaurants();
  });

  it('should show the favorite button when the restaurant has not been liked before', async () => {
    await TestFactories.createFavoriteButtonInitiatorWithRestaurant({ id: 1 });

    // Wait for the element to appear in the DOM
    await new Promise(resolve => setTimeout(resolve, 500)); // Waiting for 0.5 seconds as an example

    const favoriteButton = document.querySelector('[aria-label="favorite this restaurant"]');
    expect(favoriteButton).toBeTruthy();
  });

  it('should not show the unfavorite button when the restaurant has not been liked before', async () => {
    await TestFactories.createFavoriteButtonInitiatorWithRestaurant({ id: 1 });

    // Wait for the element to appear in the DOM
    await new Promise(resolve => setTimeout(resolve, 500)); // Waiting for 0.5 seconds as an example

    const unfavoriteButton = document.querySelector('[aria-label="unfavorite this restaurant"]');
    expect(unfavoriteButton).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createFavoriteButtonInitiatorWithRestaurant({ id: 1 });

    // Wait for the element to appear in the DOM
    await new Promise(resolve => setTimeout(resolve, 500)); // Waiting for 0.5 seconds as an example

    const favoriteButton = document.querySelector('[aria-label="favorite this restaurant"]');
    if (favoriteButton) {
      favoriteButton.dispatchEvent(new Event('click'));
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for asynchronous process to complete

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when it is already liked', async () => {
    await TestFactories.createFavoriteButtonInitiatorWithRestaurant({ id: 1 });

    // Wait for the element to appear in the DOM
    await new Promise(resolve => setTimeout(resolve, 500)); // Waiting for 0.5 seconds as an example

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    const favoriteButton = document.querySelector('[aria-label="favorite this restaurant"]');
    if (favoriteButton) {
      favoriteButton.dispatchEvent(new Event('click'));
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for asynchronous process to complete

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toEqual([{ id: 1 }]);

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonInitiatorWithRestaurant({});

    // Wait for the element to appear in the DOM
    await new Promise(resolve => setTimeout(resolve, 500)); // Waiting for 0.5 seconds as an example

    const favoriteButton = document.querySelector('[aria-label="favorite this restaurant"]');
    if (favoriteButton) {
      favoriteButton.dispatchEvent(new Event('click'));
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for asynchronous process to complete

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toEqual([]);
  });
});
