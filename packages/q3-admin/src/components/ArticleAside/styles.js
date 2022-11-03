import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ isOpen }) => ({
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    padding: isOpen ? theme.spacing(2) : 0,
    position: 'relative',
    transition: 'padding,width 250ms',
    width: isOpen ? 375 : 0,
    maxWidth: '33vw',

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }),
}));
