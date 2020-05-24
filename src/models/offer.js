export default class Offer {
  constructor(data) {
    return data.reduce((acc, offer) => {
      return Object.assign(
          {},
          acc,
          {[`${offer.type}`]: offer.offers}
      );
    }, {});
  }

  static parseOffers(data) {
    return new Offer(data);
  }
}
