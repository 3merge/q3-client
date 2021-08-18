import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Builders } from 'q3-ui-forms';
import { useTranslation } from 'react-i18next';
import FieldMessage from '../FieldMessage';
import StyledDialog from '../StyledDialog';

export const inlineButtonStyles = {
  textDecoration: 'underline',
  padding: 0,
  minWidth: 'auto',
  marginRight: '.5rem',
  textTransform: 'none',
  fontWeight: 'bold',
};

const TimelineDialog = ({
  additionalFields,
  icon: Icon,
  label,
  onSubmit,
  ...rest
}) => {
  const { t } = useTranslation('labels');

  return (
    <StyledDialog
      title={label}
      renderTrigger={(onClick) => (
        <Button
          aria-label={label}
          onClick={onClick}
          size="small"
          style={inlineButtonStyles}
        >
          {t(label)}
        </Button>
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
};

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
