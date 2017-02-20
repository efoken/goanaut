/* eslint-disable react/require-default-props */
import $ from 'jquery';
import React from 'react';

import MapBounds from '../MapBounds';
import MapElement from '../MapElement';
import MapPropTypes from '../../types/MapPropTypes';
import { check, convert } from '../../utils';
import * as zoomControlPositions from '../../consts/ZoomControlPositions';

function createBounds(bounds) {
  if (bounds instanceof MapBounds) {
    return bounds;
  }
  const sw = bounds.sw;
  const ne = bounds.ne;
  return new MapBounds(sw, ne);
}

const propTypes = {
  children: React.PropTypes.node,
  containerProps: React.PropTypes.object,
  clickableIcons: React.PropTypes.bool,
  disableDefaultUI: React.PropTypes.bool,
  defaultCenter: MapPropTypes.LatLngPropType,
  defaultZoom: React.PropTypes.number,
  disablePOI: React.PropTypes.bool,
  disableTransit: React.PropTypes.bool,
  draggable: React.PropTypes.bool,
  center: MapPropTypes.LatLngPropType,
  zoom: React.PropTypes.number,
  minBounds: React.PropTypes.oneOfType([MapPropTypes.MapBoundsPropType, MapPropTypes.MapBoundsLiteralPropType]), // eslint-disable-line
  minZoom: React.PropTypes.number,
  maxZoom: React.PropTypes.number,
  zoomControl: React.PropTypes.bool,
  zoomControlPosition: React.PropTypes.oneOf(Object.values(zoomControlPositions)),
  static: React.PropTypes.bool,
  scaleControl: React.PropTypes.bool,
  staticImageHeight: React.PropTypes.number, // eslint-disable-line
  staticImageWidth: React.PropTypes.number, // eslint-disable-line
  streetViewControl: React.PropTypes.bool,
  onBoundsChange: React.PropTypes.func,
  onZoomChange: React.PropTypes.func,
  onDragStart: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  onIdle: React.PropTypes.func,
  onLoad: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onMouseMove: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
  onStreetViewVisibleChange: React.PropTypes.func,
  showTransitLayer: React.PropTypes.bool,
  directions: React.PropTypes.object,
  customStyles: React.PropTypes.array,
};

const defaultProps = {
  static: false,
  clickableIcons: true,
  disableDefaultUI: true,
  defaultZoom: 14,
  disablePOI: false,
  disableTransit: false,
  draggable: true,
  showTransitLayer: false,
  maxZoom: 18,
  minZoom: 2,
  zoomControl: true,
  zoomControlPosition: zoomControlPositions.TOP_LEFT,
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      unsignedUrl: null,
      signedUrl: null,
    };
    this.mounted = false;
    this.onBoundsChange = this.onBoundsChange.bind(this);
    this.onZoomChange = this.onZoomChange.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onIdle = this.onIdle.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onStreetViewVisibleChange = this.onStreetViewVisibleChange.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.static) {
      this.initializeStatic();
    } else {
      // (0, c.loadMapProvider)(() => {
      //   if (!this.state.map && this.mounted) {
      //     this.initialize();
      //   }
      // });
      if (!this.state.map && this.mounted) {
        this.initialize();
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (check.changed('static', this.props, newProps) || check.changed('staticImageHeight', this.props, newProps) || check.changed('staticImageWidth', this.props, newProps)) { // eslint-disable-line
      if (newProps.static) {
        const n = {
          height: newProps.staticImageHeight,
          width: newProps.staticImageWidth,
        };
        this.initializeStatic(n);
      } else {
        // (0, c.loadMapProvider)(() => {
        //   this.state.map || this.props.static || !this.mounted || this.initialize();
        // });
        this.state.map || this.props.static || !this.mounted || this.initialize();
      }
    }

    const map = this.state.map;

    if (map) {
      const i = this.eventData();
      const o = i.center;
      const l = i.zoom;

      if (newProps.center && !check.latLngEqual(o, newProps.center)) {
        map.setView(newProps.center || o, newProps.zoom || l);
      } else {
        newProps.zoom && l !== newProps.zoom && map.setZoom(newProps.zoom);
      }

      if (check.changed('minZoom', this.props, newProps)) {
        map.setMinZoom(newProps.minZoom);
      }
      if (check.changed('maxZoom', this.props, newProps)) {
        map.setMinZoom(newProps.maxZoom);
      }
      if (check.changed('zoomControl', this.props, newProps)) {
        map.setZoomControl(newProps.zoomControl);
      }
      if (check.changed('scaleControl', this.props, newProps)) {
        map.setScaleControl(newProps.scaleControl);
      }
      if (check.changed('streetViewControl', this.props, newProps)) {
        map.setStreetViewControl(newProps.streetViewControl);
      }
      if (check.changed('showTransitLayer', this.props, newProps)) {
        map.toggleTransitLayer(newProps.showTransitLayer);
      }
      if (check.changed('directions', this.props, newProps)) {
        map.setDirections(newProps.directions);
      }

      if (newProps.minBounds && !check.boundsEqual(this.props.minBounds, newProps.minBounds)) {
        const bounds = createBounds(newProps.minBounds);
        this.fitBounds(bounds);
      }
    }
  }

  componentDidUpdate() {
    if (!this.state.map && this.mounted) {
      // (0, c.onMapsLoad)(() => this.initialize());
      this.initialize();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.state.map) {
      this.uninitialize();
    }
  }

  onBoundsChange(ev) {
    if (this.props.onBoundsChange) {
      this.props.onBoundsChange(this.eventData(), ev);
    }
  }

  onClick(ev) {
    if (this.props.onClick) {
      this.props.onClick(ev);
    }
  }

  onDrag(ev) {
    if (this.props.onDrag) {
      this.props.onDrag(this.eventData(), ev);
    }
  }

  onDragEnd(ev) {
    if (this.props.onDragEnd) {
      this.props.onDragEnd(this.eventData(), ev);
    }
  }

  onDragStart(ev) {
    if (this.props.onDragStart) {
      this.props.onDragStart(this.eventData(), ev);
    }
  }

  onIdle(ev) {
    if (this.props.onIdle) {
      this.props.onIdle(ev);
    }
  }

  onLoad(ev) {
    if (this.props.onLoad) {
      this.props.onLoad(ev);
    }
  }

  onMouseMove(ev) {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(ev);
    }
  }

  onMouseOver(ev) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(ev);
    }
  }

  onMouseOut(ev) {
    if (this.props.onMouseOut) {
      this.props.onMouseOut(ev);
    }
  }

  onZoomChange(ev) {
    if (this.props.onZoomChange) {
      this.props.onZoomChange(this.eventData(), ev);
    }
  }

  onStreetViewVisibleChange(ev) {
    if (this.props.onStreetViewVisibleChange) {
      this.props.onStreetViewVisibleChange(ev);
    }
  }

  setView(center, zoom) {
    if (this.state.map) {
      this.state.map.setView(center, zoom);
    }
  }

  eventData() {
    const map = this.state.map;
    return {
      map,
      center: map.getCenter(),
      bounds: map.getBounds(),
      zoom: map.getZoom(),
    };
  }

  fitBounds(bounds) {
    if (this.state.map) {
      bounds = bounds instanceof MapBounds ? bounds : new MapBounds(bounds); // eslint-disable-line
      this.state.map.fitBounds(bounds);
    }
  }

  guessContainerSize() {
    const container = this.container;
    const ratio = 16 / 9;

    if (container) {
      const $container = $(container);
      return {
        width: Math.round($container.width() || $(window).width()),
        height: Math.round($container.height() || $(window).width() / ratio),
      };
    }

    return {
      width: Math.round($(window).width()),
      height: Math.round($(window).width() / ratio),
    };
  }

  initialize() {
    if (this.mounted && this.map && !this.state.map) {
      const element = this.map;

      if (document.contains(element)) {
        const map = new MapElement(element, {
          center: 'center' in this.props ? this.props.center : this.props.defaultCenter,
          disableDefaultUI: this.props.disableDefaultUI,
          disablePOI: this.props.disablePOI,
          disableTransit: this.props.disableTransit,
          draggable: this.props.draggable,
          maxZoom: this.props.maxZoom,
          minZoom: this.props.minZoom,
          zoom: 'zoom' in this.props ? this.props.zoom : this.props.defaultZoom,
          zoomControl: this.props.zoomControl,
          zoomControlPosition: this.props.zoomControlPosition,
          showTransitLayer: this.props.showTransitLayer,
          directions: this.props.directions,
          customStyles: this.props.customStyles,
          scaleControl: this.props.scaleControl,
          streetViewControl: this.props.streetViewControl,
          clickableIcons: this.props.clickableIcons,
        });

        map.on('zoom_changed', this.onZoomChange);
        map.on('bounds_changed', this.onBoundsChange);
        map.on('dragstart', this.onDragStart);
        map.on('dragend', this.onDragEnd);
        map.on('drag', this.onDrag);
        map.on('load', this.onLoad);
        map.on('click', this.onClick);
        map.on('idle', this.onIdle);
        map.on('mousemove', this.onMouseMove);
        map.on('mouseover', this.onMouseOver);
        map.on('mouseout', this.onMouseOut);
        map.on('visible_changed', this.onStreetViewVisibleChange, true);

        map.once('tilesloaded', () => {
          $('.gm-style').removeClass('gm-style');
        });

        this.setState({ map }, () => {
          if (this.props.minBounds) {
            const bounds = createBounds(this.props.minBounds);
            this.fitBounds(bounds);
          }
        });
      }
    }
  }

  initializeStatic(e) {
    this.uninitialize();
    this.setState({ map: null });

    const url = this.staticMapUrl(e);
    this.setState({ unsignedUrl: url });
    $.ajax({
      url: '/rooms/ajax_signed_image_url',
      data: {
        unsigned_url: url,
      },
      dataType: 'json',
    }).then((data) => {
      this.setState({
        signedUrl: data.signed_url,
      });
    });
  }

  panTo(latLng) {
    if (this.state.map) {
      this.state.map.panTo(latLng);
    }
  }

  staticMapUrl() {
    const e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; // eslint-disable-line
    const t = this.guessContainerSize();
    let n = t.width;
    let r = t.height;
    const a = e.height;
    const o = e.width;

    a && (r = a);
    o && (n = o);

    const l = [];
    React.Children.forEach(this.props.children, (child) => {
      if (child && child.type && child.type.staticMapUrl) {
        l.push(child.type.staticMapUrl(child.props));
      }
    });

    const e = 2048;
    const t = 80;
    const a = e - t;

    const i = '/maps/api/staticmap';
    const o = convert.latLngToString(this.props.center);
    const s = `${i}?size=${n}x${r}&zoom=${this.props.zoom}&center=${o}`;
    return `${s}&${convert.joinWithMaxLength(l, '&', a - s.length)}`;
  }

  uninitialize() {
    const map = this.state.map;
    if (map) {
      map.off('zoom_changed', this.onZoomChange);
      map.off('bounds_changed', this.onBoundsChange);
      map.off('dragstart', this.onDragStart);
      map.off('dragend', this.onDragEnd);
      map.off('drag', this.onDrag);
      map.off('load', this.onLoad);
      map.off('click', this.onClick);
      map.off('idle', this.onIdle);
      map.off('mousemove', this.onMouseMove);
      map.off('mouseover', this.onMouseOver);
      map.off('mouseout', this.onMouseOut);
      map.off('visible_changed', this.onStreetViewVisibleChange);
    }
  }

  renderChildren(e) {
    const t = {
      map: this.state.map,
    };
    return React.Children.map(e, (e) => {
      return e && React.cloneElement(e, t);
    });
  }

  render() {
    if (this.props.static) {
      return (
        <div {...this.props.containerProps} ref={ref => this.container = ref}>
          {this.state.signedUrl && <img src={this.state.signedUrl} alt="" style={{ width: '100%' }} />}
        </div>
      );
    }
    return (
      <div {...this.props.containerProps} ref={ref => this.container = ref}>
        <div style={{ height: '100%', width: '100%' }} ref={ref => this.map = ref}>
          {this.state.map && this.renderChildren(this.props.children)}
        </div>
      </div>
    );
  }
}

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
