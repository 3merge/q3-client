import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    zIndex: 2,
    position: 'relative',
    border: '1px solid var(--background-muted)',
    backgroundColor: 'var(--background-default)',
    boxSizing: 'border-box',
    height: 65,
  },
  title: {
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    margin: '0 3rem 0 0',
    fontSize: '1.33rem',
    lineHeight: 1,
    minWidth: 'calc(320px - 4.5rem)',
  },
}));
