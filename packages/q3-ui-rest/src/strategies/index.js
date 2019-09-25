import { invoke } from 'lodash';
import formik from './formik';

const strategies = {
  formik,
};

export default (strategy) => {
  if (!(strategy in strategies))
    throw new Error(
      `${strategy} is not a recognized strategy`,
    );

  return invoke(strategies, strategy);
};
