import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import ListItemArrow from './ListItemArrow';

describe('ListItemArrow', () => {
  it('should show arrow', () => {
    const el = global.shallow(
      <ListItemArrow arrow label="test" />,
    );

    exists(el.find(ArrowForwardIosIcon));
  });

  it('should show neither icon nor arrow', () => {
    const el = global.shallow(
      <ListItemArrow label="test" />,
    );

    doesNotExist(el.find(ArrowForwardIosIcon));
  });
});
