import React from 'react';
import Dialog from 'q3-ui-dialog';
import DialogMoveTo from './DialogMoveTo';
import useDirectoryFolders from '../useDirectoryFolders';
import { DIRECTORY_ROOT } from '../constants';

jest.mock('../useDirectoryFolders');

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({});
});

describe('DialogMoveTo', () => {
  it('should forward node ids on select', () => {
    const setState = jest.fn();

    useDirectoryFolders.mockReturnValue({
      tree: [],
    });

    jest
      .spyOn(React, 'useState')
      .mockReturnValue([null, setState]);

    global
      .shallow(<DialogMoveTo />)
      .find(Dialog)
      .props()
      .renderContent()
      .props.children[0].props.onNodeToggle(null, 1);

    expect(setState).toHaveBeenCalledWith(1);
  });

  it('should recurse', () => {
    useDirectoryFolders.mockReturnValue({
      tree: [
        {
          id: 1,
          name: 'parent-1',
          children: [
            {
              id: 2,
              name: 'child-1',
              children: [
                {
                  id: 4,
                  name: 'grandchild-1',
                },
                {
                  id: 5,
                  name: 'grandchild-2',
                },
              ],
            },
            {
              id: 3,
              name: 'child-2',
            },
          ],
        },
      ],
    });

    const getNodeProps = (el) => el.children[0].props;

    const top = getNodeProps(
      global
        .shallow(<DialogMoveTo />)
        .find(Dialog)
        .props()
        .renderContent().props,
    ).children.props;

    const parents = getNodeProps(top);
    const children = getNodeProps(parents);
    const grandchildren = getNodeProps(children);

    expect(top).toMatchObject({
      nodeId: DIRECTORY_ROOT,
    });

    expect(parents).toMatchObject({
      nodeId: 1,
    });

    expect(children).toMatchObject({
      nodeId: 2,
    });

    expect(grandchildren).toMatchObject({
      nodeId: 4,
    });
  });
});
