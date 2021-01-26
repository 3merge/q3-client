import React from 'react';
import { useLocation } from '@reach/router';
import { EditableTypography } from 'q3-components';
import withDateRange, {
  addRangeToSearchString,
  printDateRange,
} from './withDateRange';

let useState;

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

const getRangeContainer = () => {
  const Sample = () => <div />;
  const Range = withDateRange(Sample);
  return global.shallow(<Range />);
};

beforeEach(() => {
  useState = jest.spyOn(React, 'useState');
});

describe('withDateRange', () => {
  it('should set state with default keys', () => {
    useState.mockReturnValue([{}, jest.fn()]);
    useLocation.mockReturnValue({
      search: 'foo=1',
    });

    getRangeContainer();
    expect(useState).toHaveBeenCalledWith({
      'createdAt>': expect.anything(),
      'createdAt<': expect.anything(),
    });
  });

  it('should update range', () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => [init, setState]);
    useLocation.mockReturnValue({});

    getRangeContainer()
      .find(EditableTypography)
      .prop('onSubmit')({
      'createdAt': 1,
      'createdAt>': 1,
      'createdAt<': 1,
    });

    expect(setState).toHaveBeenCalledWith({
      'createdAt>': 1,
      'createdAt<': 1,
    });
  });

  describe('"addRangeToSearchString"', () => {
    it('should set encoded utc date ranges in string', () => {
      const out = addRangeToSearchString({
        'createdAt>': '2020-01-01',
        'createdAt<': '2020-05-01',
      });

      expect(out).toMatch('createdAt%3E=2020-01-01');
      expect(out).toMatch('createdAt%3C=2020-05-02');
    });
  });

  describe('"printDateRange"', () => {
    it('should join dates together', () =>
      expect(
        printDateRange({
          to: '2020-01-10',
          from: '2020-01-01',
        }),
      ).toMatch('Jan 01, 2020 - Jan 10, 2020'));
  });
});
