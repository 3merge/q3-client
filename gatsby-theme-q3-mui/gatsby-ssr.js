import React from 'react';
import Wrapper from './src/components/Wrapper';

export const wrapRootElement = ({ element }, plugin) =>
  React.createElement(Wrapper, plugin, element);
