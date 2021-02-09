import React from 'react';

const useInputDebounce = (input) => {
  const [shouldRun, setShouldRun] = React.useState(false);
  const ref = React.useRef(false);

  console.log(typeof input);
  if (typeof s === 'string' && input.trim().length < 0)
    return false;
  // const hasValue = (s) => typeof s === 'string' && s.length > 0;
  // if (!hasValue(input)) return false;

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
