import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: ({ disabled }) => ({
    cursor: disabled ? 'not-allowed !important' : undefined,
    '& .Mui-disabled': {
      cursor: disabled
        ? 'not-allowed !important'
        : undefined,
    },
  }),
}));
