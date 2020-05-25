export default class Point {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.destination = data.destination;
    this.dateStart = Date.parse(data.date_from);
    this.dateEnd = Date.parse(data.date_to);
    this.price = data.base_price;
    this.offers = data.offers;
    this.isFavorite = Boolean(data.is_favorite);
  }

  toRAW() {
    return {
      "id": this.id,
      "type": this.type,
      "destination": this.destination,
      "date_from": new Date(this.dateStart).toISOString(),
      "date_to": new Date(this.dateEnd).toISOString(),
      "base_price": this.price,
      "offers": this.offers,
      "is_favorite": this.isFavorite
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
