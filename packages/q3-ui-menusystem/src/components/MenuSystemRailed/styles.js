import { makeStyles } from '@material-ui/core';
import { standard } from '../usePaperWidth/usePaperWidth';

export default makeStyles((theme) => ({
  flyout: ({ open }) => ({
    borderLeft: '1px solid',
    borderLeftColor: open
      ? theme.palette.background.muted
      : 'transparent',
    overflowX: 'hidden',
    transition: 'borderLeftColor,width 350ms',
    width: open ? standard : '0px',

    '& > div': {
      display: open ? 'block' : 'none',
    },
  }),
}));
