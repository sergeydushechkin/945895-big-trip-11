import {createElement} from "../utils.js";

const createTripCostTemplate = (events) => {
  const cost = events.length ?
    events
      .reduce((totalCost, event) => {
        return totalCost + event.price;
      }, 0)
    : 0;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};

export default class Cost {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
