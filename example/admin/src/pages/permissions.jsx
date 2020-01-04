import React from 'react';
import {
  Page,
  DisplayItem,
  List,
  Header,
  Search,
  Add,
} from 'q3-admin/lib/components';
import { Add as AddPermission } from '../containers/permissions';

export default (props) => (
  <Page index {...props}>
    <Header>
      <Search />
      <Add title="newPermission">
        <AddPermission />
      </Add>
    </Header>
    <List>
      <DisplayItem include={['role', 'op']} />
      <DisplayItem include="coll" />
    </List>
  </Page>
);
