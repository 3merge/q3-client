import React from 'react';
import { Router } from '@reach/router';
import Rest from 'q3-ui-test-utils/lib/rest';
import { AuthContext } from 'q3-ui-permissions';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import restCollection from 'q3-ui-test-utils/lib/restCollection';
import Detail from '../detail';
import SubDetail from '.';
import Header from '../header';
import Page from '../page';
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
  const {
    onGet,
    onGetSub,
    onCreateSub,
    onUpdateSub,
    onRemoveSub,
  } = restCollection();

  m.onGet('/foos/1').reply(() => {
    return [200, { foo: onGet() }];
  });

  m.onGet('/foos/1/friends').reply(() => {
    return [200, { friends: onGetSub() }];
  });

  m.onPost('/foos/1/friends').reply(({ data }) => {
    return [
      200,
      { friends: onCreateSub(JSON.parse(data)) },
    ];
  });

  m.onDelete('/foos/1/friends').reply(({ url }) => {
    return [
      200,
      {
        friends: onRemoveSub(
          url.split('/foos/1/friends/')[1],
        ),
      },
    ];
  });

  m.onPatch(/\/foos\/1\/friends\/\d+/).reply(
    ({ data, url }) => [
      200,
      {
        friends: onUpdateSub(
          url.split('/foos/1/friends/')[1],
        )(JSON.parse(data)),
      },
    ],
  );
}

const SubDetailView = React.memo(() => (
  <SubDetail
    runPoll
    collectionName={coll}
    id="1"
    root="friends"
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
));

const OtherForm = () => {
  const state = React.useContext(State);

  return (
    <Form
      onSubmit={state.patch()}
      initialValues={{ year: '' }}
    >
      <Field name="year" type="date" />
    </Form>
  );
};

const OtherForms = () => {
  const state = React.useContext(State);

  return (
    <Form
      onSubmit={state.patch()}
      initialValues={{ date: '' }}
    >
      <Field name="date" type="date" />
    </Form>
  );
};

const SubDetailInstance = () => (
  <>
    <Header
      titlePath="foo"
      titleRenderer={(r) => ({
        title: `Version ${r ? r.version : 0}`,
      })}
    />
    <Detail
      registerOptions={(state) => {
        return [
          {
            title: 'Polled',
            description: state.polled ? 'YES' : 'NO',
          },
          {
            title: 'Year',
            description: state.year,
          },
        ];
      }}
    >
      <SubDetailView name="lorem" />
      <OtherForm name="first" />
      <OtherForms name="second" />
    </Detail>
  </>
);

export const Populated = () => {
  return (
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
        <Page
          id="1"
          resourceName={coll}
          collectionName={coll}
          resourceNameSingular="foo"
          subResources={['friends']}
        >
          <Rest define={mock} delay={1500}>
            <Router basepath="/">
              <SubDetailInstance path="/foos/:id/*" />
            </Router>
          </Rest>
        </Page>
      </AuthContext.Provider>
    </LocationProvider>
  );
};
