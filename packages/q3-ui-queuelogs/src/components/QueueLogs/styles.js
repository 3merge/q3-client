import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    fontSize: '0.833rem',

    '& .MuiDataGrid-columnHeader': {
      background: theme.palette.background.muted,
    },
  },
  name: {
    fontWeight: 'bold',
  },
  actions: {
    textAlign: 'right !important',
    justifyContent: 'flex-end !important',
  },
}));
