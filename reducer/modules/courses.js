/**
 * @description
 *
 * @author pkapako
 */
export const LOADING_COURSES = '@@iducate/courses/LOADING_COURSES';
export const LOADING_COURSES_SUCCESS = '@@iducate/courses/LOADING_COURSES_SUCCESS';
export const LOADING_COURSES_FAILED = '@@iducate/courses/LOADING_COURSES_FAILED';

export const ADDING_COURSE = '@@iducate/courses/ADDING_COURSE';
export const COURSE_ADDED = '@@iducate/courses/COURSE_ADDED';
export const ADDING_COURSE_FAILED = '@@iducate/courses/ADDING_COURSE_FAILED';

export const DELETING_COURSE = '@@iducate/courses/DELETING_COURSE';
export const COURSE_DELETED = '@@iducate/courses/COURSE_DELETED';
export const DELETING_COURSE_FAILED = '@@iducate/courses/DELETING_COURSE_FAILED';

const initialState = {
  loaded: false,
};

const courses = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOADING_COURSES:
      return {
        ...state,
        loading: true,
        loading_error: undefined,
      };
    case LOADING_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        stale: false,
        courses: action.result,
      };
    case LOADING_COURSES_FAILED:
      return {
        ...state,
        loading: false,
        loading_error: action.error,
      };
    case ADDING_COURSE:
      return {
        ...state,
        adding: true,
      };
    case COURSE_ADDED:
      return {
        ...state,
        adding: false,
        stale: true,
      };
    case ADDING_COURSE_FAILED:
      return {
        ...state,
        adding: false,
        adding_error: action.error,
      };
    case DELETING_COURSE:
      return {
        ...state,
        deleting: true,
      };
    case COURSE_DELETED:
      return {
        ...state,
        deleting: false,
        stale: true,
      };
    case DELETING_COURSE_FAILED:
      return {
        ...state,
        deleting: false,
        deleting_error: action.error,
      };
    default:
      return state;

  }
};

export default courses;
