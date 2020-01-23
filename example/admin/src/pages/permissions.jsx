import React from 'react';
import {
  Page,
  List,
  Header,
  Search,
  Add,
} from 'q3-admin/lib/components';
import { TableRow } from 'q3-ui-datatables';
import { Add as AddPermission } from '../containers/permissions';

export default (props) => (
  <Page index {...props}>
    <Header>
      <Search />
      <Add title="newPermission">
        <AddPermission />
      </Add>
    </Header>
    <List aliasForName="coll">
      {(rows) =>
        rows.map((row) => (
          <TableRow
            id={row.id}
            columns={{
              name: row.coll,
              description: row.role,
            }}
          />
        ))
      }
    </List>
  </Page>
);
