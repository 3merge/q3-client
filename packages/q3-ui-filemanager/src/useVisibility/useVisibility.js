import React from 'react';
import { debounce } from 'lodash';

const useVisibility = () => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  const observer = React.useMemo(() => {
    const fn = debounce(
      ([entry]) => setIsVisible(entry.isIntersecting),
      500,
    );

    return new IntersectionObserver(fn);
  }, [ref]);

  React.useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    isVisible,
    ref,
  };
};

export default useVisibility;
