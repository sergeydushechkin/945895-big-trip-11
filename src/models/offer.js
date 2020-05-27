export default class Offer {
  constructor(data) {
    return data.reduce((acc, offer) => {
      return Object.assign(
          {},
          acc,
          {
            [offer.type]: offer.offers
          }
      );
    }, {});
  }

  static parse(data) {
    return new Offer(data);
  }
}
