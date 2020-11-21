import React from 'react';
import * as Templates from '../templates';

export default ({ views, HeaderProps, ...rest }) => () => {
  const El = Templates.Detail[rest.templateName || 'Split'];

  return (
    <El {...rest} HeaderProps={HeaderProps}>
      {Object.entries(views).map(([key, Component]) => (
        <Component key={key} name={key} />
      ))}
    </El>
  );
};
