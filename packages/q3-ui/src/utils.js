import { Link } from '@reach/router';

export const getLinkAttributes = (url = '', Component) => {
  let to = url;

  if (url.startsWith('http') || url.startsWith('www')) {
    return {
      component: 'a',
      target: '_blank',
      rel: 'noopener noreferrer',
      href: url.replace(/^https?:\/\//, '//'),
    };
  }

  if (!to.startsWith('/')) to = `/${to}`;
  return {
    component: Component || Link,
    to,
  };
};
