import React from 'react';
import { asyncMount } from 'q3-ui-test-utils/lib/enzymeUtils';
import { last, uniq } from 'lodash';
import { Navbar } from '../../src';
import Fixtures from '../fixtures';

jest.unmock('axios');
jest.unmock('useful-state');

const getElement = async (props) =>
  asyncMount(
    <Fixtures delay={0} developer {...props}>
      {(menu) => <Navbar items={menu} />}
    </Fixtures>,
  );

describe('location', () => {
  test.each([
    ['/shows?hasAttributes=true', 3, 'Has some'],
    ['/shows?alist=true', 4, '🚀 A-list'],
    [
      '/shows?createdAt<=2021-08-01&createdAt>=2021-01-01',
      1,
      'Newly created',
    ],
    [
      // uses segment as a filter base
      '/shows?createdAt<=2021-08-01&createdAt>=2021-01-01&foo=1',
      1,
      'Newly created',
    ],
    [
      // uses segment as a filter base
      '/shows?foo=1',
      0,
      undefined,
    ],
  ])(
    'should detect active segments',
    async (initialPath, expectedDepth, expectedLabel) => {
      const el = await getElement({
        initialPath,
      });

      const labels = uniq(
        el
          .findWhere((item) => item.prop('applied'))
          .reduce(
            (acc, curr) => acc.concat(curr.text()),
            [],
          ),
      );

      expect(labels).toHaveLength(expectedDepth);

      if (expectedDepth) {
        expect(last(labels)).toMatch(expectedLabel);
      }
    },
  );
});
