import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { ColumnHeader, includesNegativeCharacter } from '.';

const getProps = () => ({
  title: 'Test',
  storageKey: '1',
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
  describe('onClick', () => {
    it('should sort asc by default', () => {
      const stub = getProps();
      clickOnCellHeader(stub);
      expect(stub.pushTo).toHaveBeenCalledWith({
        sort: '1',
      });
    });

    it('should sort desc if asc is enabled', () => {
      const stub = getProps();
      stub.getFrom.mockReturnValue('1');
      clickOnCellHeader(stub);
      expect(stub.pushTo).toHaveBeenCalledWith({
        sort: '-1',
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
