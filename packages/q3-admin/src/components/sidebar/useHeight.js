import React from 'react';

const articleId = '#detail-article';
const headerId = '#app-header';
const profileBarId = '#profile-bar';

export const getClientHeight = (e) =>
  e !== null && typeof e === 'object' && 'clientHeight' in e
    ? e.clientHeight
    : 0;

export const getProfileBarHeight = () => {
  const el = document.querySelector(profileBarId);
  const height = getClientHeight(el);
  return height < 250 ? height : 0;
};

export const getHeaderHeight = () => {
  const header = document.querySelector(headerId);
  return getClientHeight(header);
};

export const getArticlePaddingOffset = () => {
  const article = document.querySelector(articleId);

  return article
    ? Number(
        window
          .getComputedStyle(article)
          .getPropertyValue('padding')
          .replace('px', ''),
      )
    : 0;
};

export const calculateHeight = (
  next,
  getFullHeight,
) => () => {
  const total = getFullHeight
    ? getProfileBarHeight() +
      getHeaderHeight() +
      getArticlePaddingOffset()
    : getProfileBarHeight();

  next(`calc(100vh - ${total}px)`);
};

export default (includeArticleOffset = true) => {
  const [height, setHeight] = React.useState();

  React.useEffect(() => {
    const fn = calculateHeight(
      setHeight,
      includeArticleOffset,
    );

    window.addEventListener('resize', fn);
    fn();

    return () => {
      window.removeEventListener('resize', fn);
    };
  }, []);

  return height;
};
