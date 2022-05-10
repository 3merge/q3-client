import React from 'react';
import { ButtonComponentWithAnimation } from './Notifications';

const setState = jest.fn();

beforeEach(() => {
  jest
    .spyOn(React, 'useState')
    .mockReturnValueOnce([2, setState])
    .mockReturnValueOnce([[], setState]);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => {
      fn();
    });
});

describe('ButtonComponentWithAnimation', () => {
  it('should animate', () => {
    global.shallow(
      <ButtonComponentWithAnimation
        numberOfNotifications={3}
      />,
    );

    expect(setState).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.stringMatching('button'),
        expect.stringMatching('shake'),
      ]),
    );
    expect(setState).toHaveBeenCalledWith(3);
  });

  it('should not animate', () => {
    global.shallow(
      <ButtonComponentWithAnimation
        numberOfNotifications={1}
      />,
    );

    expect(setState).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.stringMatching('button'),
      ]),
    );
    expect(setState).toHaveBeenCalledWith(1);
  });
});
