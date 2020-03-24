import React from 'react';

export default () => {
  const [height, setHeight] = React.useState();

  React.useEffect(() => {
    function calculateHeight() {
      let headerHeight = 0;
      let articleHeight = 0;

      const viewportWidth = window.innerWidth;
      const header = document.querySelector('header');
      const article = document.querySelector(
        '#detail-article',
      );

      if (header) headerHeight = header.clientHeight;
      if (article)
        articleHeight = Number(
          window
            .getComputedStyle(article)
            .getPropertyValue('padding')
            .replace('px', ''),
        );

      setHeight(
        viewportWidth > 1279
          ? `calc(100vh - ${headerHeight +
              articleHeight}px)`
          : 'auto',
      );
    }

    window.addEventListener('resize', calculateHeight);
    calculateHeight();

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return height;
};
