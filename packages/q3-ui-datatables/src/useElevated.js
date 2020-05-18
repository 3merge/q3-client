import React from 'react';
import useWindowEventHandler from './useWindowEventHandler';

export const getScrollValue = (el) =>
  (100 * el.scrollLeft) / (el.scrollWidth - el.clientWidth);

export const hasScrolled = (el) => getScrollValue(el) > 0;

export default (ref) => {
  const [elevated, setElevated] = React.useState(false);

  const setToElevatedOnChange = React.useCallback(
    (v) => (v !== elevated ? setElevated(v) : null),
    [elevated],
  );

  useWindowEventHandler(
    ref.current,
    'resize',
    function onScroll() {
      setToElevatedOnChange(false);
    },
  );

  useWindowEventHandler(
    ref.current,
    'scroll',
    function onScroll() {
      setToElevatedOnChange(hasScrolled(this));
    },
  );

  return elevated;
};
