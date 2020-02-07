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
import { Filter } from 'q3-admin/lib/containers';
import {
  Exists,
  In,
  LessThanOrEqualTo,
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

    <List
      aliasForName="coll"
      renderTop={() => (
        <Groups
          queries={{
            public: 'role=Public',
            reseller: 'role=Primary Reseller Contact',
          }}
        />
      )}
      renderForm={() => (
        <Filter
          enableReinitialize
          next={(v) => navigate(v)}
        >
          <LessThanOrEqualTo
            name="createdAt"
            label="Collection name"
            type="date"
          />
          <In
            name="coll"
            label="Collection name"
            type="chips"
          />
          <In name="role" label="Roles" type="select" />

          <Exists
            name="ownershipAliases%2Elength"
            label="Has at least one alias"
            type="checkbox"
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
