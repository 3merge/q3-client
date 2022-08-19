import React from 'react';

export const contextDefaults = {
  directory: '/',
  domain: {
    brand: 'Q3',
    favicon: 'https://uilogos.co/img/logomark/ideaa.png',
    logo: 'https://uilogos.co/img/logotype/kyan.png',
  },
};

export default React.createContext(contextDefaults);
