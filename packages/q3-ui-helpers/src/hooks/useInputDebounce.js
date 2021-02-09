import React from 'react';

const useInputDebounce = (input) => {
  const [shouldRun, setShouldRun] = React.useState(false);
  const ref = React.useRef(false);

  React.useEffect(() => {
    let timer;

    if (!ref.current) {
      ref.current = true;
    } else {
      timer = setTimeout(() => setShouldRun(true), 350);
    }

    return () => {
      clearTimeout(timer);
      setShouldRun(false);
    };
  }, [input]);

  return shouldRun;
};

export default useInputDebounce;
