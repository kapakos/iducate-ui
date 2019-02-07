/**
 * @description
 *
 * @author pkapako
 */
import { combineReducers } from 'redux';
import courses from './modules/courses';
import login from './modules/login';
import auth from './modules/auth';

export default combineReducers({
  courses,
  login,
  auth,
});
