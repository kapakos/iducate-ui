/**
 * @description
 *
 * @author pkapako
 */
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

const getQueryParams = () => {
  const params = {};
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3;
  });
  return params;
};

export const extractInfoFromHash = () => {
  return new Promise((resolve, reject) => {
    if (!process.browser) {
      reject('Could not extract information from browser.');
    };
    const { id_token, state } = getQueryParams();

    if (!checkSecret(state) || !id_token) {
      reject('Something went wrong with the sign in request');
    }
    resolve(id_token);
  });
};

export const setToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!process.browser) {
      reject('Could not set token. I must run on the client');
    };
    try {
      const user = jwtDecode(token)
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('user', JSON.stringify(user));
      Cookie.set('jwt', token);
      resolve({
        token,
        user,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const unsetToken = () => {
  return new Promise((resolve, reject) => {
    try {
      if (!process.browser) {
        reject('Run in browser');
      }
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('secret');
      Cookie.remove('jwt');

      window.localStorage.setItem('logout', Date.now());
      resolve(true);
    } catch(error) {
      reject(error);
    }
  });
};

const getUserFromCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1];
  return jwtDecode(jwt);
};

const getUserFromLocalStorage = () => {
  const json = window.localStorage.user;
  return json ? JSON.parse(json) : undefined;
};

export const checkAuth = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let user = process.browser ? getUserFromLocalStorage() : getUserFromCookie(req);
      if(user) {
        resolve(user);
      } else {
        resolve(false);
      }
    } catch(error){
      reject('Can\'t read user from token');
    }
  });
};

export const setSecret = secret => window.localStorage.setItem('secret', secret);

export const checkSecret = secret => window.localStorage.secret === secret;
