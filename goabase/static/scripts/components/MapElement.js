/* eslint-disable class-methods-use-this, no-underscore-dangle */
import MapBounds from './MapBounds';
import MapHandlerRegistry from './MapHandlerRegistry';
import MapPopup from './MapPopup';
import mapStyles from '../mapStyles';
import * as mapUtils from '../mapUtils';

const MAP_OPTIONS = {
  center: {
    lat: 39.165325,
    lng: -86.526386,
  },
  customStyles: null,
  directions: null,
  disableDefaultUI: true,
  disablePOI: false,
  disableTransit: false,
  draggable: true,
  maxZoom: 18,
  minZoom: 2,
  scaleControl: false,
  showTransitLayer: false,
  streetViewControl: false,
  zoom: 15,
  zoomControl: true,
  zoomControlPosition: 'TOP_LEFT',
};

const MAP_SEARCH_BACKGROUND = '#a4ddf5';

function mergeOptions(options) {
  const defaults = Object.assign({}, MAP_OPTIONS);
  if (options) {
    Object.keys(options).forEach((n) => {
      const option = options[n];
      if (option !== undefined) {
        defaults[n] = option;
      }
    });
  }
  return defaults;
}

class MapElement extends MapHandlerRegistry {
  constructor(element, options) {
    super();
    this.element = element;
    this.createMap(mergeOptions(options));
    this.popup = new MapPopup(this);
  }

  createMap(options) {
    const customStyles = options.customStyles;
    const disablePoi = options.disablePOI;
    const disableTransit = options.disableTransit;
    const showTransitLayer = options.showTransitLayer;
    const directions = options.directions;

    this._map = new google.maps.Map(this.element, {
      disableDefaultUI: options.disableDefaultUI,
      clickableIcons: options.clickableIcons,
      draggable: options.draggable,
      scrollwheel: false,
      center: options.center,
      zoom: options.zoom,
      minZoom: options.minZoom,
      maxZoom: options.maxZoom,
      zoomControl: options.zoomControl,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition[options.zoomControlPosition],
      },
      backgroundColor: MAP_SEARCH_BACKGROUND,
      styles: this.getStyles(customStyles, disablePoi, disableTransit),
      scaleControl: options.scaleControl,
      streetViewControl: options.streetViewControl,
    });

    if (showTransitLayer) {
      this.toggleTransitLayer(showTransitLayer);
    }

    if (directions) {
      this.setDirections(directions);
    }
  }

  getStyles(customStyles, disablePoi = false, disableTransit = false) {
    if (customStyles) {
      return customStyles;
    }

    const styles = [].concat(mapStyles);

    if (disablePoi) {
      styles.push({
        featureType: 'poi',
        stylers: [{
          visibility: 'off',
        }],
      });
    }

    if (disableTransit) {
      styles.push({
        featureType: 'transit',
        stylers: [{
          visibility: 'off',
        }],
      });
    }

    return styles;
  }

  on(action, callback) {
    const n = arguments.length > 2 && arguments[2] !== undefined && arguments[2]; // eslint-disable-line

    if (n) {
      !(() => { // eslint-disable-line
        const streetView = this._map.getStreetView();
        const id = google.maps.event.addListener(streetView, action, () => {
          callback(streetView);
        });
        this.registerHandlerId(action, callback, id);
      })();
    } else {
      const id = google.maps.event.addListener(this._map, action, callback);
      this.registerHandlerId(action, callback, id);
    }

    return this;
  }

  off(action, callback) {
    const id = this.getHandlerId(action, callback);
    if (id !== null) {
      google.maps.event.removeListener(id);
    }
    return this;
  }

  once(action, callback) {
    google.maps.event.addListenerOnce(this._map, action, callback);
    return this;
  }

  getNE() {
    const bounds = this._map.getBounds();
    return bounds ? mapUtils.convertToLatLngLiteral(bounds.getNorthEast()) : null;
  }

  getSW() {
    const bounds = this._map.getBounds();
    return bounds ? mapUtils.convertToLatLngLiteral(bounds.getSouthWest()) : null;
  }

  /**
   * @returns {MapBounds}
   */
  getBounds() {
    const bounds = new MapBounds(this._map.getBounds());
    return bounds || null;
  }

  getZoom() {
    return this._map.zoom;
  }

  getCenter() {
    return mapUtils.convertToLatLngLiteral(this._map.getCenter());
  }

  /**
   * @param {MapBounds}
   * @returns {MapElement}
   */
  fitBounds(bounds) {
    this._map.fitBounds(bounds._bounds);
    return this;
  }

  setView(center, zoom) {
    this._map.setCenter(center);
    this._map.setZoom(zoom);
    return this;
  }

  panTo(latLng) {
    this._map.panTo(latLng);
    return this;
  }

  setZoom(zoom) {
    this._map.setZoom(zoom);
    return this;
  }

  setMinZoom(minZoom) {
    this._map.setOptions({ minZoom });
    return this;
  }

  setMaxZoom(maxZoom) {
    this._map.setOptions({ maxZoom });
    return this;
  }

  setZoomControl(zoomControl) {
    this._map.setOptions({ zoomControl });
    return this;
  }

  setScaleControl(scaleControl) {
    this._map.setOptions({ scaleControl });
    return this;
  }

  setStreetViewControl(streetViewControl) {
    this._map.setOptions({ streetViewControl });
    return this;
  }

  showLocation(address) {
    (new google.maps.Geocoder()).geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this._map.fitBounds(results[0].geometry.viewport);
      }
    });
    return this;
  }

  toggleTransitLayer(show = true) {
    if (!this._map.transitLayer) {
      this.initTransitLayer();
    }
    if (show) {
      this._map.transitLayer.setMap(this._map);
    } else {
      this._map.transitLayer.setMap(null);
    }
    return this;
  }

  setDirections(e) {
    if (!this._map.directionsRenderer) {
      this.initDirectionsRenderer();
    }
    this._map.directionsRenderer.setDirections(e);
    return this;
  }

  initTransitLayer() {
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(this._map);
    this._map.transitLayer = transitLayer;
  }

  initDirectionsRenderer() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this._map);
    this._map.directionsRenderer = directionsRenderer;
  }
}

export default MapElement;
