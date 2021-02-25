import React from 'react';
import { connect } from 'q3-admin/lib/containers';

import axios from 'axios';
import { Form, Field } from 'q3-ui-forms/lib/builders';

export default connect(({ data, ...rest }) => (
  <Form
    {...rest}
    debug
    initialValues={data}
    keep={['company', 'name', 'role', 'gender', 'example']}
    marshalSelectively
  >
    <Field name="name" type="text" required />
    <Field name="role" type="text" required />
    <Field
      name="company.ref"
      type="select"
      loadOptions={() =>
        axios
          .get('/companies')
          .then(({ data: { companies } }) =>
            companies.map((company) => ({
              value: company.id,
              label: company.name,
            })),
          )
      }
      required
    />
    <Field
      name="gender"
      type="select"
      options={['Male', 'Female']}
      required
    />
  </Form>
));
