export default class Point {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.destination = data.destination;
    this.dateStart = Date.parse(data.date_from);
    this.dateEnd = Date.parse(data.date_to);
    this.price = data.base_price;
    this.offers = data.offers.map((offer) => {
      const {title: name, price} = offer;
      return {name, price};
    });
    this.isFavorite = Boolean(data.is_favorite);
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

}
