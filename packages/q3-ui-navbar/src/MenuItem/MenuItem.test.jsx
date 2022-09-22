import React from 'react';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import CheckIcon from '@material-ui/icons/Done';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MenuItem from './MenuItem';

describe('MenuItem', () => {
  it('should display checked', () => {
    const el = global.shallow(
      <MenuItem label="test" checked />,
    );

    exists(el.find(CheckIcon));
  });

  it('should display secondary action', () => {
    const el = global.shallow(
      <MenuItem label="test" nested />,
    );

    exists(el.find(ArrowForwardIosIcon));
  });

  it('should only display label', () => {
    const el = global.shallow(<MenuItem label="test" />);
    doesNotExist(el.find(CheckIcon));
    doesNotExist(el.find(ArrowForwardIosIcon));
  });
});
