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
