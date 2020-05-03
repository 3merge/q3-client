/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';

export default (customTimeoutValue = 1000) => {
  const [isOn, setOn] = React.useState(false);

  const turnOnTemporarily = () => {
    setOn(true);
    setTimeout(() => setOn(false), customTimeoutValue);
  };

  return [isOn, turnOnTemporarily];
};
