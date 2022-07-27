import RemoveCircleOutlineIcon from '@material-ui/icons/Remove';
import AddCircleOutlineIcon from '@material-ui/icons/Add';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
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
    updates: ChangeHistoryIcon,
  }[key] || noop);

export const getColor = (key) =>
  ({
    additions: blue[900],
    deletions: red[900],
    updates: purple[900],
  }[key]);
