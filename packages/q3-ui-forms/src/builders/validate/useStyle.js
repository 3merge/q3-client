import { green, red } from '@material-ui/core/colors';

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  inlineMsg: ({ isError }) => ({
    background: isError ? red[50] : green[50],
    color: isError ? red[900] : green[900],
    display: 'block',
    padding: theme.spacing(1),
  }),
}));
