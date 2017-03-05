/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import withRedux from 'next-redux-wrapper';
import R from 'ramda';
import initStore from '../../store';
import Layout from '../../components/Layout';
import { getUserFromCookie, getUserFromLocalStorage } from '../../services/authService';
import { loadLogin } from '../../reducer/modules/login';
import { checkAuthentication } from '../../reducer/modules/auth';

const CONTAINER_ID = 'login-panel';

class Login extends React.Component {
  static async getInitialProps(ctx) {
    await ctx.store.dispatch(checkAuthentication(ctx.req));
    const state = ctx.store.getState();
    const user = state.auth.user;
    return {
      loggedUser: user,
      isAuthenticated: !R.isNil(user),
    };
  }
  async componentDidMount() {
    if(!this.props.isAuthenticated) {
      await this.props.dispatch(loadLogin(CONTAINER_ID));
    }
  }

  render() {
    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>
        <div id={CONTAINER_ID}/>
      </Layout>
    );
  }
}

export default withRedux(initStore)(Login);
