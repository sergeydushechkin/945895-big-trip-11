export default class Points {
  constructor() {
    this._points = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = points;
  }

  updatePoint(id, newData) {
    const pointIndex = this._points.findIndex((point) => point.id === id);

    if (pointIndex === -1) {
      return false;
    }

    this._points[pointIndex] = newData;

    return true;
  }
}
