export default class Store {
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
