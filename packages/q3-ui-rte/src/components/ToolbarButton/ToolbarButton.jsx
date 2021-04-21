import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyled = makeStyles((theme) => ({
  root: {
    '&.ql-active': {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
}));

const ToolbarButton = React.forwardRef(
  ({ quillKey, ...props }, ref) => (
    <Tooltip title={quillKey}>
      <Button
        {...props}
        ref={ref}
        className={classnames(
          useStyled()?.root,
          `ql-${quillKey}`,
        )}
      />
    </Tooltip>
  ),
);

ToolbarButton.propTypes = {
  quillKey: PropTypes.string.isRequired,
};

export default ToolbarButton;
