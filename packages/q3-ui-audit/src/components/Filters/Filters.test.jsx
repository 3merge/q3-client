import React from 'react';
import { Builders } from 'q3-ui-forms';
import Filters from './Filters';

let spy;

beforeEach(() => {
  spy = jest.spyOn(React, 'useRef');
});

describe('Filters', () => {
  it('should reassign initial value', () => {
    spy.mockReturnValue({
      current: {
        value: 1,
      },
    });

    const el = global.shallow(
      <Filters
        onSubmit={jest.fn()}
        initialValues={{
          user: 1,
        }}
      />,
    );

    expect(
      el.find(Builders.Form).prop('initialValues'),
    ).toMatchObject({
      user: {
        value: 1,
      },
    });
  });

  it('should leave initial value', () => {
    spy.mockReturnValue({
      current: null,
    });

    const el = global.shallow(
      <Filters
        onSubmit={jest.fn()}
        initialValues={{
          user: 1,
        }}
      />,
    );

    expect(
      el.find(Builders.Form).prop('initialValues'),
    ).toMatchObject({
      user: 1,
    });
  });
});
