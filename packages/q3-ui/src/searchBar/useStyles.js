import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  input: {
    '&::placeholder': {
      opacity: 0.8,
    },
    '&:focus': {
      'outline-style': 'auto',
      'outline-width': 'medium',
    },
  },
}));

export default useStyles;
