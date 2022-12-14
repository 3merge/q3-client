import React from 'react';
import { isFunction } from 'lodash';

const useStreaming = ({ onStream, onExit }) => {
  const begin = Date.now();
  const ref = React.useRef();

  React.useEffect(() => {
    // fps
    const delay = 1000 / 30 - (Date.now() - begin);

    const execFn = (fn) =>
      isFunction(fn) ? fn() : undefined;

    execFn(onStream);
    ref.current = setInterval(() => {
      execFn(onExit);
      execFn(onStream);
    }, delay);

    return () => {
      if (ref.current) clearInterval(ref.current);
      execFn(onExit);
    };
  }, []);
};

export default useStreaming;
