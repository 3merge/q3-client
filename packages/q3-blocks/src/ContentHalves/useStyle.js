import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ flip }) => ({
    flexDirection: flip ? 'row-reverse' : 'row',
  }),
  description: { '& p, & li': { fontSize: '0.933rem' } },
  divider: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    height: 5,
    margin: '.5rem 0 1rem',
    maxWidth: 55,
  },
  image: {
    height: '100%',
    minHeight: 325,
  },
}));
