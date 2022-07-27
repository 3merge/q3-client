import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ isOpen }) => ({
    overflow: 'auto',
    padding: isOpen ? theme.spacing(2) : 0,
    position: 'relative',
    transition: 'padding,width 250ms',
    width: isOpen ? 550 : 0,
    maxWidth: '33vw',
    boxShadow: theme.shadows[2],

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }),
}));
