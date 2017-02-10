import React from 'react';

var a = babelHelpers.interopRequireDefault(n(1889));
var s = babelHelpers.interopRequireDefault(n(1890));

export const propTypes = {
  clickedListingId: React.PropTypes.number.isRequired,
  hoveredListingId: React.PropTypes.number.isRequired,
  clickedDatelessListingId: React.PropTypes.number,
};

class PartyInteractionStore {
  constructor() {
    this.bindActions(s.default);
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

export default a.default.createStore(PartyInteractionStore, 'PartyInteractionStore');
