import AbstractComponent from "./abstract-component.js";
import {formatTime, formatDuration, capitalizeFirstLetter} from "../utils/common.js";
import {EVENT_PREP} from "../const.js";

const createOfferMarkup = (offer) => {
  const {name, price} = offer;
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createOffersTemplate = (offers) => {
  const offersMarkup = offers.map((offer) => createOfferMarkup(offer)).join(`\n`);
  return (
    `<ul class="event__selected-offers">
      ${offersMarkup}
    </ul>`
  );
};

const createEventTemplate = (event) => {
  const {type, destination, dateStart, dateEnd, price, offers} = event;

  const eventTypeName = capitalizeFirstLetter(type);
  const offersList = offers ? createOffersTemplate(offers) : ``;
  const duration = formatDuration(new Date(dateStart), new Date(dateEnd));
  const dateStartMarkup = new Date(dateStart).toISOString();
  const dateEndMarkup = new Date(dateEnd).toISOString();
  const timeStart = formatTime(new Date(dateStart));
  const timeEnd = formatTime(new Date(dateEnd));

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTypeName} ${EVENT_PREP[type]} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStartMarkup}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEndMarkup}">${timeEnd}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        ${offersList}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
