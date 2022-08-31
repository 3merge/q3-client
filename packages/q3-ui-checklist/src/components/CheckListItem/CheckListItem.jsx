import React from 'react';
import {
  SortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import classnames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import useStyle from './styles';
import CheckListItemCheckbox from '../CheckListItemCheckbox';

const DragHandle = sortableHandle(() => (
  <IconButton size="small">
    <DragIndicatorIcon style={{ cursor: 'move' }} />
  </IconButton>
));

const CheckListItem = SortableElement(({ value }) => {
  const { id, checked } = value;
  const { listItem, listItemIcon, strikethrough } =
    useStyle({
      checked,
    });

  return React.useMemo(
    () => (
      <CheckListItemCheckbox id={id} checked={checked}>
        {(Element, isChecked) => (
          <ListItem
            className={classnames(
              listItem,
              isChecked ? strikethrough : undefined,
            )}
            dense
          >
            <ListItemIcon className={listItemIcon}>
              <DragHandle />
              {Element}
            </ListItemIcon>
            <ListItemText
              primary={
                <div
                  contentEditable
                  onBlur={() => {
                    alert('SAVE');
                  }}
                >
                  {value.description}
                </div>
              }
              secondary={
                !isChecked && (
                  <Box
                    alignItems="center"
                    display="flex"
                    mt={0.5}
                  >
                    <AvatarGroup max={3}>
                      <Avatar src="" />
                      <Avatar src="" />
                      <Avatar src="" />
                      <Avatar src="" />
                      <Avatar>
                        <AddIcon />
                      </Avatar>
                    </AvatarGroup>
                    {/** IF OVERDUE HIDE... */}
                    <Box ml={1}>
                      <Chip
                        onClick={() => {
                          // open options
                        }}
                        icon={<ScheduleIcon />}
                        size="small"
                        label="Date"
                      />
                      <Chip
                        onClick={() => {
                          // open options
                        }}
                        icon={<AddAlertIcon />}
                        size="small"
                        label="Reminder"
                      />
                    </Box>
                  </Box>
                )
              }
            />
          </ListItem>
        )}
      </CheckListItemCheckbox>
    ),
    [JSON.stringify(value)],
  );
});

export default CheckListItem;
