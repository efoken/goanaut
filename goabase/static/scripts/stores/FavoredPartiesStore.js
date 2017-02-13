import alt from '../alt';

const o = babelHelpers.interopRequireDefault(n(8063));

const defaultState = {
  wishlistedListingsIds: {},
};

class FavoredPartiesStore {
  constructor() {
    this.bindListeners({
      initialized: o.default.initialized,
      listingAdded: o.default.listingAdded,
      listingRemoved: o.default.listingRemoved,
    });
    this.state = Object.assign({}, defaultState);
  }

  initialized(e) {
    const t = e.wishlists;
    const wishlistedListingsIds = this.state.wishlistedListingsIds;
    const r = t.listingIds;
    Object.keys(r).filter(a => r[a] === true).forEach((a) => {
      wishlistedListingsIds[a] = true;
    });
    this.setState({ wishlistedListingsIds });
  }

  listingAdded(party) {
    const t = party.id;
    const wishlistedListingsIds = this.state.wishlistedListingsIds;
    wishlistedListingsIds[t] = true;
    this.setState({ wishlistedListingsIds });
  }

  listingRemoved(party) {
    const t = party.id;
    const n = party.selectedIds;
    if (n.length === 0) {
      const wishlistedListingsIds = this.state.wishlistedListingsIds;
      delete wishlistedListingsIds[t];
      this.setState({ wishlistedListingsIds });
    }
  }
}

export default alt.createStore(FavoredPartiesStore, 'FavoredPartiesStore');
