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
} from '../../templates';
import { general } from './__fields.json';

const General = (props) => (
  <FormBuilder {...props} fields={general} />
);

export default () => (
  <Collection
    useResourceName
    resourceName="rates"
    resourceNameSingular="rate"
  >
    <Page index>
      <Header>
        <Search />
      </Header>
      <List>
        <Field include={['name', 'value']} />
      </List>
    </Page>
    <Page id>
      <Header titleProp="name" />
      <Detail notes history>
        <General />
      </Detail>
    </Page>
  </Collection>
);
