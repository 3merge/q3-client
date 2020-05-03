import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

export const getFromProps = ({ success, error }) => {
  if (success)
    return {
      backgroundColor: green[900],
      icon: CheckCircleIcon,
      label: 'done',
    };

  if (error)
    return {
      backgroundColor: red[900],
      icon: ErrorIcon,
      label: 'failed',
    };

  return {
    icon: ShoppingCart,
    label: 'addToCart',
  };
};

export default makeStyles(() => ({
  btn: (props) => {
    const { backgroundColor } = getFromProps(props);
    return {
      alignSelf: 'stretch',
      display: 'flex',
      margin: '0 0 0 0.25rem',
      transition: 'all 500ms',
      backgroundColor,
    };
  },
}));
