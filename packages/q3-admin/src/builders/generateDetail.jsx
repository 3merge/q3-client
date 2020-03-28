import React from 'react';
import { Header, Detail } from 'q3-admin/lib/components';

export default ({
  title,
  views,
  HeaderProps,
  DetailProps,
}) => () => (
  <>
    <Header {...HeaderProps} titleProp={title} />
    <Detail {...DetailProps}>
      {Object.entries(views).map(([key, Component]) => (
        <Component key={key} name={key} />
      ))}
    </Detail>
  </>
);
