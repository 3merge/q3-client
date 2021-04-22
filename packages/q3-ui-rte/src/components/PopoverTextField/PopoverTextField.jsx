import React from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const PopoverTextField = ({
  children,
  initialValue,
  label,
}) => {
  const { t } = useTranslation('labels');
  const [state, setState] = React.useState(initialValue);

  const handleStateChange = (e) =>
    setState(e?.target?.value);

  return (
    <>
      <TextField
        autoFocus
        label={t(label)}
        name="popover-text-capture"
        value={state}
        onChange={handleStateChange}
        type="text"
        fullWidth
      />
      {children(state)}
    </>
  );
};

export default PopoverTextField;
