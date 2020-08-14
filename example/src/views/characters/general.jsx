import React from 'react';
import { connect } from 'q3-admin/lib/containers';
import { last } from 'lodash';
import { Form, Field } from 'q3-ui-forms/lib/builders';

export default connect(({ data, ...rest }) => (
  <Form
    {...rest}
    debug
    initialValues={data}
    onSubmit={(values, attachments) => {
      const formData = new FormData();

      Object.entries(values).forEach(([name, value]) => {
        formData.set(name, value);
      });

      Object.entries(attachments).forEach(([, item]) => {
        formData.append(
          `${item.$locals.relativePath}/${item.$locals.saveAs}`,
          item,
          `${item.$locals.saveAs}.${last(
            item.name.split('.'),
          )}`,
        );
      });

      return rest.onSubmit(formData);
    }}
    keep={['name', 'role', 'gender', 'example']}
  >
    <Field name="name" type="text" required />
    <Field name="role" type="text" required />
    <Field
      name="gender"
      type="select"
      options={['Male', 'Female']}
      required
    />
    <Field
      relativePath="pos"
      saveAs="example"
      name="example"
      type="file"
      required
    />
  </Form>
));
