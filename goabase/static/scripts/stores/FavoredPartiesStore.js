import alt from '../alt';
import FavoredPartiesActions from '../actions/FavoredPartiesActions';

const defaultState = {
  favoredPartiesIds: {},
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
    const favoredPartiesIds = this.state.favoredPartiesIds;
    const r = t.listingIds;
    Object.keys(r).filter(a => r[a] === true).forEach((a) => {
      favoredPartiesIds[a] = true;
    });
    this.setState({ favoredPartiesIds });
  }

  listingAdded(party) {
    const t = party.id;
    const favoredPartiesIds = this.state.favoredPartiesIds;
    favoredPartiesIds[t] = true;
    this.setState({ favoredPartiesIds });
  }

  listingRemoved(party) {
    const t = party.id;
    const n = party.selectedIds;
    if (n.length === 0) {
      const favoredPartiesIds = this.state.favoredPartiesIds;
      delete favoredPartiesIds[t];
      this.setState({ favoredPartiesIds });
    }
  }
}

export default alt.createStore(FavoredPartiesStore, 'FavoredPartiesStore');
