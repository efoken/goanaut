/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import MapHandlerRegistry from './MapHandlerRegistry';
import MapMarker from './MapMarker';
import * as mapUtils from '../mapUtils';

export const HIGH_Z_INDEX = 9e3;

class MapObject extends MapHandlerRegistry {
  constructor(e, icon, r = {}) {
    super();
    const title = r.title || '';
    this._popupContent = r.popupContent;
    this._data = r.data || {};
    this._markerType = r.markerType || '';
    this._marker = new MapMarker({
      title,
      position: new google.maps.LatLng(e.lat, e.lng),
      optimized: false,
      draggable: !!r.draggable,
      raiseOnDrag: false,
    });
    this.setIcon(icon, r);
    r.map && this.addTo(r.map);
  }

  on(action, callback) {
    const id = google.maps.event.addListener(this._marker, action, callback);
    this.registerHandlerId(action, callback, id);
  }

  off(action, callback) {
    const id = this.getHandlerId(action, callback);
    if (id !== null) {
      google.maps.event.removeListener(id);
    }
  }

  data(key, value) {
    if (value !== undefined) {
      this._data[key] = value;
      return this;
    }
    return this._data[key];
  }

  setClass(extraClass) {
    this._marker.setOptions({
      labelClass: `map-marker ${extraClass}`,
    });
  }

  setIcon(icon) {
    const t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (React.isValidElement(icon)) {
      return this.setIcon(ReactDOMServer.renderToStaticMarkup(icon), t);
    }

    if (typeof icon === 'string') {
      const options = {
        labelContent: icon,
        labelClass: 'map-marker',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0,
        },
      }
      const r = t.iconAnchor && new google.maps.Point(t.iconAnchor.x, t.iconAnchor.y);
      r && (options.labelAnchor = r);
      this._marker.setOptions(options);
    } else {
      this._marker.setOptions({
        labelContent: '',
        labelClass: '',
      });
      this._marker.setIcon(icon._icon, t);
    }

    return this;
  }

  getMarkerType() {
    return this._markerType;
  }

  setMarkerType(markerType) {
    this._markerType = markerType;
    return this;
  }

  getPopupContent() {
    return this._popupContent;
  }

  setPopupContent(popupContent) {
    this._popupContent = popupContent;
    return this;
  }

  getPopupCallback() {
    return this._popupCallback;
  }

  setPopupCallback(popupCallback) {
    this._popupCallback = popupCallback;
    return this;
  }

  openPopup(e) {
    this.map.popup.open(this, e);
    return this;
  }

  getZIndex() {
    return this._zIndex;
  }

  setZIndex(zIndex) {
    this._zIndex = zIndex;
    this._marker.setZIndex(zIndex);
    return this;
  }

  bringToFront() {
    this._normalOrderZIndex = this.getZIndex();
    this.setZIndex(HIGH_Z_INDEX);
    return this;
  }

  putBack() {
    this.setZIndex(this._normalOrderZIndex);
    return this;
  }

  /**
   * @param {MapElement} map
   * @returns {MapObject}
   */
  addTo(map) {
    this._marker.setMap(map._map);
    this.map = map;
    return this;
  }

  detach() {
    this._marker.setMap(null);
    this.map = null;
    return this;
  }

  getMap() {
    return this.map;
  }

  isOnMap() {
    return !!this.map;
  }

  isVisible() {
    return this._visible === undefined || this._visible;
  }

  setVisible(visible) {
    this._marker.setVisible(visible);
    this._visible = !!visible;
    return this;
  }

  getLatLng() {
    return mapUtils.convertToLatLngLiteral(this._marker.getPosition());
  }

  setLatLng(latLng) {
    this._marker.setPosition(latLng);
    return this;
  }

  getTitle() {
    return this._marker.getTitle()
  }

  setTitle(title) {
    this._marker.setTitle(title);
    return this;
  }
}

export default MapObject;
