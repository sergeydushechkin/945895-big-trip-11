import TripInfoComponent from "./components/info.js";
import MenuComponent, {MenuTab} from "./components/menu.js";
import StatsComponent from "./components/stats.js";
import FilterController from "./controllers/filter.js";
import {generatePoints} from "./mock/point.js";
import {RenderPosition, render, HIDDEN_CLASS} from "./utils/render.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";

const POINTS_COUNT = 5;

const points = generatePoints(POINTS_COUNT);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const tripMainElement = document.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoComponent(pointsModel);
const menuComponent = new MenuComponent();
const filterController = new FilterController(tripMainControlsElement.querySelector(`h2:nth-of-type(2)`), pointsModel);
const tripController = new TripController(tripEventsElement, pointsModel);
const statsComponent = new StatsComponent(pointsModel);

tripMainElement.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.addNewPoint();
});

render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripMainControlsElement.querySelector(`h2:nth-of-type(1)`), menuComponent, RenderPosition.AFTEREND);
render(tripEventsElement, statsComponent, RenderPosition.AFTEREND);

filterController.render();
tripController.render();
statsComponent.hide();

menuComponent.setOnClickHandler((menuTab) => {
  switch (menuTab) {
    case MenuTab.TABLE:
      tripEventsElement.classList.remove(HIDDEN_CLASS);
      tripController.rerender();
      statsComponent.hide();
      break;
    case MenuTab.STATS:
      tripEventsElement.classList.add(HIDDEN_CLASS);
      statsComponent.show();
      break;
  }
});
