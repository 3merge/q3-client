import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: ({ navComponent }) => ({
    borderBottom: navComponent
      ? `1px solid ${theme.palette.background.muted}`
      : undefined,
    paddingTop: '.25rem',
    top: 0,
    zIndex: 10,
  }),
  header: {
    padding: '0 1.5rem',
  },
  title: {
    display: 'inline-block',
    paddingLeft: ({ backComponent }) =>
      backComponent ? '1rem' : 0,
  },
}));
