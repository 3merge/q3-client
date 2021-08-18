import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import Confirm from 'q3-ui-confirm';
import TableBulkDelete from './TableBulkDelete';

let spy;

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  spy = jest.spyOn(React, 'useContext');
});

describe('TableBulkDelete', () => {
  it('should not render without selection', () => {
    spy.mockReturnValue({});

    useAuth.mockReturnValue({
      Hide: jest.fn(),
    });

    expect(
      global
        .shallow(<TableBulkDelete />)
        .find(Confirm)
        .exists(),
    ).toBeFalsy();
  });

  it('should not render without permission', () => {
    spy.mockReturnValue({
      checked: [],
    });

    useAuth.mockReturnValue({
      Hide: jest.fn().mockReturnValue(null),
    });

    expect(
      global
        .shallow(<TableBulkDelete />)
        .find(Confirm)
        .exists(),
    ).toBeFalsy();
  });

  it('should not render without permission', () => {
    spy.mockReturnValue({
      checked: [1, 2, 3],
    });

    useAuth.mockReturnValue({
      Hide: jest
        .fn()
        .mockImplementation(({ children }) => children),
    });

    expect(
      global
        .shallow(<TableBulkDelete />)
        .find(Confirm)
        .exists(),
    ).toBeTruthy();
  });
});
