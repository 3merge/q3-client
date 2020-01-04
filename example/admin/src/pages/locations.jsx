import React from 'react';
import {
  Page,
  DisplayItem,
  List,
  Header,
  Search,
  Add,
} from 'q3-admin/lib/components';
import { Add as AddLocation } from '../containers/locations';

export default (props) => (
  <Page index {...props}>
    <Header>
      <Search />
      <Add title="addLocation">
        <AddLocation />
      </Add>
    </Header>
    <List>
      <DisplayItem include={['streetLine1', 'city']} />
      <DisplayItem include="postal" />
    </List>
  </Page>
);
