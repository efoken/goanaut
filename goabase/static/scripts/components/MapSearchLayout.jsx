import React, { PropTypes } from 'react/addons';
import shallowCompare from 'react-addons-shallow-compare';

import PureRenderer from './PureRenderer.jsx';

export default class MapSearchLayout extends React.Component {
  static propTypes = {
    renderMap: PropTypes.func,
    renderTable: PropTypes.func,
    layout: PropTypes.string,
  };

  static defaultProps = {
    layout: 'left',
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div class="map-search" style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: '38%', height: '100%'}}>
          <PureRenderer render={this.props.renderTable} />
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: '62%', height: '100%'}}>
          <PureRenderer render={this.props.renderMap} />
        </div>
      </div>
    );
  }
}
