import React from 'react';
import { storiesOf } from '@storybook/react';
import Tile from 'q3-ui/lib/tile';
import Multistep from './multistep';
import Repeater from './repeater';
import Form from './form';
import Field from './field';
import Next from './next';
import Back from './back';

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
        <Form>
          <Field type="text" name="firstName" required />
          <Next submit label="add" />
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
      >
        <Multistep>
          <Form name="General">
            <Field type="text" name="firstName" required />
            <Field type="text" name="lastName" required />
            <Field type="number" name="age" min="21" />
            <Back />
            <Next />
          </Form>
          <Form name="Work">
            <Field type="text" name="position" />
            <Field type="text" name="company" />
            <Back />
            <Next label="save" />
          </Form>
        </Multistep>
      </Repeater>
    </Tile>
  ));
