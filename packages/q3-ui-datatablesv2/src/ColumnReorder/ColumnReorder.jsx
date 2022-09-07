import React from 'react';
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'q3-ui-locale';
import { map } from 'lodash';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyle = makeStyles(() => ({
  container: {
    position: 'relative',
    zIndex: 100000000000000,
  },
}));

const DragHandle = sortableHandle(() => (
  <DragIndicatorIcon style={{ cursor: 'move' }} />
));

const SortableItem = SortableElement(({ value }) => {
  const { t } = useTranslation('labels');
  const { container } = useStyle();
  const text = value.displayName || t(value.field);

  return (
    <ListItem
      ContainerComponent="div"
      ContainerProps={{
        className: container,
      }}
      dense
    >
      <ListItemIcon>
        <DragHandle />
      </ListItemIcon>
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
        <IconButton color="inherit" onClick={value.onClick}>
          {value.visible ? (
            <VisibilityOffIcon />
          ) : (
            <VisibilityIcon />
          )}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

const SortableList = SortableContainer(({ items }) => (
  <List component="div">
    {items.map((item, index) => (
      <SortableItem
        index={index}
        key={item.field}
        value={item}
      />
    ))}
  </List>
));

const ColumnReorder = ({
  columns,
  onColumnChange,
  onColumnReorder,
}) => {
  const handleVisibilityChange = (column) => () =>
    onColumnChange(column.field, {
      visible: !column.visible,
    });

  const onSortEnd = ({ oldIndex, newIndex }) =>
    onColumnReorder(
      map(arrayMove(columns, oldIndex, newIndex), 'field'),
    );

  return (
    <Box width={280}>
      <SortableList
        items={map(columns, (column) => ({
          onClick: handleVisibilityChange(column),
          ...column,
        }))}
        onColumnChange={onColumnChange}
        onSortEnd={onSortEnd}
        useDragHandle
      />
    </Box>
  );
};

export default ColumnReorder;
