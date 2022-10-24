import React from 'react';
import { isFunction } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { Store } from '../containers/state';

const useMultistepper = (getCurrentStep) => {
  const user =
    React.useContext(AuthContext)?.state?.profile;

  const { data } = React.useContext(Store);

  const generateDefaultValue = () =>
    isFunction(getCurrentStep)
      ? getCurrentStep(data, user)
      : 0;

  const defaultValue = generateDefaultValue();
  const [value, setValue] = React.useState(defaultValue);

  const handleStep = (v) => (e) => {
    e.preventDefault();
    setValue(v);
  };

  const getCompleted = (v) => defaultValue > v;
  const getDisabled = (v) => defaultValue < v;

  React.useEffect(() => {
    setValue(generateDefaultValue());
  }, [data]);

  return {
    getStepProps: (stepValue) => ({
      completed: getCompleted(stepValue),
      disabled: getDisabled(stepValue),
      onClick: handleStep(stepValue),
    }),
    setValue,
    value,
  };
};

export default useMultistepper;
