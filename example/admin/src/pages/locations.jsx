import React from 'react';
import {
  Page,
  List,
  Header,
  Search,
  Add,
} from 'q3-admin/lib/components';
import { TableRow } from 'q3-ui-datatables';
import { Add as AddLocation } from '../containers/locations';

export default (props) => (
  <Page index {...props}>
    <Header>
      <Search />
      <Add title="addLocation">
        <AddLocation />
      </Add>
    </Header>
    <List aliasForName="firstName">
      {(rows) =>
        rows.map((row) => (
          <TableRow
            id={row.id}
            columns={{
              name: row.firstName,
              description: row.kind,
            }}
          />
        ))
      }
    </List>
  </Page>
);
