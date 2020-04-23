import AbstractComponent from "./abstract-component.js";
import {formatDateReverse} from "../utils/common.js";
import {MONTH_NAMES} from "../const.js";

const createDayTemplate = (date, count) => {
  const dateRev = formatDateReverse(new Date(date));
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

export default class Day extends AbstractComponent {
  constructor(date, count) {
    super();

    this._date = date;
    this._count = count;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._count);
  }
}
