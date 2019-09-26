import React from 'react';
import { Components, Templates } from 'q3-admin';

export default (props) => (
  <Templates.List
    {...props}
    name="users"
    enablePost={false}
    columns={[['name', 'email'], 'age']}
  />
);
