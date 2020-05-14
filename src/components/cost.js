import AbstractComponent from "./abstract-component.js";

const createTripCostTemplate = (points) => {
  const cost = points.length ?
    points
      .reduce((totalCost, point) => {
        return totalCost + point.price;
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

export default class Cost extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}
