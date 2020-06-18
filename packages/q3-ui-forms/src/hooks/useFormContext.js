import React from 'react';
import * as Yup from 'yup';
import flat from 'flat';
import { get, unset, set } from 'lodash';
import { object } from 'q3-ui-helpers';
import { usePreviousRef } from './usePrevious';
import ErrorResponseAdapter from '../helpers/ErrorResponseAdapter';

export const getValues = (value) =>
  Array.isArray(value)
    ? value.map((o) => get(o, 'value', o)).filter(Boolean)
    : value;

export const unsetFromPreviousState = (name) => (
  prevState,
) => {
  const copy = { ...prevState };
  unset(copy, name);
  return object.clean(flat(copy));
};

export const reduceErrorMessages = (errors = []) =>
  errors.reduce((acc, next) => {
    acc[
      next.path.replace(/\[/gi, '.').replace(/\]/gi, '')
    ] = next.message;
    return acc;
  }, {});

export const setInPreviousState = (name, errorInstance) => (
  prevState,
) => {
  const copy = { ...prevState };
  return errorInstance
    ? object.clean(
        flat(set(copy, name, errorInstance.message)),
      )
    : copy;
};

export default ({
  initialErrors = {},
  initialValues = {},
  restart = false,
  showSuccessMessage = false,
  validationSchema,
}) => {
  const [errors, setErrors] = React.useState(initialErrors);
  const [values, setValues] = React.useState(initialValues);

  // used for re-initializing form state on external data change
  const { isModified } = usePreviousRef(initialValues);

  const [message, setMessage] = React.useState();
  const [isSubmitting, setIsSubmitting] = React.useState(
    false,
  );

  const onValidate = (name, nextState) =>
    Yup.reach(validationSchema, name)
      .validate(get(nextState, name))
      .then(() => setErrors(unsetFromPreviousState(name)))
      .catch((e) => setErrors(setInPreviousState(name, e)));

  const onChange = (key, value) =>
    setValues((prev) => {
      const next = { ...prev, [key]: getValues(value) };
      onValidate(key, next);
      return next;
    });

  const onReset = React.useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const onError = React.useCallback(
    (err) => {
      const [e, msg] = ErrorResponseAdapter(err);
      if (errors) setErrors(e);
      if (msg)
        setMessage({
          error: true,
          message: msg,
        });

      return null;
    },
    [errors],
  );

  const onSuccess = React.useCallback((resp) => {
    if (resp && resp.message && showSuccessMessage) {
      setMessage({
        error: false,
        ...resp,
      });
    } else {
      setMessage(null);
    }

    return resp;
  });

  const onSubmit = (next) => (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    return validationSchema
      .validate(
        object.removeUndefinedValuesFromAllArrays(
          flat.unflatten(values),
        ),
        {
          abortEarly: false,
        },
      )
      .then(next)
      .catch((err) => {
        if (err && err.inner)
          setErrors(reduceErrorMessages(err.inner));

        return null;
      })

      .finally(() => {
        setIsSubmitting(false);
        if (restart) onReset();
      });
  };

  React.useEffect(() => {
    onReset();
  }, [isModified]);

  return {
    errors,
    isSubmitting,
    message,
    onChange,
    onError,
    onSuccess,
    onSubmit,
    onValidate,
    setErrors,
    setValues,
    values,
  };
};
