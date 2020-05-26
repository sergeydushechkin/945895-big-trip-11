export default class Store {
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  getItems(itemGroup) {
    try {
      return JSON.parse(this._storage.getItem(`${this._storeKey}-${itemGroup}`)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(itemGroup, items) {
    this._storage.setItem(
        `${this._storeKey}-${itemGroup}`,
        JSON.stringify(items)
    );
  }

  setItem(itemGroup, key, value) {
    const store = this.getItems(itemGroup);

    this._storage.setItem(
        `${this._storeKey}-${itemGroup}`,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removeItem(itemGroup, key) {
    const store = this.getItems(itemGroup);

    delete store[key];

    this._storage.setItem(
        `${this._storeKey}-${itemGroup}`,
        JSON.stringify(store)
    );
  }
}
