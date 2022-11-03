import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core';

export default withStyles((theme) => ({
  indicator: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',

    '& > span': {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 5,
      display: 'block',
      boxShadow: theme.shadows[2],
      height: 2.5,
      maxWidth: 31.5,
      width: '100%',
    },
  },
  root: {
    minHeight: 'auto',
  },
}))((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span />,
      style: {
        height: 3,
      },
    }}
  />
));
