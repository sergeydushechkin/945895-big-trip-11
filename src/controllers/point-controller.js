import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import {RenderPosition, render, replace} from "../utils/render.js";

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._event = null;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._editMode = null;
  }

  render(event) {
    this._event = event;

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

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

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(
          this,
          this._event,
          Object.assign({}, this._event, {isFavorite: !this._event.isFavorite})
      );
    });

    if (oldEventComponent && oldEventEditComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  _replaceEventToEventEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._editMode = true;
  }

  _replaceEventEditToEvent() {
    this._eventEditComponent.reset();
    replace(this._eventComponent, this._eventEditComponent);
    this._editMode = false;
  }

  setDefaultView() {
    if (this._editMode === true) {
      this._replaceEventEditToEvent();
    }
  }

  _onEscKeyKeydown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEventEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyKeydown);
    }
  }
}
