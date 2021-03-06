import React from 'react';
import { materialMount } from '../_helpers/testUtils';
import Breadcrumbs from '.';

jest.mock('@reach/router', () => ({
  __esModule: true,
  // eslint-disable-next-line
  Link: ({ children }) => <a>{children}</a>,
  Location: ({ children }) =>
    children({
      location: {
        pathname: 'root/path/subpath',
      },
    }),
}));

describe('Breadcrumbs', () => {
  it('should walk the entries with slashes in between', () => {
    expect(
      materialMount(Breadcrumbs).find('li'),
    ).toHaveLength(5); // 3 + 2 slashes
  });
});
