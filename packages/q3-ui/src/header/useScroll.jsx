import React from 'react';

export default () => {
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

  return scrolled;
};
