import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .map((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      return response; // Mengembalikan respons yang sudah ada dari cache
    }

    // Jika tidak ada di cache, ambil dari server dan simpan di cache
    return this._fetchRequest(request);
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(request) {
    try {
      const response = await fetch(request);

      if (!response || response.status !== 200) {
        return response;
      }

      await this._addCache(request, response); // Simpan respons ke dalam cache
      return response;
    } catch (error) {
      console.error('Error fetching request:', error);
      return null; // Mengembalikan null jika terjadi kesalahan
    }
  },

  async _addCache(request, response) {
    const cache = await this._openCache();
    await cache.put(request, response.clone()); // Simpan respons ke dalam cache
  },
};

export default CacheHelper;
