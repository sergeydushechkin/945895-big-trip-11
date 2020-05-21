import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../const.js";

const FILTER_HIDDEN_CLASS = `trip-filters--hidden`;

const createFilterTemplate = (futureStatus, pastStatus) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}">
        <label class="trip-filters__filter-label ${futureStatus ? `` : FILTER_HIDDEN_CLASS}" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST}">
        <label class="trip-filters__filter-label ${pastStatus ? `` : FILTER_HIDDEN_CLASS}" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(futureStatus, pastStatus) {
    super();

    this._futureStatus = futureStatus;
    this._pastStatus = pastStatus;
  }

  getTemplate() {
    return createFilterTemplate(this._futureStatus, this._pastStatus);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      handler(evt.target.value);
    });
  }
}
