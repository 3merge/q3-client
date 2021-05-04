import React from 'react';
import { useToggle } from 'useful-state';
import Sort from './Sort';

jest.mock('useful-state', () => ({
  useToggle: jest.fn(),
}));

test.each([
  [true, 'newestToOldest'],
  [false, 'oldestToNewest'],
])(
  '<Sort /> should render button text',
  (state, expected) => {
    useToggle.mockReturnValue({
      state,
    });
    expect(
      global
        .mount(<Sort>{(s, renderer) => renderer}</Sort>)
        .text(),
    ).toMatch(expected);
  },
);
