import React from 'react';
import AuthDelete from '../AuthDelete';
import TableWithAuth, {
  TableBulkDelete,
  TableBulkDeleteButton,
} from './TableBulkDelete';
import ButtonWithIcon from '../../components/ButtonWithIcon';

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
    });

    expect(
      global
        .shallow(<TableBulkDeleteButton />)
        .find(ButtonWithIcon)
        .props().disabled,
    ).toBeTruthy();
  });

  it('should not render without selection', () => {
    spy.mockReturnValue({
      checked: [2, 3, 4],
      removeBulk: jest.fn(),
    });

    expect(
      global
        .shallow(<TableBulkDeleteButton />)
        .find(ButtonWithIcon)
        .props().disabled,
    ).toBeFalsy();
  });

  it('should not render without permission', () => {
    // eslint-disable-next-line
    AuthDelete.mockImplementation(({ children }) => {
      return null;
    });

    expect(
      global
        .mount(<TableWithAuth />)
        .find(TableBulkDelete)
        .exists(),
    ).toBeFalsy();
  });

  it('should render permission', () => {
    spy.mockReturnValue({
      removeBulk: jest.fn(),
    });

    AuthDelete.mockImplementation(
      ({ children }) => children,
    );

    expect(
      global
        .shallow(<TableWithAuth />)
        .find(TableBulkDelete)
        .exists(),
    ).toBeTruthy();
  });
});
