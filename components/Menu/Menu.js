/**
 * @description
 *
 * @author pkapako
 */
import React, { PropTypes } from 'react';
import Link from 'next/link';
import style, { merge } from 'next/css';

const styles = {
  menu__item: {
    float: 'right',
    padding: '20px',
  },

  menu__link: {
    textDecoration: 'none',
    color: 'white',
  },

  menu__item_index: {
    float: 'left',
    paddingLeft: '0',
  },

  menu__item_selected: {
    color: '#0b97c4',
  },
};

export default class Menu extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf( PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string,
    })),
  };

  static indexLink(item, key) {
    return (
      <li className={(merge(style(styles.menu__item), style(styles.menu__item_index)))} key={key}>
        <Link href={item.link}><a className={style(styles.menu__link)}>{item.name}</a></Link>
      </li>
    );
  }

  static regularLink(item, key) {
    return (
      <li className={style(styles.menu__item)} key={key}>
        <Link href={item.link}><a className={style(styles.menu__link)}>{item.name}</a></Link>
      </li>
    );
  }


  renderLink(item, key) {
    const { isAuthenticated } = this.props;

    if (item.link === '/') {
      return Menu.indexLink(item, key);
    }

    if(item.name === 'Login') {
      return !isAuthenticated && Menu.regularLink(item, key);
    }
    return isAuthenticated && Menu.regularLink(item, key);
  }

  render() {
    const { items } = this.props;
    return (
      <ul className="menu">
        { items.map((item, i) => this.renderLink(item, i)) }
      </ul>
    );
  }
}
