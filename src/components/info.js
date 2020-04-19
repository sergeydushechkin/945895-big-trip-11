import {MONTH_NAMES} from "../const.js";

export const createTripInfoTemplate = (events) => {
  const beginDate = `${MONTH_NAMES[events[0].dateStart.getMonth()]} ${events[0].dateStart.getDate()}`;
  const endDate = `${events[events.length - 1].dateEnd.getDate()}`;

  const range = `${beginDate}&nbsp;&mdash;&nbsp;${endDate}`;
  const route = Array.from(new Set(events.map((event) => event.destination.name))).join(`  &mdash; `);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${range}</p>
    </div>`
  );
};
