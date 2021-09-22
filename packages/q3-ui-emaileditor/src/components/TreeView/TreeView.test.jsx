import React from 'react';
import MuiTreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from './TreeView';

jest.mock('./styles', () => () => ({
  root: 'classname',
}));

const getTreeItemLengthByNodeId = (nodeId) =>
  global
    .shallow(<TreeView />)
    .find({ nodeId })
    .find(TreeItem).length;

describe('TreeView', () => {
  it('should split partials/full templates', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      templates: [
        {
          id: '1',
          name: '__A',
        },
        {
          id: '2',
          name: 'A',
        },
        {
          id: '3',
          name: 'B',
        },
      ],
    });

    // inclusive of self
    expect(getTreeItemLengthByNodeId(0)).toBe(2);
    expect(getTreeItemLengthByNodeId(1)).toBe(3);
  });

  it('should update', () => {
    const setById = jest.fn();
    jest.spyOn(React, 'useContext').mockReturnValue({
      setById,
      templates: [
        {
          id: '1',
          name: '__A',
        },
      ],
    });

    global
      .shallow(<TreeView />)
      .find(MuiTreeView)
      .prop('onNodeSelect')(null, '1');

    expect(setById).toHaveBeenCalledWith('1');
  });
});
