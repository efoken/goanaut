/* global babelHelpers, gettext, n */
/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';

const d = babelHelpers.interopRequireDefault(n(6062));

const propTypes = {
  autoRefresh: React.PropTypes.bool,
  className: React.PropTypes.string,
  readyToRefresh: React.PropTypes.bool,
  onClickRefresh: React.PropTypes.func,
  onToggleAutoRefresh: React.PropTypes.func,
  shouldSmallMapAutoRefresh: React.PropTypes.bool,
};

const defaultProps = {
  autoRefresh: false,
  className: '',
  readyToRefresh: false,
  onClickRefresh: () => {},
  onToggleAutoRefresh: () => {},
  shouldSmallMapAutoRefresh: false,
};

function RefreshControls({
  autoRefresh,
  className,
  readyToRefresh,
  onClickRefresh,
  onToggleAutoRefresh,
  shouldSmallMapAutoRefresh,
}) {
  return (
    <div className={classNames('map-refresh-controls', className)}>
      <button
        className={classNames('map-manual-refresh btn btn-primary', {
          hide: autoRefresh || !readyToRefresh,
        })}
        onClick={onClickRefresh}
      >
        {gettext('Redo search here')}
        <i className="icon icon-refresh icon-space-left" />
      </button>
      <div
        className={classNames('map-auto-refresh panel', {
          hide: (!autoRefresh && readyToRefresh) || ((0, d.default)() && !shouldSmallMapAutoRefresh),
        })}
      >
        <label className="checkbox" htmlFor="map-auto-refresh-checkbox">
          <input
            type="checkbox"
            className="map-auto-refresh-checkbox"
            id="map-auto-refresh-checkbox"
            checked={autoRefresh}
            onChange={onToggleAutoRefresh}
          />
          <small>
            {gettext('Search when I move the map')}
          </small>
        </label>
      </div>
    </div>
  );
}

RefreshControls.propTypes = propTypes;
RefreshControls.defaultProps = defaultProps;

export default RefreshControls;
