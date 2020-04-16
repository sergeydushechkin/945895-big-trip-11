import {formatDateReverse} from "../utils.js";

export const MONTH_NAMES = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Augu`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`
];

export const createDayTemplate = (date, count) => {
  const dateRev = formatDateReverse(date);
  const monthDay = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${dateRev}">${monthDay}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};