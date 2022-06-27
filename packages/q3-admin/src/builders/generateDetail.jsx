import React from 'react';
import { Detail } from '../components';

export default ({ views, HeaderProps, ...rest }) =>
  () =>
    (
      <Detail {...rest} HeaderProps={HeaderProps}>
        {Object.entries(views).map(([key, Component]) => (
          <Component key={key} name={key} />
        ))}
      </Detail>
    );
