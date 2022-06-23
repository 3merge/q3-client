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
      width: '36.5px',
      height: '36.5px',

      '&.Mui-disabled': {
        background: 'transparent',
        cursor: 'not-allowed !important',
      },
    };

    if (transparent) {
      out.backgroundColor = 'transparent';
    }

    return out;
  },
}));
