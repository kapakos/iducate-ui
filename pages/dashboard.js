/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import withRedux from 'next-redux-wrapper';
import initStore from '../store';
import Layout from '../components/Layout';
import securePageService from '../services/server/securePageService';
import { checkAuthentication } from '../reducer/modules/auth';

class Dashboard extends React.Component {
  static async getInitialProps(ctx) {
    await ctx.store.dispatch(checkAuthentication(ctx.req));
    const state = ctx.store.getState();
    const loggedUser = state.auth.user;
    await securePageService(ctx.res, loggedUser);
    return {
      user: loggedUser,
      isAuthenticated: !!loggedUser,
    };
  }

  render() {
    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>
        <div>Dashboard</div>
      </Layout>);
  }
}

export  default withRedux(initStore)(Dashboard);
