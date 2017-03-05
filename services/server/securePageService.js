/**
 * @description
 *
 * @author pkapako
 */
import R from 'ramda';
import { getUserFromCookie, getUserFromLocalStorage } from '../authService';
import { checkAuthentication } from '../../reducer/modules/auth';

export default (res, loggedUser) => {
  if (res && !loggedUser) {
    res.writeHead(302, { Location: '/auth/login' } )
    res.end();
    return;
  }
}
