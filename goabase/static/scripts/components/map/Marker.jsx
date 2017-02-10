/* eslint-disable react/require-default-props */
import _ from 'lodash';
import React from 'react';

import MapElementBase from './MapElementBase';
import MapIcon from '../MapIcon';
import MapObject from '../MapObject';
import { check, convert } from '../../utils';
import * as customPropTypes from '../../customPropTypes';

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
    const object = new MapObject(this.props.position, this.iconFromProps(this.props), {
      map: this.props.map,
      iconAnchor: this.props.iconAnchor,
      draggable: this.props.draggable,
      title: this.props.title,
    });
    this._mountWithObject(object);
  }

  iconFromProps(props) {
    if (typeof props.icon === 'string' || React.isValidElement(props.icon)) {
      return props.icon;
    } else if (typeof props.icon === 'object') {
      return new MapIcon(props.icon.url, props.icon);
    }
    return <i className="icon icon-map-marker" />;
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;
    const object = this.state.object;

    if (object) {
      if (!check.latLngEqual(object.getLatLng(), nextProps.position)) {
        object.setLatLng(nextProps.position);
      }
      if (check.using('icon', props, nextProps) && !_.isEqual(props.icon, nextProps.icon)) {
        object.setIcon(this.iconFromProps(nextProps));
      }
      if (check.using('visible', props, nextProps) && object.isVisible() !== nextProps.visible) {
        object.setVisible(nextProps.visible);
      }
      if (check.using('zIndex', props, nextProps) && object.getZIndex() !== nextProps.zIndex) {
        object.setZIndex(nextProps.zIndex);
      }
      if (check.using('markerType', props, nextProps) && object.getMarkerType() !== nextProps.markerType) {
        object.setMarkerType(nextProps.markerType);
      }
      if (check.changed('className', props, nextProps)) {
        object.setClass(nextProps.className);
      }
      if (check.changed('title', props, nextProps)) {
        object.setTitle(nextProps.title);
      }
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

  staticMapUrl(props) {
    let t = null;

    if (typeof props.icon === 'string') {
      t = props.icon;
    } else if ('icon' in props) {
      t = props.icon.url || null;
    }

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
    const a = convert.latLngToString(props.position);

    r && (t = n[r] || t);
    t = t ? `icon:${t}|` : '';
    return `markers=${t}${a}`;
  }
}

Marker.propTypes = propTypes;

export default Marker;
