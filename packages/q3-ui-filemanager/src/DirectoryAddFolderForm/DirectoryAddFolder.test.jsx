import React from 'react';
import { Builders } from 'q3-ui-forms';
import DirectoryAddFolderForm from './DirectoryAddFolderForm';

describe('DirectoryAddFolderForm', () => {
  it('should assign current value to folderId', () => {
    const onDone = jest.fn();
    const post = jest.fn().mockReturnValue({
      then: jest.fn().mockImplementation((c) => c()),
    });

    jest.spyOn(React, 'useContext').mockReturnValue({
      current: 1,
      post,
    });

    global
      .shallow(<DirectoryAddFolderForm onDone={onDone} />)
      .find(Builders.Form)
      .props()
      .onSubmit({
        test: 2,
      });

    expect(post).toHaveBeenCalledWith({
      test: 2,
      folder: true,
      folderId: 1,
    });

    expect(onDone).toHaveBeenCalled();
  });
});
