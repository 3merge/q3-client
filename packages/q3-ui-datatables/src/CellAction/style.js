import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ anchor = 'end' }) => ({
    background: theme.palette.background.paper,
    boxSizing: 'border-box',
    minWidth: '0 !important',
    textAlign: 'right',
    transition: 'width 250ms',
    width: 'min-content',
    willChange: 'width',

    // ...(anchor === 'end' ? {
    //   position: 'var(--cell-position)',
    // right: 0,
    // } : {}),

    '& > div': {
      display: 'inline-flex',
      padding: '0 12px',
      wrap: 'nowrap',
    },
  }),
}));
