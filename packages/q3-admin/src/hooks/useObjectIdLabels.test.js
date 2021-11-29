import React from 'react';
import { getSafelyForAutoCompleteWithProjection } from 'q3-ui-rest';
import useObjectIdLabels, {
  findLabelByValue,
  findMissingKeys,
  transformResultsIntoKeyValuePairs,
} from './useObjectIdLabels';

jest.mock('q3-ui-rest', () => ({
  getSafelyForAutoCompleteWithProjection: jest
    .fn()
    .mockReturnValue((s) => ({
      then: (cb) => cb(s),
    })),
}));

jest.mock('q3-ui-locale', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((v) => v),
  }),
}));

beforeEach(() => {
  getSafelyForAutoCompleteWithProjection.mockClear();
});

describe('useObjectidLabels', () => {
  it('should fetch results', () => {
    const dispatch = jest.fn();
    const params = ['/users', 'users', 'name'];

    jest
      .spyOn(React, 'useReducer')
      .mockReturnValue([{}, dispatch]);

    useObjectIdLabels(...params).getResults('foo');

    expect(
      getSafelyForAutoCompleteWithProjection,
    ).toHaveBeenCalledWith(...params);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'data',
      payload: 'foo',
    });
  });

  it('should not populate cache when loading', () => {
    const dispatch = jest.fn();

    jest.spyOn(React, 'useReducer').mockReturnValue([
      {
        loading: true,
      },
      dispatch,
    ]);

    const r = useObjectIdLabels().getLabelFromState(1);

    expect(r).toEqual([
      {
        label: '',
        value: 1,
      },
    ]);

    expect(
      getSafelyForAutoCompleteWithProjection,
    ).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should match with results', () => {
    const dispatch = jest.fn();

    jest.spyOn(React, 'useReducer').mockReturnValue([
      {
        cache: {},
        loading: false,
        results: [
          {
            label: 'Foo',
            value: 1,
          },
        ],
      },
      dispatch,
    ]);

    const r = useObjectIdLabels().getLabelFromState(1);

    expect(r).toEqual([
      {
        label: 'Foo',
        value: 1,
      },
    ]);

    expect(
      getSafelyForAutoCompleteWithProjection,
    ).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should match with cache', () => {
    const dispatch = jest.fn();

    jest.spyOn(React, 'useReducer').mockReturnValue([
      {
        cache: { 1: 'Foo' },
        loading: false,
        results: [],
      },
      dispatch,
    ]);

    const r = useObjectIdLabels().getLabelFromState(1);

    expect(r).toEqual([
      {
        label: 'Foo',
        value: 1,
      },
    ]);

    expect(
      getSafelyForAutoCompleteWithProjection,
    ).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should fetch cache', () => {
    const dispatch = jest.fn();

    jest.spyOn(React, 'useReducer').mockReturnValue([
      {
        cache: {},
        loading: false,
        results: [],
      },
      dispatch,
    ]);

    useObjectIdLabels([
      '/users?sort=name',
    ]).getLabelFromState(1);

    expect(
      getSafelyForAutoCompleteWithProjection,
    ).toHaveBeenCalledWith('/users?sort=name&_id=1');

    expect(dispatch).toHaveBeenCalledWith({
      type: 'cache',
      payload: {
        1: 'Unknown',
      },
    });
  });

  describe('transformResultsIntoKeyValuePairs', () => {
    it('should reduce array', () => {
      expect(
        transformResultsIntoKeyValuePairs([
          {
            value: 1,
            label: 'Foo',
          },
          {
            value: 2,
          },
          'Bar',
        ]),
      ).toEqual({
        1: 'Foo',
        2: '--',
      });
    });
  });

  describe('findLabelByValue', () => {
    const state = [
      {
        value: 1,
        label: 'Foo',
      },
      {
        value: 2,
        label: 'Bar',
      },
    ];

    it('should locate label', () => {
      expect(findLabelByValue(state, 2)).toMatch('Bar');
    });

    it('should return undefined', () => {
      expect(findLabelByValue(state, 3)).toBeUndefined();
    });

    it('should return undefined', () => {
      expect(
        findLabelByValue(
          state.concat({
            value: undefined,
            label: 'Skip',
          }),
        ),
      ).toBeUndefined();
    });
  });

  describe('findMissingKeys', () => {
    it('should remove items that are keys', () => {
      expect(
        findMissingKeys({ 1: 'Foo' }, [
          { value: 1 },
          { value: 2 },
          { value: 3, label: 'Skip' },
        ]),
      ).toEqual([2]);
    });
  });
});
