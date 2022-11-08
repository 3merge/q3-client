import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  badge: {
    '& > span:last-of-type': {
      left: '-.25rem',
      top: '-.25rem',
      width: 4,
    },
  },
  fab: ({ on, transparent }) => {
    const out = {
      boxShadow: 'none',
      backgroundColor: theme.palette.background.muted,
      color: 'inherit',
      width: '36.5px',
      height: '36.5px',

      '&.Mui-disabled,&[disabled]': {
        background: 'transparent',
        cursor: 'not-allowed !important',
      },
    };

    if (transparent) {
      out.backgroundColor = 'transparent';
      out.border = '1px solid';
      out.borderColor = theme.palette.background.muted;
      out[theme.breakpoints.down('md')] = {
        border: 'none',
      };
    }

    if (on) {
      if (transparent) {
        out.borderColor = theme.palette.secondary.main;
        out.color = theme.palette.secondary.main;
      } else {
        out.backgroundColor = theme.palette.secondary.light;
        out.color = theme.palette.secondary.main;
      }
    }

    return out;
  },
  wrapper: {
    marginLeft: theme.spacing(0.25),
    marginRight: theme.spacing(0.25),
  },
}));
