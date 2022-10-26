import React from 'react';
import { ButtonComponentWithAnimation } from './Notifications';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const setState = jest.fn();

jest.mock('../../hooks/useNotificationsPage', () =>
  jest.fn().mockReturnValue({
    isOn: jest.fn().mockReturnValue(true),
  }),
);

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

    expect(setState).toHaveBeenCalledWith([]);
    expect(setState).toHaveBeenCalledWith(1);
  });

  it('should disable when on the notifications page', () => {
    expect(
      global
        .shallow(
          <ButtonComponentWithAnimation
            numberOfNotifications={1}
          />,
        )
        .find(ButtonWithIcon)
        .props('disabled'),
    ).toBeTruthy();
  });
});
