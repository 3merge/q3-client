import React from 'react';
import FormBuilder from 'q3-ui-forms/lib/builders/submit';
import {
  Collection,
  Page,
  List,
  Detail,
  Header,
  Search,
  Field,
  Add,
} from '../../templates';
import { general } from './__fields.json';

const General = (props) => (
  <FormBuilder {...props} fields={general} />
);

export default () => (
  <Collection
    useResourceName
    resourceName="permissions"
    resourceNameSingular="permission"
  >
    <Page index>
      <Header>
        <Search>
          <Field include="coll" type="select" />
          <Field include="role" type="select" />
          <Field include="op" type="select" />
        </Search>
        <Add fields={general} />
      </Header>
      <List>
        <Field include={['coll', 'op']} />
        <Field include="role" />
        <Field include="fields" />
      </List>
    </Page>
    <Page id>
      <Header titleProp="name" />
      <Detail trash>
        <General />
      </Detail>
    </Page>
  </Collection>
);
