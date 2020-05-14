import FilterComponent from "../components/filter.js";
import {RenderPosition, render} from "../utils/render.js";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._filterComponent = null;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  render() {
    this._filterComponent = new FilterComponent();

    render(
        this._container,
        this._filterComponent,
        RenderPosition.AFTEREND
    );

    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);
  }

  _filterChangeHandler(filterType) {
    this._pointsModel.setFilter(filterType);
  }
}
