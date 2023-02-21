import React from 'react';
import { isFunction } from 'lodash';

const useEventListener = (
  el,
  event,
  handler,
  handlerOptions,
) => {
  React.useEffect(() => {
    const element = isFunction(el) ? el() : el;
    if (!element) return undefined;

    element.addEventListener(
      event,
      handler,
      handlerOptions,
    );

    return () => {
      element.removeEventListener(event, handler);
    };
  }, [el]);
};

export default useEventListener;
