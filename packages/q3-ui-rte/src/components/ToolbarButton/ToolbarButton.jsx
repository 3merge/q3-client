import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import IconButton from 'q3-ui/lib/iconButton';
import useToolbarLabel from '../useToolbarLabel';

const ToolbarButton = ({
  children,
  quillKey,
  value,
  ...props
}) => {
  const utl = useToolbarLabel();
  return (
    <IconButton
      label={utl(quillKey, value)}
      icon={() => children}
      buttonProps={{
        classes: { root: `ql-${quillKey}` },
        value,
        ...props,
      }}
    />
  );
};

ToolbarButton.defaultProps = {
  children: null,
  value: undefined,
};

ToolbarButton.propTypes = {
  children: PropTypes.node,
  quillKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default ToolbarButton;
