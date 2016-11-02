import $ from 'jquery';

import * as types from '../consts/ActionTypes';

export function fetchParties() {
  return (dispatch, getState) => {
    const { currentFilters } = getState();
    dispatch(requestParties());

    return $.when($.get('/api/v1/party/?format=json'))
      .then((json) => {
        let nextUrl = null;
        let previousUrl = null;

        if (json.meta.next) {
          nextUrl = json.meta.next;
        }

        if (json.meta.previous) {
          previousUrl = json.meta.previous;
        }

        const parties = json.objects;
        dispatch(receiveSongs(parties, nextUrl, previousUrl));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function fetchParty(partyId) {
  return (dispatch) => {
    dispatch(requestParty(partyId));
    return $.when($.get(`/api/v1/party/${partyId}/?format=json`))
      .then((json) => {
        dispatch(receiveParty([json]));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function receiveParties(objects, nextUrl, previousUrl) {
  return {
    type: types.RECEIVE_PARTIES,
    nextUrl,
    previousUrl,
    objects,
  };
}

function requestParties() {
  return {
    type: types.REQUEST_PARTIES,
  };
}

export function receiveParty(objects) {
  return {
    type: types.RECEIVE_PARTY,
    objects,
  };
}

function requestParty(partyId) {
  return {
    type: types.REQUEST_PARTY,
    partyId,
  };
}
