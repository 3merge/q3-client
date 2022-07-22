import React from 'react';
import NoteAdd from './NoteAdd';

jest.mock('q3-ui-locale');

describe('NoteAdd', () => {
  it('should render forms', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      canCreate: true,
      post: jest.fn(),
    });

    expect(
      global
        .shallow(<NoteAdd />)
        .find('.empty-space')
        .exists(),
    ).toBeFalsy();
  });
});
