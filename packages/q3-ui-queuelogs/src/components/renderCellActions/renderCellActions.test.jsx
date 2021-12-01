import React from 'react';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import renderCellActions from './renderCellActions';

const checkExistenceOfIcon = (Icon, row = {}) =>
  global
    .mount(
      <div>
        {renderCellActions({
          injectedState: {
            t: (v) => v,
          },
          row,
        })}
      </div>,
    )
    .find(Icon)
    .exists();

describe('renderCellActions', () => {
  it('should render file actions', () => {
    expect(
      checkExistenceOfIcon(AttachFileIcon, {
        imports: ['https://google.ca'],
      }),
    ).toBeTruthy();
  });

  it('should render trrun action', () => {
    expect(
      checkExistenceOfIcon(RedoIcon, {
        status: 'Done',
      }),
    ).toBeTruthy();
  });

  it('should render delete action', () => {
    expect(
      checkExistenceOfIcon(DeleteForeverIcon, {
        status: 'Failed',
        type: 'Single',
      }),
    ).toBeTruthy();
  });

  it('should not render delete action', () => {
    expect(
      checkExistenceOfIcon(DeleteForeverIcon, {
        status: 'Failed',
        type: 'Recurring',
      }),
    ).toBeFalsy();
  });
});
