/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import withRedux from 'next-redux-wrapper';
import R from 'ramda';
import initStore from '../store';
import Layout from '../components/Layout';
import { checkAuthentication } from '../reducer/modules/auth';

class Index extends React.Component {
  static async getInitialProps(ctx) {
    await ctx.store.dispatch(checkAuthentication(ctx.req));
    const state = ctx.store.getState();
    const loggedUser = state.auth.user;
    return {
      user: loggedUser,
      isAuthenticated: !!loggedUser,
    };
  }

  render() {
    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>
        <div>Iducate</div>
      </Layout>
    );
  }
}

export default withRedux(initStore)(Index);



