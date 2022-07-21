import React from 'react';
import { Builders } from 'q3-ui-forms';
import NoteEdit, {
  invert,
  invokeWithStaticParam,
} from './NoteEdit';
import NoteForm from '../NoteForm';

describe('NoteEdit', () => {
  describe('invert', () => {
    it('should return opposite value', () => {
      expect(invert(true)).toBeFalsy();
    });
  });

  describe('invokeWithStaticParam', () => {
    it('should forward param', () => {
      const fn = jest.fn();
      invokeWithStaticParam('foo')(fn);
      expect(fn).toHaveBeenCalledWith('foo');
    });
  });

  it('should set initialValues', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      canEdit: true,
    });

    expect(
      global
        .shallow(
          <NoteEdit id="1">
            {({ EditorComponent }) => (
              <EditorComponent title="null" />
            )}
          </NoteEdit>,
        )
        .dive()
        .find(NoteForm)
        .prop('initialValues'),
    ).toMatchObject({
      title: '',
      message: '',
      tags: [],
      pin: false,
    });
  });
});
