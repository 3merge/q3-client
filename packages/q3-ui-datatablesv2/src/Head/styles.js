import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  head: ({ sticky = false, width = 'auto' }) => ({
    ...theme.typography.overline,
    background: theme.palette.background.paper,
    left: sticky ? 0 : undefined,
    overflow: 'hidden',
    position: 'sticky',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    textTransform: 'none',
    top: 0,
    whiteSpace: 'nowrap',
    width,
    zIndex: 1,
  }),
}));
