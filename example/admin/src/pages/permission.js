import React from 'react';
import { Link } from '@reach/router';
import {
  Page,
  List,
  Header,
  Search,
  Add,
} from 'q3-admin/lib/components';
import Groups from 'q3-admin/lib/components/groups';
import { TableRow } from 'q3-ui-datatables';
import { Field } from 'q3-ui-forms/lib/builders';
import { Add as AddPermission } from '../containers/permissions';

export default (props) => (
  <Page {...props}>
    <Header>
      <Search />
      <Add title="newPermission">
        <AddPermission />
      </Add>
    </Header>
    {console.log(props)}
    <p>For debugging routing errors:</p>
    <Link to="/permissions/5dc1e9291078273548d513b9">
      To
    </Link>
    <Link to="/permissions/5e18ef40b530af25c0489da2">
      From
    </Link>
  </Page>
);
