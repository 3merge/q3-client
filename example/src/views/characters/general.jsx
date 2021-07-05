import React from 'react';
import { connect } from 'q3-admin/lib/containers';
import LazyForm from '../../components/LazyForm';

export default connect(({ data, ...rest }) => (
  <LazyForm
    {...rest}
    initialValues={data}
    fields={['name', 'role', 'gender', 'company', 'date']}
  />
));
