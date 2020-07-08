import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  view: {
    backgroundColor: '#FFF',
    height: 'calc(100 * var(--vh) - 75px)',
    position: 'relative',
    width: '100%',
    zIndex: 1,
  },

  articleBox: () => ({
    height: 'calc(100 * var(--vh))',
    boxSizing: 'border-box',
  }),
  columnWidth: {
    position: 'sticky',
    top: 0,
    height: 'calc(100 * var(--vh))',
    width: 285,
    overflow: 'auto',
    resize: 'horizontal',

    '& > aside': {
      minWidth: 285,
    },

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  docs: {
    '& p, & li': {
      fontSize: '0.933rem !important',
    },
  },

  articleWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  sectionWidth: {
    overflowY: 'auto',
    width: 'calc(100% - 495px)',
    [theme.breakpoints.down('lg')]: {
      width: 'calc(100% - 405px)',
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  section: {
    paddingLeft: 0,

    [theme.breakpoints.down('md')]: {
      paddingLeft: 'initial',
    },
  },
}));
