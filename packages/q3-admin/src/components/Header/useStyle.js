import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: ({ navComponent }) => ({
    borderBottom: navComponent
      ? '2px solid #f5f7f9'
      : undefined,
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: 'white',
  }),
  header: {
    padding: '0 1.5rem',
  },
  title: {
    display: 'inline-block',
    paddingLeft: ({ backComponent }) =>
      backComponent ? '1rem' : 0,
  },
  white: {
    backgroundColor: '#FFF',
  },
}));
