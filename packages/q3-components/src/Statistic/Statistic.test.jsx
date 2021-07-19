import React from 'react';
import Statistic from './Statistic';
import { compare, getFirstFromSpec } from './utils';

test.each([
  [100, 50, '+100%'],
  [50, 80, '-37%'],
  [50.01, 0.01, '+500,000%'],
  [50.01, 0, 'n/a'],
  [undefined, 50, '-100%'],
  [null, null, 'n/a'],
  [undefined, undefined, 'n/a'],
])('compare(%n,%n)', (a, b, expected) =>
  expect(compare(a, b)).toBe(expected),
);

test.each([
  ['~roughly', 'unknown'],
  ['+positive', 'positive'],
  ['-negative', 'negative'],
])('compare(%n,%n)', (value, expected) =>
  expect(
    getFirstFromSpec(
      {
        '+': 'positive',
        '++': 'positively',
        '-': 'negative',
      },
      'unknown',
    )(value),
  ).toBe(expected),
);

describe('Statistic', () => {
  it('should show insufficient data label', () => {
    expect(
      global
        .shallow(
          <Statistic
            current={22}
            title="Unavailable"
            unit="pcs"
            hideInsufficentData={false}
          />,
        )
        .text(),
    ).toMatch('Unavailable22pcsinsufficentData');
  });

  it('should hide insufficient data label', () => {
    expect(
      global
        .shallow(
          <Statistic
            current={22}
            title="Unavailable"
            unit="pcs"
            hideInsufficentData
          />,
        )
        .text(),
    ).toMatch('Unavailable22pcs');
  });
});
