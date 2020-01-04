import React from 'react';
import { connect } from 'formik';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const Next = connect(
  ({ formik, submit, size = 'large', label = 'next' }) => {
    const isDisabled = formik.isSubmitting;
    const { t } = useTranslation();

    return (
      <Box display="inline-block" mt={1}>
        <Button
          size={size}
          color="primary"
          variant="contained"
          type={submit ? 'submit' : 'button'}
          onClick={formik.submitForm}
          disabled={isDisabled || formik.status !== 'Ready'}
        >
          {t(`labels:${submit ? 'submit' : label}`)}
        </Button>
      </Box>
    );
  },
);

export default Next;
