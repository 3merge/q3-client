import React from 'react';
import Tile from 'q3-ui/lib/tile';
import Multistep, { Fieldset } from './multistep';
import Repeater from './repeater';
import Form from './form';
import Field from './field';

export default {
  title: 'Q3 Forms|Builders/Repeaters',
  parameters: {
    component: Repeater,
    componentSubtitle:
      'Configure forms for repeatable embedded documents',
  },
};

export const Empty = () => (
  <Tile
    title="Characters"
    subtitle="This is an important blurb about the characters"
  >
    <Repeater
      name="Main Characters"
      create={() => alert('Created!')}
    >
      <div>Requires a child</div>
    </Repeater>
  </Tile>
);

export const WithForm = () => (
  <Tile
    title="Characters"
    subtitle="This is an important blurb about the characters"
  >
    <Repeater
      data={[
        { id: 1, firstName: 'Joe', lastName: 'Snow' },
        { id: 2, firstName: 'Arya', lastName: 'Stark' },
      ]}
      title="lorem"
      create={() => Promise.resolve()}
      edit={() => () => Promise.resolve()}
      primary={({ firstName }) =>
        `First Name: ${firstName}`
      }
      secondary={({ lastName }) =>
        `Family Name: ${lastName}`
      }
      initialValues={{
        firstName: '',
      }}
    >
      <Form label="add">
        <Field type="text" name="firstName" required />
      </Form>
    </Repeater>
  </Tile>
);

export const WithWizard = () => (
  <Tile
    title="Characters"
    subtitle="This is an important blurb about the characters"
  >
    <Repeater
      remove={() => null}
      create={() => null}
      title="lorem"
      data={[
        {
          id: 1,
          firstName: 'Joe',
          lastName: 'Snow',
          age: 11,
          company: '3merge',
        },
        {
          id: 2,
          firstName: 'Arya',
          lastName: 'Stark',
          age: 23,
          position: 'Sales',
        },
      ]}
      primary={({ firstName }) =>
        `First Name: ${firstName}`
      }
      secondary={({ lastName }) =>
        `Family Name: ${lastName}`
      }
      initialValues={{
        firstName: '',
        lastName: '',
      }}
      edit={() => (values, actions) => {
        actions.setFieldError(
          'firstName',
          'We do not know you',
          false,
        );

        return Promise.reject();
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
  </Tile>
);
