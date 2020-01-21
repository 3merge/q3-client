import React from 'react';
import Box from '@material-ui/core/Box';
import HelperText from '.';

const getWrapper = () =>
  global.shallow(<HelperText text="lorem" />);

const getContainer = (e, key) => {
  const w = e
    .find(Box)
    .first()
    .props();

  return key ? w[key] : w;
};

describe('HelperText', () => {
  it('should assign aria-owns attribute to container', () => {
    const el = getWrapper();
    expect(getContainer(el, 'aria-owns')).toMatch(
      'helper-',
    );
  });
});
