import React from 'react';
import ChipInput from 'material-ui-chip-input';
import useDecorator from '../helpers/useDecorator';

const Multitext = (props) => {
  const deco = useDecorator(props);
  const { onArrayPush, onArrayPull, value, ...rest } = deco;

  return (
    <>
      <ChipInput
        {...rest}
        value={Array.isArray(value) ? value : []}
        variant="filled"
        onAdd={onArrayPush}
        onDelete={onArrayPull}
        InputProps={{
          disableUnderline: true,
        }}
        fullWidth
      />
      <div style={{ height: 20 }} />
    </>
  );
};

export default Multitext;
