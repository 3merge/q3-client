import React from 'react';
import Provider from 'q3-ui';

export const wrapRootElement = ({ element }) => (
  <Provider>{element}</Provider>
);
