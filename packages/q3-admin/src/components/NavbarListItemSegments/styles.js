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
    padding: 0,

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
      padding: theme.spacing(0.5),
      paddingLeft: theme.spacing(1.5),
      justifyContent: 'flex-start',
      textTransform: 'none',
      fontSize: '0.911rem',
    },
  },
  listItemSelected: {
    background: `${theme.palette.primary.dark} !Important`,
  },
  hidden: {
    display: 'none',
  },
}));
