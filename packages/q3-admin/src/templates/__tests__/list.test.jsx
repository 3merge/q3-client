import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import Table from 'q3-ui/lib/table';
import { getCSV } from 'q3-ui-rest';
import List, { getCSVByName } from '../list';

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
  // will need to re-write
});
