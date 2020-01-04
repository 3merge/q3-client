import React from 'react';
import {
  Page,
  DisplayItem,
  List,
  Header,
  Search,
  Add,
} from 'q3-admin/lib/components';

export default (props) => (
  <Page index {...props}>
    <Header>
      <Search />
    </Header>
    <List>
      <DisplayItem include={['streetLine1', 'city']} />
      <DisplayItem include="postal" />
    </List>
  </Page>
);
