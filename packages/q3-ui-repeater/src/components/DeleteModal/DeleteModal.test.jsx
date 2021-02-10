import React from 'react';
import Confirm from 'q3-ui-confirm';
import DeleteModal from './DeleteModal';

let spy;

const getLengthOfDialog = (props) =>
  global.shallow(<DeleteModal {...props} />).find(Confirm)
    .length;

beforeAll(() => {
  spy = jest.spyOn(React, 'useContext');
});

describe('DeleteModal', () => {
  it('should return Dialog with both id and remove function', () => {
    const remove = jest.fn();
    spy.mockReturnValue({ remove });
    expect(getLengthOfDialog({ id: '1' })).toBe(1);
    expect(remove).toHaveBeenCalledWith('1');
  });
});
