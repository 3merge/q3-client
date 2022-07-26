import React from 'react';
import { Builders } from 'q3-ui-forms';
import DialogRenameForm from './DialogRenameForm';
import useDialog from '../useDialog';

jest.mock('../useDialog');

describe('DialogRenameForm', () => {
  it('should call patch with data id', () => {
    const close = jest.fn();
    const patchReturnValue = jest.fn().mockReturnValue({
      then: jest
        .fn()
        .mockImplementation((callback) => callback()),
    });

    const patch = jest
      .fn()
      .mockReturnValue(patchReturnValue);

    useDialog.mockReturnValue({
      close,
    });

    jest.spyOn(React, 'useContext').mockReturnValue({
      patch,
    });

    global
      .shallow(<DialogRenameForm id="1" />)
      .find(Builders.Form)
      .props()
      .onSubmit({
        name: 'foo',
      });

    expect(patch).toHaveBeenCalledWith('1');
    expect(patchReturnValue).toHaveBeenCalledWith({
      name: 'foo',
    });

    expect(close).toHaveBeenCalled();
  });
});
