import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';
import CheckListItemCheckbox from '../CheckListItemCheckbox';

const CheckListItem = SortableElement(({ value }) => {
  const { id, description, seq, checked } = value;
  const { t } = useTranslation('labels');
  const { listItem } = useStyle({
    checked,
  });

  return React.useMemo(
    () => (
      <CheckListItemCheckbox id={id} checked={checked}>
        {(Element) => (
          <ListItem className={listItem} dense>
            <ListItemIcon>{Element}</ListItemIcon>
            <ListItemText primary={value.description} />
          </ListItem>
        )}
      </CheckListItemCheckbox>
    ),
    [JSON.stringify(value)],
  );
});

export default CheckListItem;
