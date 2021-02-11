import React from 'react';

const useInputDebounce = (input) => {
  const [shouldRun, setShouldRun] = React.useState(false);
  const ref = React.useRef(false);

  React.useEffect(() => {
    let timer;

    if (ref.current) {
      timer = setTimeout(() => {
        return setShouldRun(true);
      }, 550);
    }

    ref.current = input;

    return () => {
      clearTimeout(timer);
      setShouldRun(false);
    };
  }, [input]);

  return shouldRun;
};

export default useInputDebounce;
