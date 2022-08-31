import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  listItem: {
    alignItems: 'flex-start',
  },
  listItemIcon: {
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
}));
