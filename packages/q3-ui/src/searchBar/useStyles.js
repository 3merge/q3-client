import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  input: {
    '&::placeholder': {
      opacity: 0.8,
    },
  },
}));

export default useStyles;
