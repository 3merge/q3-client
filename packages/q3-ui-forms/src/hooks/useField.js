import React from 'react';
import { get, omit, pick, uniq } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { object } from 'q3-ui-helpers';
import {
  BuilderState,
  DispatcherState,
  ValidationState,
} from '../FormsContext';
import BuilderStateDecorator from '../helpers/BuilderStateDecorator';
import usePropOverride from './usePropOverride';
import FieldDetector from '../helpers/types';
import { VALIDATION_OPTIONS } from '../helpers/validation';

const useFieldContext = (name) => {
  const { values, errors } = React.useContext(BuilderState);
  const value = get(values, name);
  let error = get(errors, name);

  // show multiple validation errors at once
  if (Array.isArray(error)) error = uniq(error).join('\\n');

  return {
    value,
    values,
    error,
    errors,
  };
};

const useFieldValue = (
  { value, name, type },
  initState,
) => {
  const requiresValue =
    // range field types are really non-stateful and just setup
    // inner fields
    value === undefined && !type.includes('range');

  React.useLayoutEffect(() => {
    if (requiresValue) initState(name, type);
  }, [requiresValue]);

  return requiresValue;
};

export default (props, readOnly) => {
  const { name, override, type, vars, label } = props;

  const { t } = useTranslation();
  const { value, values, error } = useFieldContext(name);

  const {
    setField: setFieldValidation,
    removeField: removeFieldValidation,
    hasRegistered,
  } = React.useContext(ValidationState);
  const dispatcher = React.useContext(DispatcherState);

  const {
    initFieldValue,
    removeFieldValue,
    removeFieldError,
  } = dispatcher;

  const fieldProps = new FieldDetector(
    type,
    props,
    values,
  ).build();

  const isVisible = object.hasKeys(fieldProps);

  const propper = new BuilderStateDecorator(
    name,
    {
      ...dispatcher,
      value,
      error,
    },
    readOnly,
  );

  // auto-assemble text based on field name
  propper.label = t(`labels:${label || name}`, vars);
  propper.helper = t(
    `helpers:${props.helper || name}`,
    vars,
  );

  // avoid the setter fns
  if (props.suppressLabel) propper.label = '';

  if (
    props.suppressHelper ||
    propper.helperText === 'undefined' ||
    propper.helperText === undefined
  )
    propper.helperText = '';

  const dynamicProps = usePropOverride(
    name,
    override,
    fieldProps,
  );

  const validationOptions = pick(
    dynamicProps,
    VALIDATION_OPTIONS,
  );

  const setup = () => {
    setFieldValidation(name, {
      ...props,
      ...validationOptions,
      type,
    });
  };

  const teardown = () => {
    removeFieldValidation(name);
    removeFieldValue(name);
    removeFieldError(name);
  };

  React.useLayoutEffect(() => {
    if (isVisible) {
      setup();
    } else {
      teardown();
    }

    return () => {
      teardown();
    };
  }, [
    JSON.stringify({
      ...validationOptions,
      isVisible,
    }),
  ]);

  const requiresValue = useFieldValue(
    {
      name,
      type,
      value,
    },
    initFieldValue,
  );

  return fieldProps &&
    (!requiresValue || type === 'dateRange') &&
    hasRegistered(name)
    ? {
        ...propper.get(),
        ...omit(dynamicProps, [
          'errors',
          'override',
          'suppressLabel',
          'suppressHelper',
          'helper',
          'under',
          'values',
        ]),
        value,
      }
    : null;
};
