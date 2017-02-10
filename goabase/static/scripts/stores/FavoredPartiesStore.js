var a = babelHelpers.interopRequireDefault(n(1889));
var o = babelHelpers.interopRequireDefault(n(8063));

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
    Object.keys(r).filter(e => r[e] === true).forEach(e => wishlistedListingsIds[e] = true);
    this.setState({ wishlistedListingsIds });
  }

  listingAdded(e) {
    const t = e.id;
    const wishlistedListingsIds = this.state.wishlistedListingsIds;
    wishlistedListingsIds[t] = true;
    this.setState({ wishlistedListingsIds });
  }

  listingRemoved(e) {
    const t = e.id;
    const n = e.selectedIds;
    if (n.length === 0) {
      const wishlistedListingsIds = this.state.wishlistedListingsIds;
      delete wishlistedListingsIds[t];
      this.setState({ wishlistedListingsIds });
    }
  }
}

export default a.default.createStore(FavoredPartiesStore, 'FavoredPartiesStore');
