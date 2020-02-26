import React from 'react';
import * as yup from 'yup';
import { Validator } from '../../helpers/validation';

export default () => {
  const [chain, setChain] = React.useState({});
  const validationSchema = yup.object().shape(chain);

  const setField = React.useCallback(
    (k, args) =>
      setChain((prevState) => ({
        ...prevState,
        [k]: new Validator(args).build(),
      })),
    [chain],
  );

  return {
    validationSchema,
    setField,
    chain,
  };
};
