/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { contentWrapper } from '../../styles/contentWrapper';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header isAuthenticated={this.props.isAuthenticated}/>
        <div {...contentWrapper}>
          {this.props.children}
        </div>
        <Footer/>
      </div>)
  }
};
