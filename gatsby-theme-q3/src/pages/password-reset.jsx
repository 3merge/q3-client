import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import FormBox from '../components/FormBox';
import FormBoxContent from '../components/FormBoxContent';
import withSuccessOp from '../components/withSuccessOp';

const PasswordReset = ({ onSuccess }) => (
  <FormBox
    renderBottom={
      <Form
        onSubmit={(body) =>
          axios
            .post('/password-reset', body)
            .then(onSuccess)
        }
      >
        <Field
          type="email"
          name="email"
          xl={12}
          lg={12}
          md={12}
          required
        />
      </Form>
    }
    renderTop={
      <FormBoxContent
        title="passwordReset"
        description="passwordReset"
      />
    }
  />
);

PasswordReset.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default withSuccessOp(
  PasswordReset,
  'passwordResetNotice',
);
