/**
 * @description
 *
 * @author pkapako
 */
import React, { Component } from 'react';
import style from 'next/css';
import { contentWrapper } from '../../styles/contentWrapper';
import { navigation } from './styles';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div {...navigation}>
        <div {...contentWrapper}>
          {/* add menu here */}
          {this.props.children}
        </div>
      </div>
    );
  }
}
