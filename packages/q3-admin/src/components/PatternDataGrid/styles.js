import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  measuringTool: {
    fontSize: '0.833rem',
    visibility: 'hidden',
    height: 0,
  },
  table: {
    borderColor: 'transparent',
    fontSize: '0.833rem',

    '& div': {
      borderBottomColor: `${theme.palette.background.default} !important`,

      '&[role="columnheader"] div div div': {
        fontWeight: 'bold',
      },
    },
    '& p': {
      fontSize: 'inherit !important',
    },

    '&[role="row"]:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));
