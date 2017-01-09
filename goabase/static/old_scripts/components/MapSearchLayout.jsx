import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import PureRenderer from './PureRenderer.jsx';

const propTypes = {
  renderMap: React.PropTypes.func,
  renderGrid: React.PropTypes.func,
};

class MapSearchLayout extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className="map-search" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: '38%', height: '100%' }}>
          <PureRenderer render={this.props.renderGrid} />
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '62%', height: '100%' }}>
          <PureRenderer render={this.props.renderMap} />
        </div>
      </div>
    );
  }
}

MapSearchLayout.propTypes = propTypes;

export default MapSearchLayout;
