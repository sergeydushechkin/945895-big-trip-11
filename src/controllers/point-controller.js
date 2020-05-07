import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import {RenderPosition, render, replace} from "../utils/render.js";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._event = null;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._onDataChange = onDataChange;
  }

  render(event) {
    this._event = event;
    this._eventComponent = new EventComponent(this._event);
    this._eventEditComponent = new EventEditComponent(this._event);

    this._eventComponent.setRollupButtonClickHandler(() => {
      this._replaceEventToEventEdit();
      document.addEventListener(`keydown`, this._onEscKeyKeydown);
    });

    this._eventEditComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEventEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyKeydown);
    });

    this._eventEditComponent.setFavoriteButtonClickHandler((evt) => {
      this._onDataChange(
          this,
          this._event,
          Object.assign({}, this._event, {isFavorite: evt.target.checked})
      );
    });

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _replaceEventToEventEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _replaceEventEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  _onEscKeyKeydown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEventEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyKeydown);
    }
  }
}
