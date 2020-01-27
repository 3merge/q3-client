import React from 'react';
import { connect } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import BuilderState from './builderState';

const Next = ({ formik, submit, size, label, onClick }) => {
  const { t } = useTranslation();
  const { authorization } = React.useContext(BuilderState);

  const isDisabled =
    formik.isSubmitting || authorization.disable;

  return (
    <Box display="inline-block" mt={1}>
      <Button
        size={size}
        color="primary"
        variant="contained"
        type={submit ? 'submit' : 'button'}
        onClick={onClick || formik.submitForm}
        disabled={isDisabled}
      >
        {t(`labels:${label}`)}
      </Button>
    </Box>
  );
};

Next.propTypes = {
  /**
   * The "Formik bag"
   * See https://jaredpalmer.com/formik/docs/api/connect
   */
  formik: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitForm: PropTypes.func,
  }).isRequired,

  /**
   * Determines what kind of button this is
   */
  submit: PropTypes.bool,

  /**
   * Custom click handler that overrides formik's submitForm action
   */
  onClick: PropTypes.func,

  /**
   * Material UI size prop
   */
  size: PropTypes.string,

  /**
   * Text to display inside of this button
   */
  label: PropTypes.string.isRequired,
};

Next.defaultProps = {
  submit: false,
  onClick: null,
  size: 'large',
};

export default connect(Next);
