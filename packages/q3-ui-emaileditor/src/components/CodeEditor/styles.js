import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  textarea: {
    display: 'none',
  },
  root: () => ({
    flexWrap: 'nowrap',
    height: '100%',
  }),
  column: ({ background }) => ({
    borderRight: `2px solid ${background}`,
  }),
}));
