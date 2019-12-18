import React from 'react';
import { useTranslation } from 'react-i18next';
import ChipInput from 'material-ui-chip-input';
import useDecorator from '../helpers/useDecorator';

const Multitext = (props) => {
  const { t } = useTranslation();
  const {
    onArrayPush,
    onArrayPull,
    ...rest
  } = useDecorator(props);

  return (
    <>
      <ChipInput
        {...rest}
        fullWidth
        variant="filled"
        onAdd={onArrayPush}
        onDelete={onArrayPull}
        helperText={t('helpers:multi')}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <div style={{ height: 20 }} />
    </>
  );
};

export default Multitext;
