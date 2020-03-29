import React from 'react';
import Dialog from 'q3-ui-dialog';
import DeleteModal from './DeleteModal';

let spy;

const getLengthOfDialog = (props) =>
  global.shallow(<DeleteModal {...props} />).find(Dialog)
    .length;

beforeAll(() => {
  spy = jest.spyOn(React, 'useContext');
});

describe('DeleteModal', () => {
  it('should return null without an id', () => {
    spy.mockReturnValue({});
    expect(getLengthOfDialog({ id: '1' })).toBe(0);
  });

  it('should return null without a remove function', () => {
    spy.mockReturnValue({});
    expect(getLengthOfDialog({ id: '1' })).toBe(0);
  });

  it('should return Dialog with both id and remove function', () => {
    const remove = jest.fn();
    spy.mockReturnValue({ remove });
    expect(getLengthOfDialog({ id: '1' })).toBe(1);
    expect(remove).toHaveBeenCalledWith('1');
  });
});
