/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import style from 'next/css';
import { Provider } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { layout } from '../styles';
import { getUserFromLocalStorage, getUserFromCookie } from '../utils/auth';
import initStore from '../store';

const initialState = {};

const layoutHoc = Page => class DefaultPage extends React.Component {
  static getInitialProps(ctx) {
    const isServer = !!ctx.req;
    const store = initStore(initialState, true);
    const loggedUser = process.browser ? getUserFromLocalStorage() : getUserFromCookie(ctx.req);
    const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
    console.log('this is the logged user: ', !!loggedUser);
    return {
      ...pageProps,
      loggedUser,
      isServer,
      initialState: store.getState(),
      currentUrl: ctx.pathname,
      isAuthenticated: !!loggedUser,
    };
  }

  static propTypes = {
    url: React.PropTypes.shape({
      pushTo: React.PropTypes.func.isRequired,
    }),
  };

  static defaultProps = {
    url: {},
  };

  constructor(props) {
    super(props);
    this.store = initStore(props.initialState, props.isServer);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    if (event.key === 'logout') {
      this.props.url.pushTo(`/?logout=${event.newValue}`);
    }
  }

  componentDidMount() {
    window.addEventListener('storage', this.logout, false);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.logout, false);
  }

  render() {
    console.log('Default Page');
    const { isAuthenticated } = this.props;
    console.log('thos is the isAUthenticated flad passed to header: ', isAuthenticated);
    return (
      <Provider store={this.store}>
        <div>
          <Header isAuthenticated={isAuthenticated} />
          <div className={style(layout.contentWrapper)}>
            <Page {...this.props} />
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
};

export default Page => layoutHoc(Page);

