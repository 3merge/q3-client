import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  badge: {
    '& > span:last-of-type': {
      left: '-.5rem',
      top: '-.5rem',
    },
  },
  fab: ({ on, transparent }) => {
    const out = {
      borderRadius: 4,
      boxShadow: 'none',
      backgroundColor: on
        ? theme.palette.secondary.main
        : theme.palette.background.muted,
      color: 'inherit',

      [theme.breakpoints.down('md')]: {
        background: 'transparent',
      },
    };

    if (transparent) {
      out.backgroundColor = 'transparent';
    }

    return out;
  },
}));
