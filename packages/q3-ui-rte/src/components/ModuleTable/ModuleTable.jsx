import React from 'react';
import TableChartIcon from '@material-ui/icons/TableChart';
import { Menu, MenuItem } from '@material-ui/core';
import useTable from '../useTable';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';

const ModuleLink = React.forwardRef(
  ({ buttonComponent: Component }, ref) => {
    const { anchor, create, close, actions } =
      useTable(ref);

    return (
      <>
        <Component onClick={create} />
        <Menu
          id="table-menu"
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={close}
        >
          {actions.map((action) => (
            <MenuItem dense onClick={action.onClick}>
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  },
);

ModuleLink.propTypes = propTypes;

export default withCurrentSelection(ModuleLink, {
  icon: TableChartIcon,
  label: 'table',
});
