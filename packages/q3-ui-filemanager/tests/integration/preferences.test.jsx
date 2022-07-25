import React from 'react';
import {
  asyncAct,
  asyncMount,
  hasSomeOf,
  wait,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import Fixtures from '../fixtures';
import FileManager from '../../src';
import mockIntersectionObserver from '../helpers/mockIntersectionObserver';
import {
  getFileNames,
  getFolderNames,
} from '../helpers/support';

jest.unmock('axios');
jest.unmock('useful-state');

beforeEach(() => {
  mockIntersectionObserver();
});

describe('FileManager preferences', () => {
  it('should change sort', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read']}>
        {(props) => <FileManager {...props} />}
      </Fixtures>,
    );

    expect(getFolderNames(el)).toEqual([
      'docs',
      'media',
      'temp',
    ]);

    expect(getFileNames(el)).toEqual([
      'changlog.csv',
      'README.md',
    ]);

    await asyncAct(() => {
      el.find('#q3-filemanager-sort-button')
        .first()
        .simulate('click', {
          target: document.createElement('div'),
        });

      return el;
    });

    await asyncAct(async () => {
      el.findWhere((node) => {
        const { id, open } = node.props();
        return id === 'file-sorting' && open;
      })
        .first()
        .find('li')
        .forEach((node) => {
          const text = String(node.text()).trim();

          if (['desc', 'size'].includes(text)) {
            node.simulate('click');
          }
        });

      await wait();
      return el;
    });

    expect(getFolderNames(el)).toEqual([
      'media',
      'docs',
      'temp',
    ]);

    expect(getFileNames(el)).toEqual([
      'README.md',
      'changlog.csv',
    ]);
  });

  it('should change UI', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read']}>
        {(props) => (
          <FileManager {...props} initialView="list" />
        )}
      </Fixtures>,
    );

    hasSomeOf(el.find('#q3-filemanager-list-view'));

    await asyncAct(() => {
      el.find('[aria-label="gallery"]')
        .first()
        .simulate('click');

      return el;
    });

    hasSomeOf(el.find('#q3-filemanager-gallery-view'));
  });
});
