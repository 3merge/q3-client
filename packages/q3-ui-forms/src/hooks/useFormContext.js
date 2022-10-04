import React from 'react';
import * as Yup from 'yup';
import flat from 'flat';
import { get } from 'lodash';
import { object } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import ErrorResponseAdapter from '../helpers/ErrorResponseAdapter';

export const getValues = (value) =>
  Array.isArray(value)
    ? value.map((o) => get(o, 'value', o)).filter(Boolean)
    : value;

export const reduceErrorMessages = (errors = []) =>
  errors.reduce((acc, next) => {
    acc[
      next.path.replace(/\[/gi, '.').replace(/\]/gi, '')
    ] = next.message;
    return acc;
  }, {});

export default ({
  showSuccessMessage = false,
  validationSchema,
  errors,
  values,
  setErrors,
  setFieldError,
  setFieldValue,
  removeFieldError,
}) => {
  const { t } = useTranslation('helpers');
  const [message, setMessage] = React.useState();
  const [isSubmitting, setIsSubmitting] =
    React.useState(false);

  const onValidate = (name, value) =>
    Yup.reach(validationSchema, name)
      .validate(value)
      .then(() => removeFieldError(name))
      .catch((e) => {
        let msg = get(e, 'message', 'invalidInput');
        if (msg === 'this is a required field')
          msg = 'isRequiredInput';

        return setFieldError(name, t(msg));
      });

  const onChange = (key, value) => {
    onValidate(key, value).finally(() =>
      setFieldValue(key, value),
    );
  };

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

      setTimeout(() => {
        setMessage(null);
      }, 8000);
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
      });
  };

  return {
    isSubmitting,
    message,
    onChange,
    onError,
    onSuccess,
    onSubmit,
    onValidate,
  };
};
