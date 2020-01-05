import React from 'react';
import { connect } from 'formik';
import Button from '@material-ui/core/Button';

const Back = connect(({ formik }) => (
  <Button type="button" onClick={formik.resetForm}>
    Back
  </Button>
));

export default Back;
