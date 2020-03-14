import React from 'react';
import { Header, Detail } from 'q3-admin/lib/components';

export default ({
  title,
  presets,
  views,
  headerProps,
}) => () => (
  <>
    <Header titleProp={title} {...headerProps} />
    <Detail {...presets}>
      {Object.entries(views).map(([key, Component]) => (
        <Component key={key} name={key} />
      ))}
    </Detail>
  </>
);
