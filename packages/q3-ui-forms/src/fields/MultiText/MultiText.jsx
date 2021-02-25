import React from 'react';
import ChipInput from 'material-ui-chip-input';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { blue } from '@material-ui/core/colors';
import withState from '../withState';

const MultiText = (props) => {
  const [input, setInput] = React.useState('');
  const {
    onArrayPush,
    onArrayPull,
    value,
    ...rest
  } = props;
  return (
    <Grid item xs={12} style={{ marginBottom: 20 }}>
      <ChipInput
        {...rest}
        value={Array.isArray(value) ? value : []}
        chipRenderer={(
          {
            text,
            isFocused,
            isDisabled,
            isReadOnly,
            handleClick,
            handleDelete,
            className,
          },
          key,
        ) => (
          <Chip
            key={key}
            className={className}
            style={{
              pointerEvents:
                isDisabled || isReadOnly
                  ? 'none'
                  : undefined,
              backgroundColor: isFocused
                ? blue[300]
                : undefined,
            }}
            onClick={handleClick}
            onDelete={handleDelete}
            label={text}
          />
        )}
        inputValue={input}
        onUpdateInput={(e) => setInput(e.target.value)}
        InputProps={{
          endAdornment: (
            <Box mb={1}>
              <IconButton
                onClick={() => {
                  if (input.trim()) {
                    onArrayPush(input);
                    setInput('');
                  }
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          ),
        }}
        newChipKeyCodes={[9, 13]}
        variant="outlined"
        onAdd={(e) => {
          setInput('');
          onArrayPush(e);
        }}
        onDelete={onArrayPull}
        fullWidth
      />
    </Grid>
  );
};

export default withState(MultiText);
