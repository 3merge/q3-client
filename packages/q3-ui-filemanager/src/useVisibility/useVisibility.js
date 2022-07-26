import React from 'react';

const useVisibility = () => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  const observer = React.useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsVisible(entry.isIntersecting),
      ),
    [ref],
  );

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
