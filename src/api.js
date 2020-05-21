import Point from "./models/point.js";

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/points`, {headers})
      .then((response) => response.json())
      .then(Point.parsePoints);
  }
}
