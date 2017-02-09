import React from 'react';

import MapBounds from './components/MapBounds';
import MapElement from './components/MapElement';
import * as controlPositions from './consts/ControlPositions';

const propTypes = {};
propTypes.ControlPositionPropType = propTypes.MapBoundsLiteralPropType = propTypes.MapBoundsPropType = propTypes.MapPropType = propTypes.PathPropTypes = propTypes.LatLngPropType = propTypes.PositionPropType = propTypes.SizePropType = undefined; // eslint-disable-line

const p = (
  propTypes.SizePropType = React.PropTypes.shape({
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }),
  propTypes.PositionPropType = React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  }),
  propTypes.LatLngPropType = React.PropTypes.shape({
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
  })
);

propTypes.PathPropTypes = {
  strokeColor: React.PropTypes.string,
  strokeWeight: React.PropTypes.number,
  strokeOpacity: React.PropTypes.number,
  fillColor: React.PropTypes.string,
  fillOpacity: React.PropTypes.number,
};

propTypes.MapPropType = React.PropTypes.instanceOf(MapElement);

propTypes.MapBoundsPropType = React.PropTypes.instanceOf(MapBounds);

propTypes.MapBoundsLiteralPropType = React.PropTypes.shape({
  ne: p.isRequired,
  sw: p.isRequired,
});

propTypes.ControlPositionPropType = React.PropTypes.oneOf(Object.values(controlPositions));

export default propTypes;
