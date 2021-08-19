import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  scrollPaper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  paper: {
    maxHeight: 450,
    width: 'auto',

    [theme.breakpoints.down('md')]: {
      maxHeight: 'none',
      width: '100%',
      margin: 0,

      '& .q3-forms-rte-wrapper': {
        maxHeight: '45vh',
        overflow: 'auto',
      },
    },
  },
}));
