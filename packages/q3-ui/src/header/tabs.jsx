import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

export default withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: theme.spacing(0.25),
    '& > div': {
      background: theme.palette.primary.main,
      borderRadius: 15,
      maxWidth: theme.spacing(2),
      width: '100%',
    },
  },
}))((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <div /> }}
  />
));
