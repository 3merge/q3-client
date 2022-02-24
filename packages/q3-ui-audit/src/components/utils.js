import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import {
  blue,
  purple,
  red,
} from '@material-ui/core/colors';

const noop = () => null;

export const getIcon = (key) =>
  ({
    additions: AddCircleOutlineIcon,
    deletions: RemoveCircleOutlineIcon,
    updates: BlurCircularIcon,
  }[key] || noop);

export const getColor = (key) =>
  ({
    additions: blue,
    deletions: red,
    updates: purple,
  }[key]);
