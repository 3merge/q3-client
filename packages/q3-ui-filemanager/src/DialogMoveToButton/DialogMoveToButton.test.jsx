import React from 'react';
import Button from '@material-ui/core/Button';
import DialogMoveToButton from './DialogMoveToButton';
import useDirectoryFoldersChange from '../useDirectoryFoldersChange';
import useDialog from '../useDialog';
import { DIRECTORY_ROOT } from '../constants';

jest.mock('../useDialog');
jest.mock('../useDirectoryFoldersChange');

const expectedChangeArguments = (props, args) => {
  const change = jest.fn().mockReturnValue({
    then: jest
      .fn()
      .mockImplementation((callback) => callback()),
  });

  const close = jest.fn();

  useDirectoryFoldersChange.mockReturnValue(change);
  useDialog.mockReturnValue({
    close,
  });

  global
    .shallow(<DialogMoveToButton {...props} />)
    .find(Button)
    .props()
    .onClick();

  expect(change).toHaveBeenCalledWith(args);
  expect(close).toHaveBeenCalled();
};

test.each([
  [
    {
      selected: 'test',
    },
    {
      id: null,
      folderId: 'test',
    },
  ],
  [
    {
      selected: ['test', 'again'],
    },
    {
      id: null,
      folderId: null,
    },
  ],
  [
    {
      selected: DIRECTORY_ROOT,
    },
    {
      id: null,
      folderId: null,
    },
  ],
])(
  'DialogMoveToButton change handler',
  expectedChangeArguments,
);
