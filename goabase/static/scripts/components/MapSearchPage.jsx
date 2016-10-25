import React from 'react';

import MapSearchBlock from './MapSearchBlock.jsx';
import MapSearchLayout from './MapSearchLayout.jsx';

const propTypes = {
  layout: React.PropTypes.string,
};

class MapSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <MapSearchLayout layout={this.props.layout} renderMap={this._renderMap} renderTable={this._renderTable} />
    );
  }
}

MapSearchPage.propTypes = propTypes;

export default MapSearchPage;
