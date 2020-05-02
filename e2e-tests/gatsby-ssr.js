/* eslint-disable import/prefer-default-export, react/prop-types, react/jsx-filename-extension */
import React from 'react';

export const wrapRootElement = ({ element }) => (
  <div id="custom-wrapper">{element}</div>
);
