import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderIcon from '@material-ui/icons/Folder';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TableActionBar, { TableContext } from '.';

const Consumer = () => {
  const { onCheck } = React.useContext(TableContext);

  return (
    <>
      <button onClick={onCheck(1)}>Option 1</button>
      <button onClick={onCheck(2)}>Option 2</button>
    </>
  );
};

storiesOf('Components|TableActionBar', module).add(
  'With context',
  () => (
    <TableActionBar
      actions={[
        {
          onClick: () => alert('CLICKED'),
          label: 'ClickMe',
          icon: FolderIcon,
        },
        {
          onClick: () => alert('CLICKED'),
          label: 'ClickMe',
          icon: LocationOnIcon,
        },
      ]}
    >
      <Consumer />
    </TableActionBar>
  ),
);
