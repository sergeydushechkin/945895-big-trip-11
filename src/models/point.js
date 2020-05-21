export default class Point {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.destination = data.destination.name;
    this.dateStart = Date.parse(data.date_from);
    this.dateEnd = Date.parse(data.date_to);
    this.price = data.base_price;
    this.offers = data.offers.map((offer) => {
      const {name, price} = offer;
      return {name, price};
    });
    this.isFavorite = Boolean(data.is_favorite);
  }

  parsePoint(data) {
    return new Point(data);
  }

  parsePoints(data) {
    return data.map(Point.parsePoint);
  }

}
