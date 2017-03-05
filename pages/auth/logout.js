/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import withRedux from 'next-redux-wrapper';
import initStore from '../../store';
import { authLogout } from '../../services/client/authLockService';
import { logout } from '../../reducer/modules/auth';

class Logout extends React.Component {
  async componentDidMount() {
    await this.props.dispatch(logout());
    authLogout();
  }

  render() {
    return null;
  }
}

export default withRedux(initStore)(Logout);
