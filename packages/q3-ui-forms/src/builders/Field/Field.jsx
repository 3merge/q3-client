import React from 'react';
import PropTypes from 'prop-types';
import FieldDetector from '../../helpers/types';
import { AuthorizationState } from '../../FormsContext';
import { useField, useListener } from '../../hooks';

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
  const { name, type, under, disabled } = props;
  const path = under ? `${under}.${name}` : name;

  const { canSee, canEdit } = React.useContext(
    AuthorizationState,
  );

  const readOnly = !canEdit(path) || Boolean(disabled);
  const visible = canSee(path);

  return visible
    ? React.createElement(FieldBridge, {
        ...props,
        disabled: readOnly,
        readOnly,
        type,
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
