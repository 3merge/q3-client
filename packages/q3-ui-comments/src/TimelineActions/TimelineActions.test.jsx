import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import TimelineActions from './TimelineActions';
import TimelineMenu from '../TimelineMenu';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../TimelineMenu', () => () => <div />);

const timelineStub = {
  patch: jest.fn(),
  remove: jest.fn(),
  comment: {
    id: 1,
    createdBy: {
      id: 1,
    },
  },
  field: 'foo',
};

const checkOptionsLength = (expectedLength) =>
  expect(
    global
      .mount(<TimelineActions {...timelineStub} />)
      .find(TimelineMenu)
      .prop('options'),
  ).toHaveLength(expectedLength);

describe('TimelineActions', () => {
  it('should register all options', () => {
    useAuth.mockReturnValue({
      HideByField: ({ children }) => children,
      state: {
        profile: {
          id: 1,
        },
      },
    });

    checkOptionsLength(2);
  });

  it('should register single option', () => {
    useAuth.mockReturnValue({
      HideByField: ({ children, op }) =>
        op === 'Update' ? children : null,
      state: {
        profile: {
          id: 1,
        },
      },
    });

    checkOptionsLength(1);
  });

  it('should not register options', () => {
    useAuth.mockReturnValue({
      HideByField: () => null,
      state: {
        profile: {
          id: 1,
        },
      },
    });

    checkOptionsLength(0);
  });

  it('should hide block altogether', () => {
    useAuth.mockReturnValue({
      HideByField: () => null,
      state: {
        profile: {
          id: 2,
        },
      },
    });

    expect(
      global
        .mount(<TimelineActions {...timelineStub} />)
        .find(TimelineMenu)
        .exists(),
    ).toBeFalsy();
  });
});
