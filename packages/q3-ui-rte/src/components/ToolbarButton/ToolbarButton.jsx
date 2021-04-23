import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconButton from 'q3-ui/lib/iconButton';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ToolbarButton = ({
  active,
  children,
  quillKey,
  ...props
}) => (
  <IconButton
    label={quillKey}
    icon={() => children}
    buttonProps={{
      variant: active ? 'contained' : undefined,
      classes: { root: `ql-${quillKey}` },
      ...props,
    }}
  />
);

ToolbarButton.propTypes = {
  quillKey: PropTypes.string.isRequired,
};

export default ToolbarButton;
