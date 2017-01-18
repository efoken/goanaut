import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import mapReducer from '../reducers/map';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureMapStore(initialState) {
  return createStoreWithMiddleware(mapReducer, initialState);
}
