import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { browser } from 'q3-ui-helpers';
import { ColumnHeader, includesNegativeCharacter } from '.';

jest
  .spyOn(React, 'useEffect')
  .mockImplementation((fn) => fn());

jest.mock('q3-ui-helpers', () => ({
  browser: {
    isBrowserReady: jest.fn(),
    isDefined: jest.fn(),
    proxyLocalStorageApi: jest.fn(),
  },
}));

const getProps = () => ({
  title: 'Test',
  id: 'Foo',
  getFrom: jest.fn(),
  params: {
    set: jest.fn(),
  },
});

const clickOnCellHeader = (props) =>
  global
    .shallow(<ColumnHeader {...props} />)
    .find(TableSortLabel)
    .simulate('click');

describe('ColumnHeader', () => {
  describe('effect', () => {
    it('should call local storage proxy on effect', () => {
      global.shallow(<ColumnHeader {...getProps()} />);
      expect(
        browser.proxyLocalStorageApi,
      ).toHaveBeenCalled();
    });
  });

  describe('onClick', () => {
    it('should sort asc by default', () => {
      const stub = getProps();
      clickOnCellHeader(stub);
      expect(stub.params.set).toHaveBeenCalledWith(
        'sort',
        'Test',
      );
    });

    it('should sort desc if asc is enabled', () => {
      const stub = getProps();
      stub.getFrom.mockReturnValue('1');
      clickOnCellHeader(stub);
      expect(stub.params.set).toHaveBeenCalledWith(
        'sort',
        '-Test',
      );
    });
  });

  describe('"includesNegativeCharacter"', () => {
    it('should return truthy', () =>
      expect(
        includesNegativeCharacter('-yup'),
      ).toBeTruthy());

    it('should return falsey', () =>
      expect(
        includesNegativeCharacter('nope'),
      ).toBeFalsy());
  });
});
