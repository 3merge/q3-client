import React from 'react';
import { browser } from 'q3-ui-helpers';
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';
import {
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import DirectorySort, {
  castPropertyToLowerCase,
  getFromLocalStorage,
} from './DirectorySort';
import useDirectoryFolders from '../useDirectoryFolders';

jest.mock('../useDirectoryFolders');

const getMenuItems = () => {
  let Menu;
  global.shallow(
    <DirectorySort>
      {(_, Component) => {
        Menu = Component;
        return null;
      }}
    </DirectorySort>,
  );

  return global
    .shallow(<Menu />)
    .dive()
    .find(MenuItem);
};

describe('DirectorySort', () => {
  describe('getFromLocalStorage', () => {
    it('should query browser storage with appended key name', () => {
      const spy = jest
        .spyOn(browser, 'proxyLocalStorageApi')
        .mockReturnValue('name');

      expect(
        getFromLocalStorage('test', 'fallback'),
      ).toMatch('name');
      expect(spy).toHaveBeenCalledWith(
        'getItem',
        'q3-filemanager-test',
      );
    });

    it('should return default', () => {
      jest
        .spyOn(browser, 'proxyLocalStorageApi')
        .mockReturnValue(undefined);

      expect(
        getFromLocalStorage('test', 'fallback'),
      ).toMatch('fallback');
    });
  });

  describe('castPropertyToLowerCase', () => {
    it('should return object property in lowercase', () => {
      expect(
        castPropertyToLowerCase('test')({
          test: 'FOO',
        }),
      ).toEqual('foo');
    });

    it('should return object property as undefined', () => {
      expect(castPropertyToLowerCase('test')({})).toEqual(
        'undefined',
      );
    });
  });

  it('should sort files/siblings by prop and direction', () => {
    useDirectoryFolders.mockReturnValue({
      files: [
        { name: 'archive' },
        { name: 'greatest hits' },
        { name: 'b-sides' },
      ],
      siblings: [
        { name: 'Januaray' },
        { name: 'November' },
      ],
    });

    const el = jest.spyOn(React, 'useState');

    el.mockReturnValue([
      {
        property: 'name',
        sort: 'desc',
      },
    ]);

    global.shallow(
      <DirectorySort>
        {({ files, siblings }) => {
          expect(files).toEqual([
            { name: 'greatest hits' },
            { name: 'b-sides' },
            { name: 'archive' },
          ]);
          expect(siblings).toEqual([
            { name: 'November' },
            { name: 'Januaray' },
          ]);

          return null;
        }}
      </DirectorySort>,
    );

    expect(el).toHaveBeenCalledWith({
      property: 'name',
      sort: 'asc',
    });
  });

  it('should mark menu items when active', () => {
    useDirectoryFolders.mockReturnValue({
      files: [],
      siblings: [],
    });

    const items = getMenuItems();

    // 3 props and 2 directions
    expect(items).toHaveLength(5);
    const updatedAt = items.first();
    const name = items.at(1);

    // confirms we're looking at the right ones
    expect(updatedAt.text()).toMatch('updatedAt');
    expect(name.text()).toMatch('name');

    doesNotExist(updatedAt.find(CheckIcon));
    exists(name.find(CheckIcon));
  });

  it('should update state partially on menu click', () => {
    useDirectoryFolders.mockReturnValue({
      files: [],
      siblings: [],
    });

    const setState = jest.fn().mockImplementation((c) =>
      expect(
        c({
          property: 'size',
          sort: 'asc',
        }),
      ).toMatchObject({
        property: 'size',
        sort: 'desc',
      }),
    );

    jest
      .spyOn(React, 'useState')
      .mockReturnValue([{}, setState]);

    const spy = jest
      .spyOn(browser, 'proxyLocalStorageApi')
      .mockReturnValue(undefined);

    getMenuItems().last().props().onClick();

    expect(setState).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      'setItem',
      'q3-filemanager-sort',
      'desc',
    );
  });
});
