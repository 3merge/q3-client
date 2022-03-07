import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NotificationsDrawer from './NotificationsDrawer';

jest.mock('@material-ui/core/useMediaQuery', () =>
  jest.fn(),
);

const shouldMatchAnchor = (text) =>
  expect(
    global.shallow(<NotificationsDrawer />).prop('anchor'),
  ).toMatch(text);

describe('NotificationsDrawer', () => {
  it('should render on the left on desktop', () => {
    useMediaQuery.mockReturnValue(false);
    shouldMatchAnchor('left');
  });

  it('should render on the right on mobile', () => {
    useMediaQuery.mockReturnValue(true);
    shouldMatchAnchor('right');
  });
});
