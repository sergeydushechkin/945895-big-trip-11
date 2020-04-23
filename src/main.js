import TripCostComponent from "./components/cost.js";
import TripInfoComponent from "./components/info.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import DaysListComponent from "./components/days-list.js";
import DayComponent from "./components/day.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-edit.js";
import NoEventsComponent from "./components/no-events.js";
import {generateEvents, getDestinations} from "./mock/event.js";
import {RenderPosition, render, replace} from "./utils/render.js";
import {formatDateReverse} from "./utils/common.js";

const EVENTS_COUNT = 20;

const renderEvent = (dayElement, event) => {
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

const renderDay = (tripDaysListElement, dayDate, dayCount, events) => {
  const dayComponent = new DayComponent(new Date(dayDate), dayCount);

  events.forEach((event) => {
    renderEvent(dayComponent.getElement().querySelector(`.trip-events__list`), event);
  });

  render(tripDaysListElement, dayComponent, RenderPosition.BEFOREEND);
};

const renderDaysList = (tripEventsElement, events, eventsDates) => {
  const daysListComponent = new DaysListComponent();

  eventsDates.forEach((dayDate, index) => {
    const eventsList = events.filter((event) => formatDateReverse(new Date(event.dateStart)) === dayDate);
    renderDay(daysListComponent.getElement(), dayDate, index + 1, eventsList);
  });

  render(
      tripEventsElement,
      daysListComponent,
      RenderPosition.BEFOREEND
  );
};

const renderTripEvents = (tripEventsElement, events, eventsDates) => {
  if (!events.length) {
    render(tripEventsElement, new NoEventsComponent(), RenderPosition.BEFOREEND);
    return;
  }

  // Отрисовка основной части с сортировкой
  render(tripEventsElement, new SortComponent(), RenderPosition.BEFOREEND);
  // Отрисовка списка дней
  renderDaysList(tripEventsElement, events, eventsDates);
};

const destinationList = getDestinations();
const events = generateEvents(EVENTS_COUNT, destinationList);
const eventsDates = Array.from(new Set(events.map((event) => formatDateReverse(new Date(event.dateStart))))).sort();

const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка стоимости и информации о маршруте
render(
    tripMainElement,
    new TripCostComponent(events),
    RenderPosition.AFTERBEGIN
);
render(
    tripMainElement.querySelector(`.trip-main__trip-info`),
    new TripInfoComponent(events),
    RenderPosition.AFTERBEGIN
);

// Отрисовка меню и фильтрации
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

render(
    tripMainControlsElement.querySelector(`h2:nth-of-type(1)`),
    new MenuComponent(),
    RenderPosition.AFTEREND
);
render(
    tripMainControlsElement.querySelector(`h2:nth-of-type(2)`),
    new FilterComponent(),
    RenderPosition.AFTEREND
);

// Отрисовка основной части
const tripEventsElement = document.querySelector(`.trip-events`);
renderTripEvents(tripEventsElement, events, eventsDates);
