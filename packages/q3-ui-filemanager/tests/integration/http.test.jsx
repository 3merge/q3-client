import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TreeView from '@material-ui/lab/TreeView';
import {
  asyncAct,
  asyncMount,
  exists,
  wait,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import Confirm from 'q3-ui-confirm';
import Fixtures from '../fixtures';
import FileManager from '../../src';
import mockIntersectionObserver from '../helpers/mockIntersectionObserver';
import {
  getFileNames,
  getFolderNames,
} from '../helpers/support';

jest.unmock('axios');
jest.unmock('useful-state');

const TEST_NAME = 'foobar';

const triggerContextMenuOption = async (
  selector,
  optionName,
) => {
  const el = await asyncMount(
    <Fixtures
      delay={0}
      ops={['Create', 'Delete', 'Read', 'Update']}
    >
      {(props) => React.createElement(FileManager, props)}
    </Fixtures>,
  );

  const isItem = (node) =>
    node.prop('data-id') === selector;

  const isOption = (node) => node.text() === optionName;

  const isOpenedContextMenu = (node) => {
    const { className, open } = node.props();
    return (
      String(className).includes('q3-context-menu') && open
    );
  };

  await asyncAct(async () => {
    let item = selector.startsWith('.')
      ? el.find(selector)
      : el.findWhere(isItem);

    // only wrapper contains list item element
    if (item.first().find('button').length)
      item = item.first().find('button');

    item.first().simulate('contextmenu', {
      target: document.createElement('div'),
    });

    return el;
  });

  await asyncAct(async () => {
    el.findWhere(isOpenedContextMenu)
      .first()
      .findWhere(isOption)
      .first()
      .simulate('click');

    return el;
  });

  return el;
};

const triggerDirectoryChange = async (
  el,
  // the media directory
  id = '62c72de2c2af12ff9e4ce509',
) => {
  const isFolder = (node) =>
    String(node.prop('className')).includes('q3-folder') &&
    node.prop('data-id') === id;

  await asyncAct(async () => {
    const folder = el
      .findWhere(isFolder)
      .first()
      .find('button')
      .first();

    // entering into docs dir
    folder.simulate('dblclick', {
      target: {
        name: 'moving up',
      },
    });

    return el;
  });

  return el;
};

const submitRenameDialog = async (el) => {
  await asyncAct(async () => {
    await el
      .find('#q3-filemanager-rename-form')
      .at(1)
      .props()
      .onSubmit({
        name: TEST_NAME,
      });

    return el;
  });

  return el;
};

const submitMoveTo = async (el) => {
  await asyncAct(async () => {
    el.find(TreeView).first().props().onNodeSelect(
      null,
      // media folder
      '62c72de2c2af12ff9e4ce509',
    );

    return el;
  });

  await asyncAct(() => {
    el.find('#q3-filemanager-move-to-submit')
      .first()
      .simulate('click');

    return el;
  });

  return el;
};

const submitDeleteConfirm = async (el) => {
  await asyncAct(async () => {
    await el.find(Confirm).first().props().service();
    return el;
  });

  return el;
};

beforeEach(() => {
  mockIntersectionObserver();
});

describe('Filemanager HTTP', () => {
  it('should render loading indicator', () => {
    exists(
      global
        .mount(
          <Fixtures ops={['Read']}>
            {(props) => <FileManager {...props} />}
          </Fixtures>,
        )
        .find(CircularProgress),
    );
  });

  it('should render auth error', () => {
    expect(
      global
        .mount(
          <Fixtures>
            {(props) => <FileManager {...props} />}
          </Fixtures>,
        )
        .text(),
    ).toMatch('fileManagerAuthorizationError');
  });

  it('should render http error', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} onGetError ops={['Read']}>
        {(props) => <FileManager {...props} />}
      </Fixtures>,
    );

    expect(el.text()).toMatch('fileManagerFetchingError');
  });

  it('should create a folder', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read', 'Create']}>
        {(props) => (
          <FileManager {...props} initialView="list" />
        )}
      </Fixtures>,
    );

    expect(getFolderNames(el)).toHaveLength(3);

    await asyncAct(() => {
      el.find('#q3-filemanager-add-folder')
        .first()
        .simulate('click', {
          target: {
            name: 'open',
          },
        });

      return el;
    });

    await asyncAct(async () => {
      await el
        .find('#q3-filemanager-add-folder-form')
        .first()
        .props()
        .onSubmit({
          name: 'integration',
        });

      return el;
    });

    const folders = getFolderNames(el);
    expect(folders).toHaveLength(4);
    expect(folders).toContain('integration');
  });

  it('should add a file to second-level directory', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read', 'Create']}>
        {(props) => (
          <FileManager {...props} initialView="list" />
        )}
      </Fixtures>,
    );

    const rootDirectoryFiles = getFileNames(el);
    await triggerDirectoryChange(el);

    const newDirectoryFiles = getFileNames(el);
    expect(newDirectoryFiles).not.toEqual(
      rootDirectoryFiles,
    );

    await asyncAct(async () => {
      const b = new Blob(['test']);
      const f = new File([b], 'test.txt');

      el.find('[name="dropper-button"]')
        .first()
        .simulate('change', {
          target: {
            files: [f],
          },
        });

      await wait(3000);
      return el;
    });

    expect(getFileNames(el).sort()).toEqual(
      newDirectoryFiles.concat('test.txt').sort(),
    );
  });

  it('should rename a file', async () => {
    const el = await triggerContextMenuOption(
      '.q3-file',
      'rename',
    );

    await submitRenameDialog(el);
    expect(getFileNames(el)).toContainEqual(
      expect.stringMatching(TEST_NAME.toLowerCase()),
    );
  });

  it('should rename a folder', async () => {
    const el = await triggerContextMenuOption(
      '.q3-folder',
      'rename',
    );

    await submitRenameDialog(el);
    expect(getFolderNames(el)).toContain(TEST_NAME);
  });

  it('should move the file', async () => {
    const filename = 'changlog.csv';
    const el = await triggerContextMenuOption(
      // changelog.csv
      '62c72e67c2af12ff9f4ck874',
      'moveTo',
    );

    expect(getFileNames(el)).toContain(filename);
    await submitMoveTo(el);
    expect(getFileNames(el)).not.toContain(filename);
    await triggerDirectoryChange(el);

    expect(getFileNames(el)).toContain(filename);
  });

  it('should move the files', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read', 'Update']}>
        {(props) => (
          <FileManager {...props} initialView="list" />
        )}
      </Fixtures>,
    );

    const originalFileNames = getFileNames(el);

    await asyncAct(() => {
      el.find('.q3-file').forEach((node) =>
        node.simulate('click', {
          shiftKey: true,
        }),
      );

      return el;
    });

    await asyncAct(() => {
      el.find('#q3-filemanager-batch-move-to-button')
        .first()
        .simulate('click');

      return el;
    });

    await submitMoveTo(el);
    const newFileNames = getFileNames(el);

    expect(
      originalFileNames.every(
        (item) => !newFileNames.includes(item),
      ),
    ).toBeTruthy();

    await triggerDirectoryChange(el);
    expect(getFileNames(el)).toEqual(
      expect.arrayContaining(originalFileNames),
    );
  });

  it('should move the folder', async () => {
    const el = await triggerContextMenuOption(
      // docs directory
      '62c72de2c2af12ff9e4ce511',
      'moveTo',
    );

    expect(getFolderNames(el).sort()).toEqual([
      'docs',
      'media',
      'temp',
    ]);

    await submitMoveTo(el);
    await triggerDirectoryChange(el);
    expect(getFolderNames(el)).toEqual(['docs']);
  });

  it('should remove the folder', async () => {
    const el = await triggerContextMenuOption(
      // docs directory
      '62c72de2c2af12ff9e4ce511',
      'delete',
    );

    await submitDeleteConfirm(el);
    expect(getFolderNames(el)).not.toContain('docs');
  });

  it('should remove the file', async () => {
    const el = await triggerContextMenuOption(
      // changelog.csv
      '62c72e67c2af12ff9f4ck874',
      'delete',
    );

    await submitDeleteConfirm(el);
    expect(getFileNames(el)).not.toContain('changlog.csv');
  });
});
