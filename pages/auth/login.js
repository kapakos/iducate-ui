/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import { show } from '../../utils/lock';
import mainLayout from '../../hocs/page';

const CONTAINER_ID = 'login-panel';

class login extends React.Component {
  componentDidMount() {
    show(CONTAINER_ID);
  }

  render() {
    return (
      <div id={CONTAINER_ID} />
    );
  }
}

export default mainLayout(login);
