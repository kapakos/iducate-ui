/**
 * @description
 *
 * @author pkapako
 */
import { getUdacityCourses } from '../../services/server/coursesService';

const LOADING_COURSES = '@@iducate/courses/LOADING_COURSES';
const LOADING_COURSES_SUCCESS = '@@iducate/courses/LOADING_COURSES_SUCCESS';
const LOADING_COURSES_FAILED = '@@iducate/courses/LOADING_COURSES_FAILED';

const initialState = {
  loaded: false,
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOADING_COURSES:
      return {
        ...state,
        loading: true,
        loading_error: null,
      };
    case LOADING_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        stale: false,
        data: action.payload,
      };
    case LOADING_COURSES_FAILED:
      return {
        ...state,
        loading: false,
        loading_error: action.error,
      };
    default:
      return state;

  }
};

function loadCourses() {
  return { type: LOADING_COURSES };
}

function coursesLoaded(courses) {
  return { type: LOADING_COURSES_SUCCESS, payload: courses };
}

function coursesFailed(error) {
  return { type: LOADING_COURSES_FAILED, error };
}

export function loadUdacityCourses() {
  return (dispatch) => {
    dispatch(loadCourses());
    return getUdacityCourses()
      .then((response) => {
        dispatch(coursesLoaded(response));
      })
      .catch(error => {
        dispatch(coursesFailed(error));
      });
  };
}
