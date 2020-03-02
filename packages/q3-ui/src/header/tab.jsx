import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

export default withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    lineHeight: 1,
    fontWeight: '600',
    [theme.breakpoints.up('md')]: {
      minWidth: 'none !important',
    },
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      borderRadius: 3,
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
  value: index,
});
