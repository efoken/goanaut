import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux'

import MapSearchBlock from './MapSearchBlock';
import MapSearchLayout from './MapSearchLayout';
import * as allMapActions from '../map-actions';

// Slice actions to support map and grid interfaces.
const mapActions = (({ changeBounds: onBoundsChange, markerHoverIndexChange: onMarkerHover, showBallon: onChildClick }) => ({
  onBoundsChange, onMarkerHover, onChildClick
}))(allMapActions);

const gridActions = (({ tableHoveredRowIndexChange: onHoveredRowIndexChange, tableVisibleRowsChange: onVisibleRowsChange, showBallon: onRowClick }) => ({
  onHoveredRowIndexChange, onVisibleRowsChange, onRowClick
}))(allMapActions);

class MapSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  _renderMap() {
    return (
      <MapSearchBlock
        center={state.map.get('mapInfo').get('center')}
        zoom={state.map.get('mapInfo').get('zoom')}
        markers={state.map.get('dataFiltered')}
        visibleRowFirst={state.map.get('tableRowsInfo').get('visibleRowFirst')}
        visibleRowLast={state.map.get('tableRowsInfo').get('visibleRowLast')}
        maxVisibleRows={state.map.get('tableRowsInfo').get('maxVisibleRows')}
        hoveredRowIndex={state.map.get('tableRowsInfo').get('hoveredRowIndex')}
        openBallonIndex={state.map.get('openBalloonIndex')}
        {...bindActionCreators(mapActions)}
      />
    );
    /*return (
      <Connector
        select={state => ({
          center: state.map.get('mapInfo').get('center'),
          zoom: state.map.get('mapInfo').get('zoom'),
          markers: state.map.get('dataFiltered'),
          visibleRowFirst: state.map.get('tableRowsInfo').get('visibleRowFirst'),
          visibleRowLast: state.map.get('tableRowsInfo').get('visibleRowLast'),
          maxVisibleRows: state.map.get('tableRowsInfo').get('maxVisibleRows'),
          hoveredRowIndex: state.map.get('tableRowsInfo').get('hoveredRowIndex'),
          openBallonIndex: state.map.get('openBalloonIndex'),
        })}
      >
        {({dispatch, ...mapProps}) => (<MapSearchBlock {...mapProps} {...bindActionCreators(mapActions, dispatch)} />)}
      </Connector>
    );*/
  }

  _renderGrid() {
    return <div />;
    /*return (
      <Connector
        select={state => ({
          markers: state.map.get('dataFiltered'),
          hoveredMapRowIndex: state.map.get('hoverMarkerIndex'),
          resetToStartObj: state.map.get('mapInfo'),
        })}
      >
        {({dispatch, ...gridProps}) => (<div {...gridProps} {...bindActionCreators(gridActions, dispatch)} />)}
      </Connector>
    );*/
  }

  render() {
    return (
      <MapSearchLayout renderMap={this._renderMap} renderGrid={this._renderGrid} />
    );
  }
}

export default MapSearchPage;
