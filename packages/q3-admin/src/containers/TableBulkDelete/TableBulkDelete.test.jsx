import React from 'react';
import Confirm from 'q3-ui-confirm';
import AuthDelete from '../AuthDelete';
import TableBulkDelete from './TableBulkDelete';

let spy;

jest.mock('../AuthDelete');

beforeEach(() => {
  spy = jest.spyOn(React, 'useContext');

  jest
    .spyOn(React, 'useMemo')
    .mockImplementation((fn) => fn());
});

describe('TableBulkDelete', () => {
  it('should not render without selection', () => {
    spy.mockReturnValue({
      checked: [],
      removeBulk: jest.fn(),
    });

    AuthDelete.mockImplementation(
      ({ children }) => children,
    );

    expect(
      global
        .shallow(<TableBulkDelete />)
        .find(Confirm)
        .props()
        .ButtonComponent().props.disabled,
    ).toBeTruthy();
  });

  it('should not render without permission', () => {
    spy.mockReturnValue({
      checked: [],
      removeBulk: jest.fn(),
    });

    // eslint-disable-next-line
    AuthDelete.mockImplementation(({ children }) => {
      return null;
    });

    expect(
      global
        .mount(<TableBulkDelete />)
        .find(Confirm)
        .exists(),
    ).toBeFalsy();
  });

  it('should render with selection and permission', () => {
    spy.mockReturnValue({
      checked: [1, 2, 3],
      removeBulk: jest.fn(),
    });

    AuthDelete.mockImplementation(
      ({ children }) => children,
    );

    expect(
      global
        .shallow(<TableBulkDelete />)
        .find(Confirm)
        .exists(),
    ).toBeTruthy();
  });
});
