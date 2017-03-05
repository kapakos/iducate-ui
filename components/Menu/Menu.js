/**
 * @description
 *
 * @author pkapako
 */
import React, {PropTypes} from 'react';
import Link from 'next/link';
import { css } from 'glamor'
import { menu__item, menu__link, menu__item_index, menu__item_selected} from './styles';

export default class Menu extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string,
    })),
  };

  static defaultProps = {
    items: [],
  };

  static indexLink(item, key) {
    return (
      <li {...css(menu__item, menu__item_index)} key={key}>
        <Link href={item.link}><a {...menu__link}>{item.name}</a></Link>
      </li>
    );
  }

  static regularLink(item, key) {
    return (
      <li {...menu__item} key={key}>
        <Link href={item.link}><a {...menu__link}>{item.name}</a></Link>
      </li>
    );
  }


  renderLink(item, key) {
    const {isAuthenticated} = this.props;

    if (item.link === '/') {
      return Menu.indexLink(item, key);
    }

    if (item.name === 'Login') {
      return !isAuthenticated && Menu.regularLink(item, key);
    }
    return isAuthenticated && Menu.regularLink(item, key);
  }

  render() {
    const {items} = this.props;
    return (
      <div>
        <ul className="menu">
          { items.map((item, i) => this.renderLink(item, i)) }
        </ul>
      </div>
    );
  }
}
;