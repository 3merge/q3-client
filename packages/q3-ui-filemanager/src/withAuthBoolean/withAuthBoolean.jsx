import React from 'react';
import { get } from 'lodash';
import FileManagerAuthContext from '../FileManagerAuthContext';

const withAuthBoolean = (Component, authProperty) => {
  const ProtectedComponent = (props) =>
    get(
      React.useContext(FileManagerAuthContext),
      authProperty,
      false,
    ) ? (
      <Component {...props} />
    ) : null;

  ProtectedComponent.defaultProps = {};
  ProtectedComponent.propTypes = {};

  return ProtectedComponent;
};

export default withAuthBoolean;
