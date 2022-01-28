import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  badge: {
    '& > span:last-of-type': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
      left: '-.5rem',
      top: '-.5rem',
    },
  },
  fab: ({ on }) => ({
    borderRadius: 4,
    boxShadow: 'none',
    backgroundColor: on
      ? theme.palette.secondary.main
      : theme.palette.background.muted,
    color: 'inherit',
  }),
}));
