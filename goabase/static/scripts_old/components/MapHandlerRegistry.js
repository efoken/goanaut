/* eslint-disable no-underscore-dangle */
class MapHandlerRegistry {
  constructor() {
    this._handlerRegistry = {};
  }

  registerHandlerId(action, handler, id) {
    if (!this._handlerRegistry[action]) {
      this._handlerRegistry[action] = [];
    }
    this._handlerRegistry[action].push({ handler, id });
  }

  getHandlerId(action, handler) {
    const n = this._handlerRegistry[action];
    if (!n) {
      return null;
    }
    const r = n.filter(e => e.handler === handler)[0];
    if (!r) {
      return null;
    }
    const a = n.indexOf(r);
    n.splice(a, 1);
    return r.id;
  }
}

export default MapHandlerRegistry;
