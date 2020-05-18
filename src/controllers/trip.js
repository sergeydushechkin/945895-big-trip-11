import SortComponent, {SortType} from "../components/sort.js";
import DaysListComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import NoEventsComponent from "../components/no-events.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import {formatDateReverse} from "../utils/common.js";
import PointController, {EmptyPoint, Mode as PointControllerMode} from "./point.js";
import {FilterType} from "../const.js";

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
        const pointController = new PointController(eventsListElement, onDataChange, onViewChange, PointControllerMode.DEFAULT);
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
    this._addingNewPoint = null;

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = null;
    this._daysListComponent = new DaysListComponent();
    this._addButtonElement = document.querySelector(`button.trip-main__event-add-btn`)

    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    // Отрисовка основной части с сортировкой
    const oldSortComponent = this._sortComponent;
    this._sortComponent = new SortComponent();

    if (oldSortComponent) {
      replace(this._sortComponent, oldSortComponent);
    } else {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    }

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);

    // Отрисовка событий
    if (!this._pointsModel.getPointsAll().length) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._pointControllers = renderEvents(this._daysListComponent, this._pointsModel.getPoints(), true, this._onDataChange, this._onViewChange);
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);
  }

  addNewPoint() {
    if (this._addingNewPoint) {
      return;
    }

    this._addButtonElement.disabled = true;

    this._pointsModel.resetFilter();
    this._pointsModel.setFilter(FilterType.EVERYTHING);

    this._addingNewPoint = new PointController(
        this._daysListComponent.getElement(),
        this._onDataChange,
        this._onViewChange,
        PointControllerMode.ADDING
    );

    this._addingNewPoint.render(EmptyPoint);
  }

  _removeEvents() {
    this._pointControllers.forEach((pointController) => pointController.destroy());
    this._pointControllers = [];

    this._daysListComponent.getElement().innerHTML = ``;
  }

  _updateEvents() {
    this._removeEvents();
    this.render();
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._addingNewPoint = null;
      this._addButtonElement.disabled = false;
      pointController.destroy();
      if (newData !== null) {
        this._pointsModel.addPoint(newData);
        this._updateEvents();
      }
    } else if (newData === null) {
      pointController.destroy();
      this._pointsModel.removePoint(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._pointControllers.forEach((pointController) => pointController.setDefaultView());
    if (this._addingNewPoint) {
      this._addingNewPoint.destroy();
      this._addButtonElement.disabled = false;
      this._addingNewPoint = null;
    }
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _onSortTypeChangeHandler(sortType) {
    this._removeEvents();
    this._pointControllers = renderEvents(
        this._daysListComponent,
        getSortedEvents(this._pointsModel.getPoints(), sortType),
        sortType === SortType.EVENT,
        this._onDataChange,
        this._onViewChange
    );
  }
}
