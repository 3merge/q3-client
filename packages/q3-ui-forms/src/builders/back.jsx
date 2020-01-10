import React from 'react';
import { connect } from 'formik';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const Back = connect(({ formik, onClick, label, left }) => {
  const { t } = useTranslation();

  return (
    <Button
      type="button"
      onClick={onClick || formik.resetForm}
      style={{
        [left ? 'marginLeft' : 'marginRight']: '0.25rem',
      }}
    >
      {t(`labels:${label || 'reset'}`)}
    </Button>
  );
});

export default Back;
