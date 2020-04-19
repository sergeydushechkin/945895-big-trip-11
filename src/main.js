import {createTripCostTemplate} from "./components/cost.js";
import {createTripInfoTemplate} from "./components/info.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSortTemplate} from "./components/sort.js";
import {createDaysListTemplate} from "./components/days-list.js";
import {createDayTemplate} from "./components/day.js";
import {createEventTemplate} from "./components/event.js";
import {createEventEditTemplate} from "./components/event-edit.js";
import {generateEvents, getDestinations} from "./mock/event.js";
import {createElement, formatDateReverse} from "./utils.js";

const EVENTS_COUNT = 20;

const renderElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const destinationList = getDestinations();
const events = generateEvents(EVENTS_COUNT, destinationList);

const eventsDates = new Set(events.map((event) => formatDateReverse(new Date(event.dateStart))));

// Отрисовка стоимости и информации о маршруте
const tripMainElement = document.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
renderElement(tripMainElement, createTripCostTemplate(events), `afterbegin`);
renderElement(tripMainElement.querySelector(`.trip-main__trip-info`), createTripInfoTemplate(events), `afterbegin`);

// Отрисовка меню и фильтрации
renderElement(tripMainControlsElement.querySelector(`h2:nth-of-type(1)`), createMenuTemplate(), `afterend`);
renderElement(tripMainControlsElement.querySelector(`h2:nth-of-type(2)`), createFilterTemplate(), `afterend`);

// Отрисовка основной части с сортировкой
const tripEventsElement = document.querySelector(`.trip-events`);
renderElement(tripEventsElement, createSortTemplate(), `beforeend`);

// Отрисовка формы создания события
renderElement(tripEventsElement, createEventEditTemplate(events[0], destinationList), `beforeend`);

// Отрисовка списка дней
renderElement(tripEventsElement, createDaysListTemplate(), `beforeend`);
const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

renderElement(
    tripDaysListElement,
    Array.from(eventsDates).sort().map((dayDate, dayIndex) => {
      const dayElement = createElement(createDayTemplate(new Date(dayDate), dayIndex + 1));

      renderElement(
          dayElement.querySelector(`.trip-events__list`),
          events.slice(1).filter((event) => formatDateReverse(new Date(event.dateStart)) === dayDate)
            .map((event) => createEventTemplate(event))
            .join(`\n`),
          `beforeend`
      );

      return dayElement.outerHTML;
    })
    .join(`\n`),
    `beforeend`
);

