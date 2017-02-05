/**
 * @description
 *
 * @author pkapako
 */
import React, { PropTypes } from 'react';

import NotAuthorized from '../components/NotAuthorized';
import defaultPage from './page';

const securePageHoc = Page => class SecurePage extends React.Component {
  static getInitialProps(ctx) {
    return Page.getInitialProps && Page.getInitialProps(ctx);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    console.log('Secure Page');
    if (!this.props.isAuthenticated) {
      return <NotAuthorized />;
    }
    return <Page {...this.props} />;
  }
};

export default Page => defaultPage(securePageHoc(Page));
