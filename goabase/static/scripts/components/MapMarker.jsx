import controllable from 'react-controllables';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

const K_SCALE_HOVER = 1;
const K_SCALE_NORMAL = 0.65;
const K_SCALE_TABLE_HOVER = 1;

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

    // CSS hints library https://github.com/istarkov/html-hint
    return (
      <div></div>
    );
  }
}

MapMarker.propTypes = propTypes;
MapMarker.defaultProps = defaultProps;

export default MapMarker;
