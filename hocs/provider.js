/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import { Provider } from 'react-redux';
import initStore from '../store';

const initialState = {};
const store = initStore(initialState, true);

export default (Wrapper) => {
  const wrapperProps = Object.keys(Wrapper.propTypes);

  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (<Provider store={store}>
        <div>
          {console.log('Provider')}
          <Wrapper {...this.props} {...wrapperProps} />
        </div>
      </Provider>);
    }
  };
};
