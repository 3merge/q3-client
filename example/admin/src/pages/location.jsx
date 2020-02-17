import React from 'react';
import { pick } from 'lodash';
import {
  Page,
  Header,
  Detail,
} from 'q3-admin/lib/components';
import { Field, Form } from 'q3-ui-forms/lib/builders';
import Section from 'q3-admin/lib/components/section';
import Sidebar from 'q3-admin/lib/components/sidebar';

const Demo = ({ state }) => (
  <Form
    id="demo"
    initialValues={pick(state.location, ['firstName'])}
    onSubmit={state.patch()}
  >
    <Field name="firstName" type="text" />
  </Form>
);

const Demo2 = ({ state }) => (
  <Form
    id="demo2"
    initialValues={pick(state.location, ['lastName'])}
    onSubmit={state.patch()}
  >
    <Field name="lastName" type="text" />
  </Form>
);

export default (props) => (
  <Page id {...props}>
    <Header />

    <Detail trash files notes>
      <Demo id="demo" name="demo" />
      <Demo2 id="demo2" name="demo2" />
    </Detail>
  </Page>
);
