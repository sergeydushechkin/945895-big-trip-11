import SortComponent, {SortType} from "../components/sort.js";
import DaysListComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import NoEventsComponent from "../components/no-events.js";
import {RenderPosition, render} from "../utils/render.js";
import {formatDateReverse} from "../utils/common.js";
import PointController from "./point-controller.js";

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

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._daysListComponent = new DaysListComponent();

    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);
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
    this._renderEvents(this._events, SortType.EVENT);
  }

  _renderDay(dayDate, dayCount, eventsList) {
    const dayComponent = new DayComponent(dayDate, dayCount);

    eventsList.forEach((event) => {
      const pointController = new PointController(dayComponent.getElement().querySelector(`.trip-events__list`));
      pointController.render(event);
    });

    render(this._daysListComponent.getElement(), dayComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents(events, sortType) {
    if (sortType === SortType.EVENT) {
      // Получает список дат
      const eventsDates = Array.from(new Set(events.map((event) => formatDateReverse(new Date(event.dateStart))))).sort();
      eventsDates.forEach((dayDate, index) => {
        const eventsList = events.filter((event) =>
          formatDateReverse(new Date(event.dateStart)) === dayDate);
        this._renderDay(dayDate, index + 1, eventsList);
      });
    } else {
      this._renderDay(null, ` `, events);
    }

    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);
  }


  _onSortTypeChangeHandler(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);
    this._daysListComponent.getElement().innerHTML = ``;
    this._renderEvents(sortedEvents, sortType);
  }
}
