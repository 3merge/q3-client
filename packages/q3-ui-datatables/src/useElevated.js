import React from 'react';
import useWindowEventHandler from './useWindowEventHandler';

export default () => {
  const [elevated, setElevated] = React.useState(false);

  useWindowEventHandler(
    'q3-datatable-scroller',
    'scroll',
    function onScroll() {
      if (this) {
        setElevated(this.scrollLeft > 10);
      } else {
        setElevated(false);
      }
    },
  );

  return elevated;
};
