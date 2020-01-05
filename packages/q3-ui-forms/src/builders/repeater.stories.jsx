import React from 'react';
import { storiesOf } from '@storybook/react';
import Tile from 'q3-ui/lib/tile';
import Multistep, { Fieldset } from './multistep';
import Repeater from './repeater';
import Form from './form';
import Field from './field';

storiesOf('Forms|Repeater', module)
  .add('Without data', () => (
    <Tile
      title="Characters"
      subtitle="This is an important blurb about the characters"
    >
      <Repeater name="Main Characters">
        <div>Requires a child</div>
      </Repeater>
    </Tile>
  ))
  .add('With simple form', () => (
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
        edit={() => () => Promise.reject()}
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
      >
        <Form label="add">
          <Field type="text" name="firstName" required />
        </Form>
      </Repeater>
    </Tile>
  ))
  .add('With wizard', () => (
    <Tile
      title="Characters"
      subtitle="This is an important blurb about the characters"
    >
      <Repeater
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
  ));
