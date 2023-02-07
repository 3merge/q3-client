import React from 'react';
import { ListItemIcon } from '@material-ui/core';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NavbarListItemBase from './NavbarListItemBase';
import ListItemArrow from '../ListItemArrow';

describe('NavbarListItemBase', () => {
  it('should show icon', () => {
    const el = global.shallow(
      <NavbarListItemBase
        label="test"
        icon={ArrowForwardIosIcon}
      />,
    );

    exists(el.find(ListItemIcon));
  });

  it('should show neither icon nor arrow', () => {
    const el = global.shallow(
      <NavbarListItemBase label="test" />,
    );

    doesNotExist(el.find(ListItemArrow));
  });
});
