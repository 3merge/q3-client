import React from 'react';
import {
  Page,
  Header,
  Detail,
} from 'q3-admin/lib/components';
import { Field, Form } from 'q3-ui-forms/lib/builders';
import { Add as AddLocation } from '../containers/locations';

const Demo = ({ state }) => (
  <Form
    initialValues={state.location}
    onSubmit={state.patch()}
  >
    <Field name="firstName" type="text" />
  </Form>
);

export default (props) => (
  <Page id {...props}>
    <Header />
    <Detail trash files notes>
      <Demo name="demo" />
    </Detail>
  </Page>
);
