import React from 'react';
import classNames from 'class-names';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation } from 'q3-ui-locale';
import withState from './withState';
import { useOptions } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: '5px solid transparent',
  },
  selected: {
    borderLeftColor: green[500],
  },
  avatar: {
    width: 55,
    height: 55,
    marginRight: theme.spacing(2),
  },
  container: {
    width: '100%',
  },
}));

const SelectableList = withState((props) => {
  const { value: currentValue, onChange } = props;

  const { t } = useTranslation();
  const { root, container, selected, avatar } = useStyles();
  const { items } = useOptions({
    minimumCharacterCount: 0,
    ...props,
  });

  return (
    <List className={container}>
      {items.map(({ value, label, img }) => (
        <ListItem
          key={value}
          dense
          onClick={() => onChange(value)}
          className={classNames(
            root,
            currentValue === value ? selected : null,
          )}
          button
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar
              src={img}
              alt={t(`labels:${label}`)}
              className={avatar}
              variant="rounded"
            />
          </ListItemAvatar>
          <ListItemText
            primary={t(`labels:${label}`)}
            secondary={t(`helpers:${label}`)}
          />
        </ListItem>
      ))}
    </List>
  );
});

export default SelectableList;
