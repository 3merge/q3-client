import React from 'react';
import { Router } from '@reach/router';
import Rest from 'q3-ui-test-utils/lib/rest';
import { AuthContext } from 'q3-ui-permissions';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Detail from '../detail';
import SubDetail from '.';
import Header from '../header';
import State from '../state';

export default {
  title: 'Q3 Admin|Containers/SubDetail',
  parameters: {
    component: SubDetail,
    componentSubtitle:
      'Auto-configure several single-resource components and containers, including Sidebar, Documentation and Notes',
  },
};

let prevID = 0;
const coll = 'foos';

const genPermission = (rest) => ({
  ownership: 'Any',
  fields: '*',
  coll,
  ...rest,
});

const genItem = (rest) => ({
  // eslint-disable-next-line
  id: prevID++,
  ...rest,
});

function mock(m) {
  m.onGet('/foos/1/items').reply(200, {
    items: [
      genItem({ name: 'Jon', age: 23, color: 'Blue' }),
      genItem({ name: 'Suzie', age: 45, color: 'Red' }),
      genItem({ name: 'Bryan', age: 12, color: 'Green' }),
    ],
  });
}

const SubDetailView = () => (
  <SubDetail
    root="items"
    cardProps={{
      title: 'name',
      describe({ name, age }) {
        return `${name} is ${age} years old`;
      },
      attributes: ['age', 'color'],
      editable: {
        age: {
          type: 'number',
          positive: true,
          min: 0,
        },
      },
    }}
  >
    <Form>
      <Field name="name" type="text" />
    </Form>
  </SubDetail>
);

const SubDetailInstance = () => (
  <>
    <Header titlePath="foo" />
    <Detail>
      <SubDetailView name="lorem" />
    </Detail>
  </>
);

export const Populated = () => (
  <LocationProvider initialPath="/foos/1">
    <AuthContext.Provider
      value={{
        state: {
          init: true,
          profile: {
            id: 1,
          },
          permissions: [
            genPermission({ op: 'Read' }),
            genPermission({ op: 'Update' }),
            genPermission({ op: 'Create' }),
            genPermission({ op: 'Delete' }),
          ],
        },
      }}
    >
      <State.Provider
        value={{
          id: 1,
          resourceName: coll,
          collectionName: coll,
          resourceNameSingular: 'foo',
        }}
      >
        <Rest define={mock}>
          <Router basepath="/">
            <SubDetailInstance path="/foos/:id/*" />
          </Router>
        </Rest>
      </State.Provider>
    </AuthContext.Provider>
  </LocationProvider>
);
