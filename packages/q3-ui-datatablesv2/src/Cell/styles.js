import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cell: ({ sticky = false }) => ({
    background: theme.palette.background.paper,
    left: 0,
    overflow: 'hidden',
    padding: `${theme.spacing(0.5)} ${theme.spacing(0.25)}`,
    position: sticky ? 'sticky' : 'relative',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: 'auto',
  }),
}));
