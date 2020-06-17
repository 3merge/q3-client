import React from 'react';
import queryString from 'query-string';
import { navigate } from '@reach/router';
import { get } from 'lodash';
import axios from 'axios';
import { NewPasswordFields } from 'q3-ui-forms/lib/presets';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import FormBoxContent from '../components/FormBoxContent';
import FormBox from '../components/FormBox';
import { authenticate } from '../components/utils';

export default (props) => {
  const { verificationCode, id, email } = queryString.parse(
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
            axios.post('/verify', passwords).then(() => {
              if (!email) return navigate('/');
              return authenticate({
                password: passwords.newPassword,
                email,
              });
            })
          }
          initialValues={{
            id,
            verificationCode,
          }}
        >
          {(values) => (
            <>
              <Field
                name="id"
                type="string"
                required
                xl={6}
                lg={6}
              />
              <Field
                name="verificationCode"
                type="string"
                required
                xl={6}
                lg={6}
              />
              <NewPasswordFields {...values} />
            </>
          )}
        </Form>
      }
      renderTop={
        <FormBoxContent
          title="verify"
          description="verify"
        />
      }
    />
  );
};
