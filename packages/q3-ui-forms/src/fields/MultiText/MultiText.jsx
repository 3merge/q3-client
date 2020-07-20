import React from 'react';
import ChipInput from 'material-ui-chip-input';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { blue } from '@material-ui/core/colors';
import withState from '../withState';

const MultiText = (props) => {
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
            //  value,
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
        variant="outlined"
        onAdd={onArrayPush}
        onDelete={onArrayPull}
        fullWidth
      />
    </Grid>
  );
};

export default withState(MultiText);
