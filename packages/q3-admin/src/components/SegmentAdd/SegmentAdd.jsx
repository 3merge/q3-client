import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useValue } from 'useful-state';

const SegmentAdd = ({ onSave, active, items }) => {
  const ref = React.useRef();
  const { value, onChange } = useValue('');

  const handleClick = () => {
    if (value.length) {
      return onSave(value);
    }

    ref.current.focus();
    return null;
  };

  return (
    <ListItem fullWidth variant="contained">
      <InputBase
        name="Custom"
        aria-label="New custom segment"
        placeholder="Save search as segment"
        value={value}
        onChange={onChange}
        inputProps={{
          ref,
        }}
        style={{
          fontSize: '0.933rem',
        }}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

SegmentAdd.propTypes = {};

export default SegmentAdd;
