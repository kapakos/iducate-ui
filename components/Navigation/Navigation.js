/**
 * @description
 *
 * @author pkapako
 */
import React, { Component } from 'react';
import style from 'next/css';
import { layout } from '../../styles';

const styles = {
  navigation: {
    background: '#002a8b',
    height: '60px',
  },
};

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style(styles.navigation)}>
        <div className={style(layout.contentWrapper)}>
          {/* add menu here */}
          {this.props.children}
        </div>
      </div>
    );
  }
}
