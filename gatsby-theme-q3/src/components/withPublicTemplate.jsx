import React from 'react';
import PublicTemplate from './PublicTemplate';

const withPublicTemplate = (Component) => (props) =>
  (
    <PublicTemplate {...props}>
      <Component {...props} />
    </PublicTemplate>
  );

export default withPublicTemplate;
