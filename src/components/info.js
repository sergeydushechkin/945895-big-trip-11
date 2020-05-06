import {MONTH_NAMES} from "../const.js";
import AbstractComponent from "./abstract-component.js";

const createTripInfoTemplate = (events) => {
  if (!events.length) {
    return ` `;
  }

  const firstDate = new Date(events[0].dateStart);
  const lastDate = new Date(events[events.length - 1].dateEnd);

  const beginDate = `${MONTH_NAMES[firstDate.getMonth()]} ${firstDate.getDate()}`;
  const endDate = `${lastDate.getDate()}`;

  const range = `${beginDate}&nbsp;&mdash;&nbsp;${endDate}`;
  const route = Array.from(new Set(events.map((event) => event.destination))).join(`  &mdash; `);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${range}</p>
    </div>`
  );
};

export default class Info extends AbstractComponent {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
