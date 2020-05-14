import {EVENT_PREP, OFFERS} from "../const.js";
import {formatFullDate, capitalizeFirstLetter} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {destinationsList} from "../mock/point.js";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const createEventEditPhotosMarkup = (photos) => {
  const photosElements = photos.map((path) => `<img class="event__photo" src="${path}" alt="Event photo">`).join(`\n`);
  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosElements}
      </div>
    </div>`
  );
};

const createEventEditDestinationsMarkup = (destination) => {
  const {description, photos} = destination;
  const photosMarkup = photos.length ? createEventEditPhotosMarkup(photos) : ``;
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      ${photosMarkup}
    </section>`
  );
};

const createEventEditOffersMarkup = (pointOffers) => {
  return pointOffers.map((offer) => {
    const {name, price} = offer;
    const type = name.replace(/\s+/g, ``);
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" data-offer-type="${type}" >
        <label class="event__offer-label" for="event-offer-${type}-1">
          <span class="event__offer-title">${name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  })
  .join(`\n`);
};

const createEventEditDetailsMarkup = (pointOffers, destination) => {
  const eventOffersMarkup = createEventEditOffersMarkup(pointOffers);
  const eventDestinationsMarkup = createEventEditDestinationsMarkup(destination);
  return (
    `<section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${eventOffersMarkup}
        </div>
      </section>

      ${eventDestinationsMarkup}
    </section>`
  );
};

const createdestinationsListMarkup = (destinations) => {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join(`\n`);
};

const createEventEditTemplate = (point, options, destinations) => {
  const {dateStart, dateEnd, price, isFavorite} = point;
  const {type, destination, offers} = options;

  const eventTypeName = capitalizeFirstLetter(type);
  const eventDateStart = formatFullDate(new Date(dateStart));
  const eventDateEnd = formatFullDate(new Date(dateEnd));
  const destinationListMarkup = createdestinationsListMarkup(destinations);
  const favorite = isFavorite ? `checked` : ``;

  const eventDestination = destinations.filter((dest) => dest.name === destination).pop();
  const eventDetailsMarkup = createEventEditDetailsMarkup(offers, eventDestination);

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === `taxi` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === `bus` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === `train` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === `ship` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${type === `transport` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === `drive` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === `flight` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === `check-in` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === `sightseeing` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === `restaurant` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${eventTypeName} ${EVENT_PREP[type]}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationListMarkup}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventDateStart}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventDateEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favorite}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        ${eventDetailsMarkup}
      </form>
    </li>`
  );
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(point) {
    super();

    this._point = point;
    this._pointType = point.type;
    this._pointDestination = point.destination;
    this._pointOffers = point.offers;

    this._destinations = destinationsList;

    this._submitHandler = null;
    this._favoriteButtonHandler = null;
    this._flatpickrStartTime = null;
    this._flatpickrEndTime = null;

    this._eventStartTimeElementChangeHandler = this._eventStartTimeElementChangeHandler.bind(this);

    this._subscribeOnEvents();
    this._applyFlatpickr();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    this._pointType = this._point.type;
    this._pointDestination = this._point.destination;
    this._pointOffers = this._point.offers;
    this.rerender();
  }

  getTemplate() {
    return createEventEditTemplate(
        this._point,
        {type: this._pointType, destination: this._pointDestination, offers: this._pointOffers},
        this._destinations
    );
  }

  setFormSubmitHandler(handler) {
    this.getElement().querySelector(`form.event--edit`).addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, handler);
    this._favoriteButtonHandler = handler;
  }

  recoveryListeners() {
    this.setFormSubmitHandler(this._submitHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonHandler);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, () => {
      this._pointType = element.querySelector(`.event__type-list`).querySelector(`.event__type-input:checked`).value;
      this._pointOffers = OFFERS[this._pointType];
      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      this._pointDestination = evt.target.value;
      this.rerender();
    });
  }

  _applyFlatpickr() {
    if (this._flatpickrStartTime) {
      this._flatpickrStartTime.destroy();
      this._flatpickrStartTime = null;
    }

    if (this._flatpickrEndTime) {
      this._flatpickrEndTime.destroy();
      this._flatpickrEndTime = null;
    }

    const eventStartTimeElement = this.getElement().querySelector(`.event__input--time#event-start-time-1`);
    const eventEndTimeElement = this.getElement().querySelector(`.event__input--time#event-end-time-1`);
    const flatpickrOptions = {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      allowInput: false,
      time_24hr: true // eslint-disable-line
    };

    this._flatpickrStartTime = flatpickr(eventStartTimeElement, Object.assign({}, flatpickrOptions, {
      defaultDate: this._point.dateStart || `today`,
    }));

    this._flatpickrEndTime = flatpickr(eventEndTimeElement, Object.assign({}, flatpickrOptions, {
      defaultDate: this._point.dateEnd || `today`,
      minDate: this._point.dateStart
    }));

    eventStartTimeElement.addEventListener(`change`, this._eventStartTimeElementChangeHandler);
  }

  _eventStartTimeElementChangeHandler() {
    this._flatpickrEndTime.set(`minDate`, this._flatpickrStartTime.input.value);
  }
}
