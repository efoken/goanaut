/* global babelHelpers, n */
/* eslint-disable max-len, no-underscore-dangle */
import React from 'react';

import alt from '../alt';
import ForSearchResultsProps from '../props/ForSearchResultsProps';
import HostOwnPartyActions from '../actions/HostOwnPartyActions';
import HostPartyStatusTypes from '../consts/HostPartyStatusTypes';

const o = babelHelpers.interopRequireDefault(n(14));
const s = babelHelpers.interopRequireDefault(n(31));

export const propTypes = {
  isHostOwnListingBannerReady: React.PropTypes.bool.isRequired,
  isConflictWithOtherBanners: React.PropTypes.bool.isRequired,
  hostListingStatusType: React.PropTypes.number.isRequired,
  hostId: React.PropTypes.number.isRequired,
  hostListings: React.PropTypes.arrayOf(ForSearchResultsProps).isRequired,
  hostOwnListingId: React.PropTypes.number.isRequired,
};

class HostOwnPartyStore {
  constructor() {
    this.isHostOwnListingBannerReady = false;
    this.isConflictWithOtherBanners = false;
    this.hostId = null;
    this.hostListings = null;
    this.hostListingStatusType = null;
    this.hostOwnListingId = null;
    this.matchedListingHasCompareView = null;
    this.bindActions(HostOwnPartyActions);
  }

  onGotHostListingInfoSuccess(e) {
    this.hostListings = e.listings;
    this._getHostListingStatusType(e.searchStates);
  }

  onUpdatedWithSearchStates(e) {
    this.hostId = o.default.current().id;
    if (this.hostId) {
      this._checkConflict(e);
      if (this.hostListings) {
        this._getHostListingStatusType(e);
      } else {
        Promise.resolve(s.default.get('/v2/listings', null, {
          _format: 'for_host_find_own_listings',
          user_id: this.hostId,
          has_availability: false,
        })).then((t) => {
          HostOwnPartyActions.gotHostListingInfoSuccess({
            listings: t.listings,
            searchStates: e,
          });
        });
      }
    } else {
      this.hostListingStatusType = HostPartyStatusTypes.HOST_ID_NOT_FOUND;
    }
  }

  _getHostListingStatusType(e) {
    const t = e.searchFilters;
    const n = e.metadata;
    const r = this.hostListings.filter(p =>
      n.location.canonical_location.startsWith(p.city) || p.public_address.includes(n.location.display_location));
    this.matchedListingHasCompareView = r.find(p => p.has_compare_listings);
    if (!(t.source !== 'bb' && t.search_by_map)) {
      if (this.matchedListingHasCompareView !== null && this.matchedListingHasCompareView !== undefined) {
        this.hostListingStatusType = HostPartyStatusTypes.HOST_LISTING_HAS_COMPARE_VIEW;
        this.isHostOwnListingBannerReady = true;
        this.hostOwnListingId = this.matchedListingHasCompareView.id;
      } else {
        this.hostListingStatusType = HostPartyStatusTypes.OTHER;
        this.isHostOwnListingBannerReady = false;
        this.hostOwnListingId = null;
      }
    }
  }

  _checkConflict() {
    this.isConflictWithOtherBanners = false;
  }
}

export default alt.createStore(HostOwnPartyStore, 'HostOwnPartyStore');
