import React from 'react';
import {
  Page,
  List,
  Header,
  Search,
  Add,
} from 'q3-admin/lib/components';
import FilterForm from 'q3-admin/lib/containers/filter';
import Groups from 'q3-admin/lib/components/groups';
import WithFilter from 'q3-admin/lib/templates/withFilter';
import { TableRow } from 'q3-ui-datatables';
import { Field } from 'q3-ui-forms/lib/builders';
import { Add as AddPermission } from '../containers/permissions';

const Filters = () => {
  return (
    <FilterForm id="/q3-api-permissions">
      <Field name="coll" type="chips" />
      <Field name="op" type="checkset" />
    </FilterForm>
  );
};

export default (props) => (
  <Page index {...props}>
    <WithFilter
      renderAside={() => <Filters />}
      renderMain={() => (
        <>
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
        </>
      )}
    />
  </Page>
);
