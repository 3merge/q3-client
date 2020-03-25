import React from 'react';
import {
  Form,
  Field,
  Fieldset,
  Multistep,
} from 'q3-ui-forms/lib/builders';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { AuthContext } from 'q3-ui-permissions';
import Repeater from './Repeater';

export default {
  title: 'Q3 Repeater|Examples',
  parameters: {
    component: Repeater,
    componentSubtitle:
      'UI editor for iterable resources (ie. sub-documents)',
  },
};

//= ===============================================================================
// Helpers and seed
//= ===============================================================================

const collectionName = 'test';

const genPermission = (op, fields = '*') => ({
  ownership: 'Any',
  coll: collectionName,
  fields,
  op,
});

const genResolver = (fn) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, 500);
  });

const seedData = [
  {
    id: 1,
    firstName: 'Norman',
    lastName: 'Bates',
    age: 18,
    company: 'Motel',
    position: 'Reception',
    trained: true,
  },
  {
    id: 2,
    firstName: 'Forrest',
    lastName: 'Gump',
    age: 23,
  },
];

const seedPermissions = {
  state: {
    init: true,
    profile: {
      id: 1,
    },
    permissions: [
      genPermission('Read', '!people.company'),
      genPermission('Update', '!people.lastName'),
      genPermission('Create', '*'),
      genPermission('Delete', '*'),
    ],
  },
};

//= ===============================================================================
// Setup
//= ===============================================================================

const withForm = (Component) => () => {
  const [initialValues, setInitialValues] = React.useState(
    seedData,
  );

  const onCreate = (values) =>
    genResolver(() => {
      const nextState = [
        ...initialValues,
        {
          id: Number(initialValues.length) + 1,
          ...values,
        },
      ];

      setInitialValues(nextState);
      return nextState;
    });

  const onRemove = (id) => () =>
    genResolver(() => {
      const nextState = initialValues.filter(
        (v) => v.id !== id,
      );

      setInitialValues(nextState);
      return nextState;
    });

  const onUpdate = (id) => (values) =>
    genResolver(() => {
      const nextState = initialValues.map((v) => {
        if (v.id === id) return values;
        return v;
      });

      setInitialValues(nextState);
      return {
        ...nextState,
        newProp: true,
      };
    });

  return (
    <Box p={2} style={{ backgroundColor: '#FFF' }}>
      <Container>
        <AuthContext.Provider value={seedPermissions}>
          <Component
            name="people"
            collectionName={collectionName}
            data={initialValues}
            create={onCreate}
            edit={onUpdate}
            remove={onRemove}
            initialValues={{
              firstName: '',
              lastName: '',
              age: '',
              position: '',
              company: '',
              trained: false,
            }}
          />
        </AuthContext.Provider>
      </Container>
    </Box>
  );
};

//= ===============================================================================
// Stories
//= ===============================================================================

export const Empty = () => (
  <Box style={{ backgroundColor: '#FFF' }}>
    <Container>
      <Repeater data={[]}>Will not show</Repeater>
    </Container>
  </Box>
);

export const CustomAddRenderer = () => (
  <Box style={{ backgroundColor: '#FFF' }}>
    <Container>
      <Repeater
        renderCustomAddForm={() => (
          <p>Hey! This is a custom renderer</p>
        )}
        data={[]}
      >
        Will not show
      </Repeater>
    </Container>
  </Box>
);

export const SimpleFormWithLimitedPermissions = withForm(
  (props) => (
    <Repeater
      {...props}
      cardProps={{
        onColor: (item) =>
          item.age < 20 ? 'orange' : 'blue',

        describe: () =>
          'This is a dynamic sentence generated from the item template.',

        title: (item) =>
          `${item.firstName} ${item.company}`,
      }}
    >
      <Form label="add">
        <Field type="text" name="firstName" required />
        <Field
          type="text"
          name="lastName"
          under="people"
          required
        />
        <Field
          type="number"
          name="age"
          under="people"
          required
        />
      </Form>
    </Repeater>
  ),
);

export const MultistepFormWithLimitedPermissions = withForm(
  (props) => (
    <Repeater
      {...props}
      cardProps={{
        onColor: (item) =>
          item.age < 20 ? 'orange' : 'blue',

        describe: (item) =>
          `${item.firstName} works at ${item.company} as a ${item.position}`,

        title: 'firstName',
        attributes: [
          'lastName',
          'position',
          'company',
          'age',
          'trained',
        ],
        editable: {
          firstName: {
            type: 'text',
          },
          position: {
            type: 'select',
            options: [
              {
                value: 'Reception',
                label: 'Reception',
              },
              {
                value: 'Manager',
                label: 'Manager',
              },
            ],
          },
          age: {
            type: 'number',
            positive: true,
            min: 0,
            max: 8,
          },
          trained: {
            type: 'checkbox',
          },
        },
      }}
    >
      <Multistep>
        <Fieldset name="General">
          <Field type="text" name="firstName" required />
          <Field type="text" name="lastName" required />
          <Field type="number" name="age" min="21" />
        </Fieldset>
        <Fieldset name="Work">
          <Field type="text" name="position" />
          <Field type="text" name="company" />
        </Fieldset>
      </Multistep>
    </Repeater>
  ),
);
