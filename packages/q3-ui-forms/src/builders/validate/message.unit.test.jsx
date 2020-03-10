import React from 'react';
import Message from './message';
import useStyle from './useStyle';

jest.mock('useful-state', () => ({
  useToggle: () => ({
    toggle: jest.fn(),
  }),
}));

jest.mock('./useStyle', () =>
  jest.fn().mockReturnValue({
    inlineMsg: {},
    inlineIconButton: {},
  }),
);

describe('Message', () => {
  it('should render nothing', () => {
    const el = global.shallow(<Message text={null} />);
    expect(el).toEqual({});
  });

  it('should render error', () => {
    global.shallow(<Message text="Error:" />);
    expect(useStyle).toHaveBeenCalledWith({
      isError: true,
      isSuccessful: false,
    });
  });

  it('should render nothing', () => {
    global.shallow(<Message text="Success:" />);
    expect(useStyle).toHaveBeenCalledWith({
      isError: false,
      isSuccessful: true,
    });
  });
});
