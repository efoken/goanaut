import controllable from 'react-controllables';
import GoogleMap from 'google-map-react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import { List } from 'immutable';

import MapMarker, { K_SCALE_NORMAL } from './MapMarker';
import { getScale, getRealFromTo } from '../calc-markers-visibility';

const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_TOP = 30;

const K_HOVER_DISTANCE = 30;

const propTypes = {
  onCenterChange: React.PropTypes.func,
  onZoomChange: React.PropTypes.func,
  onBoundsChange: React.PropTypes.func,
  onMarkerHover: React.PropTypes.func,
  onChildClick: React.PropTypes.func,
  center: React.PropTypes.any,
  zoom: React.PropTypes.number,
  markers: React.PropTypes.any,
  visibleRowFirst: React.PropTypes.number,
  visibleRowLast: React.PropTypes.number,
  maxVisibleRows: React.PropTypes.number,
  hoveredRowIndex: React.PropTypes.number,
  openBallonIndex: React.PropTypes.number,
}

const defaultProps = {
  center: new List([59.744465, 30.042834]),
  zoom: 10,
  visibleRowFirst: -1,
  visibleRowLast: -1,
  hoveredRowIndex: -1,
}

@controllable(['center', 'zoom', 'markers'])
class MapSearchBlock extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  _onBoundsChange(center, zoom, bounds, marginBounds) {
    if (this.props.onBoundsChange) {
      this.props.onBoundsChange({center, zoom, bounds, marginBounds});
    } else {
      this.props.onCenterChange(center);
      this.props.onZoomChange(zoom);
    }
  }

  _onChildClick(key, childProps) {
    const markerId = childProps.marker.get('id');
    const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    if (this.props.onChildClick) {
      this.props.onChildClick(index);
    }
  }

  _onChildMouseEnter(key, childProps) {
    const markerId = childProps.marker.get('id');
    const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    if (this.props.onMarkerHover) {
      this.props.onMarkerHover(index);
    }
  }

  _onChildMouseLeave() {
    if (this.props.onMarkerHover) {
      this.props.onMarkerHover(-1);
    }
  }

  _onBalloonCloseClick() {
    if (this.props.onChildClick) {
      this.props.onChildClick(-1);
    }
  }

  render() {
    const { rowFrom, rowTo } = getRealFromTo(this.props.visibleRowFirst, this.props.visibleRowLast, this.props.maxVisibleRows, this.props.markers.size);

    const markers = this.props.markers &&
      this.props.markers
        .filter((marker, index) => index >= rowFrom && index <= rowTo)
        .map((marker, index) => (
          <MapMarker
            key={marker.get('id')}
            lat={marker.get('lat')}
            lng={marker.get('lng')}
            showBallon={index + rowFrom === this.props.openBallonIndex}
            onCloseClick={this._onBalloonCloseClick}
            hoveredAtTable={index + rowFrom === this.props.hoveredRowIndex}
            scale={getScale(index + rowFrom, this.props.visibleRowFirst, this.props.visibleRowLast, K_SCALE_NORMAL)}
            marker={marker}
          />
        ));

    return (
      <GoogleMap
        // apiKey={null}
        center={this.props.center.toJS()}
        zoom={this.props.zoom}
        onBoundsChange={this._onBoundsChange}
        onChildClick={this._onChildClick}
        onChildMouseEnter={this._onChildMouseEnter}
        onChildMouseLeave={this._onChildMouseLeave}
        margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
        hoverDistance={K_HOVER_DISTANCE}
        // distanceToMouse={this._distanceToMouse}
      >
        {markers}
      </GoogleMap>
    );
  }
}

MapSearchBlock.propTypes = propTypes;
MapSearchBlock.defaultProps = defaultProps;

export default MapSearchBlock;
