import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
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
  const overrideRef = React.useRef(props?.override);
  const { name, type, under, disabled } = props;
  const path = under ? `${under}.${name}` : name;

  const { canSee, canEdit, isDynamic } = React.useContext(
    AuthorizationState,
  );

  const isDisabled = () =>
    !canEdit(path) || Boolean(disabled);

  const [readOnly, setReadOnly] = React.useState(
    isDisabled(),
  );

  if (isDynamic(path))
    overrideRef.current = (...params) => {
      const applicationSettings = isFunction(
        props?.override,
      )
        ? props?.override(...params)
        : {};

      const newDisabledState = isDisabled();
      const shouldUpdate = readOnly !== newDisabledState;
      const [, ctx] = params;

      if (
        shouldUpdate &&
        newDisabledState &&
        isFunction(ctx.resetFieldValue)
      )
        setImmediate(() => {
          ctx.resetFieldValue(name);
        });

      if (shouldUpdate) setReadOnly(newDisabledState);
      return applicationSettings;
    };

  return canSee(path)
    ? React.createElement(FieldBridge, {
        ...props,
        override: overrideRef.current,
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
