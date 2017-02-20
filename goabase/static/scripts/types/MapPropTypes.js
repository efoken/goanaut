import React from 'react';

import MapBounds from '../components/MapBounds';
import MapElement from '../components/MapElement';
import * as controlPositions from '../consts/ControlPositions';

const MapPropTypes = {};

MapPropTypes.SizePropType = React.PropTypes.shape({
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
});

MapPropTypes.PositionPropType = React.PropTypes.shape({
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
});

const p = React.PropTypes.shape({
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
});
MapPropTypes.LatLngPropType = p;

MapPropTypes.PathPropTypes = {
  strokeColor: React.PropTypes.string,
  strokeWeight: React.PropTypes.number,
  strokeOpacity: React.PropTypes.number,
  fillColor: React.PropTypes.string,
  fillOpacity: React.PropTypes.number,
};

MapPropTypes.MapPropType = React.PropTypes.instanceOf(MapElement);

MapPropTypes.MapBoundsPropType = React.PropTypes.instanceOf(MapBounds);

MapPropTypes.MapBoundsLiteralPropType = React.PropTypes.shape({
  ne: p.isRequired,
  sw: p.isRequired,
});

MapPropTypes.ControlPositionPropType = React.PropTypes.oneOf(Object.values(controlPositions));

export default MapPropTypes;
