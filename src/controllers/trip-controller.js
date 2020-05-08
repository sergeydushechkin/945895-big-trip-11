import SortComponent, {SortType} from "../components/sort.js";
import DaysListComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import NoEventsComponent from "../components/no-events.js";
import {RenderPosition, render} from "../utils/render.js";
import {formatDateReverse} from "../utils/common.js";
import PointController from "./point-controller.js";

const renderEvents = (daysListComponent, events, sortType, onDataChange, onViewChange) => {
  let pointControllers = [];

  if (sortType === SortType.EVENT) {
    const eventsDates = Array.from(new Set(events.map((event) => formatDateReverse(new Date(event.dateStart))))).sort();
    eventsDates.forEach((day, index) => {
      const dayComponent = new DayComponent(day, index + 1);
      pointControllers.push(...events
        .filter((event) => formatDateReverse(new Date(event.dateStart)) === day)
        .map((event) => {
          const pointController = new PointController(dayComponent.getElement().querySelector(`.trip-events__list`), onDataChange, onViewChange);
          pointController.render(event);
          return pointController;
        })
      );
      render(daysListComponent.getElement(), dayComponent, RenderPosition.BEFOREEND);
    });
  } else {
    const dayComponent = new DayComponent(null, 0);
    pointControllers = events.map((event) => {
      const pointController = new PointController(dayComponent.getElement().querySelector(`.trip-events__list`), onDataChange, onViewChange);
      pointController.render(event);
      return pointController;
    });
    render(daysListComponent.getElement(), dayComponent, RenderPosition.BEFOREEND);
  }

  return pointControllers;
};

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];

  switch (sortType) {
    case SortType.EVENT:
      sortedEvents = events;
      break;
    case SortType.TIME:
      sortedEvents = events.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
      break;
    case SortType.PRICE:
      sortedEvents = events.slice().sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._pointControllers = [];

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._daysListComponent = new DaysListComponent();

    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(events) {
    if (!events.length) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._events = events;

    // Отрисовка основной части с сортировкой
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

    // Отрисовка событий
    this._pointControllers = renderEvents(this._daysListComponent, this._events, SortType.EVENT, this._onDataChange, this._onViewChange);
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);
  }

  _onDataChange(pointController, oldEvent, newEvent) {
    const index = this._events.indexOf(oldEvent);

    if (index === -1) {
      return;
    }

    this._events[index] = newEvent;

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._pointControllers.forEach((pointController) => pointController.setDefaultView());
  }

  _onSortTypeChangeHandler(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);
    this._daysListComponent.getElement().innerHTML = ``;
    this._pointControllers = renderEvents(this._daysListComponent, sortedEvents, sortType, this._onDataChange, this._onViewChange);
  }
}
