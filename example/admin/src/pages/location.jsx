import React from 'react';
import {
  Page,
  Header,
  Search,
  Detail,
  Add,
} from 'q3-admin/lib/components';
import { Add as AddLocation } from '../containers/locations';

const Demo = () => <p>More to come.</p>;

export default (props) => (
  <Page id {...props}>
    <Header />
    <Detail trash files featured notes>
      <Demo />
    </Detail>
  </Page>
);
