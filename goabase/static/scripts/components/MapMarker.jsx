import controllable from 'react-controllables';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import { getMarkerHolderStyle, getMarkerStyle, getMarkerTextStyle } from '../marker-styles';

const K_HINT_HTML_DEFAULT_Z_INDEX = 1000000;

const K_SCALE_HOVER = 1;
const K_SCALE_NORMAL = 0.65;
const K_SCALE_TABLE_HOVER = 1;

const K_MIN_CONTRAST = 0.4;

const K_MAX_COLOR_VALUE = 0;
const K_MIN_COLOR_VALUE = 8;

function calcMarkerMarkerStyle(scale, zIndexStyle, markerStyle, imageStyle) {
  const contrast = K_MIN_CONTRAST + (1 - K_MIN_CONTRAST) * Math.min(scale / K_SCALE_NORMAL, 1);
  return {
    transform: `scale(${scale} , ${scale})`,
    filter: `contrast(${contrast})`,
    ...markerStyle,
    ...zIndexStyle,
    ...imageStyle,
  };
}

function calcMarkerTextStyle(scale, markerTextStyle) {
  const colorV = Math.ceil(K_MIN_COLOR_VALUE + (K_MAX_COLOR_VALUE - K_MIN_COLOR_VALUE) * Math.min(scale / K_SCALE_NORMAL, 1));
  const colorHex = colorV.toString(16);
  const colorHTML = `#${colorHex}${colorHex}${colorHex}`;
  return {
    ...markerTextStyle,
    color: colorHTML,
  };
}

export { K_SCALE_NORMAL };

const propTypes = {
  $hover: React.PropTypes.bool,
  $dimensionKey: React.PropTypes.any,
  $getDimensions: React.PropTypes.func,
  $geoService: React.PropTypes.any,
  $onMouseAllow: React.PropTypes.func,

  marker: React.PropTypes.any,
  hoveredAtTable: React.PropTypes.bool,
  scale: React.PropTypes.number,
  showBallon: React.PropTypes.bool,
  onCloseClick: React.PropTypes.func,
  showBallonState: React.PropTypes.bool.isRequired,
  onShowBallonStateChange: React.PropTypes.func.isRequired,

  // animation helpers
  hoverState: React.PropTypes.bool.isRequired,
  onHoverStateChange: React.PropTypes.func.isRequired,

  size: React.PropTypes.any,
  origin: React.PropTypes.any,
  imageClass: React.PropTypes.string,
  image: React.PropTypes.string,
  withText: React.PropTypes.bool,
  hintType: React.PropTypes.string,
};

const defaultProps = {
  scale: K_SCALE_NORMAL,
  hoverState: false,
  showBallonState: false,
  withText: false,
  size: { width: 62, height: 60 },
  origin: { x: 15 / 62, y: 1 },
  imageClass: 'map-marker__marker--big',
  hintType: 'hint--info',
};

@controllable(['hoverState', 'showBallonState'])
class MapMarker extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.alive = true;
  }

  componentDidUpdate(prevProps) {
    const K_TRANS_DELAY = 30;

    if (prevProps.$hover !== this.props.$hover) {
      setTimeout(() => this._onHoverStateChange(this.props.$hover), K_TRANS_DELAY);
    }

    if (prevProps.showBallon !== this.props.showBallon) {
      setTimeout(() => this._onShowBallonStateChange(this.props.showBallon), K_TRANS_DELAY);
    }
  }

  componentWillUnmount() {
    this.alive = false;
  }

  _onShowBallonStateChange(...args) {
    if (!this.alive) {
      return;
    }
    this.props.onShowBallonStateChange(...args);
  }

  _onHoverStateChange(...args) {
    if (!this.alive) {
      return;
    }
    this.props.onHoverStateChange(...args);
  }

  _onMouseEnterContent() {
    this.props.$onMouseAllow(false); // disable mouse move hovers
  }

  _onMouseLeaveContent() {
    this.props.$onMouseAllow(true); // enable mouse move hovers
  }

  _onCloseClick() {
    if (this.props.onCloseClick) {
      this.props.onCloseClick();
    }
  }

  render() {
    let scale = this.props.$hover || this.props.showBallon ? K_SCALE_HOVER : this.props.scale;
    scale = this.props.hoveredAtTable ? K_SCALE_TABLE_HOVER : scale;

    const markerHolderStyle = getMarkerHolderStyle(this.props.size, this.props.origin);
    const markerStyle = getMarkerStyle(this.props.size, this.props.origin);

    const zIndexStyle = {
      zIndex: Math.round(scale * 10000) - (this.props.showBallon ? 20 : 0) + (this.props.$hover ? K_HINT_HTML_DEFAULT_Z_INDEX : 0),
    };

    const textStyleDef = getMarkerTextStyle();
    const textStyle = calcMarkerTextStyle(scale, textStyleDef);

    const showHint = this.props.hoverState || this.props.showBallonState;

    // Set balloon position at first and then animate (it must be some lib for React animations)
    const noTransClass = this.props.$hover === true && this.props.hoverState !== true ? 'hint--notrans' : '';
    const noTransBalloonClass = this.props.showBallon === true && this.props.showBallonState !== true ? 'hint--notrans' : '';

    const imageClass = this.props.image ? '' : this.props.imageClass;
    const imageStyle = this.props.image ? { backgroundImage: `url(${this.props.image})` } : null;

    const styleMarkerMarker = calcMarkerMarkerStyle(scale, zIndexStyle, markerStyle, imageStyle);

    // CSS hints library https://github.com/istarkov/html-hint
    return (
      <div
        style={markerHolderStyle}
        className={['map-marker hint hint--html',
          this.props.hintType,
          noTransClass, noTransBalloonClass,
          this.props.showBallon ? 'hint--balloon' : '',
          showHint ? 'hint--always' : 'hint--hidden',
        ].join(' ')}
      >
        <div style={styleMarkerMarker} className={`map-marker__marker ${imageClass}`}>
          {this.props.withText ?
            <div style={textStyle}>
              {this.props.marker.get('number')}
            </div>
            :
            <div />}
        </div>
      </div>
    );
  }
}

MapMarker.propTypes = propTypes;
MapMarker.defaultProps = defaultProps;

export default MapMarker;
