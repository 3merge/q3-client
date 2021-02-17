import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useValue } from 'useful-state';
import { useTranslation } from 'react-i18next';

const SegmentAdd = ({ onSave, active, items }) => {
  const ref = React.useRef();
  const { value, onChange, setValue } = useValue('');
  const { t } = useTranslation('labels');

  const handleClick = () => {
    if (value.length) {
      onSave(value);
      return setValue('');
    }
    ref.current.focus();
    return null;
  };

  return (
    <ListItem fullWidth variant="contained">
      <InputBase
        name="Custom"
        aria-label={t('saveAsSegment')}
        placeholder={t('saveAsSegment')}
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
