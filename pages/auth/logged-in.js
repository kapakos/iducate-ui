/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import { setToken, checkSecret, extractInfoFromHash } from '../../utils/auth';

export default class extends React.Component {
  static propTypes = {
    url: React.PropTypes.shape({
      pushTo: React.PropTypes.func.isRequired,
    }),
  };

  static defaultProps = {
    url: {},
  };

  componentDidMount() {
    const { token, secret } = extractInfoFromHash();
    const { url } = this.props;
    if (!checkSecret(secret) || !token) {
      console.error('Something went wrong with the sign in request');
    }
    setToken(token);
    url.pushTo('/dashboard');
  }

  render() {
    return null;
  }
}
