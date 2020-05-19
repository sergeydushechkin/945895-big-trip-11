import FilterComponent from "../components/filter.js";
import {RenderPosition, render, replace} from "../utils/render.js";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._filterComponent = null;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._resetFilter = this._resetFilter.bind(this);
    this._pointsModel.setFilterResetHandler(this._resetFilter);
  }

  render() {
    const oldFilterComponent = this._filterComponent;
    this._filterComponent = new FilterComponent();

    if (oldFilterComponent) {
      replace(this._filterComponent, oldFilterComponent);
    } else {
      render(
          this._container,
          this._filterComponent,
          RenderPosition.AFTEREND
      );
    }

    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);
  }

  _filterChangeHandler(filterType) {
    this._pointsModel.setFilter(filterType);
  }

  _resetFilter() {
    this.render();
  }
}
