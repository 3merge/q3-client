import React from 'react';
import PropTypes from 'prop-types';
import FieldDetector from '../../helpers/types';
import {
  useField,
  useFieldAuthorization,
  useListener,
} from '../../hooks';

const FieldBridge = (props) => {
  const { readOnly, type } = props;
  const attributes = useField(props, readOnly);

  // intended to clear input values when another field changes
  // useful for conditional
  useListener(props);

  return attributes
    ? React.createElement(FieldDetector.is(type), {
        ...props,
        ...attributes,
      })
    : null;
};

FieldBridge.propTypes = {
  readOnly: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

FieldBridge.defaultProps = {
  readOnly: false,
};

const Field = (props) => {
  const fieldAuthState = useFieldAuthorization(props);
  const { readOnly, visible } = fieldAuthState;

  return visible
    ? React.createElement(FieldBridge, {
        ...props,
        disabled: readOnly,
        readOnly,
      })
    : null;
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  override: PropTypes.func,
  under: PropTypes.string,
};

Field.defaultProps = {
  override: null,
  under: null,
  type: 'text',
};

export default React.memo(Field);
