import EventComponent from "../components/event.js";
import EventEditComponent, {EVENT_DATE_FORMAT, OFFER_NAME_PREFIX} from "../components/event-edit.js";
import {RenderPosition, render, replace, remove} from "../utils/render.js";
import DataStorage from "../data-storage.js";
import PointModel from "../models/point.js";

import flatpickr from "flatpickr";

const EVENT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const SHAKE_ANIMATION_TIMEOUT = 600;

const Mode = {
  ADDING: `adding`,
  EDIT: `edit`,
  DEFAULT: `default`
};

const EmptyPoint = {
  type: EVENT_TYPES[0],
  destination: ``,
  dateStart: Date.now(),
  dateEnd: Date.now(),
  price: 0,
  offers: [],
  isFavorite: false
};

const parseFormData = (formData) => {
  const type = formData.get(`event-type`);
  const offers = [];

  DataStorage.getOffers()[type].forEach((offer) => {
    const offerTitle = offer.title.replace(/\s+/g, ``);
    if (formData.has(`${OFFER_NAME_PREFIX}${offerTitle}`)) {
      offers.push(offer);
    }
  });

  return new PointModel({
    "type": type,
    "date_from": flatpickr.parseDate(formData.get(`event-start-time`), EVENT_DATE_FORMAT).toISOString(),
    "date_to": flatpickr.parseDate(formData.get(`event-end-time`), EVENT_DATE_FORMAT).toISOString(),
    "base_price": parseInt(formData.get(`event-price`), 10),
    "offers": offers,
    "destination": {},
    "is_favorite": formData.get(`event-favorite`) === `on`
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, mode) {
    this._container = container;
    this._point = null;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = mode;

    this._onEscKeyKeydown = this._onEscKeyKeydown.bind(this);
  }

  render(point) {
    this._point = point;

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(this._point);
    this._eventEditComponent = new EventEditComponent(this._point, this._mode);

    this._eventComponent.setRollupButtonClickHandler(() => {
      this._replaceEventToEventEdit();
      document.addEventListener(`keydown`, this._onEscKeyKeydown);
    });

    this._eventEditComponent.setFormSubmitHandler(() => {
      this._eventEditComponent.setRedBorder(false);

      const {formData, destination} = this._eventEditComponent.getData();
      const parsedFormData = parseFormData(formData);
      parsedFormData.destination = destination;

      this._mode = Mode.DEFAULT;
      this._eventEditComponent.setExternalData({saveButtonText: `Saving...`});
      this._eventEditComponent.setFormBlocked(true);

      this._onDataChange(
          this,
          point,
          parsedFormData
      );
    });

    this._eventEditComponent.setFormResetHandler((evt) => {
      evt.preventDefault();
      this._eventEditComponent.setRedBorder(false);

      this._eventEditComponent.setExternalData({deleteButtonText: `Deleting...`});
      this._eventEditComponent.setFormBlocked(true);

      this._onDataChange(
          this,
          this._point,
          null
      );
    });

    if (this._mode !== Mode.ADDING) {
      this._eventEditComponent.setFavoriteButtonClickHandler(() => {
        const newPoint = PointModel.clone(this._point);
        newPoint.isFavorite = !newPoint.isFavorite;

        this._onDataChange(
            this,
            this._point,
            newPoint
        );
      });

      this._eventEditComponent.setRollupButtonClickHandler(() => {
        this._replaceEventEditToEvent();
      });
    }

    if (this._mode === Mode.ADDING) {
      if (oldEventComponent && oldEventEditComponent) {
        remove(oldEventComponent);
        remove(oldEventEditComponent);
        oldEventEditComponent.removeElement();
      }
      document.addEventListener(`keydown`, this._onEscKeyKeydown);
      render(this._container, this._eventEditComponent, RenderPosition.BEFOREBEGIN);
    } else {
      if (oldEventComponent && oldEventEditComponent) {
        replace(this._eventComponent, oldEventComponent);
        replace(this._eventEditComponent, oldEventEditComponent);
        oldEventEditComponent.removeElement();
        if (this._mode === Mode.DEFAULT) {
          this._replaceEventEditToEvent();
        }
      } else {
        render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
      }
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyKeydown);
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;

      this._eventEditComponent.setExternalData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });

      this._eventEditComponent.setRedBorder(true);
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceEventToEventEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEventEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyKeydown);
    this._eventEditComponent.reset();
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEventEditToEvent();
    }
  }

  _onEscKeyKeydown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(
            this,
            this._point,
            null
        );
      } else {
        this._replaceEventEditToEvent();
      }
    }
  }
}

export {Mode, EmptyPoint};
