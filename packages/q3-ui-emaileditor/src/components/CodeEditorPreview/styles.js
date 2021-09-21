import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
  },
  iframe: ({ loading }) => ({
    border: 0,
    width: '100%',
    height: '100%',
    filter: loading ? 'blur(2px)' : undefined,
    transition: 'filter 200ms',
    margin: 0,
    padding: 0,
  }),
}));
