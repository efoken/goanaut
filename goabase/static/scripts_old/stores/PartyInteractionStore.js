import React from 'react';

import alt from '../alt';
import PartyInteractionActions from '../actions/PartyInteractionActions';

export const propTypes = {
  clickedListingId: React.PropTypes.number.isRequired,
  hoveredListingId: React.PropTypes.number.isRequired,
  clickedDatelessListingId: React.PropTypes.number,
};

class PartyInteractionStore {
  constructor() {
    this.bindActions(PartyInteractionActions);
    this.clickedListingId = null;
    this.hoveredListingId = null;
    this.shouldFocusCheckin = false;
  }

  onMouseEnteredListingCard(e) {
    this.hoveredListingId = e;
  }

  onMouseLeftListingCard(e) {
    if (e === this.hoveredListingId) {
      this.hoveredListingId = null;
    }
  }

  onClickedListingCard(e) {
    this.clickedListingId = e;
  }

  onClosedListingCard() {
    this.clickedListingId = null;
  }

  onSetFocusCheckin() {
    this.shouldFocusCheckin = true;
  }

  onClearFocusCheckin() {
    this.shouldFocusCheckin = false;
  }
}

export default alt.createStore(PartyInteractionStore, 'PartyInteractionStore');
