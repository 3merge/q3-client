import React from 'react';
import { storiesOf } from '@storybook/react';
import Field from './field';
import Back from './back';
import Next from './next';
import Multistep from './multistep';
import Form from './form';

storiesOf('Forms|Multistep', module)
  .add('With mounting validation', () => (
    <Multistep
      initialValues={{
        firstName: 'Jim',
        email: '',
        brother: 'Chris',
        friend: 'david@gmail.com',
      }}
      onReset={() => {
        alert('Starting over...');
      }}
      onSubmit={(v, actions) => {
        alert(JSON.stringify(v));
        return Promise.resolve(v, actions);
      }}
    >
      <Form debug name="firstStepLabel" html={false}>
        <Field name="firstName" type="text" required />
        <Field name="email" type="email" required />
        <Field name="age" type="number" min="0" />
        <Back />
        <Next />
      </Form>

      <Form debug name="secondStepLabel" html={false}>
        <Field
          name="brother"
          type="text"
          conditional={['firstName=joe']}
          override={({ values }) => ({
            required: values.firstName === 'joe',
          })}
        />
        <Field name="friend" type="email" required />
        <Field name="birthday" type="date" min="0" />
        <Back />
        <Next label="save" />
      </Form>
    </Multistep>
  ))
  .add('Without mounting validation', () => (
    <Multistep
      isNew
      initialValues={{
        firstName: 'Jim',
        email: '',
        brother: 'Chris',
        friend: 'david@gmail.com',
      }}
      onReset={() => {
        alert('Starting over...');
      }}
      onSubmit={(v, actions) => {
        alert(JSON.stringify(v));
        return Promise.resolve(v, actions);
      }}
    >
      <Form debug name="firstStepLabel" html={false}>
        <Field name="firstName" type="text" required />
        <Field name="email" type="email" required />
        <Field name="age" type="number" min="0" />
        <Back />
        <Next />
      </Form>

      <Form debug name="secondStepLabel" html={false}>
        <Field name="brother" type="text" required />
        <Field
          name="friend"
          type="email"
          conditional={['firstName=joe']}
        />
        <Field name="birthday" type="date" min="0" />
        <Back />
        <Next label="save" />
      </Form>
    </Multistep>
  ));
