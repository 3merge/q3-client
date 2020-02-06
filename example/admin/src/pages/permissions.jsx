import React from 'react';
import { navigate } from '@reach/router';
import {
  Page,
  List,
  Header,
  Search,
  Add,
} from 'q3-admin/lib/components';
import Groups from 'q3-admin/lib/components/groups';
import { TableRow } from 'q3-ui-datatables';
import Filter from 'q3-ui-filters';
import {
  Exists,
  Equals,
} from 'q3-ui-filters/lib/components';
import { Add as AddPermission } from '../containers/permissions';

export default (props) => (
  <Page index {...props}>
    <Header>
      <Search />
      <Add title="newPermission">
        <AddPermission />
      </Add>
    </Header>
    <Groups
      queries={{
        public: 'role=Public',
        reseller: 'role=Primary Reseller Contact',
      }}
    />
    <List
      aliasForName="coll"
      renderForm={() => (
        <Filter
          enableReinitialize
          next={(v) => navigate(v)}
        >
          <Equals name="coll" label="Collection name" />
          <Exists name="role" label="Has a role" />
          <Exists
            name="ownershipAliases.0"
            label="Has an alias"
          />
        </Filter>
      )}
    >
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
