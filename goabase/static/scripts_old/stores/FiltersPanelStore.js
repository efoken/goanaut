import React from 'react';

import alt from '../alt';
import FiltersPanelActions from '../actions/FiltersPanelActions';

export const propTypes = {
  isSmallButtonVisible: React.PropTypes.bool.isRequired,
  closed: React.PropTypes.bool.isRequired,
};

const defaultState = {
  isSmallButtonVisible: true,
  closed: true,
  expanding: false,
  collapsing: false,
  activePanelId: null,
  isSmPanelVisible: false,
  isSmMapVisible: false,
  prevIsSmMapVisible: false,
};

class FiltersPanelStore {
  constructor() {
    this.bindActions(FiltersPanelActions);
    this.state = Object.assign({}, defaultState);
  }

  onSmallButtonHidden() {
    this.setState({
      isSmallButtonVisible: false,
    });
  }

  onSmallButtonShown() {
    this.setState({
      isSmallButtonVisible: true,
    });
  }

  onPanelExpanding() {
    this.setState({
      closed: true,
      expanding: true,
      isSmallButtonVisible: false,
      isSmMapVisible: false,
      prevIsSmMapVisible: this.state.isSmMapVisible,
    });
  }

  onPanelExpanded() {
    this.setState({
      closed: false,
      expanding: false,
      isSmallButtonVisible: false,
    });
  }

  onPanelCollapsing() {
    this.setState({
      closed: false,
      collapsing: true,
      isSmallButtonVisible: false,
    });
  }

  onPanelCollapsed() {
    this.setState({
      closed: true,
      collapsing: false,
      isSmallButtonVisible: true,
      isSmMapVisible: this.state.prevIsSmMapVisible,
    });
  }

  onToggleMap() {
    this.setState({
      isSmMapVisible: !this.state.isSmMapVisible,
    });
  }

  onActivePanelIdSelected(e) {
    this.setState({
      activePanelId: e,
    });
  }

  onActivePanelIdCleared() {
    this.setState({
      activePanelId: null,
    });
  }

  onSmallPanelShown() {
    this.setState({
      isSmPanelVisible: true,
      isSmallButtonVisible: false,
    });
  }

  onSmallPanelHidden() {
    this.setState({
      isSmPanelVisible: false,
      isSmallButtonVisible: true,
    });
  }
}

export default alt.createStore(FiltersPanelStore, 'FiltersPanelStore');
