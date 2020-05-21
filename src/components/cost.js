import AbstractSmartComponent from "./abstract-smart-component.js";

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

export default class Cost extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  getTemplate() {
    return createTripCostTemplate(this._pointsModel.getPointsAll());
  }

  recoveryListeners() {}

  _onDataChange() {
    this.rerender();
  }
}
