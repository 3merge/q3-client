import React from 'react';
import { storiesOf } from '@storybook/react';
import Field from './field';
import Multistep, { Fieldset } from './multistep';

export default {
  title: 'Q3 Forms|Builders/Multiform',
  parameters: {
    component: Multistep,
  },
};

export const Default = () => (
  <Multistep
    debug
    isNew={false}
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
      <Field
        name="countries"
        type="radio"
        options={[
          { label: 'One', value: 'One' },
          { label: 'Two', value: 'Two' },
        ]}
      />
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
);
