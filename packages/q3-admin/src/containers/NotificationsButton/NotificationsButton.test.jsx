import React from 'react';
import {
  useEffectMock,
  useContextMock,
  useStateMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import NotificationsButton from './NotificationsButton';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const { spy, setState, reset: stateReset } = useStateMock();
const { changeReturnValue, reset: contextReset } =
  useContextMock();
useEffectMock();

jest.mock('./styles', () =>
  jest.fn().mockReturnValue({
    shake: 'shake',
  }),
);

jest.mock('../../components/ButtonWithIcon/styles', () =>
  jest.fn().mockReturnValue({}),
);

jest.mock('../../hooks/useNotificationsPage', () =>
  jest.fn().mockReturnValue({
    isOn: jest.fn().mockReturnValue(false),
  }),
);

afterEach(() => {
  stateReset();
  contextReset();
});

describe('NotificationsButton', () => {
  it('should animate', () => {
    spy
      .mockReturnValueOnce([0, setState])
      .mockReturnValueOnce([[], setState]);

    changeReturnValue({
      connected: true,
      counters: {
        notifications: 3,
      },
    });

    const p = global
      .shallow(<NotificationsButton />)
      .find(ButtonWithIcon)
      .props();

    expect(p.icon.type.render.displayName).toMatch(
      'NotificationsIcon',
    );

    expect(setState).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.stringMatching('shake'),
      ]),
    );

    expect(setState).toHaveBeenCalledWith(3);
  });

  it('should not animate', () => {
    spy
      .mockReturnValueOnce([9, setState])
      .mockReturnValueOnce([[], setState]);

    changeReturnValue({
      connected: true,
      error: true,
      counters: {
        notifications: 2,
      },
    });

    const p = global
      .shallow(<NotificationsButton />)
      .find(ButtonWithIcon)
      .props();

    expect(p.icon.type.render.displayName).toMatch(
      'NotificationImportantIcon',
    );

    expect(setState).toHaveBeenCalledWith([]);
    expect(setState).toHaveBeenCalledWith(2);
  });

  it('should show as disconnected', () => {
    spy
      .mockReturnValueOnce([0, setState])
      .mockReturnValueOnce([[], setState]);

    changeReturnValue({
      connected: false,
      error: false,
      counters: {
        notifications: 3,
      },
    });

    const p = global
      .shallow(<NotificationsButton />)
      .find(ButtonWithIcon)
      .props();

    expect(p.icon.type.render.displayName).toMatch(
      'NotificationsOffIcon',
    );
  });
});
