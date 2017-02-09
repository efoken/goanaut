/* eslint-disable react/require-default-props */
import React from 'react';

import MapElementBase from './MapElementBase';
import MapIcon from '../MapIcon';
import * as convertUtils from '../../convertUtils';
import * as customPropTypes from '../../customPropTypes';
import * as geoUtils from '../../geoUtils';

const i = n(152);
const l = babelHelpers.interopRequireDefault(n(2305));

const propTypes = Object.assign({}, MapElementBase.propTypes, {
  position: customPropTypes.LatLngPropType.isRequired,
  icon: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
    origin: customPropTypes.PositionPropType,
    size: customPropTypes.SizePropType,
    spriteSize: customPropTypes.SizePropType,
    isRetina: React.PropTypes.bool,
    anchor: customPropTypes.PositionPropType,
  })]),
  iconAnchor: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  }),
  visible: React.PropTypes.bool,
  markerType: React.PropTypes.any,
  className: React.PropTypes.string,
  draggable: React.PropTypes.bool,
  title: React.PropTypes.string,
});

class Marker extends MapElementBase {
  componentDidMount() {
    var e = new l.default(this.props.position, this.iconFromProps(this.props), {
      map: this.props.map,
      iconAnchor: this.props.iconAnchor,
      draggable: this.props.draggable,
      title: this.props.title,
    });
    this._mountWithObject(e);
  }

  iconFromProps(e) {
    if (typeof e.icon === 'string' || React.isValidElement(e.icon)) {
      return e.icon;
    } else if (typeof e.icon === 'object') {
      return new MapIcon(e.icon.url, e.icon);
    }
    return <i className="icon icon-map-marker" />;
  }

  componentWillReceiveProps(e) {
    const t = this.props;
    const n = this.state.object;
    if (n) {
      geoUtils.latLngEqual(n.getLatLng(), e.position) || n.setLatLng(e.position);
      geoUtils.using('icon', t, e) && !(0, i.isEqual)(t.icon, e.icon) && n.setIcon(this.iconFromProps(e));
      geoUtils.using('visible', t, e) && n.isVisible() !== e.visible && n.setVisible(e.visible);
      geoUtils.using('zIndex', t, e) && n.getZIndex() !== e.zIndex && n.setZIndex(e.zIndex);
      geoUtils.using('markerType', t, e) && n.getMarkerType() !== e.markerType && n.setMarkerType(e.markerType);
      geoUtils.changed('className', t, e) && n.setClass(e.className);
      geoUtils.changed('title', t, e) && n.setTitle(e.title);
    }
  }

  eventData(event) {
    return {
      nativeEvent: event,
      marker: this.state.object,
      position: this.props.position,
      data: this.props.data,
    }
  }

  staticMapUrl(e) {
    let t = null;
    typeof e.icon === 'string' ? t = e.icon : 'icon' in e && (t = e.icon.url || null);

    const n = {
      bar: 'http://goo.gl/MxX5fU',
      art: 'http://goo.gl/GEClJ3',
      kid: 'http://goo.gl/khGRLz',
      restaurant: 'http://goo.gl/4tUUoB',
      wifi: 'http://goo.gl/2sCZ5I',
      other: 'http://goo.gl/fzC86S',
      groceries: 'http://goo.gl/qMVzxl',
      store: 'http://goo.gl/yMzKrk',
      cafe: 'http://goo.gl/lsMp53',
      tourism: 'http://goo.gl/FumdDM',
    };
    const r = t.match(/pin_([^.]+)/)[1];
    const a = convertUtils.latLngToString(e.position);

    r && (t = n[r] || t);
    t = t ? `icon:${t}|` : '';
    return `markers=${t}${a}`;
  }
}

Marker.propTypes = propTypes;

export default Marker;
