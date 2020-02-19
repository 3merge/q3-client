import React from 'react';
import { Router } from '@reach/router';
import { pick } from 'lodash';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Detail from '.';
import fixture from '../documentation/__fixtures__/markdown.md';
import State from '../state';

export default {
  title: 'Q3 Admin|Containers/Detail',
  parameters: {
    component: Detail,
    componentSubtitle:
      'Auto-configure several single-resource components and containers, including Sidebar, Documentation and Notes',
  },
};

const RestOpDetail = ({ children, resourceName, fixt }) => {
  const [state, setState] = React.useState(fixt);

  const patch = () => (values) =>
    new Promise((r) => {
      setState({ ...state, ...values });
      r();
    });

  return children({
    [resourceName]: state,
    patch,
  });
};

const First = ({ state: { patch, foo } }) => (
  <Form
    id="first"
    onSubmit={patch()}
    initialValues={pick(foo, ['name'])}
  >
    <Field name="name" type="text" />
  </Form>
);

const Second = ({ state: { patch, foo } }) => (
  <Form
    id="second"
    onSubmit={patch()}
    initialValues={pick(foo, ['age'])}
  >
    <Field name="age" type="number" />
  </Form>
);

const DetailInstance = () => (
  <Detail
    trash
    notes
    delete
    filepath={{ content: { data: fixture } }}
    persistenceIds={['first', 'second']}
  >
    <First id="first" name="first" />
    <Second id="second" name="second" />
  </Detail>
);

export const WithDefaults = () => (
  <LocationProvider initialPath="/foos/1">
    <RestOpDetail
      resourceName="foo"
      fixt={{ age: 1, name: '' }}
    >
      {(ops) => (
        <State.Provider
          value={{
            id: 1,
            resourceName: 'foos',
            resourceNameSingular: 'foo',
            collectionName: 'foos',
            ...ops,
          }}
        >
          <Router basepath="/">
            <DetailInstance path="/foos/:id/*" />
          </Router>
        </State.Provider>
      )}
    </RestOpDetail>
  </LocationProvider>
);
