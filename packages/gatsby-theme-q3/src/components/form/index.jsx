import React from 'react';
import { Formik, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default ({ children, submit, ...rest }) => (
  <Formik
    {...rest}
    enableReinitialize
    render={() => (
      <Form>
        {children}
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
          >
            {submit}
          </Button>
        </Box>
      </Form>
    )}
  />
);
