import {EVENT_PREP} from "../const.js";
import {formatFullDate, capitalizeFirstLetter} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import flatpickr from "flatpickr";
import {Mode as PointControllerMode} from "../controllers/point.js";
import DataStorage from "../data-storage.js";

import "flatpickr/dist/flatpickr.min.css";

const EVENT_DATE_FORMAT = `d/m/y H:i`;
const OFFER_NAME_PREFIX = `event-offer-`;

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

const createEventEditPhotosMarkup = (pictures) => {
  const photosElements = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(`\n`);
  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosElements}
      </div>
    </div>`
  );
};

const createEventEditDestinationsMarkup = (destination) => {
  const {description, pictures} = destination;
  const photosMarkup = pictures.length ? createEventEditPhotosMarkup(pictures) : ``;
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      ${photosMarkup}
    </section>`
  );
};

const createEventEditOffersMarkup = (selectedOffers, offers) => {
  return offers.map((offer) => {
    const {title, price} = offer;
    const type = title.replace(/\s+/g, ``);
    const status = selectedOffers.findIndex((it) => it.title === title) !== -1 ? `checked` : ``;
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="${OFFER_NAME_PREFIX}${type}" ${status}>
        <label class="event__offer-label" for="event-offer-${type}-1">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  })
  .join(`\n`);
};

const createEventEditDetailsMarkup = (selectedOffers, offers, destination) => {
  const eventOffersMarkup = createEventEditOffersMarkup(selectedOffers, offers);
  const eventDestinationsMarkup = destination ? createEventEditDestinationsMarkup(destination) : ``;
  return (
    `<section class="event__details">
      ${offers.length ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${eventOffersMarkup}
        </div>
      </section>` : ``}

      ${eventDestinationsMarkup}
    </section>`
  );
};

const createdestinationsListMarkup = (destinations) => {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join(`\n`);
};

const createEventEditTemplate = (point, mode, options, destinations) => {
  const {dateStart, dateEnd, price, isFavorite} = point;
  const {type, destination, offers, selectedOffers, externalData} = options;

  const eventTypeName = capitalizeFirstLetter(type);
  const eventDateStart = formatFullDate(new Date(dateStart));
  const eventDateEnd = formatFullDate(new Date(dateEnd));
  const destinationListMarkup = createdestinationsListMarkup(destinations);
  const favorite = isFavorite ? `checked` : ``;

  const eventDetailsMarkup = typeof destination === `object`
    ? createEventEditDetailsMarkup(selectedOffers, offers, destination)
    : ``;

  return (
    `${mode !== PointControllerMode.ADDING ? `<li class="trip-events__item">` : ``}<form class="${mode !== PointControllerMode.ADDING ? `` : `trip-events__item `}event event--edit" action="#" method="post">
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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name ? destination.name : destination}" list="destination-list-1">
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
            <input class="event__input  event__input--price" id="event-price-1" type="number" pattern="\d*" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">${externalData.saveButtonText}</button>
          <button class="event__reset-btn" type="reset">${mode !== PointControllerMode.ADDING ? `${externalData.deleteButtonText}` : `Cancel`}</button>

          ${mode !== PointControllerMode.ADDING ? `
          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favorite}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>` : ``}
        </header>
        ${eventDetailsMarkup}
      </form>
      ${mode !== PointControllerMode.ADDING ? `</li>` : ``}`
  );
};

const validateDestination = (destintationElement, destinations) => {
  const isExist = destinations.findIndex((it) => it.name === destintationElement.value) !== -1;
  if (isExist) {
    destintationElement.setCustomValidity(``);
    return true;
  } else {
    destintationElement.setCustomValidity(`Назначения не существует, выберите из предложенных`);
  }
  return false;
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(point, mode) {
    super();

    this._mode = mode;
    this._point = point;
    this._pointType = point.type;
    this._pointDestination = point.destination;
    this._pointOffers = point.offers;
    this._selectedOffers = point.offers;
    this._externalData = DefaultData;

    this._destinations = DataStorage.getDestinations();

    this._submitHandler = null;
    this._resetHandler = null;
    this._favoriteButtonHandler = null;
    this._flatpickrStartTime = null;
    this._flatpickrEndTime = null;
    this._rollupButtonHandler = null;

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
    this._selectedOffers = this._point.offers;
    this.rerender();
  }

  getData() {
    const form = this._getFormElementSelector();
    return {
      formData: new FormData(form),
      destination: this._pointDestination
    };
  }

  setExternalData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  setFormBlocked(state) {
    const formInputs = Array.from(this._getFormElementSelector().querySelectorAll(`input, button`));
    if (state) {
      formInputs.forEach((element) => element.setAttribute(`disabled`, `disabled`));
    } else {
      formInputs.forEach((element) => element.removeAttribute(`disabled`));
    }
  }

  setRedBorder(state) {
    if (state) {
      this._getFormElementSelector().classList.add(`red-border`);
    } else {
      this._getFormElementSelector().classList.remove(`red-border`);
    }
  }

  getTemplate() {
    return createEventEditTemplate(
        this._point,
        this._mode,
        {type: this._pointType, destination: this._pointDestination, offers: this._pointOffers, selectedOffers: this._selectedOffers, externalData: this._externalData},
        this._destinations
    );
  }

  removeElement() {
    super.removeElement();

    this._removeFlatpickr();
  }

  setFormSubmitHandler(handler) {
    this._getFormElementSelector().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const destintationElement = this._getFormElementSelector().querySelector(`.event__input--destination`);
      if (validateDestination(destintationElement, this._destinations)) {
        handler();
      }
    });
    this._submitHandler = handler;
  }

  setFormResetHandler(handler) {
    this._getFormElementSelector().addEventListener(`reset`, handler);
    this._resetHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, handler);
    this._favoriteButtonHandler = handler;
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._rollupButtonHandler = handler;
  }

  recoveryListeners() {
    this.setFormSubmitHandler(this._submitHandler);
    this.setFormResetHandler(this._resetHandler);
    this._subscribeOnEvents();

    if (this._mode !== PointControllerMode.ADDING) {
      this.setFavoriteButtonClickHandler(this._favoriteButtonHandler);
      this.setRollupButtonClickHandler(this._rollupButtonHandler);
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, () => {
      this._pointType = element.querySelector(`.event__type-list .event__type-input:checked`).value;
      this._pointOffers = DataStorage.getOffers()[this._pointType];
      this._selectedOffers = [];
      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      const index = this._destinations.findIndex((it) => it.name === evt.target.value);
      this._pointDestination = index === -1
        ? evt.target.value
        : this._destinations[index];
      this.rerender();
    });
  }

  _applyFlatpickr() {
    this._removeFlatpickr();

    const eventStartTimeElement = this.getElement().querySelector(`.event__input--time#event-start-time-1`);
    const eventEndTimeElement = this.getElement().querySelector(`.event__input--time#event-end-time-1`);
    const flatpickrOptions = {
      enableTime: true,
      dateFormat: EVENT_DATE_FORMAT,
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

  _removeFlatpickr() {
    if (this._flatpickrStartTime) {
      this._flatpickrStartTime.destroy();
      this._flatpickrStartTime = null;
    }

    if (this._flatpickrEndTime) {
      this._flatpickrEndTime.destroy();
      this._flatpickrEndTime = null;
    }
  }

  _eventStartTimeElementChangeHandler() {
    this._flatpickrEndTime.set(`minDate`, this._flatpickrStartTime.input.value);
    if (this._flatpickrStartTime.input.value > this._flatpickrEndTime.input.value) {
      this._flatpickrEndTime.setDate(this._flatpickrStartTime.input.value);
    }
  }

  _getFormElementSelector() {
    return this._mode === PointControllerMode.ADDING
      ? this.getElement()
      : this.getElement().querySelector(`form.event--edit`);
  }
}

export {EVENT_DATE_FORMAT, OFFER_NAME_PREFIX};
