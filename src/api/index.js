import Point from "../models/point.js";
import Offer from "../models/offer.js";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const URLS = [`points`, `destinations`, `offers`];

const DEFAULT_HEADER = {"Content-Type": `application/json`};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getData() {
    const requests = URLS.map((it) => this._load({url: it}));
    return Promise.all(requests)
      .then((responses) => Promise.all(responses.map((it) => it.json())))
      .then((responses) => {
        const [points, destinations, offers] = responses;
        const parsedPoints = Point.parseAll(points);
        const parsedOffers = Offer.parse(offers);
        return {parsedPoints, destinations, parsedOffers};
      });
  }

  createPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers(DEFAULT_HEADER)
    })
      .then((response) => response.json())
      .then(Point.parse);
  }

  updatePoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers(DEFAULT_HEADER)
    })
      .then((response) => response.json())
      .then(Point.parse);
  }

  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE,
    });
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers(DEFAULT_HEADER)
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
