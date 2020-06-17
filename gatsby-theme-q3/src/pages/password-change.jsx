import React from 'react';
import queryString from 'query-string';
import { get } from 'lodash';
import { navigate } from '@reach/router';
import axios from 'axios';
import { NewPasswordFields } from 'q3-ui-forms/lib/presets';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import FormBoxContent from '../components/FormBoxContent';
import FormBox from '../components/FormBox';

export default (props) => {
  const { passwordResetToken, email } = queryString.parse(
    get(props, 'location.search', ''),
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
              .then(() => {
                navigate('/login');
              })
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
