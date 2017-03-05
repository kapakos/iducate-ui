/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import Head from 'next/head';
import Navigation from '../Navigation';
import Menu from '../Menu';
import { Reset, Global } from '../../styles';

const menuItems =
  [{
    name: 'Iducate',
    link: '/',
  }, {
    name: 'Logout',
    link: '/auth/logout',
  }, {
    name: 'Courses',
    link: '/courses',
  }, {
    name: 'Dashboard',
    link: '/dashboard',
  }, {
    name: 'Login',
    link: '/auth/login',
  }];

const Header = ({ isAuthenticated }) => (
  <div>
    <Head>
      <title>My page title</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no" />
      <meta property="og:title" content="Iducate" />
      <meta property="og:description" content="Take your education in your hands" />
      <meta property="og:locale" content="en-US" />
    </Head>
    <Reset />
    <Global />
    <header>
      <Navigation>
        <Menu isAuthenticated={isAuthenticated} items={menuItems} />
      </Navigation>
    </header>
  </div>
);

Header.PropsTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
};

export default Header;
