import React from 'react';
import { useTheme } from '@material-ui/core';

const BackgroundStyle = () => {
  const theme = useTheme();

  return (
    <style>
      {`body,html { background: ${theme?.palette?.background.default} }`}
    </style>
  );
};

BackgroundStyle.defaultProps = {};
BackgroundStyle.propTypes = {};

export default BackgroundStyle;
