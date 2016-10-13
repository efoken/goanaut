import React from 'react';

import MapSearchLayout from './MapSearchLayout.jsx';

export default class MapSearchPage extends React.Component {
  static propTypes = {
    layout: React.PropTypes.string,
  };

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
