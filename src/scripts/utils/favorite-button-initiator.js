import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import { createFavoriteButtonTemplate, createFavoritedButtonTemplate } from '../views/templates/template-creator';

const FavoriteButtonInitiator = {
  async init({ favoriteButtonContainer, restaurant }) {
    this._favoriteButtonContainer = favoriteButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();

    // Pastikan elemen tombol suka ada sebelum menambah event listener
    const likeButton = document.querySelector('#likeButton');
    if (!likeButton) {
      throw new Error('Failed to find like button element');
    }

    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._favoriteButtonContainer.innerHTML = createFavoritedButtonTemplate();

    // Pastikan elemen tombol batal suka ada sebelum menambah event listener
    const likeButton = document.querySelector('#likeButton');
    if (!likeButton) {
      throw new Error('Failed to find unlike button element');
    }

    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavoriteButtonInitiator;
