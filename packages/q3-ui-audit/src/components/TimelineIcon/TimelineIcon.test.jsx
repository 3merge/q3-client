import React from 'react';
import PolicyIcon from '@material-ui/icons/Policy';
import EjectIcon from '@material-ui/icons/Eject';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TimelineIcon from './TimelineIcon';

test.each([
  [{ added: { foo: 1 } }, AddBoxIcon],
  [{ deleted: { foo: 1 } }, EjectIcon],
  [{ updated: { foo: 1 } }, PolicyIcon],
  [{}, PolicyIcon],
])('<TimelineIcon />', (props, expectedIcon) => {
  expect(
    global
      .mount(<TimelineIcon {...props} />)
      .find(expectedIcon)
      .exists(),
  ).toBeTruthy();
});
