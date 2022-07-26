import React from 'react';
import useDirectoryFolders from './useDirectoryFolders';
import { uploads } from '../../tests/fixtures/data';
import { castPropertyToLowerCase } from '../utils';

const mockContext = (current = null) =>
  jest.spyOn(React, 'useContext').mockReturnValue({
    current,
    uploads,
  });

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    uploads,
  });

  jest
    .spyOn(React, 'useMemo')
    .mockImplementation((fn) => fn());
});

describe('useDirectoryFolders', () => {
  it('should return files', () => {
    mockContext();

    expect(
      useDirectoryFolders()
        .files.map(castPropertyToLowerCase('name'))
        .sort(),
    ).toEqual(['changlog.csv', 'readme.md']);
  });

  it('should return siblings', () => {
    mockContext();

    expect(
      useDirectoryFolders()
        .siblings.map(castPropertyToLowerCase('name'))
        .sort(),
    ).toEqual(['docs', 'media', 'temp']);
  });

  it('should return siblings (from current)', () => {
    mockContext('62c72de2c2af12ff9e4ce511');

    expect(
      useDirectoryFolders()
        .siblings.map(castPropertyToLowerCase('name'))
        .sort(),
    ).toEqual(['archives']);
  });

  it('should return nesting order', () => {
    mockContext('62c72de2c2af12ff9e4ce514');
    expect(
      useDirectoryFolders().breadcrumbs.map(
        castPropertyToLowerCase('name'),
      ),
    ).toEqual(['docs', 'archives']);
  });

  it('should return node tree', () => {
    mockContext();

    expect(useDirectoryFolders().tree).toEqual([
      expect.objectContaining({
        name: 'docs',
        children: [
          expect.objectContaining({
            name: 'archives',
          }),
        ],
      }),
      expect.objectContaining({
        name: 'media',
      }),
      expect.objectContaining({
        name: 'temp',
      }),
    ]);
  });
});
