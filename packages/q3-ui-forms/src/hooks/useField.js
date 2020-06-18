import React from 'react';
import { get, omit } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  BuilderState,
  DispatcherState,
  ValidationState,
} from '../FormsContext';
import BuilderStateDecorator from '../helpers/BuilderStateDecorator';
import usePropOverride from './usePropOverride';
import FieldDetector from '../helpers/types';

export default (props, readOnly) => {
  const { name, override, type, vars, label } = props;

  const { t } = useTranslation();
  const { values, errors } = React.useContext(BuilderState);
  const dispatcher = React.useContext(DispatcherState);
  const { setField, removeField } = React.useContext(
    ValidationState,
  );

  const value = get(values, name);
  const error = get(errors, name);

  const fieldProps = new FieldDetector(
    type,
    props,
    values,
  ).build();

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
  propper.helper = t(`helpers:${props.helper}`, vars);

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

  React.useLayoutEffect(() => {
    setField(name, props);

    return () => {
      removeField(name);
    };
  }, []);

  return fieldProps
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
