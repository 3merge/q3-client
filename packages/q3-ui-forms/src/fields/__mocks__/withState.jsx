import React from 'react';

export default (Component) => (props) => (
  <Component
    {...props}
    label="Mocked"
    onChange={jest.fn()}
    onArrayPush={jest.fn()}
    onArrayPull={jest.fn()}
  />
);
