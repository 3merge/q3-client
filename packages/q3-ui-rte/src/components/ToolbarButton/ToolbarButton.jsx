import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ToolbarButton = ({ active, quillKey, ...props }) => (
  <Tooltip title={quillKey}>
    <IconButton
      {...props}
      variant={active ? 'contained' : undefined}
      className={classnames(`ql-${quillKey}`)}
    />
  </Tooltip>
);

ToolbarButton.propTypes = {
  quillKey: PropTypes.string.isRequired,
};

export default ToolbarButton;
