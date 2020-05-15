import TripCostComponent from "./components/cost.js";
import TripInfoComponent from "./components/info.js";
import MenuComponent from "./components/menu.js";
import FilterController from "./controllers/filter.js";
import {generatePoints} from "./mock/point.js";
import {RenderPosition, render} from "./utils/render.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";

const POINTS_COUNT = 20;

const points = generatePoints(POINTS_COUNT);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const tripMainElement = document.querySelector(`.trip-main`);

// Отрисовка стоимости и информации о маршруте
render(
    tripMainElement,
    new TripCostComponent(points),
    RenderPosition.AFTERBEGIN
);
render(
    tripMainElement.querySelector(`.trip-main__trip-info`),
    new TripInfoComponent(points),
    RenderPosition.AFTERBEGIN
);

// Отрисовка меню и фильтрации
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

render(
    tripMainControlsElement.querySelector(`h2:nth-of-type(1)`),
    new MenuComponent(),
    RenderPosition.AFTEREND
);

const filterController = new FilterController(tripMainControlsElement.querySelector(`h2:nth-of-type(2)`), pointsModel);
filterController.render();

// Отрисовка основной части
const tripEventsElement = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEventsElement, pointsModel);

tripMainElement.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.addNewPoint();
});

tripController.render();
