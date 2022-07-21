import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import NotePin from './NotePin';

let spy;

beforeAll(() => {
  spy = jest.spyOn(React, 'useContext');
});

describe('NotePin', () => {
  it('should hide button', () => {
    spy.mockReturnValue({
      canEdit: false,
      canPin: false,
    });

    expect(
      global.shallow(<NotePin id="test" />).find(IconButton)
        .length,
    ).toBe(0);
  });
});
