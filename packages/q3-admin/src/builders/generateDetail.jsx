import React from 'react';
import { Detail } from 'q3-admin/lib/components';

export default ({
  views,
  HeaderProps,
  DetailProps,
}) => () => (
  <Detail {...DetailProps} HeaderProps={HeaderProps}>
    {Object.entries(views).map(([key, Component]) => (
      <Component key={key} name={key} />
    ))}
  </Detail>
);
