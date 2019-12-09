import React from 'react';
import FormBuilder from 'q3-ui-forms/lib/builders/submit';
import RepeaterBuilder from 'q3-ui-forms/lib/builders/repeater';
import FromJson from 'q3-ui-forms/lib/builders/fromJson';
import validate from 'q3-ui-forms/lib/validations';
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
import {
  general,
  conditions,
  tiers,
} from './__fields.json';

const General = (props) => (
  <FormBuilder {...props} fields={general} />
);

const Conditions = (props) => (
  <FormBuilder {...props} fields={conditions} />
);

const Tiers = (props) => (
  <RepeaterBuilder {...props}>
    <FromJson
      name="tier"
      validationSchema={validate(tiers)}
      json={{
        fields: tiers,
        ...props,
      }}
    />
  </RepeaterBuilder>
);

export default () => (
  <Collection
    useResourceName
    resourceName="rebates"
    resourceNameSingular="rebate"
  >
    <Page index>
      <Header>
        <Search>
          <Field include="currency" type="select" />
          <Field include="symbol" type="select" />
        </Search>
        <Add fields={general} />
      </Header>
      <List>
        <Field include={['name', 'description']} />
        <Field include="expiresOn" />
        <Field include="effectiveFrom" />
      </List>
    </Page>
    <Page id>
      <Header titleProp="name" />
      <Detail trash history>
        <General />
        <Conditions />
        <Tiers />
      </Detail>
    </Page>
  </Collection>
);
