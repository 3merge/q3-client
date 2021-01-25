import alpha from 'alphabetize-object-keys';

const isNotDefaultFileDirectory = (str) =>
  str !== 'default';

export const alphatizeKeys = (data) =>
  Object.keys(alpha(data)).filter(
    isNotDefaultFileDirectory,
  );

export const getUrlOrOnClickProps = (url, onClick) => {
  if (url)
    return {
      component: 'a',
      target: '_blank',
      download: true,
      href: url,
    };

  if (onClick)
    return {
      component: 'button',
      onClick,
    };

  return {};
};
