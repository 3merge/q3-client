import React from 'react';

const useCheckboxes = () => {
  const [checked, setChecked] = React.useState([]);
  const clear = React.useCallback(() => setChecked([]));

  const isChecked = React.useCallback(
    (key) => checked.includes(key),
    [checked],
  );

  const onCheck = (key) => () =>
    setChecked(
      checked.includes(key)
        ? checked.filter((i) => i !== key)
        : checked.concat(key),
    );

  const hasChecked = () =>
    React.useCallback(Boolean(checked && checked.length), [
      checked,
    ]);

  return {
    checked,
    setChecked,
    onCheck,
    isChecked,
    clear,
    hasChecked,
  };
};

export default useCheckboxes;
