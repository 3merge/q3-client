import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header';

const getGridItems = (el, expectedNumberOfResults) =>
  expect(el.find(Grid)).toHaveLength(
    expectedNumberOfResults,
  );

const getTitleSpacing = (el, expectedSpaceValue) =>
  expect(el.find('#q3-app-title').props()).toHaveProperty(
    'spacing',
    expectedSpaceValue,
  );

describe('Admin>Header', () => {
  it('should not render backComponent', () => {
    const el = global.shallow(<Header title="test" />);
    getGridItems(el, 5);
    getTitleSpacing(el, 0);
  });

  it('should render backComponent', () => {
    const el = global.shallow(
      <Header title="test" backComponent={<div />} />,
    );

    getGridItems(el, 6);
    getTitleSpacing(el, 1);
  });
});
