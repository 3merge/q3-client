import 'react-json-pretty/themes/acai.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Box';
import { FormikDebug } from './multistep';
import Back from './back';
import Next from './next';
import withWrapper from './wrapper';

const FormWrapper = withWrapper(
  ({
    children,
    label,
    formikProps,
    onSubmit,
    debug,
    onReset,
  }) => {
    const ref = React.useRef();
    const { t } = useTranslation('labels');

    return (
      <Formik onSubmit={onSubmit} {...formikProps}>
        {({ resetForm }) => (
          <Form ref={ref}>
            {children}
            <Box mt={1}>
              <Next submit label={label}>
                {t('submit' || label)}
              </Next>
              <Back onClick={onReset || resetForm} left />
              <FormikDebug show={debug} />
            </Box>
          </Form>
        )}
      </Formik>
    );
  },
);

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  html: PropTypes.bool,
  debug: PropTypes.bool,
};

FormWrapper.defaultProps = {
  html: true,
  debug: false,
};

export default FormWrapper;
