/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import { unsetToken } from '../../utils/auth';
import { logout } from '../../utils/lock';

class logOut extends React.Component {
  componentDidMount() {
    unsetToken();
    logout();
  }

  render() {
    return null;
  }
}

export default logOut;
