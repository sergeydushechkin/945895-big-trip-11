import {MONTH_NAMES} from "../const.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

const createMainInfoMarkup = (points) => {
  if (!points.length) {
    return ` `;
  }

  const firstDate = new Date(points[0].dateStart);
  const lastDate = new Date(points[points.length - 1].dateEnd);

  const beginDate = `${MONTH_NAMES[firstDate.getMonth()]} ${firstDate.getDate()}`;
  const endDate = `${MONTH_NAMES[lastDate.getMonth()]} ${lastDate.getDate()}`;

  const range = `${beginDate}&nbsp;&mdash;&nbsp;${endDate}`;

  const destinations = Array.from(new Set(points.map((point) => point.destination.name)));

  const route = destinations.length > 3
    ? `${destinations[0]} &mdash; … &mdash; ${destinations[destinations.length - 1]}`
    : `${destinations.join(`  &mdash; `)}`;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${range}</p>
    </div>`
  );
};

const createTripCostMarkup = (points) => {
  const cost = points.length
    ? points
        .reduce((totalCost, point) => {
          return totalCost + point.price;
        }, 0)
    : 0;
  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`
  );
};

const createTripInfoTemplate = (points) => {
  const mainInfoMarkup = createMainInfoMarkup(points);
  const tripCostMarkup = createTripCostMarkup(points);
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${mainInfoMarkup}
      ${tripCostMarkup}
    </section>`
  );
};

export default class Info extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  getTemplate() {
    return createTripInfoTemplate(this._pointsModel.getPointsAll());
  }

  recoveryListeners() {}

  _onDataChange() {
    this.rerender();
  }
}
