import React from 'react';

const useInputDebounce = (input) => {
  const ref = React.useRef();
  const [shouldRun, setShouldRun] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return undefined;
    }

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
