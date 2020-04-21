import TripCostComponent from "./components/cost.js";
import TripInfoComponent from "./components/info.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import DaysListComponent from "./components/days-list.js";
import DayComponent from "./components/day.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-edit.js";
import {generateEvents, getDestinations} from "./mock/event.js";
import {formatDateReverse, RenderPosition, render} from "./utils.js";

const EVENTS_COUNT = 20;

const renderEvent = (dayElement, event) => {
  const eventComponent = new EventComponent(event);
  const roullupButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);

  // roullupButton.addEventListener(`click`, () => {
  //   dayElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  // });

  // const eventEditComponent = new EventEditComponent(event, destinationList);
  // const eventEditSaveButton = eventEditComponent.getElement().querySelector(`.event__save-btn`);

  // eventEditSaveButton.addEventListener(`click`, () => {
  //   dayElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  // });

  render(dayElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderDay = (tripDaysListElement, dayDate, dayCount, events) => {
  const dayComponent = new DayComponent(new Date(dayDate), dayCount);
  const dayElement = dayComponent.getElement();

  events.forEach((event) => {
    renderEvent(dayElement, event);
  });

  render(tripDaysListElement, dayElement, RenderPosition.BEFOREEND);
};

const renderDaysList = (tripEventsElement, events, eventsDates) => {
  const daysListComponent = new DaysListComponent();
  const daysListElement = daysListComponent.getElement();

  eventsDates.forEach((dayDate, index) => {
    const eventsList = events.filter((event) => formatDateReverse(new Date(event.dateStart)) === dayDate);
    renderDay(daysListElement, dayDate, index + 1, eventsList);
  });

  const temp = tripEventsElement.querySelector(`.trip-events__list`);

  render(
      tripEventsElement.querySelector(`.trip-events__list`),
      daysListElement,
      RenderPosition.BEFOREEND
  );
};

const destinationList = getDestinations();
const events = generateEvents(EVENTS_COUNT, destinationList);
const eventsDates = Array.from(new Set(events.map((event) => formatDateReverse(new Date(event.dateStart))))).sort();

const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка стоимости и информации о маршруте
render(
    tripMainElement,
    new TripCostComponent(events).getElement(),
    RenderPosition.AFTERBEGIN
);
render(
    tripMainElement.querySelector(`.trip-main__trip-info`),
    new TripInfoComponent(events).getElement(),
    RenderPosition.AFTERBEGIN
);

// Отрисовка меню и фильтрации
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

render(
    tripMainControlsElement.querySelector(`h2:nth-of-type(1)`),
    new MenuComponent().getElement(),
    RenderPosition.AFTEREND
);
render(
    tripMainControlsElement.querySelector(`h2:nth-of-type(2)`),
    new FilterComponent().getElement(),
    RenderPosition.AFTEREND
);

// Отрисовка основной части с сортировкой
const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

// Отрисовка списка дней
renderDaysList(tripEventsElement, events, eventsDates);
/*
renderElement(tripEventsElement, createDaysListTemplate(), `beforeend`);
const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

renderElement(
    tripDaysListElement,
    Array.from(eventsDates).sort().map((dayDate, dayIndex) => {
      const dayElement = createElement(createDayTemplate(new Date(dayDate), dayIndex + 1));

      renderElement(
          dayElement.querySelector(`.trip-events__list`),
          events.filter((event) => formatDateReverse(new Date(event.dateStart)) === dayDate)
          //   .map((event, index) => {
          //     return index ? createEventTemplate(event) : createEventEditTemplate(event, destinationList);
          //   })
          //   .join(`\n`),
          // `beforeend`
      );

      return dayElement.outerHTML;
    })
    .join(`\n`),
    `beforeend`
);
*/
