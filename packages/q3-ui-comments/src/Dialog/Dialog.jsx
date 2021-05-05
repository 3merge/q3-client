import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Builders } from 'q3-ui-forms';
import Dialog from 'q3-ui-dialog';
import FieldMessage from '../FieldMessage';

const TimelineDialog = ({
  additionalFields,
  icon: Icon,
  label,
  onSubmit,
  ...rest
}) => (
  <Dialog
    title={label}
    renderTrigger={(onClick) => (
      <IconButton aria-label={label} onClick={onClick}>
        <Icon />
      </IconButton>
    )}
    renderContent={(close) => (
      <Builders.Form
        {...rest}
        onSubmit={(args) =>
          onSubmit(args).then(() => {
            close();
          })
        }
      >
        <FieldMessage {...rest} />
        {additionalFields}
      </Builders.Form>
    )}
  />
);

TimelineDialog.defaultProps = {
  additionalFields: null,
};

TimelineDialog.propTypes = {
  additionalFields: PropTypes.node,
  // eslint-disable-next-line
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TimelineDialog;
