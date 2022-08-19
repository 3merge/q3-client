import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';
import { isNil, map } from 'lodash';
import Q3ListItem from '../ListItem';
import useStyle from './styles';

const IconListItem = ({
  active,
  icon,
  label,
  onClick,
  pages,
  showPagesPopover,
}) => {
  const Icon = !isNil(icon) ? icon : DeviceUnknownIcon;
  const cls = useStyle();

  const TooltipComponent = React.useMemo(
    () =>
      showPagesPopover
        ? Tooltip
        : ({ children }) =>
            React.createElement('div', {}, children),
    [showPagesPopover],
  );

  return (
    <Box className={cls.li} component="li">
      <TooltipComponent
        arrow
        placement="right"
        title={label}
      >
        <ListItem
          button
          onClick={onClick}
          classes={{
            root: cls.listItem,
            selected: cls.listItemSelected,
          }}
          selected={active}
        >
          <ListItemIcon className={cls.listItemIcon}>
            <Icon className={cls.icon} />
          </ListItemIcon>
        </ListItem>
      </TooltipComponent>
      <Paper className={cls.popover}>
        {label}
        <List>
          {map(pages, (page, idx) => (
            <Q3ListItem
              expandDefault
              key={idx}
              timeout={idx * 150}
              {...page}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default IconListItem;
