import React from 'react';
import { CardHeader } from '@material-ui/core';
import FileGrid from './FileGrid';

const checkHeaderRendering = (url, result = false) => {
  expect(
    global
      .shallow(<FileGrid name="foo" url="google.com" />)
      .find(CardHeader)
      .exists(),
  ).toBe(result);
};

describe('FileGrid', () => {
  it('should return header', () => {
    checkHeaderRendering('google.com', true);
  });

  it('should not return header', () => {
    checkHeaderRendering();
  });
});
