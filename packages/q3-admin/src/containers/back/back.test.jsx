import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Back from './back';
import { useReferrer } from '../use';

jest.mock('../use', () => ({
  useReferrer: jest.fn().mockReturnValue({
    getPath: jest.fn().mockReturnValue('/foos'),
  }),
}));

test('Back should assign resource name to hook', () => {
  const directoryPath = '/foos';
  jest.spyOn(React, 'useContext').mockReturnValue({
    directoryPath,
  });

  const props = global
    .shallow(<Back />)
    .find(IconButton)
    .props();

  expect(props).toHaveProperty('to', directoryPath);
  expect(useReferrer).toHaveBeenCalledWith(directoryPath);
});
