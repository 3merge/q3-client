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
  const { name, override, type } = props;

  const { t } = useTranslation();
  const { values, errors } = React.useContext(BuilderState);
  const dispatcher = React.useContext(DispatcherState);
  const { setField } = React.useContext(ValidationState);

  const fieldProps = new FieldDetector(
    type,
    props,
    values,
  ).build();

  const propper = new BuilderStateDecorator(
    name,
    dispatcher,
    readOnly,
  );

  if (!props.suppressLabel)
    propper.label = t(
      `labels:${props.label || name}`,
      props.vars,
    );

  if (!props.label)
    propper.helper = t(`helpers:${name}`, props.vars);

  if (props.helper)
    propper.helper = t(
      `helpers:${props.helper}`,
      props.vars,
    );

  if (props.suppressHelper) propper.helper = '';

  if (typeof propper.error === 'string')
    propper.helperText = propper.error;

  const dynamicProps = usePropOverride(
    name,
    override,
    fieldProps,
  );

  const value = get(values, name);
  const error = get(errors, name);

  React.useLayoutEffect(() => {
    setField(name, props);
  }, []);

  return {
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
    error,
  };
};
