/* eslint-disable no-underscore-dangle */
import MapHandlerRegistry from './MapHandlerRegistry';
import * as mapUtils from '../mapUtils';

class MapBounds extends MapHandlerRegistry {
  constructor(sw, ne) {
    super();
    if (sw instanceof google.maps.LatLngBounds) {
      this._bounds = sw;
    } else if (sw && ne) {
      this._bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(sw.lat, sw.lng),
        new google.maps.LatLng(ne.lat, ne.lng),
      );
    } else {
      this._bounds = new google.maps.LatLngBounds();
    }
  }

  /**
   * @param {MapBounds}
   * @returns {boolean}
   */
  equals(bounds) {
    return this._bounds.equals(bounds._bounds);
  }

  extend(point) {
    const latLng = new google.maps.LatLng(point.lat, point.lng);
    this._bounds.extend(latLng);
    return this;
  }

  getCenter() {
    return mapUtils.convertToLatLngLiteral(this._bounds.getCenter());
  }

  toJSON() {
    const ne = mapUtils.convertToLatLngLiteral(this._bounds.getNorthEast());
    const sw = mapUtils.convertToLatLngLiteral(this._bounds.getSouthWest());

    return {
      ne,
      sw,
      east: ne.lng,
      west: sw.lng,
      north: ne.lat,
      south: sw.lat,
      center: this.getCenter(),
    };
  }
}

export default MapBounds;
