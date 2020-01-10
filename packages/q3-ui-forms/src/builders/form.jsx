import 'react-json-pretty/themes/acai.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { FormikDebug } from './multistep';
import withWrapper from './wrapper';

const FormWrapper = withWrapper(
  ({ children, label, formikProps, onSubmit, debug }) => {
    const ref = React.useRef();
    const { t } = useTranslation('labels');

    return (
      <Formik onSubmit={onSubmit} {...formikProps}>
        {({ setFieldValue }) => (
          <Form ref={ref}>
            {children}
            <Box mt={1}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
              >
                {t('submit' || label)}
              </Button>
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
