// @flow
import alt from '../alt';

class PartyStore {
  parties: Array<any>;

  constructor() {
    this.bindActions(PartyActions);
    this.parties = [];
  }

  onAdd(party: any): void {
    this.parties.unshift(party);
  }

  onRemove(index: number): void {
    this.parties.splice(index, 1);
  }
}

export default alt.createStore(PartyStore, 'PartyStore');
