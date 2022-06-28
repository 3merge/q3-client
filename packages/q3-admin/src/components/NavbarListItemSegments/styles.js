import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  button: {
    textAlign: 'left',
  },
  activeSegment: {
    '& *': {
      color: `${theme.palette.secondary.main} !important`,
      fontWeight: 'bold',
    },

    '&::before': {
      background: theme.palette.secondary.main,
      content: '""',
      height: '100%',
      left: '-1.55rem',
      position: 'absolute',
      top: 0,
      width: 2.5,
      borderRadius: 4,
    },
  },
  segments: {
    margin: 0,
    padding: 0,
    paddingLeft: '3rem',
    position: 'relative',

    '&::before': {
      background:
        theme.palette.type === 'dark'
          ? 'rgba(255, 255, 255, 0.12)'
          : 'rgba(0, 0, 0, 0.12)',
      content: '""',
      height: '100%',
      left: '1.5rem',
      position: 'absolute',
      top: 0,
      width: 1,
    },

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
      padding: theme.spacing(0.25),
      paddingLeft: theme.spacing(0.25),
      justifyContent: 'flex-start',
      textTransform: 'none',
      fontSize: '0.911rem',
    },
  },
  listItemSelected: {
    background: `${theme.palette.primary.main} !Important`,
  },
  hidden: {
    display: 'none',
  },
}));
