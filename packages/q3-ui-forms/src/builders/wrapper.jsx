import React from 'react';
import PropTypes from 'prop-types';
import BuilderState from './builderState';
import { ValidationChainFacade } from './utils';

const Wrapper = (Component) => (props) => {
  return (
    <BuilderState.Provider
      value={{
        validation: new ValidationChainFacade(),
      }}
    >
      <BuilderState.Consumer>
        {(inst) => <Component {...props} {...inst} />}
      </BuilderState.Consumer>
    </BuilderState.Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
