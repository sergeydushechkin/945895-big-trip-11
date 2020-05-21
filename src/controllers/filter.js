import FilterComponent from "../components/filter.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import {getFilteredPoints} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._filterComponent = null;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._resetFilter = this._resetFilter.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setFilterResetHandler(this._resetFilter);
    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const futureStatus = getFilteredPoints(this._pointsModel.getPointsAll(), FilterType.FUTURE).length !== 0;
    const pastStatus = getFilteredPoints(this._pointsModel.getPointsAll(), FilterType.PAST).length !== 0;

    const oldFilterComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(futureStatus, pastStatus);

    if (oldFilterComponent) {
      replace(this._filterComponent, oldFilterComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.AFTEREND);
    }

    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);
  }

  _filterChangeHandler(filterType) {
    this._pointsModel.setFilter(filterType);
  }

  _resetFilter() {
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
