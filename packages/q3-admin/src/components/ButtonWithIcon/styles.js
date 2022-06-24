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
      boxShadow: 'none',
      backgroundColor: on
        ? theme.palette.secondary.main
        : theme.palette.background.muted,
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
      out.border = `1px solid ${theme.palette.background.default}`;
    }

    return out;
  },
  wrapper: {
    marginLeft: theme.spacing(0.25),
    marginRight: theme.spacing(0.25),
  },
}));
