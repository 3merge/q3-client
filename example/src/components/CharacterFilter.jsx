import React from 'react';
import { Filters } from 'q3-admin/lib/containers';
import { Field } from 'q3-ui-forms/lib/builders';

export default () => {
  return (
    <Filters
      initialValues={{ role: [], gender: [], flag: '' }}
    >
      {(fields, getOptions) => (
        <>
          <Field
            name="role"
            type="chips"
            options={getOptions('role')}
          />
          <Field
            name="gender"
            type="select"
            options={getOptions('gender')}
          />
          <Field name="flag" type="checkbox" />
        </>
      )}
    </Filters>
  );
};
