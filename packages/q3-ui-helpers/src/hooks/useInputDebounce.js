import React from 'react';

const useInputDebounce = (input) => {
  const [shouldRun, setShouldRun] = React.useState(false);

  React.useEffect(() => {
    if (!input) return undefined;

    const timer = setTimeout(() => {
      return setShouldRun(true);
    }, 550);

    return () => {
      clearTimeout(timer);
      setShouldRun(false);
    };
  }, [input]);

  return shouldRun;
};

export default useInputDebounce;
