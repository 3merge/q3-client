import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  button: ({ state }) => ({
    justifyContent: 'flex-start',
    textAlign: 'left',

    '& svg': {
      opacity: state ? 1 : 0.3,
    },
  }),
  link: ({ state }) => ({
    '& svg': {
      opacity: state ? 1 : 0.3,
    },
  }),
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
    borderRadius: 8,

    '& button, & a': {
      padding: `${theme.spacing(0.75)} ${theme.spacing(1)}`,
      textTransform: 'none',
      fontSize: '0.911rem',

      '& span:nth-child(2)': {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
      },
    },
  },
  listItemSelected: {
    backgroundColor: `${theme.palette.secondary.light} !important`,
    color: `${theme.palette.secondary.main} !important`,
  },
  hidden: {
    display: 'none',
  },
}));
