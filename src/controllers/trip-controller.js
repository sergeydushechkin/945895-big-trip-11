import SortComponent, {SortType} from "../components/sort.js";
import DaysListComponent from "../components/days-list.js";
import DayComponent from "../components/day.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import NoEventsComponent from "../components/no-events.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import {formatDateReverse} from "../utils/common.js";

const renderEvent = (dayElement, event, destinationList) => {
  const replaceEventToEventEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEventEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyKeydown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEventEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyKeydown);
    }
  };

  const eventComponent = new EventComponent(event);

  eventComponent.setRollupButtonClickHandler(() => {
    replaceEventToEventEdit();
    document.addEventListener(`keydown`, onEscKeyKeydown);
  });

  const eventEditComponent = new EventEditComponent(event, destinationList);
  eventEditComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEventEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyKeydown);
  });

  render(dayElement, eventComponent, RenderPosition.BEFOREEND);
};

const renderDay = (tripDaysListElement, dayDate, dayCount, events, destinationList) => {
  const dayComponent = new DayComponent(dayDate, dayCount);

  events.forEach((event) => {
    renderEvent(dayComponent.getElement().querySelector(`.trip-events__list`), event, destinationList);
  });

  render(tripDaysListElement, dayComponent, RenderPosition.BEFOREEND);
};

const renderEvents = (eventsContainer, daysListComponent, events, destinationList) => {
  // Получает список дат
  const eventsDates = Array.from(new Set(events.map((event) => formatDateReverse(new Date(event.dateStart))))).sort();
  eventsDates.forEach((dayDate, index) => {
    const eventsList = events.filter((event) => formatDateReverse(new Date(event.dateStart)) === dayDate);
    renderDay(daysListComponent.getElement(), dayDate, index + 1, eventsList, destinationList);
  });

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

  render(events, destinationList) {
    if (!events.length) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Отрисовка основной части с сортировкой
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(() => {

    });

    // Отрисовка списка дней
    renderEvents(this._container, this._daysListComponent, events, destinationList);
  }
}
