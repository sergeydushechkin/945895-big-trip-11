export default class Store {
  constructor() {
    this._destinations = null;
  }

  static setDestinations(data) {
    this._destinations = data;
  }

  static getDestinations() {
    return this._destinations;
  }

  static setOffers(data) {
    this._offers = data;
  }

  static getOffers() {
    return this._offers;
  }
}
