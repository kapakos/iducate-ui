/**
 * @description
 *
 * @author pkapako
 */
import uuid from 'uuid';
import { setSecret } from '../authService';

const getLock = (options) => {
  const config = require('../../config/config');
  const Auth0Lock = require('auth0-lock').default;
  return new Promise((resolve, reject) => {
    try {
      const lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN, options);
      resolve(lock);
    } catch (error) {
      reject(error);
    }
  });
};

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;
const getLogoutUrl = () => `https://iducate.auth0.com/v2/logout?returnTo=${encodeURI(getBaseUrl())}`;

const getOptions = (container) => {
  const secret = uuid.v4();
  setSecret(secret);
  return {
    container,
    closable: false,
    auth: {
      responseType: 'token',
      redirectUrl: `${getBaseUrl()}/auth/logged-in`,
      params: {
        scope: 'openid profile email',
        state: secret,
      },
    },
    theme: {
      authButtons: {
        testConnection: {
          displayName: 'Test Conn',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000',
          icon: 'http://example.com/icon.png',
        },
        testConnection2: {
          primaryColor: '#000000',
          foregroundColor: '#ffffff',
        },
      },
      labeledSubmitButton: false,
      logo: 'http://www.werkstattmedien.com/wp-content/uploads/werkstatt_logo.png',
      primaryColor: '#002a8b',
    },
    languageDictionary: {
      emailInputPlaceholder: 'your@email.com',
      title: '',
    },
  };
};

export const showLoginPanel = container => getLock(getOptions(container))
  .then(lock => lock.show());
export const authLogout = () => {
  window.location.href = getLogoutUrl();
};
