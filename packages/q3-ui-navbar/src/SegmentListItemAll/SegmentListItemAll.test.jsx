import React from 'react';
import SegmentListItemAll from './SegmentListItemAll';
import useStyles from '../SegmentListItemLink/styles';

jest.mock('@reach/router', () => ({
  useMatch: jest.fn().mockReturnValue(true),
}));

jest.mock('../SegmentListItemLink/styles');

test.each([
  [[], true],
  [[{ applied: false }, { applied: false }], true],
  [[{ applied: false }, { applied: true }], false],
])('SegmentListItemAll', (segments, applied) => {
  useStyles.mockReturnValue({});
  global.shallow(
    <SegmentListItemAll segments={segments} />,
  );

  expect(useStyles).toHaveBeenCalledWith({
    applied,
  });
});
