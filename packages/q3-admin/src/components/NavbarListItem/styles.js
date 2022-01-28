import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  button: {
    textAlign: 'left',
  },
  activeSegment: {
    '& *': {
      color: `${theme.palette.secondary.main} !important`,
    },
  },
  segments: {
    margin: 0,
    padding: '0 1rem',

    '& ul': {
      width: '100%',
    },

    '& button, & a': {
      fontSize: '0.833rem',
    },
  },
  listItem: {
    padding: 0,

    '& button, & a': {
      padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
      textTransform: 'none',
      fontSize: '0.911rem',

      '& span:nth-child(2)': {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
      },
    },
  },
  listItemSelected: {},
  hidden: {
    display: 'none',
  },
}));
