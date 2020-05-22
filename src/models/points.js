import {getFilteredPoints} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class Points {
  constructor() {
    this._points = [];
    this._activeFilter = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._filterResetHandler = null;
  }

  getPoints() {
    return getFilteredPoints(this._points, this._activeFilter);
  }

  getPointsAll() {
    return this._points;
  }

  setPoints(points) {
    this._points = points;
    this._callHandlers(this._dataChangeHandlers);
  }

  addPoint(data) {
    data.id = Date.now().toString() + Math.random();
    this._points.push(data);

    this._callHandlers(this._dataChangeHandlers);
  }

  updatePoint(id, newData) {
    const pointIndex = this._findPointIndex(id);

    if (pointIndex === -1) {
      return false;
    }

    this._points[pointIndex] = newData;
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removePoint(id) {
    const pointIndex = this._findPointIndex(id);

    if (pointIndex === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, pointIndex), this._points.slice(pointIndex + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilter = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  resetFilter() {
    if (this._activeFilter === FilterType.EVERYTHING) {
      return;
    }

    this.setFilter(FilterType.EVERYTHING);
    this._filterResetHandler();
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilterResetHandler(handler) {
    this._filterResetHandler = handler;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _findPointIndex(id) {
    return this._points.findIndex((point) => point.id === id);
  }
}
