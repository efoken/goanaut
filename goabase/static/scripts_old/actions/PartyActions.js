import alt from '../alt';

class PartyActions {
  constructor() {
    this.generateActions('add', 'remove');
  }
}

export default alt.createActions(PartyActions);
