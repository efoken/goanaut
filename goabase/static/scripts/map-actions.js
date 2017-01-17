import $ from 'jquery';
import { memoize, serialize } from 'async-decorators';

import { QUERY_MAP, TABLE_VISIBLE_ROWS_CHANGE_MAP, CHANGE_BOUNDS_MAP, TABLE_HOVERED_ROWS_INDEX_CHANGE_MAP, MARKER_HOVER_INDEX_CHANGE_MAP, SHOW_BALLON_MAP } from './consts/map-actions-types';

const asyncActions = {
  @serialize({ raiseSkipError: false })
  @memoize({ expireMs: 1000 * 60 * 15 })
  async query(params) {
    console.log(params);
    return await $.getJSON('http://localhost:8000/api/v1/party/?format=json');
  },

  @serialize({ raiseSkipError: false })
  async tableVisibleRowsChange({ visibleRowFirst, visibleRowLast, maxVisibleRows }) {
    console.log(visibleRowFirst, visibleRowLast, maxVisibleRows);
    return await $.getJSON('http://localhost:8000/api/v1/party/?format=json');
  },
};

export function query(params) {
  return {
    types: [null, QUERY_MAP, null],
    promise:
      asyncActions
        .query(params)
        .then(data => ({ markersData: data })),
  };
}

export function changeBounds({ center, zoom, bounds, marginBounds }) {
  return {
    type: CHANGE_BOUNDS_MAP,
    center,
    zoom,
    bounds,
    marginBounds,
  };
}

export function tableVisibleRowsChange(params) {
  return {
    types: [null, TABLE_VISIBLE_ROWS_CHANGE_MAP, null],
    promise: asyncActions.tableVisibleRowsChange(params),
  };
}

export function tableHoveredRowIndexChange(hoveredRowIndex) {
  return {
    type: TABLE_HOVERED_ROWS_INDEX_CHANGE_MAP,
    hoveredRowIndex,
  };
}

export function markerHoverIndexChange(hoverMarkerIndex) {
  return {
    type: MARKER_HOVER_INDEX_CHANGE_MAP,
    hoverMarkerIndex,
  };
}

export function showBallon(openBalloonIndex) {
  return {
    type: SHOW_BALLON_MAP,
    openBalloonIndex,
  };
}
