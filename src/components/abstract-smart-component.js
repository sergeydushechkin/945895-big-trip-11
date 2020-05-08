import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();
  }

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this._element;
    const parent = oldElement.parentElement;
    this.removeElement();
    parent.replaceChild(this.getElement(), oldElement);
    this.recoveryListeners();
  }
}
