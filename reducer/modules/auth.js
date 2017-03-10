/**
 * @description
 *
 * @author pkapako
 */
import {
  checkAuth,
  setToken,
  extractInfoFromHash,
  unsetToken,
} from '../../services/authService';

const AUTH_CHECKING = '@@iducate/courses/AUTH_CHECKING';
const AUTH_SUCCEED = '@@iducate/courses/AUTH_SUCCEED';
const AUTH_FAILED = '@@iducate/courses/AUTH_FAILED';
const AUTH_ERROR = '@@iducate/courses/AUTH_ERROR';

const LOADING_TOKEN = '@@iducate/courses/LOADING_TOKEN';
const LOADING_TOKEN_SUCCESS = '@@iducate/courses/LOADING_TOKEN';
const LOADING_TOKEN_FAILED = '@@iducate/courses/LOADING_TOKEN_FAILED';

const LOGGING_OUT = '@@iducate/courses/LOGGING_OUT';
const LOGGED_OUT = '@@iducate/courses/LOGGED_OUT';
const LOGOUT_ERROR = '@@iducate/courses/LOGOUT_ERROR';

const UNSET_TOKEN = '@@iducate/courses/UNSET_TOKEN';

const initialState = {
  auth_checking: false,
  user: null,
  token_loading: false,
  token_loaded: false,
  token: null,
  logging_out: false,
  logged_out: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTH_CHECKING:
      return {
        ...state,
        auth_checking: true,
      };
    case AUTH_SUCCEED:
      return {
        ...state,
        auth_checking: false,
        user: action.payload,
      };
    case AUTH_FAILED:
      return {
        ...state,
        auth_checking: false,
        user: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        auth_checking: false,
        user: null,
        auth_error: action.error,
      };
    case LOADING_TOKEN:
      return {
        ...state,
        token_loading: true,
        token_loaded: false,
      };
    case LOADING_TOKEN_SUCCESS:
      return {
        ...state,
        token_loading: false,
        token_loaded: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOADING_TOKEN_FAILED:
      return {
        ...state,
        token_loading: false,
        token_loaded: false,
        token_error: action.error,
      };
    case LOGGING_OUT:
      return {
        ...state,
        logging_out: true,
      };
    case LOGGED_OUT:
      return {
        ...state,
        logging_out: false,
        logged_out: true,
        user: null,
        token: null,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        logout_error: action.error,
      };
    default:
      return state;
  }
};

function authChecking() {
  return {
    type: AUTH_CHECKING,
  };
}

function authSucceed(user) {
  return {
    type: AUTH_SUCCEED,
    payload: user,
  };
}

function authFailed() {
  return {
    type: AUTH_FAILED,
  };
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    error,
  };
}

function loadToken() {
  return {
    type: LOADING_TOKEN,
  };
}

function tokenLoaded(token, user) {
  return {
    type: LOADING_TOKEN_SUCCESS,
    payload: {
      token,
      user,
    },
  };
}

function loadTokenFailed(error) {
  return {
    type: LOADING_TOKEN_FAILED,
    error,
  };
}

function loggingOut() {
  return {
    type: LOGGING_OUT,
  };
}

function loggedOut() {
  return {
    type: LOGGED_OUT,
  };
}

function logoutError(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  };
}

export function checkAuthentication(req) {
  return (dispatch) => {
    dispatch(authChecking());
    return checkAuth(req)
      .then((user) => {
        if (user) {
          dispatch(authSucceed(user));
        } else {
          dispatch(authFailed());
        }
      })
      .catch((error) => {
        dispatch(authError(error));
      });
  };
}

export function login() {
  return (dispatch) => {
    dispatch(loadToken());
    return extractInfoFromHash()
      .then(setToken)
      .then(({
        token,
        user,
      }) => {
        if (token && user) {
          dispatch(tokenLoaded(token, user));
        } else {
          dispatch(loadTokenFailed('Token or User not available'));
        }
      })
      .catch((error) => {
        dispatch(loadTokenFailed(error));
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(loggingOut());
    return unsetToken()
      .then((loggedout) => {
        if (loggedout) {
          dispatch(loggedOut());
        }
      })
      .catch((error) => {
        dispatch(logoutError(error));
      });
  };
}
