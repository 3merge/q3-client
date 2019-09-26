import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { Components, Templates } from 'q3-admin';

export default (props) => (
  <Templates.List
    {...props}
    name="users"
    addComponent={() => null}
    rowComponent={({ name, email, age, children }) => (
      <>
        <Components.TableCellHeader
          name={name}
          sub={email}
        />
        <TableCell>{age}</TableCell>
        {children}
      </>
    )}
    enablePost={false}
    headers={(t) => [t('labels:name'), t('labels:age')]}
  />
);
