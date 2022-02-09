import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import NavbarSystemLink from './NavbarSystemLink';
import useDomainAuth from '../../hooks/useDomainAuth';

jest.mock('../../hooks/useDomainAuth', () => jest.fn());
jest.mock('../../hooks/useDomainContext', () =>
  jest.fn().mockReturnValue({
    domain: {
      brand: 'q3',
    },
  }),
);

describe('NavbarSystemLink', () => {
  it('should render nothing', () => {
    useDomainAuth.mockReturnValue(false);
    doesNotExist(
      global.shallow(<NavbarSystemLink />).find(ListItem),
    );
  });

  it('should render list', () => {
    useDomainAuth.mockReturnValue(true);
    const el = global
      .shallow(<NavbarSystemLink />)
      .find(ListItem);
    exists(el);
    expect(el.find(ListItemText).props()).toHaveProperty(
      'primary',
      'q3',
    );
  });
});
