import React from 'react';
import { Header, Detail } from 'q3-admin/lib/components';

export default ({
  title,
  presets,
  views,
  headerProps,
}) => () => (
  <>
    <Header {...headerProps} titleProp={title} />
    <Detail {...presets}>
      {Object.entries(views).map(([key, Component]) => (
        <Component key={key} name={key} />
      ))}
    </Detail>
  </>
);
