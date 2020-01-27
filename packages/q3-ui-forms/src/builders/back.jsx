import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const Back = ({ formik, onClick, label, left }) => {
  const { t } = useTranslation();

  return (
    <Button
      type="button"
      onClick={onClick || formik.resetForm}
      style={{
        [left ? 'marginLeft' : 'marginRight']: '0.25rem',
      }}
    >
      {t(`labels:${label}`)}
    </Button>
  );
};

Back.propTypes = {
  /**
   * The "Formik bag"
   * See https://jaredpalmer.com/formik/docs/api/connect
   */
  formik: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    resetForm: PropTypes.func,
  }).isRequired,

  /**
   * Determines internal margin direction
   */
  left: PropTypes.bool,

  /**
   * Custom click handler that overrides formik's submitForm action
   */
  onClick: PropTypes.func,

  /**
   * Text to display inside of this button
   */
  label: PropTypes.string.isRequired,
};

Back.defaultProps = {
  onClick: null,
  left: false,
};

export default connect(Back);
