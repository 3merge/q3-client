import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Delete, useChange, useOpenState } from '.';
import { materialMount } from '../../helpers/testUtils';

describe('Custom hook', () => {
  const mock = jest.fn();

  beforeAll(() => {
    jest
      .spyOn(React, 'useState')
      .mockImplementation((init) => [init, mock]);
    jest
      .spyOn(React, 'useCallback')
      .mockImplementation((fn) => (v) => {
        fn(v);
      });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should handle onChange', () => {
    const target = { value: 'Foo' };
    useChange().onChange({ target });
    expect(mock).toHaveBeenCalledWith(target.value);
  });

  it('should default to close', () => {
    const { isOpen } = useOpenState();
    expect(isOpen).toBeFalsy();
  });

  it('should set target to open state', () => {
    useOpenState().open({
      target: {
        current: 'foo',
      },
    });
    expect(mock).toHaveBeenCalledWith({
      current: 'foo',
    });
  });

  it('should set target to null', () => {
    useOpenState().close();
    expect(mock).toHaveBeenCalledWith(null);
  });
});

describe('Dialog click handlers', () => {
  /*
  beforeAll(() => {
    jest
      .spyOn(ReactRouter, 'Redirect')
      .mockImplementation(() => null);
  });
*/
  it('should redirect', (done) => {
    jest
      .spyOn(String.prototype, 'localeCompare')
      .mockReturnValue(0);
    const mount = materialMount(Delete, {
      redirect: '/app',
      next: () => ({
        finally: (cb) => cb(),
      }),
    });
    mount
      .find(Tooltip)
      .find(IconButton)
      .simulate('click');
    mount
      .find(Button)
      .last()
      .simulate('click');
    mount.update();
    setImmediate(() => {
      /*  expect(mount.find(ReactRouter.Redirect)).toHaveLength(
        1,
      ); */
      done();
    });
  });
});
