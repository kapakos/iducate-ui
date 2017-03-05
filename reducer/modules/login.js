/**
 * @description
 *
 * @author pkapako
 */
import { showLoginPanel } from '../../services/client/authLockService';

const LOAD_LOGIN = '@@iducate/auth/LOAD_LOGIN';
const LOAD_LOGIN_SUCCESS = '@@iducate/auth/LOAD_LOGIN_SUCCESS';
const LOAD_LOGIN_FAILED = '@@iducate/auth/LOAD_LOGIN_FAILED';

const initialState = {
  loaded: false,
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOAD_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case LOAD_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
};

function loadLoginPanel() {
  return {
    type: LOAD_LOGIN,
  }
}

function loginPanelLoaded() {
  return {
    type: LOAD_LOGIN_SUCCESS,
  }
}

function oginPanelLoadingFailed() {
  return {
    type: LOAD_LOGIN_FAILED,
  }
}

export function loadLogin(containerId) {
  return (dispatch) => {
    dispatch(loadLoginPanel());
    return showLoginPanel(containerId)
      .then(() => {
        dispatch(loginPanelLoaded());
      })
      .catch(error => {
        dispatch(oginPanelLoadingFailed());
      })
  }
}
