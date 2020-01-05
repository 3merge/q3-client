import React from 'react';
import { storiesOf } from '@storybook/react';
import Field from './field';
import Multistep, { Fieldset } from './multistep';

storiesOf('Forms|Multistep', module)
  .add('With mounting validation', () => (
    <Multistep
      debug
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
      <Fieldset name="firstStepLabel">
        <Field name="firstName" type="text" required />
        <Field name="email" type="email" required />
        <Field name="age" type="number" min="0" />
      </Fieldset>

      <Fieldset name="secondStepLabel">
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
      </Fieldset>
    </Multistep>
  ))
  .add('Without mounting validation', () => (
    <Multistep
      isNew
      debug
      initialValues={{
        firstName: 'Jim',
        email: '',
        brother: '',
        friend: 'gm.com',
      }}
      onReset={() => {
        alert('Starting over...');
      }}
      onSubmit={(v, actions) => {
        alert('DONE!');
        return Promise.resolve(v, actions);
      }}
    >
      <Fieldset name="firstStepLabel">
        <Field name="firstName" type="text" required />
        <Field name="email" type="email" required />
        <Field name="age" type="number" min="0" />
      </Fieldset>

      <Fieldset debug name="secondStepLabel">
        <Field name="brother" type="text" required />
        <Field
          name="friend"
          type="email"
          conditional={['firstName=joe']}
        />
        <Field name="birthday" type="date" min="0" />
      </Fieldset>
    </Multistep>
  ));
