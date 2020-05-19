import AbstractComponent from "./abstract-component.js";

export const MenuTab = {
  TABLE: `trip-tabs__table`,
  STATS: `trip-tabs__stats`
};

const ACTIVE_CLASS = `trip-tabs__btn--active`;

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="trip-tabs__table">Table</a>
      <a class="trip-tabs__btn" href="#" id="trip-tabs__stats">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  _setActiveTab(menuTab) {
    const tableElement = this.getElement().querySelector(`#${MenuTab.TABLE}`);
    const statsElement = this.getElement().querySelector(`#${MenuTab.STATS}`);
    switch (menuTab) {
      case MenuTab.TABLE:
        statsElement.classList.remove(ACTIVE_CLASS);
        tableElement.classList.add(ACTIVE_CLASS);
        break;
      case MenuTab.STATS:
        tableElement.classList.remove(ACTIVE_CLASS);
        statsElement.classList.add(ACTIVE_CLASS);
        break;
    }
  }

  setOnClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const id = evt.target.id;
      if (id === MenuTab.TABLE || id === MenuTab.STATS) {
        if (!evt.target.classList.contains(ACTIVE_CLASS)) {
          this._setActiveTab(id);
          handler(id);
        }
      }
    });
  }
}
