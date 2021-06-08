import moment from 'moment';
import React from 'react';
import {
  UnsavedChanges,
  useTimeTracking,
} from './UnsavedChanges';
import PendingChangesModal from '../../components/PendingChangesModal';

jest.mock('../../hooks/useRefresh', () =>
  jest.fn().mockImplementation((f) =>
    f(undefined, {
      updatedAt: 'utc',
      id: 1,
    }),
  ),
);

let effect;
let state;

beforeEach(() => {
  effect = jest.spyOn(React, 'useEffect');
  state = jest.spyOn(React, 'useState');
});

describe('useTimeTracking', () => {
  it('should not run effect', () => {
    const setState = jest.fn();
    effect.mockImplementation((fn) => fn());
    state.mockReturnValue([null, setState]);

    useTimeTracking(1);
    expect(setState).toHaveBeenCalledTimes(1);
  });

  it('should run when the updated date is less than pending date', () => {
    const setState = jest.fn();
    effect.mockImplementation((fn) => fn());
    state.mockReturnValue([
      moment().add(1, 'minute').toISOString(),
      setState,
    ]);

    useTimeTracking(1, moment());
    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenCalledWith('utc');
    expect(setState).toHaveBeenCalledWith(true);
  });

  it('should run not when the updated date is equal to or more than pending date', () => {
    const setState = jest.fn();
    effect.mockImplementation((fn) => fn());
    state.mockReturnValue([
      moment().subtract(1, 'minute').toISOString(),
      setState,
    ]);

    useTimeTracking(1, moment());
    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenCalledWith('utc');
    expect(setState).toHaveBeenCalledWith(null);
  });
});

describe('UnsavedChanges', () => {
  it('should show modal on pending changes', () => {
    state.mockReturnValue([true, jest.fn()]);
    effect.mockImplementation(() => {
      // noop
    });

    expect(
      global
        .shallow(<UnsavedChanges />)
        .find(PendingChangesModal)
        .exists(),
    ).toBeTruthy();
  });

  it('should hide modal on pending changes', () => {
    state.mockReturnValue([false, jest.fn()]);
    effect.mockImplementation(() => {
      // noop
    });

    expect(
      global
        .shallow(<UnsavedChanges />)
        .find(PendingChangesModal)
        .exists(),
    ).toBeFalsy();
  });
});
