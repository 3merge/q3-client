import React from 'react';

export default (defaultIndex = -1) => {
  const [active, setActiveIndex] = React.useState(
    defaultIndex,
  );

  const handleChange = (index) => (event, isTruthy) =>
    setActiveIndex(isTruthy ? index : -1);

  return {
    active,
    handleChange,
  };
};
