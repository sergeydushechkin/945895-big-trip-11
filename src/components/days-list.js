import AbstractComponent from "./abstract-component.js";

const createDaysListTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DaysList extends AbstractComponent {
  getTemplate() {
    return createDaysListTemplate();
  }
}
