import React from 'react';
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import Box from '@material-ui/core/Box';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { useChecked } from 'useful-state';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { array } from 'q3-ui-helpers';

const useStyle = makeStyles(() => ({
  container: {
    position: 'relative',
    zIndex: 100000000000000,
  },
}));

const DragHandle = sortableHandle(() => (
  <DragIndicatorIcon style={{ cursor: 'row-resize' }} />
));

const SortableItem = SortableElement(
  ({ value, isChecked, onCheck }) => {
    const { container } = useStyle();
    const { t } = useTranslation('labels');

    return (
      <ListItem
        ContainerComponent="div"
        ContainerProps={{ className: container }}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isChecked(value)}
            onChange={onCheck(value)}
            tabIndex={-1}
          />
        </ListItemIcon>
        <ListItemText primary={t(value)} />
        <ListItemSecondaryAction>
          <DragHandle />
        </ListItemSecondaryAction>
      </ListItem>
    );
  },
);

const SortableList = SortableContainer(
  ({ items, ...rest }) => (
    <List
      component="div"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        >
          Drag to reorder and/or click to activate
        </ListSubheader>
      }
    >
      {items.map((value, index) => (
        <SortableItem
          {...rest}
          key={`item-${value}`}
          index={index}
          value={value}
        />
      ))}
    </List>
  ),
);

const ColumnReorder = ({
  children,
  defaultColumns,
  columns,
}) => {
  const [items, setItems] = React.useState(columns);
  const checked = useChecked();

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  const onFinish = () =>
    array.intersects(items, checked.checked);

  React.useEffect(() => {
    if (defaultColumns && Array.isArray(defaultColumns)) {
      checked.setChecked(defaultColumns);
      setItems(
        array.sortByIndexingArray(items, defaultColumns),
      );
    }
  }, [defaultColumns]);

  return (
    <Box p={1}>
      <SortableList
        onSortEnd={onSortEnd}
        items={items}
        {...checked}
      />
      {children(onFinish())}
    </Box>
  );
};

export default ColumnReorder;
