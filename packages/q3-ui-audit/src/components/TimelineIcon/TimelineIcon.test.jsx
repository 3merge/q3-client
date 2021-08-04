import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import TimelineIcon from './TimelineIcon';

test.each([
  [{ added: { foo: 1 } }, AddIcon],
  [{ deleted: { foo: 1 } }, RemoveIcon],
  [{ updated: { foo: 1 } }, EditIcon],
  [{}, ChangeHistoryIcon],
])('<TimelineIcon />', (props, expectedIcon) => {
  expect(
    global
      .shallow(<TimelineIcon {...props} />)
      .find(expectedIcon)
      .exists(),
  ).toBeTruthy();
});
