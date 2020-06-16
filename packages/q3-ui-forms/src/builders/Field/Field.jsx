import React from 'react';
import PropTypes from 'prop-types';
import FieldDetector from '../../helpers/types';
import { AuthorizationState } from '../../FormsContext';
import { useField, useListener } from '../../hooks';

const Field = (props) => {
  useListener(props);

  const { name, type, under, disabled } = props;
  const path = under ? `${under}.${name}` : name;

  const { canSee, canEdit } = React.useContext(
    AuthorizationState,
  );

  const readOnly = !canEdit(path) || Boolean(disabled);
  const attributes = useField(props, readOnly);
  const visible = canSee(path);

  return visible
    ? React.createElement(FieldDetector.is(type), {
        disabled: readOnly,
        readOnly,
        ...attributes,
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

export default Field;
