import React from 'react';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@storybook/addon-knobs';
import {
  Form,
  Field,
  Fieldset,
  Multistep,
} from 'q3-ui-forms/lib/builders';
import Avatar from '@material-ui/core/Avatar';
import AccountBox from '@material-ui/icons/AccountBox';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { AuthContext } from 'q3-ui-permissions';
import Repeater from './Repeater';

export default {
  title: 'Q3 Repeater|Examples',
  decorators: [withKnobs],
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

const Wrapper = ({ children }) => (
  <Box p={2} style={{ backgroundColor: '#FFF' }}>
    <Container>{children}</Container>
  </Box>
);

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
    <AuthContext.Provider value={seedPermissions}>
      <Wrapper>
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
      </Wrapper>
    </AuthContext.Provider>
  );
};

//= ===============================================================================
// Stories
//= ===============================================================================

export const Empty = () => (
  <Wrapper>
    <Repeater data={[]}>
      <div />
    </Repeater>
  </Wrapper>
);

export const CustomAddRenderer = () => (
  <Wrapper>
    <Repeater
      data={[]}
      addComponent={() => (
        <p>Hey! This is a custom renderer</p>
      )}
    >
      <div />
    </Repeater>
  </Wrapper>
);

export const CustomNestedTableRenderer = withForm(
  (props) => (
    <Wrapper>
      <Repeater
        {...props}
        disableMultiselect
        disableRemove
        disableEditor
        renderNestedTableRow={() => (
          <p>Hey! This is a custom renderer</p>
        )}
      >
        <div />
      </Repeater>
    </Wrapper>
  ),
);

export const CustomMobileColumnRenderer = withForm(
  (props) => (
    <Wrapper>
      <Repeater
        {...props}
        renderMobileColumns={() => (
          <p>Hey! This is a custom renderer</p>
        )}
        cardProps={{
          title: 'firstName',
          attributes: [
            'lastName',
            'position',
            'company',
            'age',
            'trained',
          ],
        }}
      >
        <div />
      </Repeater>
    </Wrapper>
  ),
);

export const WithEditorsDisabled = withForm((props) => (
  <Wrapper>
    <Repeater
      {...props}
      disableMultiselect
      disableEditor
      disableRemove
    >
      <div />
    </Repeater>
  </Wrapper>
));

export const CustomEditableRenderer = withForm((props) => (
  <Wrapper>
    <Repeater
      {...props}
      cardProps={{
        title: 'firstName',
        attributes: ['position'],
        icon: () => (
          <Avatar>
            <AccountBox />
          </Avatar>
        ),
        editable: {
          position: {
            renderer: () => <div>Something custom!</div>,
          },
        },
      }}
    >
      <div />
    </Repeater>
  </Wrapper>
));

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
