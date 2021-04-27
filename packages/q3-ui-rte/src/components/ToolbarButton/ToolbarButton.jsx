import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'q3-ui/lib/iconButton';

const ToolbarButton = ({
  children,
  quillKey,
  ...props
}) => (
  <IconButton
    label={quillKey}
    icon={() => children}
    buttonProps={{
      classes: { root: `ql-${quillKey}` },
      ...props,
    }}
  />
);

ToolbarButton.propTypes = {
  quillKey: PropTypes.string.isRequired,
};

export default ToolbarButton;
