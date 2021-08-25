import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import FieldMessage from '../FieldMessage';
import StyledDialog from '../StyledDialog';

const TimelineDialog = ({
  additionalFields,
  renderTrigger,
  label,
  onSubmit,
  ...rest
}) => (
  <StyledDialog
    title={label}
    renderTrigger={renderTrigger}
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
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  renderTrigger: PropTypes.func.isRequired,
};

export default TimelineDialog;
