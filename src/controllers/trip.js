import SortComponent, {SortType} from "../components/sort.js";
import DaysListComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import NoEventsComponent from "../components/no-events.js";
import {RenderPosition, render, remove} from "../utils/render.js";
import {formatDateReverse} from "../utils/common.js";
import PointController from "./point.js";

const renderEvents = (daysListComponent, points, isDefaultSorting, onDataChange, onViewChange) => {
  let pointControllers = [];
  const dates = isDefaultSorting
    ? Array.from(new Set(points.map((point) => formatDateReverse(new Date(point.dateStart)))))
    : [true];

  dates.forEach((date, index) => {
    const dayComponent = isDefaultSorting
      ? new DayComponent(date, index + 1)
      : new DayComponent(null, 0);

    const eventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);

    pointControllers.push(...points
      .filter((point) => isDefaultSorting ? formatDateReverse(new Date(point.dateStart)) === date : true)
      .map((point) => {
        const pointController = new PointController(eventsListElement, onDataChange, onViewChange);
        pointController.render(point);
        return pointController;
      })
    );

    render(daysListComponent.getElement(), dayComponent, RenderPosition.BEFOREEND);
  });

  return pointControllers;
};

const getSortedEvents = (points, sortType) => {
  let sortedPoints = [];

  switch (sortType) {
    case SortType.EVENT:
      sortedPoints = points;
      break;
    case SortType.TIME:
      sortedPoints = points.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
      break;
    case SortType.PRICE:
      sortedPoints = points.slice().sort((a, b) => b.price - a.price);
      break;
  }

  return sortedPoints;
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._pointControllers = [];

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = null;
    this._daysListComponent = new DaysListComponent();

    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    // Отрисовка основной части с сортировкой
    this._renderSort();

    // Отрисовка событий
    this._renderEvents();
  }

  _renderSort() {
    this._sortComponent = new SortComponent();
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    const points = this._pointsModel.getPoints();

    if (!points.length) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._pointControllers = renderEvents(this._daysListComponent, points, true, this._onDataChange, this._onViewChange);
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);
  }

  _removeEvents() {
    this._pointControllers.forEach((pointController) => pointController.destroy());
    this._pointControllers = [];

    remove(this._sortComponent);

    this._daysListComponent.getElement().innerHTML = ``;
  }

  _onDataChange(pointController, oldData, newData) {
    const points = this._pointsModel.getPoints();
    const index = points.indexOf(oldData);

    if (index === -1) {
      return;
    }

    this._pointsModel.updatePoint(oldData.id, newData);

    pointController.render(points[index]);
  }

  _onViewChange() {
    this._pointControllers.forEach((pointController) => pointController.setDefaultView());
  }

  _onFilterChange() {
    this._removeEvents();
    this.render();
  }

  _onSortTypeChangeHandler(sortType) {
    this._daysListComponent.getElement().innerHTML = ``;
    this._pointControllers = renderEvents(
        this._daysListComponent,
        getSortedEvents(this._pointsModel.getPoints(), sortType),
        sortType === SortType.EVENT,
        this._onDataChange,
        this._onViewChange
    );
  }
}
