/**
 * @description
 *
 * @author pkapako
 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer';

const initStore = initialState => (
  createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware)));

export default initStore;
