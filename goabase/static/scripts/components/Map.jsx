// @flow
import _ from 'lodash';
import React from 'react';
import { renderReact } from 'hypernova-react';
import i18n from '../i18n';

const eventNames = [
  'ready',
  'click',
  'dragend',
  'recenter',
  'bounds_changed',
  'center_changed',
  'dblclick',
  'dragstart',
  'heading_change',
  'idle',
  'maptypeid_changed',
  'mousemove',
  'mouseout',
  'mouseover',
  'projection_changed',
  'resize',
  'rightclick',
  'tilesloaded',
  'tilt_changed',
  'zoom_changed',
];

declare class MapPropTypes {
  zoom: number;
  initialCenter: {
    lat: number,
    lng: number,
  };
  center: any;
  centerAroundCurrentLocation: boolean;
  visible: boolean;
}

const defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416,
  },
  center: {},
  centerAroundCurrentLocation: false,
  visible: true,
};

class Map extends React.Component {
  props: MapPropTypes;
  state: {
    currentLocation: {
      lat: number,
      lng: number,
    },
  };
  listeners: any;
  map: any;

  /**
   * @param {MapPropTypes} props
   */
  constructor(props: MapPropTypes) {
    super(props);
    this.state = {
      currentLocation: {
        lat: this.props.initialCenter.lat,
        lng: this.props.initialCenter.lng,
      },
    };
    this.listeners = {};
  }

  /**
   * Invoked immediately after a component is mounted.
   */
  componentDidMount(): void {
    // if (this.props.centerAroundCurrentLocation) {
    // }
    this.loadMap();
  }

  /**
   * Invoked immediately after updating occurs.
   * @param {MapPropTypes} prevProps
   * @param {any} prevState
   */
  componentDidUpdate(prevProps: MapPropTypes, prevState: any): void {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevProps.zoom !== this.props.zoom) {
      this.map.setZoom(this.props.zoom);
    }
    if (prevProps.center !== this.props.center) {
      this.setState({
        currentLocation: this.props.center,
      });
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  /**
   * Invoked immediately before a component is unmounted and destroyed.
   */
  componentWillUnmount(): void {
    const { google } = this.props;
    Object.keys(this.listeners).forEach((name) => {
      google.maps.event.removeListener(this.listeners[name]);
    });
  }

  /**
   */
  loadMap(): void {
    if (this.props && this.props.google) {
      const { google } = this.props;

      const currentLocation = this.state.currentLocation;
      const center = new google.maps.LatLng(currentLocation.lat, currentLocation.lng);

      const mapConfig = Object.assign({}, {
        center,
        zoom: this.props.zoom,
      });

      Object.keys(mapConfig).forEach((key) => {
        if (mapConfig[key] === null || mapConfig[key] === undefined) {
          delete mapConfig[key];
        }
      });

      this.map = new google.maps.Map('', mapConfig);

      eventNames.forEach((name) => {
        this.listeners[name] = this.map.addListener(name, this.handleEvent(name));
      });
      google.maps.trigger(this.map, 'ready');
      this.forceUpdate();
    }
  }

  /**
   * @param {string} name
   * @returns {any}
   */
  handleEvent(name: string): any {
    let timeout;
    const handlerName = `on${_.upperFirst(_.camelCase(name))}`;

    return (ev) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, ev);
        }
      }, 0);
    };
  }

  /**
   */
  restyleMap(): void {
    if (this.map) {
      const { google } = this.props;
      google.maps.event.trigger(this.map, 'resize');
    }
  }

  /**
   */
  recenterMap(): void {
    if (this.map) {
      const { google } = this.props;

      let center = this.state.currentLocation;
      if (!(center instanceof google.maps.LatLng)) {
        center = new google.maps.LatLng(center.lat, center.lng);
      }
      this.map.setCenter(center);
      google.maps.event.trigger(this.map, 'recenter');
    }
  }

  /**
   * @returns {React.Element<any>}
   */
  render(): React.Element<any> {
    return (
      <div className="map-wrapper">
        <div style={{ display: this.props.visible ? 'inherit' : 'none' }}>
          {i18n.gettext('Loading map...')}
        </div>
      </div>
    );
  }
}

Map.defaultProps = defaultProps;

export default renderReact('Map', Map);
