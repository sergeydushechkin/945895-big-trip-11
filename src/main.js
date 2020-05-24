import TripInfoComponent from "./components/info.js";
import MenuComponent, {MenuTab} from "./components/menu.js";
import StatsComponent from "./components/stats.js";
import FilterController from "./controllers/filter.js";
import LoadingComponent from "./components/loading.js";
import {generatePoints} from "./mock/point.js";
import {RenderPosition, render, remove, HIDDEN_CLASS} from "./utils/render.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";
import API from "./api.js";
import Store from "./store.js";

// const POINTS_COUNT = 5;
const onError = (error) => {
  const node = document.createElement(`div`);
  node.style = `width: 180px; margin: 0 auto; text-align: center; background-color: red;`;

  node.textContent = error;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const AUTHORIZATION = `Basic h12f43D34thDaf43jkd=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

// const points = generatePoints(POINTS_COUNT);
const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();
// pointsModel.setPoints(points);

const tripMainElement = document.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoComponent(pointsModel);
const menuComponent = new MenuComponent();
const filterController = new FilterController(tripMainControlsElement.querySelector(`h2:nth-of-type(2)`), pointsModel);
const tripController = new TripController(tripEventsElement, pointsModel);
const statsComponent = new StatsComponent(pointsModel);
const loadingComponent = new LoadingComponent();

tripMainElement.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.addNewPoint();
});

render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripMainControlsElement.querySelector(`h2:nth-of-type(1)`), menuComponent, RenderPosition.AFTEREND);
render(tripEventsElement, statsComponent, RenderPosition.AFTEREND);
render(tripEventsElement, loadingComponent, RenderPosition.BEFOREEND);

filterController.render();
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

api.getDestinations()
  .then((destinations) => Store.setDestinations(destinations))
  .then(api.getOffers.bind(api))
  .then((offers) => Store.setOffers(offers))
  .then(api.getPoints.bind(api))
  .then((points) => {
    pointsModel.setPoints(points);
    remove(loadingComponent);
    tripController.render();
  })
  .catch(onError);
