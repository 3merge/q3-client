import React from 'react';
import { List } from 'q3-admin/lib/templates';

export default (props) => (
  <List
    {...props}
    name="users"
    enablePost={false}
    columns={[['name', 'email'], 'age']}
  />
);
