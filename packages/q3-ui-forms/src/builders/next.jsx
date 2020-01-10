import React from 'react';
import { connect } from 'formik';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import BuilderState from './builderState';

const Next = connect(
  ({
    formik,
    submit,
    size = 'large',
    label = 'submit',
    onClick,
  }) => {
    const { t } = useTranslation();

    const { authorization } = React.useContext(
      BuilderState,
    );

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
  },
);

export default Next;
