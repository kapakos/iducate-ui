/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import withRedux from 'next-redux-wrapper';
import initStore from '../../store';
import { login } from '../../reducer/modules/auth';
import Router from 'next/router';

class LoggedIn extends React.Component {
  static async getInitialProps() {
    return {
    };
  }

  async componentDidMount() {
    await this.props.dispatch(login());
    Router.push('/dashboard');
  }

  render() {
    return null;
  }
}

export default withRedux(initStore)(LoggedIn);