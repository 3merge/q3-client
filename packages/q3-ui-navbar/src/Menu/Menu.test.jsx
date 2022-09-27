import React from 'react';
import {
  useCallbackMock,
  useContextMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import { open } from 'useful-state';
import Menu from './Menu';
import MenuItem from '../MenuItem';

jest.mock('./styles', () => jest.fn().mockReturnValue({}));

useCallbackMock();
const { changeReturnValue } = useContextMock();

const evt = {
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
};

jest.mock('useful-state', () => {
  // eslint-disable-next-line
  const open = jest.fn();

  return {
    open,
    useOpen: jest.fn().mockReturnValue({
      open,
    }),
  };
});

beforeEach(() => {
  open.mockClear();
});

describe('Menu', () => {
  it('should not invoke open', () => {
    changeReturnValue({
      enabled: false,
    });

    global.shallow(
      <Menu id="test">
        {({ open: handleOpen }) => {
          handleOpen(evt);
          return null;
        }}
      </Menu>,
    );

    expect(open).not.toHaveBeenCalled();
  });

  it('should invoke open', () => {
    changeReturnValue({
      enabled: true,
    });

    global.shallow(
      <Menu id="test">
        {({ open: handleOpen }) => {
          handleOpen(evt);
          return null;
        }}
      </Menu>,
    );

    expect(open).toHaveBeenCalled();
  });

  it('should display inner menu', () => {
    changeReturnValue({
      enabled: true,
    });

    expect(
      global
        .shallow(
          <Menu
            id="test"
            items={[{ label: 'foo' }, { label: 'bar' }]}
          >
            {() => null}
          </Menu>,
        )
        .find(MenuItem),
    ).toHaveLength(2);
  });

  it('should hide inner menu', () => {
    changeReturnValue({
      enabled: false,
    });

    expect(
      global
        .shallow(
          <Menu id="test" items={[{ label: 'foo' }]}>
            {() => null}
          </Menu>,
        )
        .find(MenuItem),
    ).toHaveLength(0);
  });
});
