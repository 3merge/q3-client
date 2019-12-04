import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import Table from 'q3-ui/lib/table';
import { getCSV } from 'q3-ui-rest';
import List, {
  ListHeader,
  ListTable,
  getCSVByName,
} from '../list';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

jest.mock('q3-ui-rest', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    fetching: true,
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    removeBulk: jest.fn(),
  }),
  getCSV: jest.fn(),
}));

describe('List', () => {
  describe('List', () => {
    it('should reassign the paramters', () => {
      useAuth.mockResolvedValue({
        Redirect: ({ children }) => children,
      });

      const wrapper = global.shallow(
        <List
          inheritCollectionName
          inheritResourceName
          resourceNameSingular="foo"
          name="foos"
        />,
      );

      expect(wrapper.find(ListTable).props()).toMatchObject(
        {
          resourceName: 'foos',
          collectionName: 'foos',
          name: 'foos',
        },
      );
    });
  });

  describe('getCSVByName', () => {
    it('should join together the ids', () => {
      getCSVByName('foo')([1, 2, 3]);
      expect(getCSV).toHaveBeenCalledWith('/foo?_id=1,2,3');
    });
  });

  describe('ListHeader', () => {
    it('should call child', () => {
      const Mock = () => null;
      const Hide = ({ children }) => children;

      useAuth.mockReturnValue({
        Hide,
      });

      const wrapper = global.shallow(
        <ListHeader name="foo" collectionName="collection">
          <Mock />
        </ListHeader>,
      );

      expect(useAuth).toHaveBeenCalledWith('collection');
      expect(
        wrapper
          .find(Hide)
          .dive()
          .find(Mock),
      ).toHaveLength(1);
    });
  });

  describe('ListTable', () => {
    it('should assign deleteMany and pass long props', () => {
      useAuth.mockReturnValue({
        canDelete: true,
      });

      const wrapper = global.shallow(
        <ListTable
          fetching
          removeBulk={jest.fn()}
          patch={jest.fn()}
          get={jest.fn()}
          name="foo"
          resourceName="foo"
          collectionName="collection"
          rowTemplate={() => null}
          filterProps={{
            onChange: jest.fn(),
            render: jest.fn(),
            initialValues: {},
            locationParams: {},
          }}
        />,
      );

      expect(wrapper.find(Table).props()).toHaveProperty(
        'deleteMany',
        expect.any(Function),
      );
    });
  });
});
