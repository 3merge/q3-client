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
  pushTo: jest.fn(),
  params: {},
});

const clickOnCellHeader = (props) =>
  global
    .shallow(<ColumnHeader {...props} />)
    .find(TableSortLabel)
    .simulate('click');

describe('ColumnHeader', () => {
  describe('effect', () => {
    it('should do nothing without window', () => {
      browser.isBrowserReady.mockReturnValue(false);
      global.shallow(<ColumnHeader {...getProps()} />);
      expect(
        browser.proxyLocalStorageApi,
      ).not.toHaveBeenCalled();
    });

    it('should use previous value', () => {
      const stub = getProps();
      stub.getFrom.mockReturnValue(null);
      browser.isBrowserReady.mockReturnValue(true);
      browser.isDefined.mockReturnValue(true);
      browser.proxyLocalStorageApi.mockReturnValue('-Foo');
      global.shallow(<ColumnHeader {...stub} />);
      expect(stub.pushTo).toHaveBeenCalledWith({
        sort: '-Foo',
      });
    });

    it('should use default value', () => {
      const stub = getProps();
      stub.getFrom.mockReturnValue(null);
      browser.isBrowserReady.mockReturnValue(true);
      browser.isDefined.mockImplementation((v) => v);
      browser.proxyLocalStorageApi.mockReturnValue(null);
      global.shallow(
        <ColumnHeader
          {...stub}
          defaultSortPreference="Quuz"
        />,
      );
      expect(stub.pushTo).toHaveBeenCalledWith({
        sort: 'Quuz',
      });
    });
  });

  describe('onClick', () => {
    it('should sort asc by default', () => {
      browser.isDefined.mockReturnValue(true);
      const stub = getProps();
      clickOnCellHeader(stub);
      expect(
        browser.proxyLocalStorageApi,
      ).toHaveBeenCalledWith('setItem', 'Foo', 'Test');
      expect(stub.pushTo).toHaveBeenCalledWith({
        sort: 'Test',
      });
    });

    it('should sort desc if asc is enabled', () => {
      browser.isDefined.mockReturnValue(true);
      const stub = getProps();
      stub.getFrom.mockReturnValue('1');
      clickOnCellHeader(stub);
      expect(stub.pushTo).toHaveBeenCalledWith({
        sort: '-Test',
      });
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
