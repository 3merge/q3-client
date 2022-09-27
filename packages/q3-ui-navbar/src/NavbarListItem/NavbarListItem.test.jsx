import React from 'react';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import { Collapse } from '@material-ui/core';
import { useMemoMock } from 'q3-ui-test-utils/lib/reactUtils';
import NavbarListItem from './NavbarListItem';
import useNavbarListItemProps from '../useNavbarListItemProps';

useMemoMock();

jest.mock(
  '../NavbarListItemMenu',
  () =>
    ({ children }) =>
      children({
        open: jest.fn(),
      }),
);

jest.mock('../useNavbarListItemProps');

const genShallow = () =>
  global
    .shallow(<NavbarListItem label="test" to="/app" />)
    .dive()
    .find(Collapse);

describe('NavbarListItem', () => {
  it('should render collapsible area', () => {
    useNavbarListItemProps.mockReturnValue({
      hasSegments: true,
    });

    exists(genShallow());
  });

  it('should hide collapsible area', () => {
    useNavbarListItemProps.mockReturnValue({
      hasSegments: false,
    });

    doesNotExist(genShallow());
  });
});
