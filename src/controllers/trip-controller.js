import SortComponent, {SortType} from "../components/sort.js";
import DaysListComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import NoEventsComponent from "../components/no-events.js";
import {RenderPosition, render} from "../utils/render.js";
import {formatDateReverse} from "../utils/common.js";
import PointController from "./point-controller.js";

const renderDay = (tripDaysListElement, dayDate, dayCount, events) => {
  const dayComponent = new DayComponent(dayDate, dayCount);

  events.forEach((event) => {
    const pointController = new PointController(dayComponent.getElement().querySelector(`.trip-events__list`));
    pointController.render(event);
  });

  render(tripDaysListElement, dayComponent, RenderPosition.BEFOREEND);
};

const renderEvents = (eventsContainer, daysListComponent, events, sortType) => {
  if (sortType === SortType.EVENT) {
    // Получает список дат
    const eventsDates = Array.from(new Set(events.map((event) => formatDateReverse(new Date(event.dateStart))))).sort();
    eventsDates.forEach((dayDate, index) => {
      const eventsList = events.filter((event) => formatDateReverse(new Date(event.dateStart)) === dayDate);
      renderDay(daysListComponent.getElement(), dayDate, index + 1, eventsList);
    });
  } else {
    renderDay(daysListComponent.getElement(), null, ` `, events);
  }

  render(
      eventsContainer,
      daysListComponent,
      RenderPosition.BEFOREEND
  );
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

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._daysListComponent = new DaysListComponent();
  }

  render(events) {
    if (!events.length) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Отрисовка основной части с сортировкой
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedEvents = getSortedEvents(events, sortType);
      this._daysListComponent.getElement().innerHTML = ``;
      renderEvents(this._container, this._daysListComponent, sortedEvents, sortType);
    });

    // Отрисовка событий
    renderEvents(this._container, this._daysListComponent, events, SortType.EVENT);
  }
}
