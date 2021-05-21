import React from 'react';
import { Router } from '@reach/router';
import { pick } from 'lodash';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Detail from '.';
import Main from '../../components/main';
import Header from '../header';
import State from '../state';

export default {
  title: 'Q3 Admin/Containers/Detail',
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
    id="first-123"
    onSubmit={patch()}
    initialValues={pick(foo, ['name'])}
  >
    <Field name="name" type="text" />
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />{' '}
    <Field name="name" type="text" />
  </Form>
);

const Second = ({ state: { patch, foo } }) => (
  <Form
    id="second-123"
    onSubmit={patch()}
    initialValues={pick(foo, ['age'])}
  >
    <Field name="age" type="number" />
  </Form>
);

const DetailInstance = () => (
  <Main
    ProfileBarProps={{ menuItems: [] }}
    pages={[]}
    render={() => (
      <>
        <Header titlePath="foo" />
        <Detail
          trash
          notes
          delete
          picture
          filepath={{ content: { data: '' } }}
          persistenceIds={['first', 'second']}
        >
          <First name="first" />
          <Second name="second" />
          <Second name="second" />
          <Second name="second" />
          <Second name="second" />
          <Second name="second" />
          <Second name="second" />
          <Second name="second" />
          <Second name="second" />
          <Second name="second" />
        </Detail>
      </>
    )}
  />
);

export const WithDefaults = () => (
  <LocationProvider initialPath="/foos/1">
    <RestOpDetail
      resourceName="foo"
      fixt={{
        id: '123',
        age: 1,
        name: '',
        photo:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      }}
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
