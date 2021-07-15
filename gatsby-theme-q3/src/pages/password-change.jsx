import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { get } from 'lodash';
import axios from 'axios';
import { NewPasswordFields } from 'q3-ui-forms/lib/presets';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import FormBoxContent from '../components/FormBoxContent';
import FormBox from '../components/FormBox';
import withSuccessOp from '../components/withSuccessOp';

const PasswordChange = ({ onSuccess, location }) => {
  const { passwordResetToken, email } = queryString.parse(
    get(location, 'search', ''),
    {
      decode: false,
    },
  );

  return (
    <FormBox
      renderBottom={
        <Form
          onSubmit={(passwords) =>
            axios
              .post('/password-change', passwords)
              .then(onSuccess)
          }
          initialValues={{
            passwordResetToken,
            email,
          }}
        >
          {(values) => (
            <>
              {!passwordResetToken && (
                <Field
                  name="previousPassword"
                  type="password"
                  required
                  xl={12}
                  lg={12}
                />
              )}
              <NewPasswordFields {...values} />
            </>
          )}
        </Form>
      }
      renderTop={
        <FormBoxContent
          title="passwordChange"
          description="passwordChange"
        />
      }
    />
  );
};

PasswordChange.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default withSuccessOp(
  PasswordChange,
  'passwordChangeNotice',
);
