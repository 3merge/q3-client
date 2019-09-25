import React from 'react';
import Provider from 'q3-ui';

export const wrapPageElement = ({ element }) => (
  <Provider>{element}</Provider>
);
