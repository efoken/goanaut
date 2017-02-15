import alt from '../alt';
import FavoredPartiesActions from '../actions/FavoredPartiesActions';

const defaultState = {
  wishlistedListingsIds: {},
};

class FavoredPartiesStore {
  constructor() {
    this.bindListeners({
      initialized: FavoredPartiesActions.initialized,
      listingAdded: FavoredPartiesActions.listingAdded,
      listingRemoved: FavoredPartiesActions.listingRemoved,
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
