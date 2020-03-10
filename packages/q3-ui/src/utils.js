import React from 'react';
import ButtonLink from '@material-ui/core/Link';
import { Link } from '@reach/router';

export const getLinkAttributes = (url = '', Component) => {
  let to = url;

  if (url.startsWith('http') || url.startsWith('www')) {
    return {
      component: ButtonLink,
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

export const withCriticalProp = (C, prop) => (props) =>
  prop in props ? React.createElement(C, props) : null;
