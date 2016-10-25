import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import PureRenderer from './PureRenderer.jsx';

const propTypes = {
  renderMap: React.PropTypes.func,
  renderTable: React.PropTypes.func,
  layout: React.PropTypes.string,
};

const defaultProps = {
  layout: 'left',
};

class MapSearchLayout extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div class="map-search" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: '38%', height: '100%' }}>
          <PureRenderer render={this.props.renderTable} />
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '62%', height: '100%' }}>
          <PureRenderer render={this.props.renderMap} />
        </div>
      </div>
    );
  }
}

MapSearchLayout.propTypes = propTypes;
MapSearchLayout.defaultProps = defaultProps;

export default MapSearchLayout;
