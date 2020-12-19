import React from 'react';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import CircularProgress from '@material-ui/core/CircularProgress';
import FiltersForm from './FiltersForm';

jest.unmock('useful-state');

let spy;

beforeEach(() => {
  spy = jest.spyOn(React, 'useContext');
});

describe('FiltersForm', () => {
  it('should not provide save callback', () => {
    spy.mockReturnValue({
      fetching: false,
      fields: {
        foo: 1,
      },
    });

    const child = jest.fn();

    const { query } = global
      .shallow(
        <FiltersForm search="foo">{child}</FiltersForm>,
      )
      .find(EncodedUrl)
      .props();

    expect(query).toMatch('foo');
    expect(child).toHaveBeenCalledWith(
      { foo: 1 },
      undefined,
    );
  });

  it('should return loading indicator', () => {
    spy.mockReturnValue({
      fetching: true,
    });

    const { length } = global
      .shallow(
        <FiltersForm search="">{jest.fn()}</FiltersForm>,
      )
      .find(CircularProgress);

    expect(length).toBe(1);
  });
});
