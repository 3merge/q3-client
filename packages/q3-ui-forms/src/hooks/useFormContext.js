import React from 'react';
import * as Yup from 'yup';
import flat from 'flat';
import { get, unset, set, setWith } from 'lodash';
import { object } from 'q3-ui-helpers';
import { usePreviousRef } from './usePrevious';

const checkMsgFieldVariants = (v) => {
  const missing =
    !v.msg || v.msg === undefined || v.msg === 'undefined';

  if (missing && !v.message)
    return get(
      v,
      'properties.message',
      'Server validation failed',
    );

  if (missing && v.message) return v.message;
  return v.msg;
};

const extractMsg = (v) =>
  typeof v === 'object' ? checkMsgFieldVariants(v) : v;

const hasErrors = (err) =>
  err || get(err, 'data.errors') || get(err, 'errors');

const mapErrors = (errors) =>
  Object.entries(errors).reduce(
    (acc, [key, value]) =>
      setWith(acc, key, extractMsg(value)),
    {},
  );

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
    acc[next.path] = next.message;
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

const extractErrors = (err) => {
  const { errors = {} } = err.data || err;
  return errors;
};

export default ({
  initialErrors = {},
  initialValues = {},
  restart = false,
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
      .then(() => {
        setErrors(unsetFromPreviousState(name));
      })
      .catch((e) => {
        setErrors(setInPreviousState(name, e));
      });

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

  const onSubmit = (next) => (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    return validationSchema
      .validate(values, {
        abortEarly: false,
      })
      .then(() => next(values))
      .then((resp) => {
        if (resp && resp.message) {
          setMessage({
            error: false,
            ...resp,
          });
        } else {
          setMessage(null);
        }

        return resp;
      })
      .catch((err) => {
        if (err) {
          if (hasErrors(err)) {
            setErrors(mapErrors(extractErrors(err)));
          } else if (err.inner) {
            setErrors(reduceErrorMessages(err.inner));
          }

          if (err.message)
            setMessage({
              error: true,
              ...err,
            });
        }

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
    onSubmit,
    onValidate,
    setErrors,
    setValues,
    values,
  };
};
