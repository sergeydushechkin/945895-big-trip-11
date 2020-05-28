import Point from "../models/point.js";
import {nanoid} from "nanoid";

const StorageItemGroup = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`
};

const isOnline = () => {
  return window.navigator.onLine;
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._syncRequired = false;
  }

  getData() {
    if (isOnline()) {
      return this._api.getData()
        .then(({parsedPoints, destinations, parsedOffers}) => {
          const points = createStoreStructure(parsedPoints.map((point) => point.toRAW()));

          this._store.setItems(StorageItemGroup.POINTS, points);
          this._store.setItems(StorageItemGroup.DESTINATIONS, destinations);
          this._store.setItems(StorageItemGroup.OFFERS, parsedOffers);

          return {parsedPoints, destinations, parsedOffers};
        });
    }

    const storePoints = Object.values(this._store.getItems(StorageItemGroup.POINTS));
    const storeDestinations = Object.values(this._store.getItems(StorageItemGroup.DESTINATIONS));
    const storeOffers = this._store.getItems(StorageItemGroup.OFFERS);

    return Promise.resolve({
      parsedPoints: Point.parseAll(storePoints),
      destinations: storeDestinations,
      parsedOffers: storeOffers
    });
  }

  createPoint(point) {
    if (isOnline()) {
      return this._api.createPoint(point)
        .then((newPoint) => {
          this._store.setItem(StorageItemGroup.POINTS, newPoint.id, newPoint.toRAW());

          return newPoint;
        });
    }

    const localNewPointId = nanoid();
    const localNewPoint = Point.clone(Object.assign(point, {id: localNewPointId}));

    this._store.setItem(StorageItemGroup.POINTS, localNewPoint.id, localNewPoint.toRAW());

    this._syncRequired = true;
    return Promise.resolve(localNewPoint);
  }

  updatePoint(id, point) {
    if (isOnline()) {
      return this._api.updatePoint(id, point)
        .then((newPoint) => {
          this._store.setItem(StorageItemGroup.POINTS, newPoint.id, newPoint.toRAW());
          return newPoint;
        });
    }

    const localPoint = Point.clone(Object.assign(point, {id}));
    this._store.setItem(StorageItemGroup.POINTS, id, localPoint.toRAW());

    this._syncRequired = true;
    return Promise.resolve(localPoint);
  }

  deletePoint(id) {
    if (isOnline()) {
      return this._api.deletePoint(id)
        .then(() => this._store.removeItem(StorageItemGroup.POINTS, id));
    }

    this._store.removeItem(StorageItemGroup.POINTS, id);

    this._syncRequired = true;
    return Promise.resolve();
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems(StorageItemGroup.POINTS));

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = response.created;
          const updatedPoints = getSyncedPoints(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(StorageItemGroup.POINTS, items);
          this._syncRequired = false;
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  isSyncRequired() {
    return this._syncRequired;
  }
}
