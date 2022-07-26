import React from 'react';
import Confirm from 'q3-ui-confirm';
import DialogDelete from './DialogDelete';
import useDialog from '../useDialog';

jest.mock('../useDialog');

describe('DialogDelete', () => {
  it('should chain context functions', (done) => {
    const remove = jest
      .fn()
      .mockReturnValue(
        jest
          .fn()
          .mockImplementation(() => Promise.resolve(null)),
      );

    const close = jest.fn();
    const poll = jest.fn();

    jest.spyOn(React, 'useContext').mockReturnValue({
      selected: ['foo', 'bar'],
      remove,
      poll,
    });

    useDialog.mockReturnValue({
      close,
    });

    global
      .shallow(<DialogDelete />)
      .find(Confirm)
      .props()
      .service()
      .then(() => {
        expect(remove).toHaveBeenCalledWith('?ids=foo,bar');
        expect(close).toHaveBeenCalled();
        expect(poll).toHaveBeenCalled();
        done();
      });
  });
});
