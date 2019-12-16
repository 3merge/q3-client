import React from 'react';
import classNames from 'class-names';
import { connect } from 'formik'
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import useFormik from '../inputs/useFormik';

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: '5px solid transparent',
  },
  selected: {
    borderLeftColor: green[500],
  },
  avatar: {
    width: 85,
    height: 85,
    marginRight: theme.spacing(2),
  },
  container: {
    width: '100%',
  },
}));

const SelectableList = ({ options = [], ...rest }) => {
  const {
    value: currentValue,
    onChange,
    ...etc
  } = useFormik(rest);
  const { t } = useTranslation();
  const { root, container, selected, avatar } = useStyles();
console.log(onChange, etc)

  return (
    <List className={container}>
      {options.map(({ value, label, img }) => (
        <ListItem
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
};

export default connect(SelectableList);
