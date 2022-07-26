import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ isOpen }) => ({
    overflow: 'auto',
    padding: isOpen ? theme.spacing(1) : 0,
    position: 'relative',
    transition: 'width 250ms',
    width: isOpen ? 550 : 0,
    maxWidth: '33vw',
  }),
}));
