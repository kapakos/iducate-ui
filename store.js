/**
 * @description
 *
 * @author pkapako
 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';

const initStore = (initialState, isServer) => {
  if (isServer && typeof window === 'undefined') {
    return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
  }
  if (!window.store) {
    window.store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
  }
  return window.store;
};

export default initStore;
