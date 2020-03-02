import React from 'react';

export default (color) => {
  const [scrolled, setScrolled] = React.useState(false);

  function listenForScroll() {
    // this ref to window instance
    setScrolled(this.scrollY > 5);
  }

  React.useEffect(() => {
    window.addEventListener('scroll', listenForScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener('scroll', listenForScroll);
  }, []);

  return {
    style: scrolled
      ? {
          backgroundColor: '#FFF',
          color: 'inherit',
        }
      : {
          backgroundColor: undefined,
          color,
        },
  };
};
