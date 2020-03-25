import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  columnWidth: ({ height }) => ({
    height,
    width: 435,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }),
  sectionWidth: {
    overflowY: 'auto',
    width: 'calc(100% - 435px)',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  root: {
    borderTop: '2px solid whitesmoke',
    height: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  item: {
    minWidth: 'auto',
  },
}));
